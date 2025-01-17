import Image from 'next/image';
import { ArrowLeft, Rocket } from 'lucide-react';
import ServiceCard from '@/components/summary/ServiceCard';
import TabSwitch from '@/components/summary/TabSwitch';
import Header from '@/components/general/header';
import Link from 'next/link';

export default function ContentPage() {
  const summaryData = {
    webUrl: "https://www.codigo.co/",
    country: "English",
    premiumBacklink: "On",
    keywordsOptimized: "20",
    onPageArticles: "20"
  };
  const handleClick = () => {
    window.location.href = 'https://meetings-eu1.hubspot.com/meetings/adamsmeeting/appointment';
  };

  return (
    <div className="relative max-h-screen w-full">
          <Header />
      <main className="relative z-10 items-center justify-center min-h-screen">
        <div className='max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        {/* Header Section */}
          <div className="max-sm px-4 py-4">
            <Link href="/">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 p-6 sm:p-8">
            <div className="space-y-4 p-4 col-span-1">
              <div className="border-2 border-solid rounded-lg p-4 ">
                <h2 className="text-2xl font-semibold mb-4">Inquiry</h2>
              
                <div className="space-y-2 p-4 col-span-1"> {/* Reduced vertical spacing */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">App name</span>
                    <span className="font-medium">BRImo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Store</span>
                    <span className="font-medium">Google Play Store</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600">Country</span>
                    <div className="relative group">
                      <button className="text-gray-400 hover:text-gray-600 mr-left ml-2 mr-24">
                        ⓘ
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        Select market where your app will be optimized
                      </div>
                    </div>
                    <span className="font-medium">English</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600">Objective</span>
                    <div className="relative group">
                      <button className="text-gray-400 hover:text-gray-600 mr-left ml-2 mr-16">
                          ⓘ
                      </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          Goals of your ASO Campaign
                        </div>
                      </div>
                    <span className="font-medium">App rating</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600">Keywords optimized</span>
                    <div className="relative group">
                      <button className="text-gray-400 hover:text-gray-600 mr-left ml-2 mr-10">
                          ⓘ
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-2 bg-gray-200 text-black text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        Number of relevant keywords to be optimized
                      </div>
                    </div>
                    <span className="font-medium">20</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-solid"> {/* Reduced top margin */}
                <Image
                      src="img/logo/proven_result_brimo.png"
                      width={300} 
                      height={100}
                      alt="BRImo App"
                      className="rounded-2xl"
                    />
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-xl font-semibold">BRImo</h3>
                      <p className="text-gray-600">PT Bank Rakyat Indonesia (Persero) Tbk.</p>
                      <div className="flex items-center mt-1">
                        <Image
                          src="img/icon/Apps_Store_Icon_Logo.svg" // Replace with your logo's path
                          alt="Apps Store Logo"
                          width={22}
                          height={22}
                          className="object-contain mr-2"
                        />
                        <span className="text-sm font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black-400 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M10 15.27l4.18 2.19-1.64-5.03L18 7.24h-5.18L10 2 7.18 7.24H2l3.46 5.19-1.64 5.03L10 15.27z" />
                          </svg>
                        </span>
                        <span className="text-sm font-medium">4.7</span>
                        <span className="text-sm text-gray-500 ml-1">(1.65 mio)</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Image
                           src="img/icon/Google_Play_Icon_Logo.svg" // Replace with your logo's path
                          alt="Apps Store Logo"
                          width={22}
                          height={22}
                          className="object-contain mr-2"
                        />
                        <span className="text-sm font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black-400 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M10 15.27l4.18 2.19-1.64-5.03L18 7.24h-5.18L10 2 7.18 7.24H2l3.46 5.19-1.64 5.03L10 15.27z" />
                          </svg>
                        </span>
                        <span className="text-sm font-medium">4.7</span>
                        <span className="text-sm text-gray-500 ml-1">(1.65 mio)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-4 col-span-2">
              <div className="bg-white rounded-lg p-4 shadow-md">
                {/* Heading */}
                <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  Potential keywords
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-center md:text-left">
                  Suggested keywords to be optimized based on analysis from our AI engine:
                </p>
               
                {/* Tab switch Table */}
                <TabSwitch />

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
          <div className="grid md:grid-cols-3 grid-flow-col p-6 ">
            <div className="space-y-4 p-4 col-span-1">
            </div>
            <div className="space-y-4 p-4 col-span-2">
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