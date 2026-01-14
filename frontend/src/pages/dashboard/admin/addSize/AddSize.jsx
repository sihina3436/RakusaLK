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
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">
          Manage Sizes
        </h1>

        {/* Create Size */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-yellow-500/30 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-yellow-400">
            Create New Size
          </h2>

          <input
            type="text"
            placeholder="Enter size (ex: S, M, L, XL)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black border border-yellow-500/40 
                       focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            type="submit"
            disabled={creating}
            className="w-full py-3 rounded-xl font-semibold
                       bg-yellow-500 text-black hover:bg-yellow-400
                       transition disabled:opacity-50"
          >
            {creating ? "Creating..." : "Add Size"}
          </button>
        </form>

        {/* Size List */}
        <div className="bg-zinc-900 border border-yellow-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Available Sizes
          </h2>

          {isLoading && (
            <p className="text-gray-400">Loading sizes...</p>
          )}

          {isError && (
            <p className="text-red-500">Failed to load sizes</p>
          )}

          {!isLoading && sizes.length === 0 && (
            <p className="text-gray-400">No sizes available</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {sizes.map((size) => (
              <div
                key={size._id}
                className="flex items-center justify-center
                           border border-yellow-500/40
                           rounded-xl py-3 font-semibold
                           text-yellow-400 bg-black"
              >
                {size.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSize;
