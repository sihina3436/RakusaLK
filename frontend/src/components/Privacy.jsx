import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ShieldCheck, Lock, FileText, UserCheck } from "lucide-react";

const sections = [
  { id: "collect", title: "Information We Collect", icon: FileText },
  { id: "use", title: "How We Use Your Information", icon: UserCheck },
  { id: "share", title: "Information Sharing", icon: ShieldCheck },
  { id: "security", title: "Data Security", icon: Lock },
];

const Privacy = () => {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-black pt-36 pb-24 px-6 text-center">
        <div className="absolute inset-0 bg-linear-to-b from-yellow-500/10 via-transparent to-black" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl md:text-5xl tracking-[0.25em] uppercase text-white mb-4"
        >
          Privacy Policy
        </motion.h1>
        <p className="text-gray-400 text-sm">Last updated: January 2024</p>
      </section>

      {/* Content */}
      <section className="bg-black px-6 md:px-12 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-16">

          {/* Sticky Navigation */}
          <aside className="hidden lg:block sticky top-36 h-fit">
            <ul className="space-y-6 border-l border-yellow-500/20 pl-6">
              {sections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-yellow-500 transition"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Text */}
          <div className="lg:col-span-3 space-y-20">

            {/* Section */}
            <motion.section
              id="collect"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AnimatedIcon Icon={FileText} />
              <h2 className=" text-yellow-500 mb-4">Information We Collect</h2>
              <p className="text-white text-sm leading-relaxed space-y-3">
                We collect information you provide when creating an account,
                placing orders, subscribing to communications, or contacting support.
              </p>
              <ul className="list-disc pl-6 text-white text-sm leading-relaxed space-y-3">
                <li>Name, email, phone number, and address</li>
                <li>Securely processed payment details</li>
                <li>Account credentials and order history</li>
                <li>Customer support communications</li>
              </ul>
            </motion.section>

            <motion.section
              id="use"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AnimatedIcon Icon={UserCheck} />
              <h2 className=" text-yellow-500 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-white text-sm leading-relaxed space-y-3">
                <li>Process and fulfill orders</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (with consent)</li>
                <li>Improve services and prevent fraud</li>
              </ul>
            </motion.section>

            <motion.section
              id="share"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AnimatedIcon Icon={ShieldCheck} />
              <h2 className=" text-yellow-500 mb-4">Information Sharing</h2>
              <p className="text-white text-sm leading-relaxed space-y-3">
                We do not sell personal data. Information may be shared only with
                trusted service providers, legal authorities, or during business
                transfers.
              </p>
            </motion.section>

            <motion.section
              id="security"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AnimatedIcon Icon={Lock} />
              <h2 className=" text-yellow-500 mb-4">Data Security</h2>
              <p className="text-white text-sm leading-relaxed space-y-3">
                We use industry-standard encryption and security practices.
                However, no digital transmission is completely secure.
              </p>
            </motion.section>

            {/* Contact */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className=" text-yellow-500 mb-4">Contact Us</h2>
              <p className="text-white text-sm leading-relaxed space-y-3">
                Questions regarding privacy can be sent to{" "}
                <a
                  href="mailto:info@rakuza.com"
                  className="text-yellow-500 hover:underline"
                >
                  info@rakuza.com
                </a>
              </p>
            </motion.section>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Privacy;

/* ---------- Helper Components ---------- */

const AnimatedIcon = ({ Icon }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="mb-6"
  >
    <Icon className="w-7 h-7 text-yellow-500" />
  </motion.div>
);
