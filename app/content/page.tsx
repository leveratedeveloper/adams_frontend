import Image from 'next/image';
import { ArrowLeft, Rocket } from 'lucide-react';
import KeywordTable from '@/components/summary/KeywordTable';
import ServiceCard from '@/components/summary/ServiceCard';
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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Country</span>
                    <span className="font-medium">English</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Objective</span>
                    <span className="font-medium">App rating</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Keywords to be optimized</span>
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
                  We incorporate third-party resources for these keywords. Get more accurate data from us.
                </p>

                {/* Keyword Table */}
                <KeywordTable />

                {/* Call-to-Action Heading */}
                <h2 className="text-2xl font-semibold text-blue-600 mb-2 text-center">
                  Unlock the best keywords to boost your online presence
                </h2>

                {/* Secondary Description */}
                <p className="text-gray-600 mb-4 text-center">
                  Contact us and get the best SEO plan from our experts
                </p>

                {/* Button */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium flex items-center justify-center w-full md:w-auto mx-auto hover:bg-blue-700 transition-colors shadow-sm">
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
                    title="Store listing page review"
                    description="We improve title, description, and review the visual assets."
                    imageUrl="img/icon/icon_service_review.svg"
                  />
                  <ServiceCard
                    title="Monthly report"
                    description="Sit back and get scheduled report of your growth every month."
                    imageUrl="img/icon/icon_service_report.svg"
                  />
                  <ServiceCard
                    title="Communicative experts"
                    description="We are ready to listen to bring you the best experience & result."
                    imageUrl="img/icon/icon_service_consult.svg"
                  />
                </div>

                <div className="text-center mt-6">
                  <button className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors">
                    Schedule Meeting Now
                  </button>
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