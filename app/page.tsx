import { Globe, Smartphone } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabContent } from '@/components/TabContent';
import Image from "next/image";
import logoAdams from "../public/img/Logo_Adams_Chillax.png";
import Header from '../components/general/header';
import SliderLogo from '@/components/SliderLogo';
import HowItWorks from '@/components/Howitworks';
import WhyAdams from '@/components/Whyadams';
import ProvenResult from '@/components/ProvenResult';
import Boost from '@/components/Boost';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Header />
    <div className="absolute inset-0 backdrop-blur-lg" style={{
          backgroundImage: `url('../public/img/background_adams.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)', // Additional CSS blur if needed
        }}
      ></div>
    <main className=" relative z-10 items-center justify-center min-h-screen bg-[url('../public/img/background_adams.svg')] bg-no-repeat bg-cover bg-center overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-1">
          {/* Logo and Header */}
          <Boost />

          {/* Main Content */}
          <div className="bg-white rounded-lg border p-6 sm:p-8 mb-8">
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

          {/* Trusted by Section */}
          <div className="text-center">
            <div className="inline-flex justify-center items-center bg-purple-100 rounded-full p-2 sm:p-3 mb-6 sm:mb-8 space-x-1 sm:space-x-2">
              <span className="font-bold text-sm sm:text-base text-black">Trusted by</span>
              <span className="font-bold text-sm sm:text-base gradient-text-well-known">well known</span>
              <span className="font-bold text-sm sm:text-base">companies</span>
            </div>
          </div>

          {/* Slider */}
          <div className="flex items-center justify-center max-w-full overflow-hidden">
            <SliderLogo />
          </div>

          {/* Additional Sections */}
          <HowItWorks />
          <WhyAdams />
          <ProvenResult />
        </div>
      </main>
    </div>
  );
}