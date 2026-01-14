import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-black overflow-hidden">

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-wide text-white mb-6">
            Built for <span className="text-yellow-400">Performance</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            A premium gymwear brand engineered for discipline, strength,
            and relentless progress.
          </p>
        </motion.div>
      </section>

      <section className="py-28 bg-linear-to-br from-black via-neutral-700 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
          >
            <h2 className="lg:col-span-4 text-3xl md:text-4xl font-semibold text-white leading-tight">
              Redefining
              <br />
              <span className="text-yellow-400">Gym Apparel</span>
            </h2>

            <div className="lg:col-span-8 text-gray-300 text-lg leading-relaxed space-y-6">
              <p>
                Founded in 2026, our brand was created to eliminate noise
                and focus purely on training performance.
              </p>
              <p>
                Every piece is designed with intention — precision fit,
                premium fabrics, and zero distractions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-linear-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="uppercase tracking-widest text-sm text-yellow-400 mb-4">
              Core Philosophy
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-white">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Performance",
                text: "Optimized for strength, mobility, and high-intensity training.",
              },
              {
                title: "Discipline",
                text: "Designed for those who show up consistently, without excuses.",
              },
              {
                title: "Progress",
                text: "Built with a long-term mindset — evolution over hype.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-yellow-400/40 transition"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
          >
            <h2 className="lg:col-span-4 text-3xl md:text-4xl font-semibold text-white">
              Our Mission
            </h2>

            <div className="lg:col-span-8 text-gray-300 text-lg leading-relaxed space-y-6">
              <p>
                To craft gym apparel that sharpens focus, confidence,
                and physical performance.
              </p>
              <p>
                Every detail — from stitching to stretch — is designed
                to support your training journey.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-linear-to-b from-gray-900 to-black">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-widest text-sm text-yellow-400 mb-4">
              The Future
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
              Built for the Long Game
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We move forward with purpose — refining materials,
              improving performance, and staying true to discipline
              and progress.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
