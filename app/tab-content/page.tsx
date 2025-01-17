import { NextIntlClientProvider, useMessages } from "next-intl";
import TabContent from "./tabcontent";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Smartphone } from 'lucide-react';


export default function Page() {
  return (
      <div className="bg-white rounded-lg border p-6 sm:p-8">
        {/* Website/App Tabs */}
        <Tabs defaultValue="website" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8 overflow-auto">
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
  );
}