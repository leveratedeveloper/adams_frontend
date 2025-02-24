"use client";

import { useState,useEffect } from "react";
import { ArrowRight, Send, LineChart, Users } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  {
    number: 1,
    title: "Submit your web/app",
    video:"video/step_1_adams.mp4",
    subtitle: "Your web/app will be categorized & analyzed by our system",
    description: "Your web/app will be categorized & analyzed by our system.",
    color: "bg-blue-500", // Color for active tab
    icon: <ArrowRight className="w-6 h-6 text-white" />, // Adding icon to each tab
  },
  {
    number: 2,
    title: "Get Result",
    video:"video/step_2_adams.mp4",
    subtitle: "Instant result by our machine learning & technology",
    description: "Instant result by our machine learning & technology.",
    color: "bg-green-500", // Color for active tab
    icon: <LineChart className="w-6 h-6 text-white" />, // Adding icon to each tab
  },
  {
    number: 3,
    title: "Consult with Us",
    video:"video/step_3_adams.mp4",
    subtitle: "Schedule an appointment with our consultant to get started",
    description: "Schedule an appointment with our consultant to get started.",
    color: "bg-purple-500", // Color for active tab
    icon: <Users className="w-6 h-6 text-white" />, // Adding icon to each tab
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const intervals = [7100, 6300, 11000]; // Different durations for each tab
  const videoWidth = "w-auto"
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Validate intervals array
    if (intervals.length !== tabs.length) {
      console.error("Intervals array length must match tabs array length.");
      return;
    }

    const handleTabSwitch = () => {
      setIsFading(true); // Start fading out

      setTimeout(() => {
        setActiveTab((prevTab) => (prevTab + 1) % tabs.length); // Switch to next tab
        setIsFading(false); // Fade back in
      }, 300); // Fade-out duration (matches CSS duration)
    };

    const timer = setTimeout(handleTabSwitch, intervals[activeTab]);

    return () => clearTimeout(timer); // Cleanup timer
  }, [activeTab, intervals, tabs.length]);
  return (
    <main id="how-it-works" className="py-9 rounded bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title with motion animation */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold px-12 py-8 text-left"
          style={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}
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
          <div className={`video-container transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}>
            {tabs.map((tab, index) => (
              <video
                key={index}
                src={tab.video}
                className={`rounded-lg shadow-lg transition-all duration-500 ${
                  activeTab === index ? "block" : "hidden"
                } ${videoWidth}`}
                autoPlay
                muted
              />
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
