import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, Share2, Instagram, Facebook} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <main className="bg-black text-white">

      <section className="relative py-32 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.15),transparent_55%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto px-6"
        >
          <h1 className="font-serif text-4xl md:text-6xl tracking-[0.25em] uppercase mb-6">
            Contact Us
          </h1>
          <p className="text-gray-400 text-sm">
            We'd love to hear from you. Reach out with any questions or inquiries.
          </p>
        </motion.div>
      </section>

      {/* Contact Info & Form */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <h2 className="font-serif text-2xl text-yellow-500 mb-6">Get in Touch</h2>

          <div className="space-y-8">
            {[
              {
                icon: <Share2 className="w-5 h-5 text-yellow-500" />,
                title: "Follow Us On",
                description: (
                  <div className="flex flex-wrap gap-3 items-center text-sm text-gray-400">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-yellow-500 transition"
                    >
                      <Instagram className="w-5 h-5 inline-block" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-yellow-500 transition"
                    >
                      <Facebook className="w-5 h-5 inline-block" />
                    </a>
                  </div>
                ),
              },

              {
                icon: <Phone className="w-5 h-5 text-yellow-500" />,
                title: "Contact Us",
                description: "+94 74 234 5678",
              },
              {
                icon: <Mail className="w-5 h-5 text-yellow-500" />,
                title: "Email Us",
                description: "contact@rakuza.com",
              },
              {
                icon: <Clock className="w-5 h-5 text-yellow-500" />,
                title: "Hours",
                description: "Mon-Fri: 9am - 7pm | Sat: 10am - 6pm | Sun: Closed",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-500/10 flex items-center justify-center rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-2xl text-yellow-500 mb-6">Send a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 outline-none transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 outline-none transition"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 outline-none transition"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 outline-none transition resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-linear-to-r from-yellow-400 to-yellow-600 text-black uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
};

export default Contact;