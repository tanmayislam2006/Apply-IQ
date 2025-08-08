import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  "AI-powered resume analysis and tips",
  "Integrated email tracking & reminders",
  "Google Calendar synced interview scheduling",
  "Job application analytics & insights",
  "Customizable Kanban workflow tailored for job search",
];

const OfferSection = () => {
  return (
    <section className="bg-white py-10 ">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-[#0D1B2A] text-center mb-8"
      >
        Why Choose ApplyIQ Over Trello or Notion?
      </motion.h2>

      <motion.div
        className="flex flex-col md:flex-row gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {/* Features List */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
          }}
          className="flex-1 bg-gray-50 p-8 rounded-xl shadow-md"
        >
          <h3 className="text-2xl font-semibold mb-6 text-primary">Built Specifically for Job Seekers</h3>
          <ul className="space-y-4 text-gray-700 text-lg">
            {benefits.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
          }}
          className="flex-1 bg-white border border-gray-200 rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold mb-6 text-primary text-center">
            Feature Comparison
          </h3>

          <table className="w-full text-left text-gray-700">
            <thead>
              <tr>
                <th className="pb-3 font-semibold">Feature</th>
                <th className="pb-3 font-semibold text-center">ApplyIQ</th>
                <th className="pb-3 font-semibold text-center">Trello</th>
                <th className="pb-3 font-semibold text-center">Notion</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "AI Resume Analysis", applyiq: true, trello: false, notion: false },
                { feature: "Email Tracking & Reminders", applyiq: true, trello: false, notion: false },
                { feature: "Google Calendar Sync", applyiq: true, trello: false, notion: false },
                { feature: "Job-specific Kanban Workflow", applyiq: true, trello: true, notion: true },
                { feature: "Application Analytics & Insights", applyiq: true, trello: false, notion: false },
              ].map(({ feature, applyiq, trello, notion }, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="py-3">{feature}</td>
                  <td className="text-center">
                    {applyiq ? (
                      <FaCheckCircle className="inline-block text-green-500 w-6 h-6" />
                    ) : (
                      <FaTimesCircle className="inline-block text-red-500 w-6 h-6" />
                    )}
                  </td>
                  <td className="text-center">
                    {trello ? (
                      <FaCheckCircle className="inline-block text-green-500 w-6 h-6" />
                    ) : (
                      <FaTimesCircle className="inline-block text-red-500 w-6 h-6" />
                    )}
                  </td>
                  <td className="text-center">
                    {notion ? (
                      <FaCheckCircle className="inline-block text-green-500 w-6 h-6" />
                    ) : (
                      <FaTimesCircle className="inline-block text-red-500 w-6 h-6" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      {/* Offer Card below */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 bg-primary/20 p-4 rounded-lg text-center max-w-3xl mx-auto shadow-lg"
      >
        <p className="text-xl font-semibold text-primary mb-2">
          Start your 7-day free trial today!
        </p>
        <p className="text-gray-700 mb-6">
          No credit card required, full access to Pro features.
        </p>
        <button
      
          className="cursor-pointer bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Try ApplyIQ Pro Free
        </button>
      </motion.div>
    </section>
  );
};

export default OfferSection;
