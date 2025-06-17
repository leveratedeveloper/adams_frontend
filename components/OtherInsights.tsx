
import Link from 'next/link';
import Image from 'next/image';


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

type Props = {
    posts: Insights[];
};


export default function OtherInsights({ posts }: Props) {
  return (
    <section className="mt-6 px-4 md:px-0 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Other Insights</h3>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center gap-4">
            <Link href={post.slug} className="" >
            <div className="flex-shrink-0 w-24 h-16 rounded-lg bg-green-200 shadow overflow-hidden relative">
              <Image
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>
            </Link>

            <div>
            <Link href={post.slug} className="text-blue-600" >
              <h3 className="text-blue-600 font-medium text-lg leading-snug">{post.title}</h3>
              </Link>
              
              {post.tags.map(tag => 
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded me-2 capitalize">
                    {JSON.parse(tag.name).en}
                    </span>
                )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
