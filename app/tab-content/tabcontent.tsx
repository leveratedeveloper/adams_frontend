'use client';
import Link from 'next/link';
import { Globe, Star, Target } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { TabsContent } from '@/components/ui/tabs';
import React,{ useEffect, useState,useCallback } from "react";
import { FiSearch } from "react-icons/fi"; // Using react-icons for the icon
import { Smartphone } from 'lucide-react';
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { saveDataToDB, getDataFromDB,deleteAllData } from '../utils/indexedDb';
import Cookies from 'js-cookie';
import { useModal } from "../../contexts/ModalContext";
import Modal from "@/components/hubspotmodal/modal";
import debounce from "lodash/debounce";
import axios from 'axios';

interface TabContentProps {
  value: string;
  placeholder: string;
}

export default function  Page({ value, placeholder }: TabContentProps)  {
  const router = useRouter();
  const [isOn, setIsOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const { isOpen, setIsOpen } = useModal();
  const [error, setError] = useState("");
  const [selectedValuesObj, setSelectedValuesObj] = useState<string[]>(["search ranking"]); // Default checked

  //DataforSEO
  const [query, setQuery] = useState("");
  const [queryAndro, setQueryAndro] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [suggestionsAndro, setSuggestionsAndro] = useState<any[]>([]);
  const [suggestionsIcon, setSuggestionsIcon] = useState<any[]>([]);
  const [suggestionsIconAndro, setSuggestionsIconAndro] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownApple, setShowDropdownApple] = useState(false);
  const [showDropdownAndroid, setShowDropdownAndroid] = useState(false);
  const [categories, setCategories] = useState<string[]>(["Finance", "Business"]); 
  const [showIcon, setIcon] = useState(false);
  const [showIconAndro, setIconAndro] = useState(false)
  const [appsID, setAppsID] = useState("");
  const [appsIDIphone, setAppsIDIphone] = useState("");
  const [nameID, setNameID] = useState("");
  const [nameIDiphone, setNameIDiphone] = useState("");
  const [appIcon, setAppIcon] = useState("");
  const [appIconAndroid, setAppIconAndroid] = useState("");
  const [market, setMarket] = useState<string[]>([]); 
  const [statMarket, setStatMarket] = useState("")
  const [starAndroid, setStarAndroid] = useState<number>(0);
  const [starIphone, setStarIphone] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAndro, setIsLoadingAndro] = useState(false);
  const sessionId = Cookies.get('sessionId');
  // const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    url:'',
    country: 'Indonesia',
    premium_backlink: true,
    keyword_optimized: 5,
    article_development: 5,
    market: [''],
    appId: '', 
    appIdIphone:'',
    appName: '',
    appNameIphone: '',
    appIcon:'',
    appIconAndroid:'',
    appStarIphone:0,
    appStarAndroid:0,
    objectiveASO: [''],
    sessionId: Cookies.get('sessionId'),
    ipAddress: Cookies.get('ipAddress'),
    userAgent: Cookies.get('userAgent')
  });
  
  useEffect(() => {
    const sessionId = Cookies.get('sessionId');
  }, []);

  const handleToggle = () => {
    setIsOn(!isOn);
    handleChange({
      target: {
        name: "premium_backlink", // Field name in formData
        value: isOn, // First value from slider
      },
    });
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setError(""); 
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  // Initialize state for slider value
  const handleSliderChange = (value: number[]): void => {
    handleChange({
      target: {
        name: "keyword_optimized", // Field name in formData
        value: value[0], // First value from slider
      },
    });
  };

  const handleSliderChangeArticle = (value: number[]):void => {
    handleChange({
      target: {
        name: "article_development",
        value: value[0], 
      },
    });
  }
  
  const validateURL = (url: string) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(:\d+)?(\/.*)?$/i;
    return urlPattern.test(url);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (value == 'website'){
      if (!validateURL(formData.url) || (!formData.url)) {
        setError("Invalid URL. Please enter a valid website URL.");
        return;
      }
      await saveDataToDB(formData);
      saveDataCms(formData)
      router.push('/content-web')
    }else{
      if (query.trim() === "" && queryAndro.trim() === "") {
          setError("App name cannot be empty");
          return;
      }

      formData.appId = appsID;
      formData.appIdIphone = appsIDIphone;
      formData.appName = nameID;
      formData.appNameIphone = nameIDiphone
      formData.objectiveASO = selectedValuesObj;
      formData.appIcon = appIcon;
      formData.appIconAndroid = appIconAndroid
      formData.market = market;
      formData.appStarAndroid = starAndroid;
      formData.appStarIphone = starIphone;
      await saveDataToDB(formData);
      saveDataCms(formData)
      router.push('/content')
    }
  };
  
  const saveDataCms = async (lastItem: any) => {
      const response = await fetch("/api/partofadam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastItem
        }),
      });
    
      const data = await response.json();
      return data;
    };
    
  useEffect(() => {
    const fetchDataDB = async () => {
      const dbData = await getDataFromDB();
      // const timeout = setTimeout(() => {
      //   deleteAllData();
      //   console.log("Deleted all data after 10 seconds");
      // }, 10000);
  
      // return () => clearTimeout(timeout); // Cleanup if component unmounts
    };
  
    fetchDataDB();
  }, []);


  
  //DataforSEO
  const fetchSuggestions = async (searchQuery: string) => {
    setLoading(true);
  
    if (getFetchCount() > 6) {
      setLoading(false);
      setSuggestionsIcon([]);
      setIsOpen(true);
      return [];
    }
  
    try {
      const currentFetchCount = getFetchCount() + 1;
      setFetchCount(currentFetchCount);
  
      // API request body
      const requestBody = {
        searchQuery,
        statMarket,
      };
  
      // Make request to Next.js API route
      const response = await axios.post("/api/dataforseo", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Extract results safely
      const results = response.data?.items || [];
      setLoading(false);
  
      return results;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };
  
  const getFetchCount = () => {
    return parseInt(Cookies.get("fetch_count") || "0", 10);
  };
  
  const setFetchCount = (count: number) => {
    Cookies.set("fetch_count", count.toString(), { expires: 1 }); // Save count in cookies for 7 days
  };
  
  // const fetchSuggestions = async (searchQuery: string) => {
  //   setLoading(true);
    
  //   // if (getFetchCount() > 3) {
  //   //   setLoading(false);
  //   //   setSuggestionsIcon([]);
  //   //   setIsOpen(true);
  //   //   return [];
  //   // }
  
  //   try {
  //     console.log("Fetching from local JSON...", searchQuery);
      
  //     const API_URL = "datajson/data.json";
  //     const API_URL2 = "datajson/dataapple.json";
  //     const currentFetchCount = getFetchCount() + 1;
  //     setFetchCount(currentFetchCount);
  
  //     // Prepare API calls based on checkedItems
  //     const apiCalls = [];
  
  //     if (statMarket == "appstore") {
  //       console.log("hit api log appstore")
  //       apiCalls.push(fetch(API_URL2).then((res) => res.json()));
  //     }
    
  //     // If 'optionGoogle' is checked
  //     if (statMarket == "playstore") {
  //       console.log("hit api log playstore")
  //       apiCalls.push(fetch(API_URL).then((res) => res.json()));
  //     }
  
  //     // If no API calls, return empty result
  //     if (apiCalls.length === 0) {
  //       setLoading(false);
  //       return [];
  //     }
  
  //     // Fetch both data sources in parallel
  //     const responses = await Promise.all(apiCalls);
      
  //     // Merge results
  //     const allResults = responses.flatMap((data) =>
  //       data.tasks?.flatMap((task: any) =>
  //         task.result?.flatMap((resultItem: any) =>
  //           resultItem.items?.filter((item: any) =>
  //             item?.item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //             item?.item?.description?.toLowerCase().includes(searchQuery.toLowerCase())
  //           ) || []
  //         ) || []
  //       ) || []
  //     );
  
  //     setLoading(false);
  //     console.log("Fetched data:", allResults);
  //     return allResults;
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error fetching suggestions:", error);
  //     return [];
  //   }
  // };
  
    
    // Handle clicking outside the dropdown
    // useEffect(() => {
    //   const handleClickOutside = () => setShowDropdown(false);
    //   document.addEventListener("click", handleClickOutside);
    //   console.log("out of box",handleClickOutside)
    //   return () => document.removeEventListener("click", handleClickOutside);
    // }, []);
    
    const handleSelectItemApple = (data: any) => {
      setQuery(data.item.title);  // Set the query to the selected item
      setAppsIDIphone(data.app_id)
      setNameIDiphone(data.item.title);
      setAppIcon(data.item.icon)
      setStarIphone(data.item.rating.value)
      setShowDropdownApple(false);  // Close the dropdown
      setIcon(true)
      setSuggestionsIcon(prevItems => [...prevItems, data]);
    };

    const handleSelectItemAndroid = (data: any) => {
      setQueryAndro(data.item.title);  // Set the query to the selected item
      setAppsID(data.app_id)
      setNameID(data.item.title);
      setAppIconAndroid(data.item.icon)
      setStarAndroid(data.item.rating.value)
      setShowDropdownAndroid(false);  // Close the dropdown
      setIconAndro(true)
      setSuggestionsIconAndro(prevItems => [...prevItems, data]);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
  
      setCheckedItems((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    }; 

  const handleChangeMobileApple = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setMarket((prevMarkets) =>
      prevMarkets.includes("appstore") ? prevMarkets : [...prevMarkets, "appstore"]
    );
    setIsLoading(true)
    setStatMarket("appstore")
    if (e.target.value.length >= 2) {
      fetchSuggestionsDebounced(query,"appstore");
    } else {
      setShowDropdownApple(false);
    }
  };

  const handleChangeMobileAndroid = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryAndro(e.target.value);
    setMarket((prevMarkets) =>
      prevMarkets.includes("playstore") ? prevMarkets : [...prevMarkets, "playstore"]
    );
    setIsLoadingAndro(true)
    setStatMarket("playstore")
    if (e.target.value.length >= 2) {
      fetchSuggestionsDebounced(queryAndro,"playstore");
    } else {
      setShowDropdownAndroid(false);
    }
  };

  const fetchSuggestionsDebounced = useCallback(
    debounce(async (query, markets) => {
      if (markets === "appstore") {
        setIsLoading(true);
        try {
          const results = await fetchSuggestions(query);
          setSuggestions(results);
          setShowDropdownApple(true);
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching app store suggestions:", error);
          setIsLoading(false)
        }
      }
  
      if (markets === "playstore") {
        setIsLoadingAndro(true);
        try {
          const results = await fetchSuggestions(query);
          setSuggestionsAndro(results);
          setShowDropdownAndroid(true);
          setIsLoadingAndro(false)
        } catch (error) {
          console.error("Error fetching play store suggestions:", error);
          setIsLoadingAndro(false)
        }
      }
    }, 1500),
    [fetchSuggestions, setSuggestions, setShowDropdownApple, setSuggestionsAndro, setShowDropdownAndroid]
  );
  const handleFocusApple = () => {
    setError(""); 
    setIsLoading(false)
    if (query.length >= 3) {
      setSuggestionsIcon([]); 
      setShowDropdownApple(true);
    }
  };

  const handleFocusAndroid = () => {
    setError(""); 
    setIsLoadingAndro(false)
    if (queryAndro.length >= 3) {
      setSuggestionsIconAndro([]); 
      setShowDropdownAndroid(true);
    }
  };

  const handleChangeObjective = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedValuesObj((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

 
  return (
    <><TabsContent value={value} className="mt-0">
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
          required />
         {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error Message */}
       </div>
        )}
        {value === 'app' && (
          <><div className="flex flex-col md:flex-row items-center rounded-full border border-gray-300 p-2 mb-8 mx-auto max-w-full md:max-w-lg lg:max-w-xl xl:max-w-4xl">
            {/* Top Section: Market Options */}
            <div className="flex items-center w-full md:w-auto">
              <p className="mr-4 ml-3 text-sm text-gray-600  whitespace-nowrap">Market</p>
              <div className="flex items-center">
                <Image
                  src="img/icon/Apps_Store_Icon_Logo.svg" // Replace with your logo's path
                  alt="Apps Store Logo"
                  width={22}
                  height={22}
                  className="object-contain ml-2" />
                <span className="text-xs text-gray-600 ml-2">Apps Store</span>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-300 mx-2" />

            {/* Bottom Section: Input */}
            <div className="flex-grow flex flex-col mt-2 md:mt-0 md:px-4 relative">
              <div className="flex items-center">
                <Smartphone className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Type your app name"
                  className="w-full py-2 px-4 text-sm bg-transparent  outline-none text-gray-800 placeholder-gray-500 focus:border-blue-500"
                  value={query}
                  onChange={handleChangeMobileApple}
                  onFocus={handleFocusApple} />
                   {isLoading && statMarket == 'appstore' && (
                      <div className="ml-2">
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                    )}
              </div>

              {showDropdownApple && query.length >= 3 && statMarket == 'appstore' && (
                <div id="apple" className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                  {loading ? (
                    <div className="p-2 text-sm text-gray-500">Loading...</div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="relative flex items-center gap-2 py-2 px-4 text-sm text-gray-800 cursor-pointer bg-white hover:bg-gray-100"
                        onClick={() => handleSelectItemApple(suggestion)}
                      >
                        <Image
                          src={suggestion.item.icon || "/img/not_found.png"} // Default icon if missing
                          alt={suggestion.item.title}
                          width={30}
                          height={30}
                          className="object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/img/not_found.png"; // Fallback if image fails to load
                          } } />

                        <span className="flex-grow">{suggestion.item.title}</span>

                        <div className="absolute right-0 top-0 flex items-center space-x-2"> {/* space-x-2 for spacing between logos */}
                          {suggestion.se_domain === "itunes.apple.com" && (
                            <span className="relative z-1 bg-white py-0.5 px-2 rounded-lg">
                              <Image
                                src="/img/icon/Apps_Store_Icon_Logo.svg"
                                alt="App Store Logo"
                                width={18}
                                height={18}
                                className="object-contain" />
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">No results found</div>
                  )}

                  {!loading && suggestions.length > 0 && (
                    <div className="p-2 text-sm text-white bg-blue-500 border-t border-blue-600">
                      App not found? Try selecting one platform at a time
                      <p className="text-xs opacity-80 mt-1">
                        Inconsistent app names between platforms can affect results
                      </p>
                    </div>
                  )}
                </div>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error Message */}
            </div>
          </div>
            {showIcon && (
              <div className="bg-white flex items-center justify-center mb-12">

                {(suggestionsIcon || []).map((suggestionIcon, index) => (
                  <>
                    <div className="flex items-start space-x-4 bg-gray-50 p-6 rounded-xl  shadow-sm max-w-4xl w-full">
                      {/* App Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-3xl flex items-center justify-center overflow-hidden">
                          <img src={suggestionIcon.item.icon || "/img/not_found.png"} alt="Apps Icon" className="w-25 h-25 object-contain" />
                        </div>
                      </div>
                      <div className="flex-1" key={index}>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{suggestionIcon.item.title}</h1>
                        <p className="text-gray-600 text-sm mb-3">
                          {suggestionIcon.item.title}
                        </p>

                        {/* Ratings */}
                        <div className="flex flex-col space-y-2">
                          {/* App Store Rating */}
                          <div className="flex items-center space-x-2">
                            {suggestionIcon.se_domain === "itunes.apple.com" && (
                              <><div className="w-6 h-6 rounded-lg flex items-center  justify-center">
                                <span className="text-white text-xs"> <Image
                                  src="/img/icon/Apps_Store_Icon_Logo.svg" // Replace with correct logo path
                                  alt="App Store Logo"
                                  width={18}
                                  height={18}
                                  className="object-contain" /></span>
                              </div><div className="flex items-center">
                                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                                  <span className="text-sm text-gray-700 ml-1">{suggestionIcon.item.rating.value}</span>
                                </div></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div></>
                ))}
                {/* App Info */}
              </div>
            )}
            <div className="flex flex-col md:flex-row items-center rounded-full border border-gray-300 p-2 mb-8 mx-auto max-w-full md:max-w-lg lg:max-w-xl xl:max-w-4xl">
              {/* Top Section: Market Options */}
              <div className="flex items-center w-full md:w-auto">
                <p className="mr-4 ml-3 text-sm text-gray-600  whitespace-nowrap">Market</p>
                <div className="flex items-center">
                  <Image
                    src="img/icon/Google_Play_Icon_Logo.svg" // Replace with your logo's path
                    alt="Google Play Store Logo"
                    width={20}
                    height={20}
                    className="object-contain ml-1" />
                  <span className="text-xs text-gray-600 ml-2 mr-3">Play Store</span>
                </div>
              </div>
              {/* Divider */}
              <div className="hidden md:block w-px bg-gray-300 mx-2" />

              {/* Bottom Section: Input */}
              <div className="flex-grow flex flex-col mt-2 md:mt-0 md:px-4 relative">
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Type your app name"
                    className="w-full py-2 px-4 text-sm bg-transparent  outline-none text-gray-800 placeholder-gray-500 focus:border-blue-500"
                    value={queryAndro}
                    onChange={handleChangeMobileAndroid}
                    onFocus={handleFocusAndroid} />
                     {isLoadingAndro && statMarket == 'playstore' && (
                      <div className="ml-2">
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                    )}
                </div>

                {showDropdownAndroid && queryAndro.length >= 3 && statMarket == 'playstore' && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-1">
                    {isLoadingAndro ? (
                      <div className="p-2 text-sm text-gray-500">Loading...</div>
                    ) : suggestionsAndro.length > 0 ? (
                      suggestionsAndro.map((suggestionAndro, index) => (
                        <div
                          key={index}
                          className="relative flex items-center gap-2 py-2 px-4 text-sm text-gray-800 cursor-pointer bg-white hover:bg-gray-100"
                          onClick={() => handleSelectItemAndroid(suggestionAndro)}
                        >
                          <Image
                            src={suggestionAndro.item.icon || "/img/not_found.png"} // Default icon if missing
                            alt={suggestionAndro.item.title}
                            width={30}
                            height={30}
                            className="object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/img/not_found.png"; // Fallback if image fails to load
                            } } />

                          <span className="flex-grow">{suggestionAndro.item.title}</span>

                          <div className="absolute right-0 top-0 flex items-center space-x-2"> {/* space-x-2 for spacing between logos */}
                            {suggestionAndro.se_domain === "play.google.com" && (
                              <span className="relative z-0 opacity-80">
                                <Image
                                  src="/img/icon/Google_Play_Icon_Logo.svg"
                                  alt="Google Play Logo"
                                  width={18}
                                  height={18}
                                  className="object-contain" />
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-gray-500">No results found</div>
                    )}

                    {!isLoadingAndro && suggestionsAndro.length > 0 && (
                      <div className="p-2 text-sm text-white bg-blue-500 border-t border-blue-600">
                        App not found? Try selecting one platform at a time
                        <p className="text-xs opacity-80 mt-1">
                          Inconsistent app names between platforms can affect results
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error Message */}
              </div>
            </div>
            {showIconAndro && (
              <div className="bg-white flex items-center justify-center mb-12">
              {(suggestionsIconAndro || []).map((suggestionIconAndro, index) => (
                <div 
                  key={suggestionIconAndro.item.id || index} // Use a unique ID if available, otherwise fallback to index
                  className="flex items-start space-x-4 bg-gray-50 p-6 rounded-xl shadow-sm max-w-4xl w-full"
                >
                  {/* App Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-3xl flex items-center justify-center overflow-hidden">
                      <img 
                        src={suggestionIconAndro.item.icon || "/img/not_found.png"} 
                        alt="Apps Icon" 
                        className="w-25 h-25 object-contain" 
                      />
                    </div>
                  </div>
          
                  {/* App Info */}
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      {suggestionIconAndro.item.title}
                    </h1>
                    <p className="text-gray-600 text-sm mb-3">
                      {suggestionIconAndro.item.title}
                    </p>
          
                    {/* Ratings */}
                    <div className="flex flex-col space-y-2">
                      {/* App Store Rating */}
                      <div className="flex items-center space-x-2">
                        {suggestionIconAndro.se_domain === "play.google.com" && (
                          <>
                            <div className="w-6 h-6 from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs">
                                <Image
                                  src="img/icon/Google_Play_Icon_Logo.svg"
                                  alt="Google Play Store Logo"
                                  width={20}
                                  height={20}
                                  className="object-contain ml-1" 
                                />
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-current text-yellow-400" />
                              <span className="text-sm text-gray-700 ml-1">
                                {suggestionIconAndro.item.rating.value}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}</>
            
        )}
        {value === 'app' && (
          <><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 mx-auto max-w-full lg:max-w-xl xl:max-w-4xl">
            <div className="space-y-4 col-span-1">
              <div className="flex items-center">
                <h3 className="text-sm font-medium mr-2">Country</h3>
                <div className="relative group">
                  <button
                    className="text-gray-400 hover:text-gray-600 cursor-pointer relative z-1"
                    aria-label="Information"
                  >
                    ⓘ
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Select market where your app will be optimized
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <select className="w-full rounded-full px-4 py-2 border-2 border-gray-200">
                  <option value="Indonesia">Indonesia</option>
                </select>
              </div>
            </div>
            <div className="space-y-6 col-span-2 ml-12">
              <div className="flex items-center">
                <h3 className="text-sm font-medium mr-2">Objective</h3>
                <div className="relative group">
                  <button
                    className="text-gray-400 hover:text-gray-600 cursor-pointer relative z-1"
                    aria-label="Information"
                  >
                    ⓘ
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
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
                    value="search ranking"
                    checked={selectedValuesObj.includes("search ranking")}
                    onChange={handleChangeObjective}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="item-2" className="ml-2 text-gray-700 mr-6">
                    Search Ranking
                  </label>

                  <input
                    type="checkbox"
                    id="item-1"
                    value="app rating"
                    checked={selectedValuesObj.includes("app rating")}
                    onChange={handleChangeObjective}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="item-1" className="ml-2 text-gray-700">App Rating</label>

                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 col-span-1">
              <div className="flex items-center">
                <h3 className="text-sm font-medium mr-2">
                  Keywords Optimized
                </h3>
                <div className="relative group">
                  <button
                    className="text-gray-400 hover:text-gray-600 cursor-pointer relative z-1"
                    aria-label="Information"
                  >
                    ⓘ
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Number of relevant keywords to be optimized
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 z-1">
                <div className="flex flex-col items-center w-5/6 p-2">
                  <Slider
                    min={5}
                    max={30}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={handleSliderChange}
                    ariaLabel="Slider with numbers"
                    showValue />
                </div>
              </div>
            </div>
          </div>
            </>
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
                  className="text-gray-400 hover:text-gray-600 cursor-pointer relative"
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
                id="country"
                name="country"
                className="w-full rounded-full px-3 py-2 border-2 border-gray-200"
                onChange={handleChange}
                value={formData.country || ""}>
                <option value="Indonesia">Indonesia</option>
              </select>
            </div>
          </div>

          {/* Premium Backlink */}

          <><div className="space-y-4">
            <div className="flex items-center">
              <h3 className="text-sm font-medium mr-2">Premium Backlink</h3>
              <div className="relative group">
                <button className="text-gray-400 hover:text-gray-600 cursor-pointer relative z-1"
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
                <path fillRule="evenodd" d="M6.333 4.478A4 4 0 0 0 1 8.25c0 .414.336.75.75.75h3.322c.572.71 1.219 1.356 1.928 1.928v3.322c0 .414.336.75.75.75a4 4 0 0 0 3.772-5.333A10.721 10.721 0 0 0 15 1.75a.75.75 0 0 0-.75-.75c-3.133 0-5.953 1.34-7.917 3.478ZM12 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clipRule="evenodd" />
                <path d="M3.902 10.682a.75.75 0 1 0-1.313-.725 4.764 4.764 0 0 0-.469 3.36.75.75 0 0 0 .564.563 4.76 4.76 0 0 0 3.359-.47.75.75 0 1 0-.725-1.312 3.231 3.231 0 0 1-1.81.393 3.232 3.232 0 0 1 .394-1.81Z" />
              </svg>
              <span className={`text-sm font-medium ${isOn ? "text-blue-600" : "text-gray-600"}`}>Boosted</span>
            </div>
          </div><div className="space-y-4 items-center">
              <div className="flex items-center">
                <h3 className="text-sm font-medium mr-2">
                  Keywords Optimized
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
              <div className="flex items-center gap-1 z-1">
                <div className="flex flex-col items-center w-5/6 p-2">
                  <Slider
                    min={5}
                    max={30}
                    step={1}
                    className="dient-to-r from-white via-blue-300 to-blue-600 rounded-lg appearance-none"
                    defaultValue={[5]}
                    onValueChange={handleSliderChange}
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
                    onValueChange={handleSliderChangeArticle} />
                </div>
              </div>
            </div></>
        </div>
      )}

      {/* Check Now Button */}
      <div className="text-center">
        <button
          onClick={() => {
            // Call the existing submit handler
            handleSubmit();
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          data-gtm-event="button_check_now"
        >
          Check Now
          <span className="text-xl">→</span>
        </button>
      </div>

    </TabsContent><Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* Embedded HubSpot Meeting */}
        <iframe
          src="https://meetings-eu1.hubspot.com/meetings/adamsmeeting/appointment"
          className="w-full h-96 border rounded"
          allowFullScreen
        ></iframe>
      </Modal></>
  );
}
