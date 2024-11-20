import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "./hoc";

const PricingCard = React.memo(
  ({
    title,
    price,
    features,
    isPopular = false,
    buttonText = "Get Started",
  }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.9,
          delay: 0.2,
          ease: [0.43, 0.13, 0.23, 0.96], // Custom easing function for smoother motion
        },
      }}
      exit={{
        opacity: 0,
        y: 50,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      }}
      className={`relative backdrop-blur-lg bg-white/5 dark:bg-slate-800/90 p-8 rounded-2xl w-full max-w-sm mx-auto 
    border-2 border-secondary/20 hover:border-secondary transition-all duration-300
    ${
      isPopular
        ? "transform scale-105 border-secondary shadow-xl shadow-secondary/20 dark:shadow-secondary/40"
        : ""
    }
    hover:shadow-xl hover:shadow-secondary/20 dark:hover:shadow-secondary/40`}
    >
      <h3 className="text-[24px] text-white dark:text-slate-100 font-black text-center mb-4">
        {title}
      </h3>

      <div className="mt-4 text-center">
        <span className="text-[40px] text-secondary font-bold">${price}</span>
        {price !== "0" && !isNaN(price) && (
          <span className="text-white/70 dark:text-slate-300 ml-2">/month</span>
        )}
      </div>

      <ul className="mt-8 space-y-4">
        {features.map((feature: string, index: number) => (
          <li
            key={index}
            className="flex items-start space-x-3 text-black dark:text-slate-200"
          >
            <svg
              className="w-5 h-5 text-secondary mt-1 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 w-full py-4 px-8 rounded-xl font-bold transition-all duration-300
      ${
        isPopular
          ? "bg-secondary text-white hover:bg-secondary/80 hover:shadow-lg hover:shadow-secondary/40"
          : "bg-white/10 dark:bg-black/10 text-white dark:text-black hover:bg-secondary hover:text-white"
      }`}
      >
        {buttonText}
      </button>
    </motion.div>
  )
);

const Pricing = () => {
  const plans = [
    {
      title: "Basic",
      price: "0",
      features: [
        "AI chatbot for basic interactions",
        "Personalized responses based on preferences",
        "Basic analytics and insights",
        "Community support",
      ],
    },
    {
      title: "Premium",
      price: "9.99",
      isPopular: true,
      features: [
        "All features from Basic plan",
        "Advanced AI with enhanced responses",
        "Priority support 24/7",
        "Detailed analytics and reporting",
        "Custom bot personality",
      ],
    },
    {
      title: "Enterprise",
      price: "Contact",
      features: [
        "Custom AI model training",
        "Dedicated support team",
        "Advanced analytics and insights",
        "Custom integration options",
        "SLA guarantees",
      ],
      buttonText: "Contact Us",
    },
  ];

  return (
    <section className="relative w-full min-h-screen mx-auto">
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/5 via-transparent to-transparent" />

      <div className="mt-12 text-center">
        <h2 className="text-[30px] xs:text-[40px] sm:text-[50px] text-white dark:text-black font-black">
          Simple, transparent <span className="text-secondary">pricing</span>
        </h2>
        <p className="text-[16px] sm:text-[20px] text-white/70 dark:text-black/70 mt-4 max-w-2xl mx-auto">
          Choose the plan that's right for you. All plans include unlimited
          chatbot interactions.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div> */}
    </section>
  );
};

export default SectionWrapper(Pricing, "pricing");
