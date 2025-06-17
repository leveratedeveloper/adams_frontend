import Header from '@/components/general/header';
import { Footer } from '@/components/Footer';
import OtherInsights from '@/components/OtherInsights';
import Image from 'next/image';
import ExpandableContent from '@/components/ExpandableContent';


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
};

type Insights = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  is_featured: boolean;
  published_at: string;
  seo_title: string;
  seo_description: string;
};

export function getOtherArticles(allArticles: Insights[], currentSlug: string): Insights[] {
  return allArticles.filter(article => article.slug !== currentSlug);
}

export function convertMarkdownToHtml(text: string): string {
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

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const res = await fetch(
    process.env.CMS_ENDPOINT+ `/api/admin/blog/posts/${params.slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div>Blog not found</div>;
  }

  const json = await res.json();
  const post: InsightDetail[] = json.data || json.results || [];

  const date = new Date(post.published_at);
  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  const ins = await fetch(
    process.env.CMS_ENDPOINT + '/api/admin/blog/posts', { cache: 'no-store' });
  const jsonPosts = await ins.json();
  const allPosts: Insights[] = jsonPosts.data || jsonPosts.results || [];
  const otherPosts = getOtherArticles(allPosts, params.slug).slice(0, 5);
  const html = convertMarkdownToHtml(post.content);

  return (
    <>
    <div className="relative max-h-screen w-full">
          <Header />
    <main className="relative z-10 items-center justify-center min-h-screen">
    <div className="container container-blog-detail mx-auto text-gray-700" style={{ paddingTop: '15vh', paddingBottom: '15vh' }}>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-10">
        <a href="/insights" className="text-blue-600 hover:underline">
          Insights
        </a>
        <span> / </span>
        <span className="font-medium">{post.title}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold leading-tight mb-2 text-center">
      {post.title}
      </h1>
      <p className="text-sm text-gray-500 mb-6 text-center">{post.author.name} • {formatted}</p>

      {/* Hero Image */}
      <div className="w-full h-72 relative rounded overflow-hidden mb-8">
        <Image
          src={post.image || '/img/no-image.png'}
          alt={post.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Article Content */}
      <ExpandableContent html={html} limit={700} />

      {/* Other Blogs */}
      <div className="mt-16 border-t">
        <OtherInsights posts={otherPosts} />
      </div>
    </div>
    </main>
    <Footer />
    </div>
    </>
  );
}
