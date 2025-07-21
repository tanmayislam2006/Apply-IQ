import React from "react";
import { motion } from "framer-motion";
import HeorImage from "../../assets/hero.png"
const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Diagonal background accent */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            fill="#4FC3F7"
            fillOpacity="0.08"
            d="M0,0 L1440,0 L1440,600 C1000,700 400,700 0,600 Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto py-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-[#0D1B2A] mb-6">
            Job Hunting?  
            <br />
            <span className="text-primary">Stay organized, land faster.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#0D1B2A]/80 max-w-2xl mx-auto lg:mx-0 mb-8">
            ApplyIQ helps you manage job applications, optimize resumes with AI,
            track emails, and schedule interviews—all in one smart dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition duration-300 cursor-pointer">
              Start Free Trial
            </button>
            <button className="border border-primary text-primary hover:bg-primary/10 font-semibold px-6 py-3 rounded-full transition duration-300 cursor-pointer">
              See How It Works
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={HeorImage}
            alt="ApplyIQ Dashboard Preview"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-lg object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Floating down arrow */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <svg
          className="w-7 h-7 text-primary animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
