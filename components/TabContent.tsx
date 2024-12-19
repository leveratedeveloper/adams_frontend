'use client'
import { Globe } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { TabsContent } from '@/components/ui/tabs';
import { useState } from "react";

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
        <div className="relative max-w-3xl mx-auto">
          <input
            type="url"
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none pl-12"
          />
          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Keywords to be optimized
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              ⓘ
            </button>
          </div>
          <div className="flex items-center gap-1">
            {/* <div className="flex-1">
              <Slider
                defaultValue={[20]}
                max={25}
                step={5}
                className="w-full"
              />
            </div> */}
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