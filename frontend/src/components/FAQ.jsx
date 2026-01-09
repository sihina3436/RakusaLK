import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 4-5 business days. No international delivery at the moment. Express options are available at checkout.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes. Complimentary shipping is available on all orders over Rs. 25,000.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Once your order is dispatched, tracking details will be provided to you immediately.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "Returns are accepted within 30 days. Items must be unworn and in original condition.",
      },
      {
        question: "How do I exchange an item?",
        answer:
          "Initiate an exchange from your account dashboard. Exchanges are processed swiftly upon return receipt.",
      },
    ],
  },
  {
    category: "Products & Care",
    questions: [
      {
        question: "Are your products ethically sourced?",
        answer:
          "Yes. All materials are responsibly sourced and manufactured under ethical standards.",
      },
      {
        question: "How do I find my correct size?",
        answer:
          "Each product page includes a detailed size guide to help you choose the perfect fit.",
      },
    ],
  },
  {
    category: "Payments & Security",
    questions: [
      {
        question: "Which payment methods are accepted?",
        answer:
          "We accept all major cards, and secure online transfer options.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely. All transactions are encrypted using industry-grade SSL protection.",
      },
    ],
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <main className="bg-black text-white overflow-hidden">
    <Navbar />

      {/* HERO */}
      <section className="relative py-32 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_55%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto px-6"
        >
          <h1 className="font-serif text-4xl md:text-6xl tracking-[0.25em] uppercase mb-6">
            FAQ
          </h1>
          <p className="text-gray-400 text-sm">
            Everything you need to know about our products, orders, and services.
          </p>
        </motion.div>
      </section>

      {/* FAQ CONTENT */}
      <section className="max-w-4xl mx-auto px-6 pb-20 space-y-20">

        {faqData.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: categoryIndex * 0.1 }}
          >
            <h2 className="font-serif text-2xl text-yellow-500 mb-8 tracking-wide">
              {category.category}
            </h2>

            <div className="space-y-4">
              {category.questions.map((item, index) => {
                const isOpen = openItem === `${categoryIndex}-${index}`;

                return (
                  <div
                    key={index}
                    className="
                      backdrop-blur-xl
                      bg-white/5
                      border border-white/10
                      rounded-xl
                      overflow-hidden
                      transition-all
                      hover:border-yellow-500/40
                    "
                  >
                    <button
                      onClick={() =>
                        setOpenItem(isOpen ? null : `${categoryIndex}-${index}`)
                      }
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="text-sm md:text-base font-medium">
                        {item.question}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`text-yellow-500 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="relative py-18 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(234,179,8,0.15),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <h2 className="font-serif text-2xl mb-4">
            Still Need Assistance?
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Our support team is always ready to help.
          </p>

          <a
            href="/contact"
            className="
              inline-block
              px-10 py-3
              rounded-full
              bg-linear-to-r from-yellow-400 to-yellow-600
              text-black
              text-xs
              uppercase
              tracking-[0.25em]
              hover:brightness-110
              transition
            "
          >
            Contact Us
          </a>
        </motion.div>
      </section>
    <Footer />
    </main>
  );
};

export default FAQ;
