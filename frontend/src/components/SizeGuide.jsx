import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

// Custom Tabs components
const Tabs = ({ children, defaultValue }) => {
  const [active, setActive] = useState(defaultValue);
  return (
    <div>
      {children.map((child) =>
        child.type.displayName === "TabsList"
          ? { ...child, props: { ...child.props, active, setActive } }
          : child
      )}
    </div>
  );
};

const TabsList = ({ children, active, setActive }) => (
  <div className="flex gap-4 mb-8 justify-center">
    {children.map((child) =>
      child.type.displayName === "TabsTrigger"
        ? { ...child, props: { ...child.props, active, setActive } }
        : child
    )}
  </div>
);
TabsList.displayName = "TabsList";

const TabsTrigger = ({ value, children, active, setActive }) => {
  const isActive = active === value;
  return (
    <button
      onClick={() => setActive(value)}
      className={`px-6 py-3 uppercase tracking-wider font-serif rounded-md transition-all duration-300 transform ${
        isActive
          ? "bg-linear-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black shadow-lg scale-105"
          : "bg-black/20 text-gray-400 hover:bg-linear-to-r hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500 hover:text-black hover:scale-105"
      }`}
    >
      {children}
    </button>
  );
};
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ value, children, active }) => {
  if (active !== value) return null;
  return <div className="mt-10">{children}</div>;
};
TabsContent.displayName = "TabsContent";

const SizeGuide = () => {
  const womenSizes = [
    { size: "XS", us: "0-2", uk: "4-6", eu: "32-34", bust: "31-32", waist: "24-25", hips: "34-35" },
    { size: "S", us: "4-6", uk: "8-10", eu: "36-38", bust: "33-34", waist: "26-27", hips: "36-37" },
    { size: "M", us: "8-10", uk: "12-14", eu: "40-42", bust: "35-36", waist: "28-29", hips: "38-39" },
    { size: "L", us: "12-14", uk: "16-18", eu: "44-46", bust: "37-39", waist: "30-32", hips: "40-42" },
    { size: "XL", us: "16-18", uk: "20-22", eu: "48-50", bust: "40-42", waist: "33-35", hips: "43-45" },
  ];

  const menSizes = [
    { size: "S", us: "34-36", uk: "34-36", eu: "44-46", chest: "34-36", waist: "28-30" },
    { size: "M", us: "38-40", uk: "38-40", eu: "48-50", chest: "38-40", waist: "32-34" },
    { size: "L", us: "42-44", uk: "42-44", eu: "52-54", chest: "42-44", waist: "36-38" },
    { size: "XL", us: "46-48", uk: "46-48", eu: "56-58", chest: "46-48", waist: "40-42" },
    { size: "XXL", us: "50-52", uk: "50-52", eu: "60-62", chest: "50-52", waist: "44-46" },
  ];

  const steps = [
    { step: 1, title: "Bust/Chest", desc: "Measure around the fullest part of your bust/chest, keeping the tape parallel to the floor." },
    { step: 2, title: "Waist", desc: "Measure around your natural waistline, the narrowest part of your torso." },
    { step: 3, title: "Hips", desc: "Measure around the fullest part of your hips, approximately 8 inches below your waist." },
  ];

  return (
    <>
    <Navbar />
    <div className="bg-linear-to-br from-black via-neutral-900 to-black text-gray-300 font-sans">
      {/* Hero */}
      <section className="relative py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_55%)]" />
            <motion.div
          className="relative z-10 max-w-2xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
            >
          <h1 className="font-serif text-4xl md:text-6xl tracking-widest uppercase text-gradient bg-clip-text text-white mb-4">
            Size Guide
          </h1>
          <p className="text-gray-300 text-lg">
            Discover your perfect fit with our luxury sizing guide.
          </p>
            </motion.div>
      </section>

      {/* Tabs + Tables */}
      <section className="container max-w-6xl mx-auto px-6 pb-20">
        <Tabs defaultValue="women">

          {/* Women Table */}
          <TabsContent value="women" active="women">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="font-serif text-3xl text-yellow-500 mb-8 text-center">
                Women's Sizes
              </h3>
              <div className="overflow-x-auto rounded-2xl shadow-2xl border border-yellow-500">
                <table className="w-full text-left border-collapse text-gray-300">
                  <thead className="bg-black/60 text-yellow-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6">Size</th>
                      <th className="py-4 px-6">US</th>
                      <th className="py-4 px-6">UK</th>
                      <th className="py-4 px-6">EU</th>
                      <th className="py-4 px-6">Bust (in)</th>
                      <th className="py-4 px-6">Waist (in)</th>
                      <th className="py-4 px-6">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {womenSizes.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-yellow-500/50 hover:bg-yellow-500/10 transition-colors duration-300 cursor-pointer"
                      >
                        {Object.values(row).map((val, i) => (
                          <td key={i} className="py-4 px-6">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          {/* Men Table */}
          <TabsContent value="men" active="men">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="font-serif text-3xl text-yellow-500 mb-8 text-center">
                Men's Sizes
              </h3>
              <div className="overflow-x-auto rounded-2xl shadow-2xl border border-yellow-500">
                <table className="w-full text-left border-collapse text-gray-300">
                  <thead className="bg-black/60 text-yellow-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6">Size</th>
                      <th className="py-4 px-6">US</th>
                      <th className="py-4 px-6">UK</th>
                      <th className="py-4 px-6">EU</th>
                      <th className="py-4 px-6">Chest (in)</th>
                      <th className="py-4 px-6">Waist (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menSizes.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-yellow-500/50 hover:bg-yellow-500/10 transition-colors duration-300 cursor-pointer"
                      >
                        {Object.values(row).map((val, i) => (
                          <td key={i} className="py-4 px-6">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* How to Measure */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="font-serif text-4xl text-yellow-500 text-center mb-12 uppercase tracking-wide">
            How to Measure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-black/30 border border-yellow-500 rounded-2xl shadow-2xl p-8 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-yellow-500 via-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
                  <span className="text-black font-serif text-2xl">{item.step}</span>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-yellow-500">{item.title}</h4>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sizing Tips */}
        <motion.div
          className="mt-20 bg-black/70 border border-yellow-500 rounded-2xl shadow-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="font-serif text-3xl text-yellow-500 mb-6">Sizing Tips</h3>
          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li>If you're between sizes, we recommend sizing up for a more comfortable fit.</li>
            <li>Measure yourself wearing undergarments similar to what you'd wear with the garment.</li>
            <li>Have someone help you take measurements for accuracy.</li>
            <li>Check individual product pages for specific fit notes.</li>
          </ul>
        </motion.div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default SizeGuide;
