import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaExchangeAlt, FaLaptopCode, FaUserTie } from "react-icons/fa";

const audience = [
  {
    icon: <FaGraduationCap className="w-10 h-10 text-primary" />,
    title: "Recent Graduates",
    desc: "Just finished school and eager to kickstart your career.",
  },
  {
    icon: <FaExchangeAlt className="w-10 h-10 text-primary" />,
    title: "Career Switchers",
    desc: "Looking to transition into tech or a new industry.",
  },
  {
    icon: <FaLaptopCode className="w-10 h-10 text-primary" />,
    title: "Tech Professionals",
    desc: "Experienced pros wanting to level up their job search.",
  },
  {
    icon: <FaUserTie className="w-10 h-10 text-primary" />,
    title: "Hiring Managers",
    desc: "Hiring managers seeking efficient applicant tracking.",
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WhoItsFor = () => {
  return (
    <section className="py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#0D1B2A] text-center mb-12"
      >
        Who It’s For
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {audience.map((item, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-[#0D1B2A] mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhoItsFor;
