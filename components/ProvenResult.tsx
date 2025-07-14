import { ResultCard } from './resultcard/ResultCard';

const results = [
  {
    badge: 'SEO',
    logo: 'img/logo/proven_result_merries.png',
    percentage: '+80%',
    title: 'Organic Traffic Growth',
    subtitle: 'Merries',
    description: 'As a top baby care brand in Indonesia, Merries is dedicated to simplifying motherhood by offering seamless experiences. We were entrusted with the task of driving high-quality traffic to a new, SEO-optimized website and strategically funneling this traffic to Merries’ newsletter signups to support broader business goals. Ranking for health-related keywords is challenging due to the competition from established institutions.',
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
      'Premium Backlink',
      'Optimizing underperforming pages'
    ]
  },
  {
    badge: 'ASO',
    logo: 'img/logo/proven_result_brimo.png',
    percentage: '+5.3%',
    title: 'Store Listing Visitors',
    subtitle: 'BRImo',
    description: 'Amid rising competition in the mobile banking industry, it’s essential for BRI’s BRImo app to stay ahead in App Store rankings. We were entrusted with this task, focusing on improving BRImo’s performance in mobile app stores like the Apple App Store and Google Play Store',
    metrics: [
      {
        value: '+5.3%',
        label: 'Store listing visitors'
      },
      {
        value: '+2.5%',
        label: "Organic app installs"
      }
    ],
    features: [
      'App title and description optimization',
      'High quality backlinks',
      'Creative improvements'
    ]
  },
  {
    badge: 'SEO',
    logo: 'img/logo/proven_result_msig.png',
    percentage: '+223%',
    title: 'Organic Traffic Growth',
    subtitle: 'MSIG Life',
    description: 'The insurance industry is highly competitive, and this extends to Google search rankings. Operating within the finance and health niches means MSIG must compete not only with other insurance companies but also with established health and financial publishers that dominate their respective domains. We were tasked with ensuring the website achieves visibility on Google for six highly competitive priority keywords while also boosting organic traffic.',
    metrics: [
      {
        value: '+223%',
        label: 'Organic Traffic Growth'
      },
      {
        value: '#1',
        label: "Keywords visibility on first page Google's Search Engine Result page"
      }
    ],
    features: [
      'SEO-driven content',
      'Premium Backlink',
      'Optimizing underperforming pages'
    ]
  }
];

export default function ProvenResult() {
return (
    <main id="proven-results"  className="py-28 rounded bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-left mb-12"  style={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>Proven Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((result, index) => (
                <ResultCard key={index} {...result} />
            ))}
            </div>
        </div>
    </main>
    );
}