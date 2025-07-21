import React from "react";
import ContactImage from "../../assets/conatct.png"; // Assuming you have a contact image
const Contact = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-montserrat">
            Let's Connect!
          </h2>
          <p className="text-gray-700 font-openSans mb-8">
            Have questions, feedback, or just want to say hello? Drop us a message and we’ll get back to you shortly.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-primary">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-primary">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-primary">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="bg-primary cursor-pointer text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Image or Illustration */}
        <div className="hidden md:block">
          <img
            src={ContactImage}
            alt="Contact Illustration"
            className="w-full max-w-lg mx-auto animate-fade-in"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
