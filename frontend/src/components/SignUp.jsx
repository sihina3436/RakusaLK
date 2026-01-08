import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      navigate("/login");
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-neutral-900 to-black px-4 pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-2xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-yellow-400">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Join the Rakuza premium training wear community
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Username
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="mt-2 w-full h-11 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="rakuza_user"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-2 w-full h-11 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="rakuza@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full h-11 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-4 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum 8 characters
            </p>
          </div>

          {/* Street */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Street Address
            </label>
            <input
              type="text"
              required
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="mt-2 w-full h-11 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="123 Main Street"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                City
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="mt-2 w-full h-11 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Colombo"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                State / Province
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="mt-2 w-full h-11 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Western Province"
              />
            </div>
          </div>

          {/* Postal Code & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Postal Code
              </label>
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                className="mt-2 w-full h-11 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="10200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Country
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="mt-2 w-full h-11 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Sri Lanka"
              />
            </div>
          </div>

          {/* Terms */}
          <label className="flex gap-2 text-sm text-gray-400">
            <input type="checkbox" required className="accent-yellow-400 mt-1" />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="text-yellow-400 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-yellow-400 hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-yellow-400 text-black rounded-lg font-semibold uppercase tracking-wide hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-400 pt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Sign in
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Signup;
