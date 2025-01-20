import Image from 'next/image';
import { ArrowLeft, Rocket } from 'lucide-react';
import ServiceCard from '@/components/summary/ServiceCard';
import TabSwitch from '@/components/summary/TabSwitch';
import Header from '@/components/general/header';
import Link from 'next/link';
import KeywordTable from '@/components/summary/KeywordTable';

export default function ContentPage() {
  const handleClick = () => {
    window.location.href = 'https://meetings-eu1.hubspot.com/meetings/adamsmeeting/appointment';
  };

  return (
    <div className="relative max-h-screen w-full">
          <Header />
      <main className="relative z-10 items-center justify-center min-h-screen">
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        {/* Header Section */}
          <div className="max-sm px-4 py-4">
            <Link href="/">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-5 p-6 sm:p-8">
            <div className="space-y-4 p-4 col-span-2  ">
              <div className="border-2  border-solid rounded-lg p-4 ">
                {/* <h2 className="text-2xl font-semibold mb-4">Summary</h2> */}
                <div className="space-y-1 p-4 col-span-1"> {/* Reduced vertical spacing */}
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b text-left">
                        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                      </th>
                      <th className="px-4 py-2 border-b text-left"></th>
                      <th className="px-4 py-2 border-b text-left"></th>
                      <th className="px-4 py-2 border-b text-left"></th> {/* New column */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2" colSpan={2}>Web URL</td>
                      <td className="px-4 py-1 text-right" colSpan={2}>https://www.codingo.com</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2" colSpan={2}>Country</td>
                      <td className="px-4 py-2 text-right" colSpan={2}>English</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2" colSpan={2}>Premium Backlink</td>
                      <td className="px-4 py-2 text-right" colSpan={2}>On</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2" colSpan={2}>Keywords Optimized</td>
                      <td className="px-4 py-2 text-right" colSpan={2}>20</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2" colSpan={2}>Article Development</td>
                      <td className="px-4 py-2 text-right">20</td>
                    </tr>
                  </tbody>
                </table>




                {/* <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-2">
                    <span className="text-gray-600">Web URL</span>
                    <span className="text-gray-600">Store</span>
                  </div>
                  <div className="col-span-2 space-y-4 p-4">
                    <span className="font-medium">https://www.codingo.com</span>
                    <span className="font-medium">Google Play Store</span>
                  </div>
                </div> */}

                {/* <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 flex items-center">
                      <span className="text-gray-600">Store</span>
                  </div>
                  <div className="col-span-2 space-y-4 p-4">
                    <span className="font-medium">Google Play Store</span>
                  </div>
                </div> */}
               
                  {/* <div className="flex items-center">
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
                  </div> */}
                  {/* <div className="flex items-center">
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
                  </div> */}
                  {/* <div className="flex items-center">
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
                  </div> */}
                </div>
              </div>
            </div>
            <div className="space-y-4 p-4 col-span-3">
              <div className="bg-white rounded-lg p-4 shadow-md">
                {/* Heading */}
                <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  Potential keywords
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-center md:text-left">
                  Suggested keywords to be optimized based on analysis from our AI engine:
                </p>

                 <KeywordTable />

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
          <div className="grid md:grid-cols-5 grid-flow-col p-6 ">
            <div className="space-y-4 p-4 col-span-2">
            </div>
            <div className="space-y-4 p-4 col-span-3">
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