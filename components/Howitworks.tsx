"use client";

import { useState } from "react";
import { ArrowRight, Send, LineChart, Users } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
    {
      number: 1,
      title: "Submit your web/app",
      subtitle: "Your web/app will be categorized & analyzed by our system",
      description:
        "Your web/app will be categorized & analyzed by our system.",
      color: "bg-blue-500", 
    },
    {
      number: 2,
      title: "Get Result",
      subtitle: "Your web/app will be categorized & analyzed by our system",
      description:
        "Instant result by our machine learning & technology",
      color: "bg-blue-500", 
    },
    {
      number: 3,
      title: "Consult with Us",
      subtitle: "Your web/app will be categorized & analyzed by our system",
      description:
        "Schedule an appointment with our consultant to get started",
      color: "bg-blue-500", 
    },
  ];
  

export default function HowItWorks() {
    const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold px-12 py-12 "
        >
          How It Works
        </motion.h2>

        {/* Tab Navigation */}
        {/* Tab Navigation */}
        <div className="flex px-12 mb-3">
        <div className="flex space-x-4 border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col items-center gap-1 px-6 py-3 text-lg font-medium relative transition duration-300 border-b-4 border-transparent`}
              >
                {/* Number behind text */}
                <span
                  className={`absolute w-6 h-6 flex items-center justify-center font-bold text-white ${
                    activeTab === index ? tab.color : "bg-gray-300 text-gray-600"
                  } border border-gray-300 left-8`}
                >
                  {tab.number}
                </span>
                <span className="flex items-center">{tab.title}</span>
                {/* Title */}
               
                {/* Subtitle */}
                <span className="flex items-center text-sm text-gray-500">{tab.subtitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-12 rounded-lg ">
          <h3 className="text-2xl font-bold mb-4">
            Video
          </h3>
          <p className="text-gray-600">{tabs[activeTab].description}</p>
        </div>
      </div>
    </section>
  );
}
