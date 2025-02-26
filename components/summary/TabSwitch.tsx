'use client';

import React, { useState } from "react";
import KeywordTable from '@/components/summary/KeywordTable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TabSwitch ({ data,dataAppStore }: { data: any, dataAppStore: any, dataArray: any }) {
  const [activeTab, setActiveTab] = useState("appStore");
  if (!data) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const appID = Object.keys(data)?.[0]; // Extract the first key 
  const appIDIphone = Object.keys(dataAppStore)?.[0]; // Extract the first key 
  const suggestions = data?.[appID]?.suggestions || [];
  const suggestionsIphone = dataAppStore?.[appIDIphone]?.suggestions || [];

  const saveDataCms = async (lastItem: any) => {
    const response = await fetch("/api/resultadam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastItem
      }),
    });
  
    const data = await response.json();
    console.log("Suggestions: respond", data);
    return data;
  };
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No.</TableHead>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Monthly search volume</TableHead>
                  <TableHead>Current rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {suggestionsIphone.length > 0 ? (
                  suggestionsIphone.slice(0, 3).map((item: any, index: number) => (
                    <React.Fragment key={`${appID}-${item.keyword}-${index}`}>
                      <TableRow className={index === 3 ? "blur-sm" : ""}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.keyword}</TableCell>
                        <TableCell>{item.volume}</TableCell>
                        <TableCell>{item.ranking}</TableCell>
                      </TableRow>
                      {index >= 2 && (
                        <>
                          {[...Array(3)].map((_, i) => (
                            <TableRow key={`blurred-${index}-${i}`}>
                              {[...Array(4)].map((_, j) => (
                                <TableCell key={`blurred-cell-${index}-${i}-${j}`} className="blur-sm">
                                  <img src="img/blur_background.png" alt="Placeholder" className="w-50 h-5 w-full mx-auto pointer-events-none select-none" />
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No Data Available</TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </div>
        )}
        {activeTab === "playStore" && (
          <div>
            <h3 className="text-lg font-semibold">Play Store</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No.</TableHead>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Monthly search volume</TableHead>
                  <TableHead>Current rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {suggestions.length > 0 ? (
                  suggestions.slice(0, 3).map((item: any, index: number) => (
                    <React.Fragment key={`${appID}-${item.keyword}-${index}`}>
                      <TableRow className={index === 3 ? "blur-sm" : ""}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.keyword}</TableCell>
                        <TableCell>{item.volume}</TableCell>
                        <TableCell>{item.ranking}</TableCell>
                      </TableRow>
                      {index >= 2 && (
                        <>
                          {[...Array(3)].map((_, i) => (
                            <TableRow key={`blurred-${index}-${i}`}>
                              {[...Array(4)].map((_, j) => (
                                <TableCell key={`blurred-cell-${index}-${i}-${j}`} className="blur-sm">
                                  <img src="img/blur_background.png" alt="Placeholder" className="w-50 h-5 w-full mx-auto pointer-events-none select-none" />
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No Data Available</TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
