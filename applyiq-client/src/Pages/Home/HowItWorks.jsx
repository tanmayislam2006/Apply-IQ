import React from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaChartLine,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaClipboardList className="w-10 h-10 text-primary" />,
    title: "Add Job Listings",
    description:
      "Easily input job details—company name, role, status, deadline, and tags.",
  },
  {
    id: 2,
    icon: <FaChartLine className="w-10 h-10 text-primary" />,
    title: "Analyze Applications",
    description:
      "Use AI to compare your resume with job descriptions and get a match score.",
  },
  {
    id: 3,
    icon: <FaCalendarCheck className="w-10 h-10 text-primary" />,
    title: "Set Reminders",
    description:
      "Add interview dates and follow-up reminders synced with Google Calendar.",
  },
  {
    id: 4,
    icon: <FaCheckCircle className="w-10 h-10 text-primary" />,
    title: "Track Progress",
    description:
      "Manage all your applications in one place with a drag-and-drop Kanban view.",
  },
];

// Animation variants for staggered entrance
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      type: "spring",
    },
  }),
};

const HowItWorks = () => {
  return (
    <section className="bg-white py-16  ">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          ApplyIQ helps you stay in control of your job hunt in just a few smart steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 text-center"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
