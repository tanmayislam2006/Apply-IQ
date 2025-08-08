import React from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "per month",
    features: [
      "Track up to 10 jobs",
      "Basic resume storage",
      "Email reminders",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Basic",
    price: "$9",
    period: "per month",
    features: [
      "Track 50 jobs",
      "Multiple resumes",
      "AI resume scoring",
      "Email tracking",
    ],
    cta: "Choose Basic",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    features: [
      "Unlimited jobs",
      "AI resume tips",
      "Google Calendar sync",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    period: "",
    features: [
      "Team collaboration",
      "Custom integrations",
      "Dedicated manager",
      "SLA & priority support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Pricing = () => {
  return (
    <section className="py-20">
      <motion.h2
        className="text-4xl font-extrabold text-[#0D1B2A] text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Choose the Plan That Fits You
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            custom={idx}
            variants={cardVariants}
            className={`bg-white rounded-xl p-6 flex flex-col justify-between shadow-md transition
              ${
                plan.highlighted
                  ? "border-2 border-primary shadow-xl scale-105"
                  : "border border-gray-200"
              }
              hover:shadow-xl
            `}
          >
            <div>
              <h3 className="text-2xl font-semibold text-[#0D1B2A] mb-3 text-center">
                {plan.name}
              </h3>
              <div className="text-center mb-5">
                <span className="text-3xl font-extrabold text-primary">{plan.price}</span>
                <span className="text-sm text-gray-600 ml-1">{plan.period}</span>
              </div>
              <ul className="mb-6 space-y-2 text-gray-700 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="before:content-['✓'] before:text-primary before:mr-2">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full cursor-pointer py-2 rounded-lg font-semibold transition text-sm
                ${
                  plan.highlighted
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Pricing;
