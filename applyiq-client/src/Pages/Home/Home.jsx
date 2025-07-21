import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import FeaturesSection from "./FeaturesSection";
import ProductPreviewSection from "./ProductPreviewSection";
import WhoItsFor from "./WhoItsFor";
import CTASection from "./CTASection";
import OfferSection from "./OfferSection";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";

const Home = () => {
  return (
    <div>
      {/* 1. Strong headline, CTA, maybe animated preview */}
      <HeroSection />
      {/* 2. Simple 3-step explanation: Add > Analyze > Track */}
      <HowItWorks />
      {/* 3. Show off key functionality (Kanban, AI Resume, Email Tracker, etc.) */}
      <FeaturesSection />
      {/* 4. (NEW) Add screenshots or short video demo of actual UI */}
      <ProductPreviewSection />
      {/* 5. (NEW) Cards showing target personas: Grads, Switchers, Developers */}
      <WhoItsFor />
      {/* 6. (NEW) Midway CTA section: “Ready to take control of your job hunt?” */}
      <CTASection />
      {/* 7. Comparisons or why this is better than Trello/Notion */}
      <OfferSection />
      {/* 8. Free vs Pro plans (emphasize value of Pro tier) */}
      <Pricing />
      {/* 9. Social proof with user reviews and avatars */}
      <Testimonials />
      {/* 10. Common doubts, collapse-style accordion */}
      <FAQ />
    </div>
  );
};

export default Home;
