import { Globe } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { TabsContent } from '@/components/ui/tabs';

interface TabContentProps {
  value: string;
  placeholder: string;
}

export function TabContent({ value, placeholder }: TabContentProps) {
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Language</h3>
            <button className="text-gray-400 hover:text-gray-600">
              ⓘ
            </button>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
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
            </label>
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
              <div className="flex-1">
                <Slider
                  defaultValue={[15]}
                  max={25}
                  step={5}
                  className="w-full"
                />
              </div>
              <span className="text-blue-600 text-sm font-medium">Boosted</span>
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
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Slider
                defaultValue={[20]}
                max={25}
                step={5}
                className="w-full"
              />
            </div>
            <span className="text-blue-600 text-sm font-medium">Boosted</span>
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
                className="w-full"
              />
            </div>
            <span className="text-blue-600 text-sm font-medium">Boosted</span>
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