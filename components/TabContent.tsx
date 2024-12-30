'use client'
import { Globe } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { TabsContent } from '@/components/ui/tabs';
import { ChangeEvent, useState } from "react";

interface TabContentProps {
  value: string;
  placeholder: string;
}

export function TabContent({ value, placeholder }: TabContentProps) {
  const [isOn, setIsOn] = useState(false);
  const [valueSlide, setValue] = useState([50]);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  return (
    <TabsContent value={value} className="mt-0">
      {/* URL Input */}
      <div className="mb-8">
        {value === 'website' && (
          <div className="relative max-w-3xl mx-auto">
            <input
              type="url"
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none pl-12"
            />
          </div>
        )}
         {value === 'app' && (
          <div className="flex items-center  rounded-full border border-gray-300 p-4">
          <div className="flex items-center">
            <p className="mr-2 text-gray-600">Category</p>
            <button className="p-1 rounded-full text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <select className="ml-2">
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>
          <div className="flex items-center w-full">
            <button className="p-1 rounded-full text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-smartphone w-5 h-5"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                <path d="M12 18h.01"></path>
              </svg>
            </button>
            <input
              type="text"
              className="ml-2 px-4 py-2 w-full rounded-md border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
              placeholder="Type your app name."
            />
          </div>

        </div>
        )}
          
          {/* <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
        {/* </div> */}
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Language Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Country</h3>
            <button className="text-gray-400 hover:text-gray-600">
              ⓘ
            </button>
          </div>
          <div className="flex gap-4">
            <select className="rounded-full px-4 py-2">
                <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="indonesia">Indonesia</option>
              <option value="japan">Japan</option>
              <option value="canada">Canada</option>
            </select>
            {/* <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="language"
                defaultChecked
                className="w-4 h-4 text-blue-600"
              />
              <span className='text-sm'>English</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="language"
                className="w-4 h-4 text-blue-600"
              />
              <span className='text-sm'>Indonesia</span>
            </label> */}
          </div>
        </div>

        {/* Premium Backlink */}
        {value === 'website' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Premium backlink</h3>
              <button className="text-gray-400 hover:text-gray-600">
                ⓘ
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {/* Label */}
                <span className="mr-3 text-gray-700">{isOn ? "On" : "Off"}</span>

                <button
                  onClick={handleToggle}
                  className={`w-14 h-8 flex-shrink-0 rounded-full relative focus:outline-none transition-colors duration-300 ${
                    isOn ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                      isOn ? "-translate-x-6" : "translate-x-0" 
                    }`}
                  ></span>
                </button>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"   className={`w-8 h-8 ${isOn ? "fill-blue-500" : "fill-blue-300"}`}>
                <path fill-rule="evenodd" d="M6.333 4.478A4 4 0 0 0 1 8.25c0 .414.336.75.75.75h3.322c.572.71 1.219 1.356 1.928 1.928v3.322c0 .414.336.75.75.75a4 4 0 0 0 3.772-5.333A10.721 10.721 0 0 0 15 1.75a.75.75 0 0 0-.75-.75c-3.133 0-5.953 1.34-7.917 3.478ZM12 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clip-rule="evenodd" />
                <path d="M3.902 10.682a.75.75 0 1 0-1.313-.725 4.764 4.764 0 0 0-.469 3.36.75.75 0 0 0 .564.563 4.76 4.76 0 0 0 3.359-.47.75.75 0 1 0-.725-1.312 3.231 3.231 0 0 1-1.81.393 3.232 3.232 0 0 1 .394-1.81Z" />
              </svg>
              <span className= {`text-sm font-medium ${isOn ? "text-blue-600" : "text-gray-600"}`}>Boosted</span>
            </div>
          </div>
        )}
        

        {/* Keywords/Article Development */}
        {value === 'website' && (
        <div className="space-y-4 items-center">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Keywords to be optimized
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              ⓘ
            </button>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex flex-col items-center w-5/6 p-2">
                <Slider
                  min={5}
                  max={25}
                  step={5}
                  defaultValue={[15]}
                  onValueChange={setValue}
                  ariaLabel="Slider with numbers"
                  showValue
                />
              </div>
          </div>
        </div>
        )}

        {/* Keywords/Article Development */}
        {value === 'website' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              On-page article development
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              ⓘ
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Slider
                defaultValue={[20]}
                max={25}
                step={5}
                className="dient-to-r from-white via-blue-300 to-blue-600 rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>
        )}

        {value === 'app' && (
         <div className="space-x-6">
            <div className="flex items-center">
              <h3 className="text-sm font-medium mr-2">Objective</h3>
              <button className="text-gray-400 hover:text-gray-600">ⓘ</button>
            </div>
            <div className="flex items-center gap-1">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="item-1"
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="item-1" className="ml-2 mr-2 text-gray-700">App Rating</label> {/* Added mr-4 */}
                    
                    <input
                      type="checkbox"
                      id="item-2"
                      className="w-5 h-5 ml-4 ml-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="item-2" className="ml-2 text-gray-700">Search Ranking</label>
                  </div>
                </div>
            </div>
          </div>       
        )}
        {value === 'app' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">
                Keywords Optimize
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                ⓘ
              </button>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex flex-col items-center w-5/6 p-2">
                  <Slider
                    min={5}
                    max={25}
                    step={5}
                    defaultValue={[15]}
                    onValueChange={setValue}
                    ariaLabel="Slider with numbers"
                    showValue
                  />
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Check Now Button */}
      <div className="text-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
          Check Now
          <span className="text-xl">→</span>
        </button>
      </div>
    </TabsContent>
  );
}