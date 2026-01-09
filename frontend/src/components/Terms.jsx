import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.6, ease: "easeOut" },
  }),
};

const Terms = () => {

  return (
    <>
    <Navbar />
      <section className="relative bg-black overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_60%)]" />
        <div className="container-luxury relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl text-white tracking-[0.2em] uppercase mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-400 text-sm tracking-wide">
              Last updated · January 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-black pb-24 pt-10 flex justify-center">
            <div className="container-luxury w-full max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="
              relative
              rounded-3xl
              bg-white/5
              backdrop-blur-xl
              border border-yellow-400/20
              shadow-[0_0_60px_rgba(255,215,0,0.08)]
              px-8 md:px-14
              py-14
            "
          >
            <div className="space-y-12 text-gray-300 leading-relaxed">

              {[
                ["Agreement to Terms",
                  "By accessing and using the Rakuza website and services, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately."
                ],
                ["Use of Website",
                  "You agree to use our website lawfully and responsibly. Any misuse, unauthorized access attempts, or interference with functionality is strictly prohibited."
                ],
                ["Account Registration",
                  "You are responsible for safeguarding your account credentials and ensuring that all provided information remains accurate and up to date."
                ],
                ["Products and Pricing",
                  "While we strive for accuracy, Rakuza reserves the right to correct errors, update pricing, and modify product information without prior notice."
                ],
                ["Orders and Payment",
                  "All orders are subject to acceptance. Payments must be completed in full prior to order processing using our secure checkout system."
                ],
                ["Intellectual Property",
                  "All materials on this website are the exclusive property of Rakuza and are protected under applicable intellectual property laws."
                ],
                ["Limitation of Liability",
                  "Rakuza shall not be liable for indirect, incidental, or consequential damages arising from the use of our services."
                ],
                ["Governing Law",
                  "These Terms are governed by the laws of Italy, without regard to conflict of law principles."
                ],
                ["Changes to Terms",
                  "We reserve the right to amend these Terms at any time. Continued use signifies acceptance of updates."
                ],
              ].map(([title, text], index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  className="group"
                >
                  <h2 className="font-serif text-xl text-yellow-400 mb-3 group-hover:text-yellow-300 transition">
                    {index + 1}. {title}
                  </h2>
                  <p className="text-gray-400">{text}</p>
                </motion.div>
              ))}

              {/* CONTACT */}
              <motion.div variants={fadeUp}>
                <h2 className="font-serif text-xl text-yellow-400 mb-3">
                  10. Contact
                </h2>
                <p className="text-gray-400">
                  For inquiries regarding these Terms, please contact{" "}
                  <a
                    href="mailto:legal@rakuza.com"
                    className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 transition"
                  >
                    info@rakuza.com
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    <Footer />
    </>
  );
};

export default Terms;
