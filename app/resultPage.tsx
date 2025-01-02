import Image from 'next/image';
import { ArrowLeft, Rocket } from 'lucide-react';
import KeywordTable from '@/components/resultpage/KeywordTable';
import ServiceCard from '@/components/resultpage/ServiceCard';


export default function resultPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Inquiry Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Inquiry</h2>
          
          <div className="space-y-4">
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

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <Image
                src="https://play-lh.googleusercontent.com/DkZtWxeJqUEQkVxXZNNjz7Q6z6YfqwRww9qCbBYUKgLHEaVhNuZyxBHBFZJlxkCqKA=w240-h480-rw"
                width={80}
                height={80}
                alt="BRImo App"
                className="rounded-2xl"
              />
              <div>
                <h3 className="text-xl font-semibold">BRImo</h3>
                <p className="text-gray-600">PT Bank Rakyat Indonesia (Persero) Tbk.</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium">4.7</span>
                  <span className="text-sm text-gray-500 ml-1">(1,65 mio)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Potential keywords</h2>
            <p className="text-gray-600 mb-6">
              We incorporate third party resources for these keywords. Get more accurate data from us.
            </p>
            <KeywordTable />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              Unlock the best keywords to boost your online presence
            </h2>
            <p className="text-gray-600 mb-6">
              Contact us and get the best SEO plan from our experts
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center justify-center w-full md:w-auto mx-auto hover:bg-blue-700 transition-colors">
              <span>Start Your Online Growth</span>
              <Rocket className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-8">Services you&apos;ll get</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            title="Store listing page review"
            description="We improve title, description, and review the visual assets."
            imageUrl="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=400"
          />
          <ServiceCard
            title="Monthly report"
            description="Sit back and get scheduled report of your growth every month."
            imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400"
          />
          <ServiceCard
            title="Communicative experts"
            description="We are ready to listen to bring you the best experience & result."
            imageUrl="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=400"
          />
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors">
            Schedule Meeting Now
          </button>
        </div>
      </div>
    </main>
  );
}