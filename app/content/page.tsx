'use client';

import Image from 'next/image';
import { ArrowLeft, Rocket } from 'lucide-react';
import ServiceCard from '@/components/summary/ServiceCard';
import TabSwitch from '@/components/summary/TabSwitch';
import Header from '@/components/general/header';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import React,{ useEffect, useState } from "react";
import { getDataFromDB } from '../utils/indexedDb';
import { useModal } from "../../contexts/ModalContext";
import Modal from "@/components/hubspotmodal/modal";
import Cookies from 'js-cookie';
import { validate as validateUUID } from "uuid";
import { last } from 'lodash';
export default function ContentPage() {
  interface DataItem {
    url: string;
    country: string;
    premium_backlink: string;
    keyword_optimized: number;
    article_development: number;
    objectiveASO: string[],
    market: string[],
    appId: string,
    appName: string,
    appIcon:string,
    id: number;
  }

  const [dataArray, setDataArray] = useState<DataItem[]>([]);
  const [data, setData] = useState(null);
  const [dataAppStore, setDataAppStore] = useState(null);
  
  const [appIcon, setAppIcon] = useState("");
  const [appIconAndroid, setAppIconAndroid] = useState("");
  const [appName, setAppName] = useState("");
  const [idAndroid, setIdAndroid] = useState("");
  const [idApple, setIdApple] = useState("");
  const [appStarAndroid, setAppStarAndroid] = useState<number>(0);
  const [appStarIphone, setAppStarIphone] = useState<number>(0);
  const [objective, setObjectiveASO] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, setIsOpen } = useModal();
  const [sessionID, setSessionID] = useState()

   useEffect(() => {
      const fetchData = async () => {
        try {
          const dbData = await getDataFromDB();
          if (Array.isArray(dbData)) {
            const lastItem = dbData[dbData.length - 1];
            const appIDAndroid = lastItem['appId'];
            const appIDApple = lastItem['appIdIphone'] ;
            setAppIcon(lastItem['appIcon']);
            setAppIconAndroid(lastItem['appIconAndroid']);
            setAppName(lastItem['appName']);
            setIdAndroid(appIDAndroid);
            setIdApple(appIDApple);
            setAppStarAndroid(lastItem['appStarAndroid']);
            setAppStarIphone(lastItem['appStarIphone']);
            setSessionID(lastItem['sessionId']);
            console.log("ini lastItem",lastItem)
            setDataArray([lastItem]); // Update the data array
            // Call the API with the domain immediately
            // if(lastItem['market'])
            //  fetchDataApi(appID,deviceType);
            lastItem['market'].forEach(async (deviceType: string) => {
              if (deviceType === 'playstore') {
                try {
                    const result = await fetchDataApi(appIDAndroid, 'android');
                    if (!result || typeof result !== "object" || Object.keys(result).length === 0) {
                        console.error("Invalid API response:", result);
                        return;
                    }
                    setData(result);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
              }            
              if (deviceType === 'appstore') {
                  try {
                      const result = await fetchDataApi(appIDApple, 'iphone');
                      if (!result || typeof result !== "object" || Object.keys(result).length === 0) {
                          console.error("Invalid API response:", result);
                          return;
                      }
                      setDataAppStore(result);
                  } catch (error) {
                      console.error("Error fetching data:", error);
                  }
              }
            });
          } else {
            console.error("dbData is not an array:", dbData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      // sendItemtoCMS();
      fetchData();
    }, []); 
    const fetchDataApi = async (appID: string, deviceType: string) => {
      setLoading(true); // Start loading
      console.log("Fetching data from API...");

      try {
        // Send the deviceType and appID as query parameters in the URL
        const url = `/api/apptweek?appID=${encodeURIComponent(appID)}&deviceType=${encodeURIComponent(deviceType)}`;
        
        const response = await fetch(url, {
          method: "GET", // Keep GET method
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "API request failed");
        }
    
        const result = await response.json();
        console.log("API Response:", result);
        return result
       
      } catch (err: any) {
        console.error("Error calling API:", err.message);
        setError(err.message); // Store error message
      } finally {
        setLoading(false); // Stop loading
      }
    };
    
    const saveDataCms = async (lastItem: any) => {
      const response = await fetch("/api/resultadam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {lastItem}
        ),
      });
    
      const data = await response.json();
      console.log("Suggestions: respond", data);
      return data;
    };

    useEffect(() => {
      if (isOpen) {
        // const data = {
        //   "1550237185": {
        //     "suggestions": [
        //       {
        //         "keyword": "seabank",
        //         "ranking": 7,
        //         "is_typo": false,
        //         "volume": 80,
        //         "score": 85.9
        //       },
        //       {
        //         "keyword": "bca mobile",
        //         "ranking": 5,
        //         "is_typo": false,
        //         "volume": 78,
        //         "score": 95.16
        //       },
        //       {
        //         "keyword": "my bca",
        //         "ranking": 4,
        //         "is_typo": false,
        //         "volume": 76,
        //         "score": 98.73
        //       },
        //       {
        //         "keyword": "wondr by bni",
        //         "ranking": 6,
        //         "is_typo": false,
        //         "volume": 72,
        //         "score": 82.43
        //       },
        //       {
        //         "keyword": "bca",
        //         "ranking": 4,
        //         "is_typo": false,
        //         "volume": 69,
        //         "score": 89.64
        //       }
        //     ]
        //   }
        // };
        if (!sessionID || !validateUUID(sessionID)) {
          console.error("Invalid session ID:", sessionID);
        } else {
          console.log("Valid session ID:", sessionID);
        }
        if (data) {
          console.log(" ada data android")
          const suggestionAndroid = data;
          const itemsResultCMS = [
            { 
              session_id: sessionID || "defaultSessionId", 
              result: suggestionAndroid
            }
          ];
        
          saveDataCms(itemsResultCMS);
          console.log("Save to dataCMS Android", itemsResultCMS);
        }
        
        if(dataAppStore){
          console.log(" ada data apps store")
          // const itemsResultCMS = [
          //   { sessionID: Cookies.get('sessionId'), result: dataAppStore },
          // ];
          const itemsResultAppStoreCMS = [
            { 
              session_id: sessionID || "defaultSessionId", 
              result: dataAppStore
            }
          ];
          saveDataCms(itemsResultAppStoreCMS);
          console.log("save to dataCMS apple",itemsResultAppStoreCMS)
        }
      }
    }, [isOpen]);

  return (
    <div className="relative max-h-screen w-full">
          <Header />
      <main className="relative z-10 items-center justify-center min-h-screen">
        <div className='max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        {/* Header Section */}
          <div className="max-sm px-4 py-4">
            <Link href="/">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-6 md:p-8 grid-cols-1 p-2">
            <div className="md:space-y-4 md:p-4 md:col-span-2">
              <div className="shadow-md rounded-lg md:p-4 border">
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b text-center md:text-left">
                        <h2 className="text-2xl font-semibold mb-4">Inquiry</h2>
                      </th>
                      <th className="px-4 py-2 border-b text-left"></th>
                      <th className="px-4 py-2 border-b text-left"></th>
                      <th className="px-4 py-2 border-b text-left"></th>
                      <th className="px-4 py-2 border-b text-left"></th>{/* New column */}
                    </tr>
                  </thead>
                  <tbody>
                  {dataArray.length > 0 ? (
                    dataArray.map((item, index) => (
                      <React.Fragment key={item.id || index}> 
                        <tr key={`${item.id}-appName-${index}`}><td className="px-4 py-2" colSpan={2}>App name</td><td className="px-4 py-1 text-right" colSpan={3}>{item.appName}</td></tr>
                        <tr key={`${item.id}-market-${index}`}><td className="px-4 py-2" colSpan={2}>Market</td><td className="px-2 py-2 text-right" colSpan={3}>{Array.isArray(item.market) ? item.market.join(", ") : ""}</td></tr>
                        <tr key={`${item.id}-country-${index}`}><td className="px-4 py-2" colSpan={2}>Country</td><td className="px-4 py-2 text-right" colSpan={3}>{item.country}</td></tr>
                        <tr key={`${item.id}-objective-${index}`}><td className="px-4 py-2" colSpan={2}>Objective</td><td className="px-4 py-2 text-right" colSpan={3}>{Array.isArray(item.objectiveASO) ? item.objectiveASO.join(", ") : ""}</td></tr>
                        <tr key={`${item.id}-keyword-${index}`}><td className="px-4 py-2" colSpan={2}>Keyword Optimize</td><td className="px-4 py-2 text-right" colSpan={3}>{item.keyword_optimized}</td></tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-2 text-center" colSpan={4}>Loading or no data available...</td>
                    </tr>
                  )}

                  </tbody>
                </table>
                {idApple !== '' ?
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-solid m-4"> {/* Reduced top margin */}
                  <Image
                      src={appIcon || "/img/not_found.png"}
                      width={150} 
                      height={100}
                      alt="Icon App"
                      unoptimized={appIcon?.startsWith("http")} 
                    />
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-xl font-semibold">{appName}</h3>
                      <p className="text-gray-600">{appName}</p>
                      <div className="flex items-center mt-1">
                        <Image
                          src="img/icon/Apps_Store_Icon_Logo.svg" // Replace with your logo's path
                          alt="Apps Store Logo"
                          width={22}
                          height={22}
                          className="object-contain mr-2"
                        />
                        <span className="text-sm font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black-400 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M10 15.27l4.18 2.19-1.64-5.03L18 7.24h-5.18L10 2 7.18 7.24H2l3.46 5.19-1.64 5.03L10 15.27z" />
                          </svg>
                        </span>
                        <span className="text-sm font-medium">{appStarIphone}</span>
                        <span className="text-sm text-gray-500 ml-1">(1.65 mio)</span>
                      </div>
                    </div>
                  </div>
                </div>
                 : <div></div>}
                {idAndroid !== '' ?
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-solid m-4"> {/* Reduced top margin */}
                  <Image
                      src={appIconAndroid || "/img/not_found.png"}
                      width={150} 
                      height={100}
                      alt="Icon App"
                      unoptimized={appIcon?.startsWith("http")} 
                    />
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-xl font-semibold">{appName}</h3>
                      <p className="text-gray-600">{appName}</p>
                      <div className="flex items-center mt-1">
                        <Image
                           src="img/icon/Google_Play_Icon_Logo.svg" // Replace with your logo's path
                          alt="Apps Store Logo"
                          width={22}
                          height={22}
                          className="object-contain mr-2"
                        />
                        <span className="text-sm font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black-400 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M10 15.27l4.18 2.19-1.64-5.03L18 7.24h-5.18L10 2 7.18 7.24H2l3.46 5.19-1.64 5.03L10 15.27z" />
                          </svg>
                        </span>
                        <span className="text-sm font-medium">{appStarAndroid}</span>
                        <span className="text-sm text-gray-500 ml-1">(1.65 mio)</span>
                      </div>
                    </div>
                  </div>
                </div>
                : '' }
              </div>
            </div>
            <div className="md:space-y-4 md:p-4 col-span-4 md:mt-0 mt-4">
              <div className="bg-white rounded-lg md:p-4 shadow-md border p-6">
                {/* Heading */}
                <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  Potential keywords
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-center md:text-left">
                  Suggested keywords to be optimized based on analysis from our AI engine:
                </p>
               
                {/* Tab switch Table */}
                <TabSwitch 
                  data={data || {}} 
                  dataAppStore={dataAppStore || {}} 
                  dataArray={Array.isArray(dataArray) ? dataArray : []} 
                />

                {/* Call-to-Action Heading */}
                <h2 className="text-2xl font-semibold text-blue-600 mb-2 text-center mb-2">
                  Unlock the best keywords to boost your online presence
                </h2>

                {/* Secondary Description */}
                <p className="text-gray-600 mb-4 text-center">
                  Contact us and get the best SEO plan from our experts
                </p>

                {/* Button */}
                <button
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium flex items-center justify-center w-full md:w-auto mx-auto hover:bg-blue-700 transition-colors shadow-sm"
                  onClick={() => setIsOpen(true)}
                >
                  <span>Start Your Online Growth</span>
                  <Rocket className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-6 grid-flow-col md:p-6 grid-cols-1 p-2">
            <div className="md:space-y-4 md:p-4 col-span-2">
            </div>
            <div className="md:space-y-4 md:p-4 col-span-4">
              <div className="bg-white rounded-lg md:p-4 shadow-md border p-6">
                <h2 className="text-2xl font-semibold mb-8 md:text-left text-center">Services you&apos;ll get</h2>
                <div className="grid md:grid-cols-3">
                  <ServiceCard
                    title="Full Audit Report"
                    description="Unlock comprehensive data and analysis"
                    imageUrl="img/icon/icon_service_review.svg"
                  />
                  <ServiceCard
                    title="Expert Consultation"
                    description="Consult with our experts to grow your online presence"
                    imageUrl="img/icon/icon_service_report.svg"
                  />
                  <ServiceCard
                    title="Customized Package"
                    description="Tailored solutions to achieve your goals and KPIs"
                    imageUrl="img/icon/icon_service_consult.svg"
                  />
                </div>

                <div className="text-center mt-6">
                <button
                className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
                  onClick={() => setIsOpen(true)}
                >
                  Schedule Meeting Now
                </button>
                </div>
              </div>
            </div>
          </div>
        {/* Services Section */}
        </div>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {/* Embedded HubSpot Meeting */}
          <iframe
            src="https://meetings-eu1.hubspot.com/meetings/adamsmeeting/appointment"
            className="w-full h-96 border rounded"
            allowFullScreen
          ></iframe>
        </Modal>
      </main>
      <Footer />
    </div>
  );
}