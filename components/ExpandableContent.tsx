'use client';

import { useState } from 'react';
import styles from '@/app/insights/[slug]/page.module.css';

export default function ExpandableContent({ html, limit = 500 }: { html: string; limit?: number }) {
  const [expanded, setExpanded] = useState(false);

  const shortened = html.slice(0, limit);
  const isLong = html.length > limit;

  return (
    <div className="text-sm text-gray-800 leading-relaxed">
      <div className={styles.blog_detail} dangerouslySetInnerHTML={{ __html: expanded ? html : shortened + (isLong ? '...' : '') }} />
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-blue-600 font-medium hover:underline"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
