import { ResultCard } from './resultcard/ResultCard';

const results = [
  {
    badge: 'SEO',
    logo: 'img/logo/proven_result_merries.png',
    percentage: '+80%',
    title: 'Organic Traffic Growth',
    description: 'As a top baby care brand in Indonesia, Merries is dedicated to simplifying motherhood by offering seamless experiences. Leverate was entrusted with the task of driving high-quality traffic to a new, SEO-optimized website and strategic...',
    metrics: [
      {
        value: '+80%',
        label: 'Organic Traffic Growth'
      },
      {
        value: '#1',
        label: "Keywords visibility on first page Google's Search Engine Result page"
      }
    ],
    features: [
      'SEO-driven content',
      'Premium backlink',
      'Optimizing underperforming pages'
    ]
  },
  {
    badge: 'SEO',
    logo: 'img/logo/proven_result_brimo.png',
    percentage: '+5.3%',
    title: 'Store Listing Visitors',
    description: 'As a top baby care brand in Indonesia, Merries is dedicated to simplifying motherhood by offering seamless experiences. Leverate was entrusted with the task of driving high-quality traffic to a new, SEO-optimized website and strategic...',
    metrics: [
      {
        value: '+80%',
        label: 'Organic Traffic Growth'
      },
      {
        value: '#1',
        label: "Keywords visibility on first page Google's Search Engine Result page"
      }
    ],
    features: [
      'SEO-driven content',
      'Premium backlink',
      'Optimizing underperforming pages'
    ]
  },
  {
    badge: 'SEO',
    logo: 'img/logo/proven_result_msig.png',
    percentage: '+223%',
    title: 'Organic Traffic Growth',
    description: 'As a top baby care brand in Indonesia, Merries is dedicated to simplifying motherhood by offering seamless experiences. Leverate was entrusted with the task of driving high-quality traffic to a new, SEO-optimized website and strategic...',
    metrics: [
      {
        value: '+80%',
        label: 'Organic Traffic Growth'
      },
      {
        value: '#1',
        label: "Keywords visibility on first page Google's Search Engine Result page"
      }
    ],
    features: [
      'SEO-driven content',
      'Premium backlink',
      'Optimizing underperforming pages'
    ]
  }
];

export default function ProvenResult() {
return (
    <main id="proven-results" className="min-h-screen bg-white py-16 mt-12">
        <div className="container mx-auto px-4">
        <h1 className="text-6xl font-bold text-center mb-12">Proven Results</h1>
        
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((result, index) => (
                <ResultCard key={index} {...result} />
            ))}
            </div>
        </div>
    </main>
    );
}