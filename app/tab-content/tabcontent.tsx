'use client';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { TabsContent } from '@/components/ui/tabs';
import React,{ useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi"; // Using react-icons for the icon
import { Smartphone } from 'lucide-react';
import { useRouter } from "next/navigation";
import Image from "next/image";
// import sendData  from './action'
import { addData, getAllData,deleteData } from '../utils/indexedDb';

interface TabContentProps {
  value: string;
  placeholder: string;
}

export default function  Page({ value, placeholder }: TabContentProps)  {
  const router = useRouter();
  const [isOn, setIsOn] = useState(true);
  const [valueSlideArticle, setValueArticle] = useState([5]);
  const [valueKeyword, setValueKeyword] = useState([5]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    url:'',
    country: '',
    premium_backlink: true,
    keyword_optimized: 0,
    article_development: 0,
  });

  const handleNavigation = () => {
    router.push("/");
  };
  const handleToggle = () => {
    console.log("handle toogle",isOn)
    setIsOn(!isOn);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (value == 'website'){
      router.push('/content-web')
    }else{
      router.push('/content')
    }
  
    console.log("add data form",formData)
    // await addData('storeName', formData);
   
    // await sendData(formData)
    // .then(()=>{
    //    setFormData({
    //       url:'',
    //       country: '',
    //       premium_backlink: '',
    //       keyword_optimized: 0,
    //       article_development: 0,
    //     });
    //   // setSuccessAlert(true)
    //   // setTimeout(() => setSuccessAlert(false), 3000)
    //   setLoading(false);

    // }).catch(()=>{
    //   // setFailAlert(true)
    //   // setTimeout(() => setFailAlert(false), 3000)
    //   setLoading(false);
    // })
  };

  useEffect(() => {
    async function fetchData() {
      const allData = await getAllData('storeName');
      console.log("ini allData",allData)
      // await deleteData('storeName',1)
      // setData(allData);
    }
    fetchData();
  }, []);


  return (
    <TabsContent value={value} className="mt-0">
      {/* URL Input */}
        <div className="mb-8">
          {value === 'website' && (
           <div className="md:grid-cols-3 gap-8 mb-8">
            <input
              name="url"
              type="url"
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-center"
              onChange={handleChange}
              value={formData.url}
            />
          </div>
          )}
          {value === 'app' && (
          <div className="flex flex-col md:flex-row items-center rounded-full border border-gray-300 p-2 mb-8 mx-auto max-w-full md:max-w-lg lg:max-w-xl xl:max-w-4xl">
            {/* Top Section: Market Options */}
            <div className="flex items-center w-full md:w-auto">
              <p className="mr-4 ml-3 text-sm text-gray-600  whitespace-nowrap">Market</p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="item-1"
                  name="option"
                  value="option1"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <Image
                  src="img/icon/Google_Play_Icon_Logo.svg" // Replace with your logo's path
                  alt="Google Play Store Logo"
                  width={20}
                  height={20}
                  className="object-contain ml-1"
                />
                <span className="text-xs text-gray-600 ml-2 mr-3">Play Store</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="item-2"
                  name="option"
                  value="option2"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <Image
                  src="img/icon/Apps_Store_Icon_Logo.svg" // Replace with your logo's path
                  alt="Apps Store Logo"
                  width={22}
                  height={22}
                  className="object-contain ml-2"
                />
                <span className="text-xs text-gray-600 ml-2">Apps Store</span>
              </div>
            </div>
          
            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-300 mx-2" />
          
            {/* Bottom Section: Input */}
            <div className="flex-grow flex items-center mt-2 md:mt-0 md:px-4">
              <Smartphone className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Type your app name"
                className="w-full py-2 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>         
          )}
          {value === 'app' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 mx-auto max-w-full lg:max-w-xl xl:max-w-4xl">
              <div className="space-y-4 col-span-1">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium mr-2">Country</h3>
                    <div className="relative group">
                      <button className="text-gray-400 hover:text-gray-600">ⓘ</button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Select market where your app will be optimized
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <select className="w-full rounded-full px-4 py-2 border-2 border-gray-200">
                      <option value="indonesia">Indonesia</option>
                    </select>
                  </div>
              </div>
              <div className="space-y-6 col-span-2 ml-12">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium mr-2">Objective</h3>
                      <div className="relative group">
                        <button className="text-gray-400 hover:text-gray-600">ⓘ</button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Goals of your ASO campaign
                        </div>
                      </div>
                  </div>
                  <div className="flex items-center gap-1 col-span-2">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                        type="checkbox"
                          id="item-2"
                          defaultChecked
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="item-2" className="ml-2 text-gray-700 mr-6">
                          Search Ranking
                        </label>

                        <input
                          type="checkbox"
                          id="item-1"
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2" />
                        <label htmlFor="item-1" className="ml-2 text-gray-700">App Rating</label> {/* Added mr-4 */}
                      </div>
                    </div>
                  </div>
              </div>
              <div className="space-y-6 col-span-1">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium mr-2">
                      Keywords Optimize
                    </h3>
                    <div className="relative group">
                      <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                        ⓘ
                      </button>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Number of relevant keywords to be optimized
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col items-center w-5/6 p-2">
                      <Slider
                        min={5}
                        max={30}
                        step={1}
                        defaultValue={[5]}
                        // onValueChange={setValue}
                        ariaLabel="Slider with numbers"
                        showValue />
                    </div>
                  </div>
                </div>
              </div>
          )}
            {/* <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
          {/* </div> */}
        </div>

        {/* Settings Grid */}
        {value === 'website' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Language Selection */}
          <div className="space-y-3">
            <div className="flex items-center">
              <h3 className="text-sm font-medium mr-2">Country</h3>
              <div className="relative group">
                <button
                  className="text-gray-400 hover:text-gray-600 cursor-pointer relative z-10"
                  aria-label="Information"
                >
                  ⓘ
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Select specific country and have localized SEO strategies to dominate search results in your chosen country.
                </div>
              </div>


            </div>
            <div className="flex gap-4">
              <select 
                name="country"
                className="w-full rounded-full px-3 py-2 border-2 border-gray-200"
                value={formData.country}
                onChange={handleChange}
                defaultValue="indonesia">
                <option value="indonesia">Indonesia</option>
              </select>
            </div>
          </div>

          {/* Premium Backlink */}
      
            <><div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium mr-2">Premium Backlink</h3>
                <div className="relative group">
                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer relative z-10"
                   aria-label="Information">
                    ⓘ
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Accelerate ranking with high quality contents and publishers
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {/* Label */}
                  <span className="mr-3 text-gray-700">{isOn ? "On" : "Off"}</span>

                  <button
                    onClick={handleToggle}
                    className={`w-14 h-8 flex-shrink-0 rounded-full relative focus:outline-none transition-colors duration-300 ${isOn ? "bg-blue-500" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${isOn ? "translate-x-0" : "-translate-x-6"}`}
                    ></span>
                  </button>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`w-8 h-8 ${isOn ? "fill-blue-500" : "fill-gray-300"}`}>
                  <path fill-rule="evenodd" d="M6.333 4.478A4 4 0 0 0 1 8.25c0 .414.336.75.75.75h3.322c.572.71 1.219 1.356 1.928 1.928v3.322c0 .414.336.75.75.75a4 4 0 0 0 3.772-5.333A10.721 10.721 0 0 0 15 1.75a.75.75 0 0 0-.75-.75c-3.133 0-5.953 1.34-7.917 3.478ZM12 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clip-rule="evenodd" />
                  <path d="M3.902 10.682a.75.75 0 1 0-1.313-.725 4.764 4.764 0 0 0-.469 3.36.75.75 0 0 0 .564.563 4.76 4.76 0 0 0 3.359-.47.75.75 0 1 0-.725-1.312 3.231 3.231 0 0 1-1.81.393 3.232 3.232 0 0 1 .394-1.81Z" />
                </svg>
                <span className={`text-sm font-medium ${isOn ? "text-blue-600" : "text-gray-600"}`}>Boosted</span>
              </div>
            </div><div className="space-y-4 items-center">
                <div className="flex items-center">
                  <h3 className="text-sm font-medium mr-2">
                    Keywords optimized
                  </h3>
                  <div className="relative group">
                    <button className="text-gray-400 hover:text-gray-600">
                      ⓘ
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Accelerate ranking with high quality contents and publishers
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex flex-col items-center w-5/6 p-2">
                    <Slider
                      min={5}
                      max={30}
                      step={1}
                      className="dient-to-r from-white via-blue-300 to-blue-600 rounded-lg appearance-none" 
                      defaultValue={[5]}
                      value={valueKeyword}   
                      onValueChange={setValueKeyword}
                      ariaLabel="Slider with numbers"
                      showValue />
                  </div>
                </div>
              </div><div className="space-y-4">
                <div className="flex items-center">
                  <h3 className="text-sm font-medium mr-2">
                    Article Development
                  </h3>
                  <div className="relative group">
                    <button className="text-gray-400 hover:text-gray-600">
                      ⓘ
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      SEO-friendly on-page articles tailored to improve search engine performance
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center w-5/6 p-2">
                    <Slider
                      min={5}
                      defaultValue={[5]}
                      max={30}
                      step={1}
                      className="dient-to-r from-white via-blue-300 to-blue-600 rounded-lg appearance-none" 
                      value={valueSlideArticle}               // Bind the value state to the slider
                      onValueChange={setValueArticle}  // Add the onChange handler         
                      />
                  </div>
                </div>
              </div></>
            </div>
          )}

        {/* Check Now Button */}
        <div className="text-center">
          {/* <Link href="/content"> */}
          <button onClick={handleSubmit}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            Check Now
            <span className="text-xl">→</span>
          </button>

          {/* </Link> */}
        </div>
    </TabsContent>
  );
}
