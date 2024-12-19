import { Globe, Smartphone } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabContent } from '@/components/TabContent';
import Image from "next/image";
import logoAdams from "../public/img/Logo_Adams_Chillax.png";
import Header from '../components/general/header';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Header />
    <div
        className="absolute inset-0 backdrop-blur-lg"
        style={{
          backgroundImage: `url('../public/img/background_adams.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)', // Additional CSS blur if needed
        }}
      ></div>
    <main className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-[url('../public/img/background_adams.svg')] bg-no-repeat bg-cover bg-center">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-1">
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold">
            {/* <img
              src="/path-to-your-logo.png"
              alt="ADAMS Logo"
              className="h-16 w-auto"
            /> */}
            {/* <Image alt="ADAMS" src={logoAdams} className="h-15 w-auto"></Image> */}
            <h1>
              Boost your ranking
            </h1>
            <h1 className="gradient-text">
              {/* Boots your ranking,<br/> */}
              Maximize Visibility
            </h1>
            
          </h1>
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
    </div>
  );
}