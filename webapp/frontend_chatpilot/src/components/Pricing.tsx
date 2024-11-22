import React from "react";
import { motion } from "framer-motion";

const PricingCard = React.memo(
  ({
    title,
    price,
    features,
    isPopular = false,
    buttonText = "Get Started",
    link = "#",
  }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.9,
          delay: 0.2,
          ease: [0.43, 0.13, 0.23, 0.96],
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
      className={`relative backdrop-blur-lg bg-slate-800/90 dark:bg-white/5 p-8 rounded-2xl w-full max-w-sm mx-auto 
      flex flex-col justify-between h-full 
      border-2 border-black/20 hover:border-secondary transition-all duration-300
      ${
        isPopular
          ? "transform scale-105 border-secondary shadow-xl shadow-secondary/40"
          : ""
      }`}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-[24px] text-slate-100 dark:text-slate-900 font-black text-center mb-4">
          {title}
        </h3>

        <div className="text-center mb-8">
          <span className="text-[40px] text-secondary font-bold">${price}</span>
          {price !== "0" && !isNaN(price) && (
            <span className="text-slate-300 ml-2">/month</span>
          )}
        </div>

        <ul className="space-y-4 flex-grow">
          {features.map((feature: string, index: number) => (
            <li
              key={index}
              className="flex items-start space-x-3 text-slate-200 dark:text-black"
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
      </div>

      <button
        className={`mt-8 w-full py-4 px-8 rounded-xl font-bold transition-all duration-300 border-2 border-secondary
        ${
          isPopular
            ? "bg-secondary text-white hover:bg-secondary/80"
            : "bg-black/10 text-slate-200 dark:text-black hover:bg-secondary hover:text-white"
        }`}
        onClick={() => {
          window.location.href = link;
        }}
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
      link: "#contact",
    },
  ];

  return (
    <div className="relative w-full h-[1000px] bg-black dark:bg-white flex flex-col items-center overflow-hidden">
      <div className="absolute h-full inset-0 bg-gradient-to-r from-purple-600 dark:from-slate-600 opacity-15 dark:opacity-30 animate-[spin_8s_linear_infinite]"></div>
      <div id="pricing" className=" text-center">
        <h2 className=" pt-24 sm:pt-32 text-[30px] xs:text-[40px] sm:text-[50px] text-white dark:text-black font-black">
          Simple, transparent <span className="text-secondary">pricing</span>
        </h2>
        <p className="text-[16px] sm:text-[20px] text-white dark:text-black max-w-2xl mx-auto dark:text-black">
          Choose the plan that's right for you. All plans include unlimited
          chatbot interactions.
        </p>
      </div>

      <div className="pb-24 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 items-stretch">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
