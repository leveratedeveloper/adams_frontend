"use client";

import { FeatureCard } from '@/components/ui/featurecard';
import { RefreshIcon, BadgeCheckIcon, SparklesIcon } from '@/components/ui/icon';

export default function Home() {
  return (
    <main >
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold text-center mb-16">Why Adams</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<RefreshIcon />}
            title="End-to-end Solutions"
            description="Specialize in keywords research, on-page optimization, link building, rating & reviews with tailored solutions."
          />
          
          <FeatureCard
            icon={<BadgeCheckIcon />}
            title="Guaranteed Performance"
            description="Boost your rank to the #1 page on Google's Search Result with our SEO and ASO strategy."
          />
          
          <FeatureCard
            icon={<SparklesIcon />}
            title="AI-driven Optimization"
            description="Utilize cutting-edge technology for smarter, faster, and more effective SEO and ASO campaigns."
          />
        </div>
      </div>
    </main>
  );
}