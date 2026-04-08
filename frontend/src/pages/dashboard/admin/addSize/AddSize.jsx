import { useState } from "react";
import {
  useCreateSizeMutation,
  useGetAllSizesQuery,
} from "../../../../redux/size/sizeAPI";
import { toast } from "sonner";

const AddSize = () => {
  const [name, setName] = useState("");

  const { data: sizes = [], isLoading, isError } = useGetAllSizesQuery();
  const [createSize, { isLoading: creating }] = useCreateSizeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Size name is required");
      return;
    }

    try {
      await createSize({ name }).unwrap();
      toast.success("Size created successfully");
      setName("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create size");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-zinc-100">
        Manage Sizes
      </h1>

      {/* ADD SIZE */}
      <div className="mb-8 rounded-xl bg-zinc-900/70 backdrop-blur border border-zinc-800 p-4 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <input
            type="text"
            placeholder="Size name (S, M, L, XL)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-lg px-3 py-2 bg-zinc-800 border border-zinc-700 text-zinc-200 focus:ring-2 focus:ring-amber-400 outline-none"
          />

          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-zinc-900 hover:bg-amber-500 transition-all active:scale-95"
          >
            {creating ? "Saving..." : "Add"}
          </button>
        </form>
      </div>

      {/* SIZES GRID */}
      {isLoading ? (
        <p className="text-zinc-400">Loading sizes...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load sizes</p>
      ) : sizes.length === 0 ? (
        <p className="text-zinc-400">No sizes yet</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sizes.map((size) => (
            <div
              key={size._id}
              className="group flex items-center justify-center p-3 rounded-lg bg-zinc-800 border border-zinc-700 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-sm font-semibold text-zinc-100">
                {size.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddSize;
