import { motion } from "framer-motion";
import { Truck, Clock, Globe, Package } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Shipping = () => {

  const shippingOptions = [
    {
      icon: Truck,
      title: "Standard Shipping",
      description: "5–7 Business Days",
      price: "Free over RS.50000",
    },
    {
      icon: Clock,
      title: "Express Shipping",
      description: "2–3 Business Days",
      price: "RS.300",
    },
    {
      icon: Package,
      title: "Next Day Delivery",
      description: "Order before 2 PM",
      price: "RS.450",
    },
  ];

  return (
    <>
    <Navbar />
      {/* Hero */}
      <section className="relative bg-black pt-32  px-6 md:px-12 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.15),transparent_60%)]">
        <div className="absolute inset-0 bg-linear-to-b from-yellow-500/10 via-transparent to-black" />

        <div className="relative max-w-4xl mx-auto text-center ">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl md:text-5xl tracking-[0.2em] uppercase text-white mb-6"
          >
            Shipping & Returns
          </motion.h1>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed px-4">
            A seamless delivery and return experience crafted with precision,
            care, and luxury.
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="bg-black py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-center font-serif text-3xl text-yellow-500 mb-20 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Shipping Options
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {shippingOptions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative rounded-2xl border border-yellow-500/20 bg-white/5 backdrop-blur-xl px-8 py-10 text-center shadow-lg hover:shadow-yellow-500/20 transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-500/10">
                  <item.icon className="w-7 h-7 text-yellow-500" />
                </div>

                <h3 className="text-white font-medium mb-3 tracking-wide">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm mb-3">
                  {item.description}
                </p>

                <p className="text-yellow-500 text-sm font-semibold">
                  {item.price}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="bg-black px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-2xl text-yellow-500 mb-6">
              Delivery Information
            </h3>

            <ul className="space-y-4 text-gray-400 leading-relaxed pl-2">
              <li>• Orders processed within 1–2 business days</li>
              <li>• Tracking details emailed once shipped</li>
              <li>• Signature required for high-value orders</li>
              <li>• Dispatch Monday to Friday</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-2xl text-yellow-500 mb-6">
              International Orders
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Curently We do not ship worldwide. Will notify the customer when international shipping is available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Returns */}
      <section className="bg-black py-28 px-6 md:px-12 bg-[radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.15),transparent_50%)]">
        <div className="max-w-4xl mx-auto ">
          <motion.h2
            className="text-center font-serif text-3xl text-yellow-500 mb-20 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Returns Policy
          </motion.h2>

          <motion.div
            className="space-y-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-serif text-xl text-white mb-4">
                30-Day Complimentary Returns
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Returns accepted within 30 days of delivery. Items must be
                unused, unwashed, and returned in original condition.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-white mb-4">
                How to Initiate a Return
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Contact our customer service team via email or phone to initiate the return process. We will provide a prepaid return
                label for your convenience.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-white mb-4">
                Non-Returnable Items
              </h3>
              <ul className="space-y-2 text-gray-400 pl-2">
                <li>• Final sale items</li>
                <li>• Personalized products</li>
                <li>• Undergarments</li>
                <li>• Altered or damaged items</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    <Footer />
    </>
  );
};

export default Shipping;
