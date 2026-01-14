import { useState } from "react";
import {
  useCreateColorMutation,
  useGetAllColorsQuery,
} from "../../../../redux/color/colorApi";
import { toast } from "sonner";

const ManageColors = () => {
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  const { data: colors = [], isLoading } = useGetAllColorsQuery();
  const [createColor, { isLoading: isCreating }] =
    useCreateColorMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!colorName || !colorHex) {
      toast.error("Please provide both name and color");
      return;
    }

    try {
      await createColor({ name: colorName, hexCode: colorHex.toUpperCase() }).unwrap();
      toast.success("Color added!");
      setColorName("");
      setColorHex("#000000");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add color");
    }
  };

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    toast.success(`${hex} copied`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-zinc-100">Manage Colors</h1>

      {/* ADD COLOR */}
      <div className="mb-8 rounded-xl bg-zinc-900/70 backdrop-blur border border-zinc-800 p-4 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <input
            type="text"
            placeholder="Color name"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            className="flex-1 rounded-lg px-3 py-2 bg-zinc-800 border border-zinc-700 text-zinc-200 focus:ring-2 focus:ring-amber-400 outline-none"
          />

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={colorHex}
              onChange={(e) => setColorHex(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded-lg border border-zinc-700"
            />
            <span className="text-zinc-400 font-mono text-sm">
              {colorHex.toUpperCase()}
            </span>
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-zinc-900 hover:bg-amber-500 transition-all active:scale-95"
          >
            {isCreating ? "Saving..." : "Add"}
          </button>
        </form>
      </div>

      {/* COLORS GRID */}
      {isLoading ? (
        <p className="text-zinc-400">Loading colors...</p>
      ) : colors.length === 0 ? (
        <p className="text-zinc-400">No colors yet</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {colors.map((color) => (
            <div
              key={color._id}
              className="group flex flex-col items-center p-2 rounded-lg bg-zinc-800 border border-zinc-700 shadow-sm hover:shadow-md transition-all"
            >
              {/* Color Preview */}
              <div
                className="w-12 h-12 rounded-full border border-zinc-600 mb-2"
                style={{ backgroundColor: color.hexCode }}
              />

              {/* Name & Hex */}
              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-100 truncate">
                  {color.name}
                </p>
                <button
                  onClick={() => copyHex(color.hexCode)}
                  className="text-xs font-mono text-zinc-400 hover:text-amber-400 mt-1"
                >
                  {color.hexCode}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageColors;
