import React from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaFileAlt,
  FaBrain,
  FaEnvelopeOpenText,
  FaCalendarAlt,
  FaChartPie,
  FaUserTie,
  FaBullseye,
  FaArrowDown,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaClipboardList className="w-7 h-7 text-primary" />,
    title: "Add Job Listings",
    desc: "Enter company, title, job link, location, and status details easily.",
  },
  {
    icon: <FaFileAlt className="w-7 h-7 text-primary" />,
    title: "Attach Resumes",
    desc: "Upload and version multiple resumes for different job types.",
  },
  {
    icon: <FaBrain className="w-7 h-7 text-primary" />,
    title: "Analyze with AI",
    desc: "Get real-time match scores and improvement tips for your resume.",
  },
  {
    icon: <FaEnvelopeOpenText className="w-7 h-7 text-primary" />,
    title: "Link Emails",
    desc: "Track email replies and set follow-up reminders inside the app.",
  },
  {
    icon: <FaCalendarAlt className="w-7 h-7 text-primary" />,
    title: "Set Interviews",
    desc: "Schedule interviews and tasks synced with your Google Calendar.",
  },
  {
    icon: <FaChartPie className="w-7 h-7 text-primary" />,
    title: "View Analytics",
    desc: "Monitor application progress, response rates, and success metrics.",
  },
  {
    icon: <FaUserTie className="w-7 h-7 text-primary" />,
    title: "Take Notes",
    desc: "Record interview notes and prep answers in a dedicated section.",
  },
  {
    icon: <FaBullseye className="w-7 h-7 text-primary" />,
    title: "Achieve Goals",
    desc: "ApplyIQ helps you land more interviews, faster and smarter.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProductPreviewSection = () => {
  // Split steps into two arrays
  const leftSteps = steps.slice(0, 4);
  const rightSteps = steps.slice(4, 8);

  const renderStep = (step, index) => (
    <motion.div
      key={index}
      variants={cardVariants}
      className="w-full bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow p-6 text-center sm:text-left flex flex-col sm:flex-row items-center gap-5"
    >
      <div className="shrink-0">{step.icon}</div>
      <div>
        <h4 className="text-lg font-semibold text-[#0D1B2A] mb-1">{step.title}</h4>
        <p className="text-sm text-gray-600">{step.desc}</p>
      </div>
    </motion.div>
  );


  return (
    <section className="bg-white py-20 ">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
          See ApplyIQ in Action
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Here's how ApplyIQ guides your job journey—step-by-step.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {leftSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              {renderStep(step, idx)}
              {idx !== leftSteps.length - 1 && (
                <FaArrowDown
                  className="text-primary w-5 h-5 mx-auto my-3 animate-bounce"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Right Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {rightSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              {renderStep(step, idx)}
              {idx !== rightSteps.length - 1 && (
                <FaArrowDown
                  className="text-primary w-5 h-5 mx-auto my-3 animate-bounce"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPreviewSection;
