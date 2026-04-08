import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserProfileMutation } from "../../../../redux/auth/authApi";
import { loginSuccess } from "../../../../redux/auth/authSlice";
import { toast } from "sonner";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";

const ManageProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [updateUserProfile, { isLoading }] =
    useUpdateUserProfileMutation();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    postalCode: user?.address?.postalCode || "",
    country: user?.address?.country || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUserProfile({
        userId: user.id,
        username: formData.username,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      }).unwrap();

      dispatch(loginSuccess(res.user));

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-3xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-amber-400">
            My Profile
          </h1>
          <p className="text-zinc-500 text-sm">
            Update your personal information
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-zinc-900/70 backdrop-blur 
          border border-zinc-800 rounded-2xl p-8 shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* USER INFO */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <FaUser />
                <h2 className="text-lg font-semibold">
                  Personal Info
                </h2>
              </div>

              <div>
                <label className="text-xs text-zinc-400">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 rounded-lg 
                    bg-black border border-zinc-700 
                    focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full mt-1 px-4 py-3 rounded-lg 
                    bg-zinc-800 border border-zinc-700 text-zinc-500"
                />
              </div>
            </div>

            {/* ADDRESS SECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <FaMapMarkerAlt />
                <h2 className="text-lg font-semibold">
                  Shipping Address
                </h2>
              </div>

              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg 
                  bg-black border border-zinc-700 
                  focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg 
                    bg-black border border-zinc-700 
                    focus:outline-none focus:ring-2 focus:ring-amber-400"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg 
                    bg-black border border-zinc-700 
                    focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg 
                    bg-black border border-zinc-700 
                    focus:outline-none focus:ring-2 focus:ring-amber-400"
                />

                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg 
                    bg-black border border-zinc-700 
                    focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold
                bg-amber-400 text-black hover:bg-amber-500
                transition active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ManageProfile;
