// 'use client';

import Header from '@/components/general/header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { parseTags } from '../utils/parseTags';


export const metadata: Metadata = {
    title: 'Blog Insights',
  };

  type Insights = {
    id: string;
    title: string;
    slug: string;
    content: string;
    content_overview: string;
    image: string;
    is_featured: boolean;
    published_at: string;
    seo_title: string;
    seo_description: string;
    tags: string;
  };

export default async function Insight() {
    const res = await fetch(
        process.env.CMS_ENDPOINT+'/api/admin/blog/posts', {
        cache: 'no-store', // disables ISR for fresh data
      });
    
      if (!res.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const json = await res.json();
      const data: Insights[] = json.data || json.results || [];
    
      console.log("ini data",data)
  return (
      <div className="relative max-h-screen w-full">
                      <Header />
      <main className="relative z-10 items-center justify-center min-h-screen">

        <div className="container mx-auto text-gray-700" style={{ paddingTop: '15vh', paddingBottom: '15vh' }}>
          <h2 className="text-3xl font-medium mb-4">Released Insights</h2>
          <p className="text-sm text-gray-600 mb-8">Discover expert tips, industry updates, and actionable strategies to boost your SEO performance. Stay ahead with the latest trends in search, content marketing, and digital growth.</p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((post, index) => (
              <div key={index} className="space-y-2">
                <Link href={`insights/${post.slug}`} className="text-blue-500 hover:text-blue-700 transition-colors">
                <div className="w-full h-72 relative rounded overflow-hidden" style={{ height: '175px' }}>
                  <Image
                    src={post.image || '/img/no-image.png'}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                </Link>
                
                {parseTags(post.tags).map((tagName, index) => (
                    <span
                      key={index}
                      className="inline-block text-xs font-medium px-2.5 py-0.5 rounded me-2 capitalize"
                      style={{ backgroundColor: '#EBF1FF', color: '#0E52DA' }}
                    >
                      {tagName}
                    </span>
                  ))}

                
                <Link href={`insights/${post.slug}`} className="transition-colors">
                    <h3 className="font-semibold text-sm mt-3">{post.title}</h3>
                </Link>
                <p className="text-xs text-gray-500">
                  {(post.content_overview ?? '').slice(0, 100) }
                </p>
              </div>
            ))}
          </div>
          </div>
      </main>
      <Footer />
      </div>
  );
}
