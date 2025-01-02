"use client";

import { useState } from "react";
import { ArrowRight, Send, LineChart, Users } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  {
    number: 1,
    title: "Submit your web/app",
    subtitle: "Your web/app will be categorized & analyzed by our system",
    description: "Your web/app will be categorized & analyzed by our system.",
    color: "bg-blue-500", // Color for active tab
    icon: <ArrowRight className="w-6 h-6 text-white" />, // Adding icon to each tab
  },
  {
    number: 2,
    title: "Get Result",
    subtitle: "Instant result by our machine learning & technology",
    description: "Instant result by our machine learning & technology.",
    color: "bg-green-500", // Color for active tab
    icon: <LineChart className="w-6 h-6 text-white" />, // Adding icon to each tab
  },
  {
    number: 3,
    title: "Consult with Us",
    subtitle: "Schedule an appointment with our consultant to get started",
    description: "Schedule an appointment with our consultant to get started.",
    color: "bg-purple-500", // Color for active tab
    icon: <Users className="w-6 h-6 text-white" />, // Adding icon to each tab
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main id="how-it-works" className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title with motion animation */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold px-12 py-12 text-center"
        >
          How It Works
        </motion.h2>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row px-12 mb-3 space-y-4 sm:space-y-0 sm:space-x-4 sm:border-b sm:border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex flex-col items-center gap-1 px-6 py-3 text-lg font-medium relative transition duration-300 border-b-4 border-transparent sm:hover:border-gray-400`}
            >
              {/* Number with icon */}
              <span
                className={`absolute w-8 h-8 flex items-center justify-center font-bold text-white rounded-full ${
                  activeTab === index ? tab.color : "bg-gray-300 text-gray-600"
                } -left-4 sm:left-0`}
              >
                {tab.number}
              </span>
              <span className="flex items-center">{tab.title}</span>
              {/* Subtitle */}
              <span className="flex items-center text-sm text-gray-500">{tab.subtitle}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab} // Ensure content updates with tab change
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="px-12 rounded-lg"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">{tabs[activeTab].title}</h3>
          <p className="text-gray-600">{tabs[activeTab].description}</p>
        </motion.div>
      </div>
    </main>
  );
}
