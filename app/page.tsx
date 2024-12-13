import { Globe, Smartphone } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabContent } from '@/components/TabContent';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Logo and Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#F7931E] via-[#ED1C24] to-[#2E3192] text-transparent bg-clip-text">
            ADAMS
          </h1>
          <h2 className="text-xl text-gray-700 mb-6">
            Automated Digital Marketing Solution
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Accurate & efficient way to grow your website SEO easily. Powered by the cutting edge technology of Leverate Asia.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border p-6 sm:p-8">
          {/* Website/App Tabs */}
          <Tabs defaultValue="website" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="website" className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Website
              </TabsTrigger>
              <TabsTrigger value="app" className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                App
              </TabsTrigger>
            </TabsList>

            <TabContent 
              value="website" 
              placeholder="Enter URL (i.e. https://www.yourwebsite.com)" 
            />
            <TabContent 
              value="app" 
              placeholder="Enter App URL (i.e. https://play.google.com/store/apps/...)" 
            />
          </Tabs>
        </div>
      </div>
    </main>
  );
}