import Link from 'next/link';
import Image from 'next/image';

type Tag = {
  name: string; // Stored as JSON string, e.g., '{"en": "Finance"}'
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
  tags: Tag[];
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
            <Link href={`/insights/${post.slug}`} className="block">
              <div className="flex-shrink-0 w-24 h-16 rounded-lg bg-gray-200 shadow overflow-hidden relative">
                <Image
                  src={post.image || '/img/no-image.png'}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  priority
                />
              </div>
            </Link>

            <div>
              <Link href={`/insights/${post.slug}`} className="text-blue-600 block">
                <h3 className="text-blue-600 font-medium text-lg leading-snug">
                  {post.title}
                </h3>
              </Link>

              {/* Tags */}
              <div className="mt-1">
                {post.tags.map((tag, i) => {
                  let tagText = '';
                  try {
                    const parsed = JSON.parse(tag.name);
                    tagText = parsed.en || tag.name;
                  } catch {
                    tagText = tag.name;
                  }

                  return (
                    <span
                      key={i}
                      className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded me-2 capitalize"
                    >
                      {tagText}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
