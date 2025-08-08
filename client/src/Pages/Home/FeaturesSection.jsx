import React from "react";
import { motion } from "framer-motion";
import {
  FaTasks,
  FaFileAlt,
  FaBrain,
  FaEnvelopeOpenText,
} from "react-icons/fa";

const features = [
  {
    icon: <FaTasks className="text-primary w-7 h-7" />,
    title: "Kanban Job Tracker",
    description: "Organize applications using a visual drag-and-drop board.",
  },
  {
    icon: <FaFileAlt className="text-primary w-7 h-7" />,
    title: "Resume Versioning",
    description: "Attach tailored resumes to each job application.",
  },
  {
    icon: <FaBrain className="text-primary w-7 h-7" />,
    title: "AI Resume Analyzer",
    description: "Instantly see how well your resume matches a job post.",
  },
  {
    icon: <FaEnvelopeOpenText className="text-primary w-7 h-7" />,
    title: "Email Tracking",
    description: "Monitor interview emails and set follow-up reminders.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
    },
  }),
};

const FeaturesSection = () => {
  return (
    <section className="bg-white py-20">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
          Everything You Need for Smarter Job Tracking
        </h2>
        <p className="text-gray-600 mt-4 text-base md:text-lg max-w-2xl mx-auto">
          ApplyIQ helps you manage your job applications like a pro—streamlined, smart, and simple.
        </p>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-10">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 flex justify-center items-center"
        >
          <img
            src="https://i.ibb.co/gMpCn7X3/banner-image.jpg"
            alt="Job Tracker Dashboard"
            className="w-full max-w-xl rounded-xl shadow-lg object-cover h-full"
          />
        </motion.div>

        {/* Right: Feature Cards */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="flex items-start gap-4 bg-gray-50 hover:bg-gray-100 p-5 rounded-xl shadow-sm transition duration-300"
            >
              <div className="mt-1">{feature.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-[#0D1B2A] mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
