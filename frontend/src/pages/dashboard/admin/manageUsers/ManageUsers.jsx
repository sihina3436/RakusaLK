import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../../../redux/auth/authApi";

const ManageUsers = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-zinc-400 text-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-zinc-100">
          User Management
        </h1>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 
            rounded-lg px-4 py-2 text-sm text-zinc-200 
            focus:ring-2 focus:ring-amber-400 outline-none"
        />
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto rounded-xl 
        bg-zinc-900/70 backdrop-blur border border-zinc-800 shadow-md">

        <table className="w-full text-sm text-left text-zinc-300 min-w-[900px]">

          {/* TABLE HEAD */}
          <thead className="bg-zinc-800/70 text-zinc-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
              >
                <td className="px-6 py-4 font-semibold text-amber-400">
                  {user.username}
                </td>

                <td className="px-6 py-4 text-zinc-300">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      user.role === "seller"
                        ? "bg-purple-600/80 text-white"
                        : "bg-blue-600/80 text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-zinc-400 text-sm">
                  {user.address?.city
                    ? `${user.address.city}, ${user.address.country}`
                    : "N/A"}
                </td>

                <td className="px-6 py-4 text-zinc-400 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="rounded-lg border border-red-500 
                      text-red-500 px-4 py-1 text-sm 
                      hover:bg-red-500 hover:text-white 
                      transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* EMPTY STATE */}
      {filteredUsers.length === 0 && (
        <div className="text-center mt-8 text-zinc-500">
          No users found
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
