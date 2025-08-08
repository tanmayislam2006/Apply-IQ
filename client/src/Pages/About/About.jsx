import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Logo from "../../assets/logo.png";

const About = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Section with Logo and Mission */}
        <div>
          <img src={Logo} alt="ApplyIQ Logo" className="w-36 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-4">
            About ApplyIQ
          </h2>
          <p className="text-gray-700 text-lg font-openSans mb-6">
            ApplyIQ is your intelligent job search assistant that streamlines the
            application process from start to success. Our goal is to simplify how you
            apply, track, and win your dream job—with the help of smart tools and AI.
          </p>
          <ul className="space-y-3 text-gray-800 font-openSans">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-primary mt-1" /> Track every application with clarity
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-primary mt-1" /> Analyze your resume with AI insights
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-primary mt-1" /> Sync interviews with your calendar
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-primary mt-1" /> Stay productive with a Kanban job board
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-primary mt-1" /> Set goals, take notes, and celebrate progress
            </li>
          </ul>
        </div>

        {/* Right Section with Actual Image Preview */}
        <div>
          <img
            src=''
            alt="ApplyIQ App Preview"
            className="w-full max-w-lg mx-auto rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
