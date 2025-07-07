'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import Header from '@/components/general/header';
import { Footer } from '@/components/Footer';
import OtherInsights from '@/components/OtherInsights';
import ExpandableContent from '@/components/ExpandableContent';

type Tag = {
  name: string; // Stored as JSON string, e.g., '{"en": "Finance"}'
};

type InsightDetail = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  is_featured: boolean;
  published_at: string;
  seo_title: string;
  seo_description: string;
  author?: { name: string };
};

type Insights = InsightDetail & {
  content_overview: string;
  tags: Tag[];
};

function getOtherArticles(allArticles: Insights[], currentSlug: string): Insights[] {
  return allArticles.filter(article => article.slug !== currentSlug);
}

function convertMarkdownToHtml(text: string): string {
  return text
    .replace(/\d+\.\s(.*?)(?=\s\d+\.|$)/g, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>)+/g, match => `<ol>${match}</ol>`)
    .replace(/(?:^|\s)\*\s(.*?)(?=\s\*|$)/g, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>)+/g, match => `<ul>${match}</ul>`)
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/~~(.*?)~~/gim, '<del>$1</del>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
    .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\n$/gim, '<br />');
}

export default function BlogDetail() {
  const { slug } = useParams() as { slug: string };

  const [post, setPost] = useState<InsightDetail | null>(null);
  const [otherPosts, setOtherPosts] = useState<Insights[]>([]);
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_CMS_ENDPOINT + `/api/admin/blog/posts/${slug}`,
          { cache: 'no-store' }
        );

        if (!res.ok) {
          setPost(null);
          return;
        }

        const json = await res.json();
        const postData: InsightDetail = json.data || json.results;
        setPost(postData);
        // setHtml(convertMarkdownToHtml(postData.content));
        setHtml(convertMarkdownToHtml(postData.content.replace(/white-space:\s*pre;?/gi, '')) );

        const ins = await fetch(
          process.env.NEXT_PUBLIC_CMS_ENDPOINT + `/api/admin/blog/posts`,
          { cache: 'no-store' }
        );
        const jsonPosts = await ins.json();
        const allPosts: Insights[] = jsonPosts.data || jsonPosts.results || [];
        setOtherPosts(getOtherArticles(allPosts, slug).slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [slug]);

  if (!post) {
    return <div>Blog not found</div>;
  }

  const date = new Date(post.published_at);
  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative max-h-screen w-full">
      <Header />
      <main className="relative z-10 items-center justify-center min-h-screen">
        <div
          className="container container-blog-detail mx-auto text-gray-700"
          style={{ paddingTop: '15vh', paddingBottom: '15vh' }}
        >
          <div className="text-sm text-gray-500 mb-10">
            <a href="/insights" className="text-blue-600 hover:underline">
              Insights
            </a>
            <span> / </span>
            <span className="font-medium">{post.title}</span>
          </div>

          <h1 className="text-3xl font-semibold leading-tight mb-2 text-center">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            {post.author?.name} • {formatted}
          </p>

          <div className="w-full h-72 relative rounded overflow-hidden mb-8">
            <Image
              src={post.image || '/img/no-image.png'}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <ExpandableContent html={html} limit={5000} />

          <div className="mt-8 border-t">
            {!otherPosts.length 
              ? null
              : <OtherInsights posts={otherPosts} />}
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
