'use client';

import { ArrowLeft, Rocket } from 'lucide-react';
import ServiceCard from '@/components/summary/ServiceCard';
import Header from '@/components/general/header';
import Link from 'next/link';
import KeywordTable from '@/components/summary/KeywordTable';
import React,{ useEffect, useState } from "react";
import { getDataFromDB } from '../utils/indexedDb';
import Cookies from 'js-cookie';

export default function ContentPage() {
  // const handleClick = () => {
  //   window.location.href = 'https://meetings-eu1.hubspot.com/meetings/adamsmeeting/appointment';
  // };
  interface DataItem {
    url: string;
    country: string;
    premium_backlink: string;
    keyword_optimized: number;
    article_development: number;
    id: number;
  }
  const [dataArray, setDataArray] = useState<DataItem[]>([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbData = await getDataFromDB();
        if (Array.isArray(dbData)) {
          const lastItem = dbData[dbData.length - 1];
          const domain = lastItem['url'].replace(/(^\w+:|^)\/\//, "").replace(/\/$/, ""); 
          console.log("ini domain",domain)
          setDataArray([lastItem]); // Update the data array

          // Call the API with the domain immediately
          await fetchDataApi(domain);
        } else {
          console.error("dbData is not an array:", dbData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // sendItemtoCMS();
    fetchData();
  }, []); // No need to include `domain` in the dependency array
 // Function to call the API
 const fetchDataApi = async (domains: any) => {
    // setLoading(true); // Start loading
    try {
      const response = await fetch('/api/serpstat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          params: {
            domain: domains, // Use the passed domain directly
          },
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("API Response:", result);
        setData(result); // Set the response data to state
      } else {
        console.error("API Error:", result.error);
        setError(result.error); // Set the error if any
      }
    } catch (err) {
      // console.error("Error calling API:", err.message);
      // setError('Error calling API: ' + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const sendItemtoCMS = async () => {
    const dbData = await getDataFromDB();
    const sessionId = Cookies.get('sessionId');

    if (Array.isArray(dbData) && dbData.length > 0) {
      console.log("ini data db",dbData)
      const lastItem = dbData[dbData.length - 1];
      lastItem['session'] = sessionId
      try {
        const response = await fetch('/api/cmsAdam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lastItem }), // Sending lastItem
        });
  
        const result = await response.json();
  
        if (response.ok) {
          console.log('API Response:', result);
        } else {
          console.error('API Error:', result.error);
        }
      } catch (error) {
        console.error('Error calling API:', error);
      }
    } else {
      console.log('No data found in the database.');
    }
  };
  
  

  return (
    <div className="relative max-h-screen w-full">
          <Header />
      <main className="relative z-10 items-center justify-center min-h-screen">
        <div className='max-w-screen-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        {/* Header Section */}
          <div className="max-sm px-4 py-4">
            <Link href="/">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-5 p-2 sm:p-8">
            <div className="space-y-4 p-4 col-span-2  ">
              <div className="border-2  border-solid rounded-lg p-4 ">
                {/* <h2 className="text-2xl font-semibold mb-4">Summary</h2> */}
                <div className="space-y-1 p-4 col-span-1"> {/* Reduced vertical spacing */}
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b text-left">
                          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                        </th>
                        <th className="px-4 py-2 border-b text-left"></th>
                        <th className="px-4 py-2 border-b text-left"></th>
                        <th className="px-4 py-2 border-b text-left"></th>{/* New column */}
                      </tr>
                    </thead>
                    <tbody>
                    {dataArray.length > 0 ? (
                        dataArray.map((item, index) => (
                          <React.Fragment key={item.id || index}> {/* Ensure a unique key */}
                            <tr>
                              <td className="px-4 py-2" colSpan={2}>Web URL</td>
                              <td className="px-4 py-1 text-right" colSpan={2}>
                                <a href={item.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                  {item.url}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2" colSpan={2}>Country</td>
                              <td className="px-4 py-2 text-right" colSpan={2}>
                                {item.country}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2" colSpan={2}>Premium Backlink</td>
                              <td className="px-4 py-2 text-right" colSpan={2}>
                                {item.premium_backlink ? 'On' : 'Off'}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2" colSpan={2}>Keywords Optimized</td>
                              <td className="px-4 py-2 text-right" colSpan={2}>
                                {item.keyword_optimized}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2" colSpan={2}>Article Development</td>
                              <td className="px-4 py-2 text-right" colSpan={2}>
                                {item.article_development}
                              </td>
                            </tr>
                          </React.Fragment>
                        ))
                      ) : (
                        <tr>
                          <td className="px-4 py-2 text-center" colSpan={4}>Loading or no data available...</td>
                        </tr>
                      )}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-4 col-span-3">
              <div className="bg-white rounded-lg p-4 shadow-md">
                {/* Heading */}
                <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  Potential keywords
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-center md:text-left">
                  Suggested keywords to be optimized based on analysis from our AI engine:
                </p>

                 <KeywordTable data={data}/>

                {/* Call-to-Action Heading */}
                <h2 className="text-2xl font-semibold text-blue-600 mb-2 text-center mb-2">
                  Unlock the best keywords to boost your online presence
                </h2>

                {/* Secondary Description */}
                <p className="text-gray-600 mb-4 text-center">
                  Contact us and get the best SEO plan from our experts
                </p>

                {/* Button */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium flex items-center justify-center w-full md:w-auto mx-auto hover:bg-blue-700 transition-colors shadow-sm"
                 >
                  <span>Start Your Online Growth</span>
                  <Rocket className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-5 grid-flow-col p-2 ">
            <div className="space-y-4 p-4 col-span-2">
            </div>
            <div className="space-y-4 p-4 col-span-3">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h2 className="text-2xl font-semibold mb-8">Services you&apos;ll get</h2>
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
                <a
                  href="https://meetings-eu1.hubspot.com/meetings/adamsmeeting/appointment"
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security best practice for external links
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
                >
                  Schedule Meeting Now
                </a>
                </div>
              </div>
            </div>
          </div>
        {/* Services Section */}
        </div>
      </main>
    </div>
  );
}