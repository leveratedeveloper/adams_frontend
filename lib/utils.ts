import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export async function getInsightsArticles() {
  
  const res = await fetch(
    process.env.CMS_ENDPOINT+'/api/admin/blog/posts', {
    cache: 'no-store', // disables ISR for fresh data
  });

  const data = await res.json()
  return data
}