import { Metadata } from "next";
import { getPublicJob } from "@/lib/jobs";
import {
  generateJobSchema,
  stripMarkdown,
  generateJobTitle,
  extractJobKeywords,
  generateLocationDescription,
} from "@/lib/seo";

type Props = {
  params: Promise<{ jobId: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { jobId } = await params;
    const job = await getPublicJob(jobId);

    if (!job) {
      return {
        title: "Job Not Found",
        description: "The job posting you are looking for could not be found.",
      };
    }

    const companyName = job.company?.name || "Company";
    const title = generateJobTitle(job.title, companyName);
    const locationDesc = generateLocationDescription(job);
    const descriptionBase = stripMarkdown(job.description, 120);
    const description = `${locationDesc}. ${descriptionBase}`;
    const keywords = extractJobKeywords(job);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://thesubtribe.com";
    const jobUrl = `${baseUrl}/apply/${job.slug}`;
    const logoUrl = job.company?.logo_url;

    return {
      title,
      description,
      keywords, // SEO keywords for search engines
      openGraph: {
        title,
        description,
        type: "website",
        url: jobUrl,
        siteName: "Subtribe ATS",
        locale: "en_US",
        ...(logoUrl && {
          images: [
            {
              url: logoUrl,
              width: 1200,
              height: 630,
              alt: `${companyName} logo`,
            },
          ],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(logoUrl && {
          images: [logoUrl],
        }),
      },
      alternates: {
        canonical: jobUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch {
    return {
      title: "Job Posting",
      description: "View job details and apply.",
    };
  }
}

export default async function ApplyJobLayout({ params, children }: Props) {
  const { jobId } = await params;

  return (
    <>
      {/* Inject JSON-LD structured data */}
      <JsonLdScript jobId={jobId} />
      {children}
    </>
  );
}

// Separate component to inject JSON-LD script
async function JsonLdScript({ jobId }: { jobId: string }) {
  try {
    const job = await getPublicJob(jobId);

    if (!job || job.status === "draft") {
      return null;
    }

    const schema = generateJobSchema(job);

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    );
  } catch {
    return null;
  }
}
