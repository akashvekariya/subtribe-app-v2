import { Job } from "@/types";

/**
 * Maps internal position types to schema.org JobPosting employmentType values
 */
export function mapPositionType(type: string): string {
  const mapping: Record<string, string> = {
    full_time: "FULL_TIME",
    part_time: "PART_TIME",
    contract: "CONTRACTOR",
    temporary: "TEMPORARY",
    internship: "INTERN",
    volunteer: "VOLUNTEER",
    other: "OTHER",
  };
  return mapping[type] || "FULL_TIME";
}

/**
 * Generates JSON-LD structured data for a job posting
 * Follows schema.org/JobPosting specification for better SEO
 */
export function generateJobSchema(job: Job) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.created_at,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company?.name || "Company",
      ...(job.company?.website_url && { sameAs: job.company.website_url }),
      ...(job.company?.logo_url && { logo: job.company.logo_url }),
    },
    employmentType: mapPositionType(job.position_type),
  };

  // Add job location
  if (job.location_type === "remote") {
    schema.jobLocationType = "TELECOMMUTE";
    if (job.location_country) {
      schema.applicantLocationRequirements = {
        "@type": "Country",
        name: job.location_country,
      };
    }
  } else {
    // For hybrid/onsite positions
    const address: Record<string, unknown> = {
      "@type": "PostalAddress",
    };

    if (job.location_city) address.addressLocality = job.location_city;
    if (job.location_state) address.addressRegion = job.location_state;
    if (job.location_country) address.addressCountry = job.location_country;

    if (Object.keys(address).length > 1) {
      schema.jobLocation = {
        "@type": "Place",
        address,
      };
    }
  }

  // Add salary information (if available and appropriate for public display)
  if (
    job.salary_min !== undefined &&
    job.salary_max !== undefined &&
    job.salary_min !== null &&
    job.salary_max !== null
  ) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.salary_currency || "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salary_min,
        maxValue: job.salary_max,
        unitText: "YEAR",
      },
    };
  }

  // Add skills and qualifications
  if (job.required_skills && job.required_skills.length > 0) {
    schema.skills = job.required_skills.join(", ");
    schema.qualifications = job.required_skills.join(", ");
  }

  // Add experience requirements
  if (
    job.min_experience_years !== undefined &&
    job.min_experience_years !== null
  ) {
    schema.experienceRequirements = {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: job.min_experience_years * 12,
    };
  }

  return schema;
}

/**
 * Strips HTML and markdown from text for meta descriptions
 */
export function stripMarkdown(text: string, maxLength: number = 160): string {
  return text
    .replace(/[#*_~`\[\]]/g, "") // Remove markdown characters
    .replace(/\n/g, " ") // Replace newlines with spaces
    .trim()
    .substring(0, maxLength);
}

/**
 * Generates SEO-friendly title format
 * Format: "Job Title | Company Name | Powered by Subtribe"
 */
export function generateJobTitle(
  jobTitle: string,
  companyName: string
): string {
  return `${jobTitle} | ${companyName} | Powered by Subtribe`;
}

/**
 * Extracts keywords from job data for SEO
 * Includes: title words, location, skills, position type, experience level
 */
export function extractJobKeywords(job: Job): string {
  const keywords: string[] = [];

  // Add job title words (split and clean)
  const titleWords = job.title
    .split(/[\s,]+/)
    .filter((word) => word.length > 2)
    .map((word) => word.toLowerCase());
  keywords.push(...titleWords);

  // Add location keywords
  if (job.location_city) keywords.push(job.location_city.toLowerCase());
  if (job.location_state) keywords.push(job.location_state.toLowerCase());
  if (job.location_country) keywords.push(job.location_country.toLowerCase());

  // Add location type
  keywords.push(job.location_type); // remote, hybrid, onsite

  // Add position type
  const positionTypeLabel = job.position_type.replace("_", " ");
  keywords.push(positionTypeLabel); // full time, part time, etc.

  // Add experience level if available
  if (job.experience_level) {
    keywords.push(job.experience_level); // entry, mid, senior, etc.
  }

  // Add department
  if (job.department) {
    keywords.push(job.department.toLowerCase());
  }

  // Add all required skills (most important for SEO)
  if (job.required_skills && job.required_skills.length > 0) {
    keywords.push(...job.required_skills.map((skill) => skill.toLowerCase()));
  }

  // Add preferred skills
  if (job.preferred_skills && job.preferred_skills.length > 0) {
    keywords.push(...job.preferred_skills.map((skill) => skill.toLowerCase()));
  }

  // Add company name
  if (job.company?.name) {
    keywords.push(job.company.name.toLowerCase());
  }

  // Remove duplicates and join
  const uniqueKeywords = [...new Set(keywords)];
  return uniqueKeywords.join(", ");
}

/**
 * Generates location-specific description text for better local SEO
 */
export function generateLocationDescription(job: Job): string {
  if (job.location_type === "remote") {
    const country = job.location_country || "Worldwide";
    return `Remote ${job.title} position available ${country !== "Worldwide" ? `in ${country}` : "globally"}`;
  }

  const locationParts = [
    job.location_city,
    job.location_state,
    job.location_country,
  ].filter(Boolean);

  if (locationParts.length > 0) {
    const location = locationParts.join(", ");
    const workType = job.location_type === "hybrid" ? "Hybrid" : "Onsite";
    return `${workType} ${job.title} position in ${location}`;
  }

  return `${job.title} position`;
}
