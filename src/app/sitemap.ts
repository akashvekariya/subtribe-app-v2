import { MetadataRoute } from "next";

/**
 * Sitemap for Subtribe ATS
 *
 * Currently serves homepage only. Job listings will be added later when:
 * 1. Backend implements /public/jobs endpoint
 * 2. Public jobs listing page is created
 *
 * This prevents false impression of platform not working correctly
 * (showing empty job list would be confusing for users)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://thesubtribe.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}

/**
 * Future Enhancement (TODO):
 *
 * When ready to add public job listings:
 *
 * 1. Backend creates GET /public/jobs endpoint that returns:
 *    { data: [{ slug, created_at, updated_at, title, ... }] }
 *
 * 2. Frontend creates public jobs listing page at /jobs
 *
 * 3. Uncomment and update this code:
 *
 * ```typescript
 * export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 *   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://thesubtribe.com";
 *
 *   let jobs = [];
 *   try {
 *     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/jobs`, {
 *       next: { revalidate: 3600 }
 *     });
 *     if (response.ok) {
 *       const data = await response.json();
 *       jobs = data.data || [];
 *     }
 *   } catch (error) {
 *     console.error('Sitemap fetch failed:', error);
 *   }
 *
 *   return [
 *     { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
 *     { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
 *     ...jobs.map(job => ({
 *       url: `${baseUrl}/apply/${job.slug}`,
 *       lastModified: new Date(job.updated_at || job.created_at),
 *       changeFrequency: 'weekly',
 *       priority: 0.8
 *     }))
 *   ];
 * }
 * ```
 */
