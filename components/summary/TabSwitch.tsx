'use client';

import React, { useState } from "react";
import KeywordTable from '@/components/summary/KeywordTable';

const TabSwitch = () => {
  const [activeTab, setActiveTab] = useState("appStore");

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex space-x-4">
        <button
          className={`flex items-center px-4 py-2 rounded-full border ${
            activeTab === "appStore" ? "bg-blue-500 text-white" : "border-black text-black"
          }`}
          onClick={() => setActiveTab("appStore")}
        >
          <img src="img/icon/Apps_Store_Icon_Logo.svg" alt="App Store" className="w-6 h-6 mr-2" />
          App Store
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-full border ${
            activeTab === "playStore" ? "bg-blue-500 text-white" : "border-black text-black"
          }`}
          onClick={() => setActiveTab("playStore")}
        >
          <img src="img/icon/Google_Play_Icon_Logo.svg" alt="Play Store" className="w-6 h-6 mr-2" />
          Play Store
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "appStore" && (
          <div>
            <h3 className="text-lg font-semibold">App Store</h3>
            {/* <p>Download the app from the App Store to enjoy great features.</p> */}
            <KeywordTable data={""}/>
          </div>
        )}
        {activeTab === "playStore" && (
          <div>
            <h3 className="text-lg font-semibold">Play Store</h3>
            <KeywordTable data={""}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSwitch;
