import React from "react";
import { Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import FAQimage from "../../assets/FAQ.png"
const faqs = [
  {
    question: "What is ApplyIQ?",
    answer:
      "ApplyIQ is a smart job application tracker that helps you organize, analyze, and optimize your job hunt all in one place.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! ApplyIQ offers a 7-day free trial with full access to Pro features. No credit card required to get started.",
  },
  {
    question: "How does the AI resume analysis work?",
    answer:
      "Our AI analyzes your resume against job listings and provides match scores plus personalized improvement tips to increase your chances.",
  },
  {
    question: "Can I sync interviews with my calendar?",
    answer:
      "Absolutely! ApplyIQ integrates with Google Calendar so you can schedule interviews and get reminders seamlessly.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use advanced encryption and follow industry best practices to keep your job search data safe and private.",
  },
  {
    question: "Do I need technical skills to use ApplyIQ?",
    answer:
      "No! ApplyIQ is designed for everyone with an intuitive interface that requires no special technical knowledge.",
  },
  {
    question: "How can I get support if I have questions?",
    answer:
      "You can reach out anytime via our in-app chat support or email. We're here to help you succeed in your job search!",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 px-6 border-t border-primary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat  mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg font-openSans opacity-90 max-w-2xl mx-auto">
            Answers to common questions about how ApplyIQ helps your job search.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <div className="border border-primary/10 rounded-xl overflow-hidden">
                    <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 bg-white hover:bg-primary/5 transition font-semibold text-left font-montserrat text-primary cursor-pointer">
                      <span>{faq.question}</span>
                      <FiChevronDown
                        className={`transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                        size={24}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 py-4 bg-primary/5 font-openSans opacity-90">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <img
              src={FAQimage}
              alt="FAQs illustration"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg animate-fade-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
