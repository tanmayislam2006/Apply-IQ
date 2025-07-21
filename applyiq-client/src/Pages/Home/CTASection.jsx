import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="bg-primary/10 py-12  rounded-xl text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-4xl font-extrabold text-primary mb-6"
      >
        Ready to take control of your job hunt?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto"
      >
        Join thousands of ApplyIQ users who land more interviews, faster and smarter.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-center gap-6"
      >
        <button
          href="/signup"
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-primary-dark transition"
        >
          Get Started Free
        </button>
        <button
          href="/learn-more"
          className="inline-block border border-primary text-primary px-6 py-2 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition"
        >
          Learn More
        </button>
      </motion.div>
    </section>
  );
};

export default CTASection;
