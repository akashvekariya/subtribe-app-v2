"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job } from "@/types";
import { getPublicJob } from "@/lib/jobs";
import { api } from "@/lib/api-client";
import { applicationSchema, type ApplicationInput } from "@/lib/validations";
import showToast from "@/lib/toast";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/shared/FormField";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { MinimalFooter } from "@/components/shared/MinimalFooter";
import {
  DocumentArrowUpIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { formatRelativeTime, formatApplicantCount } from "@/lib/format";

// Helper functions for formatting job metadata
const formatLocation = (job: Job) => {
  if (job.location_type === "remote") {
    return job.location_country ? `Remote (${job.location_country})` : "Remote";
  }
  const parts = [job.location_city, job.location_state].filter(Boolean);
  return parts.length > 0
    ? `${job.location_type === "hybrid" ? "Hybrid" : "Onsite"} · ${parts.join(", ")}`
    : job.location_type;
};

const formatExperienceRange = (job: Job) => {
  if (
    job.min_experience_years !== undefined &&
    job.max_experience_years !== undefined
  ) {
    return `${job.min_experience_years}-${job.max_experience_years} years`;
  } else if (job.min_experience_years !== undefined) {
    return `${job.min_experience_years}+ years`;
  } else if (job.max_experience_years !== undefined) {
    return `Up to ${job.max_experience_years} years`;
  }
  return null;
};

const formatPositionType = (type: string) => {
  const labels: Record<string, string> = {
    full_time: "Full Time",
    part_time: "Part Time",
    contract: "Contract",
    temporary: "Temporary",
    other: "Other",
    volunteer: "Volunteer",
    internship: "Internship",
  };
  return labels[type] || type;
};

const formatExperienceLevel = (level: string) => {
  const labels: Record<string, string> = {
    entry: "Entry Level",
    mid: "Mid Level",
    senior: "Senior",
    lead: "Lead",
    principal: "Principal",
  };
  return labels[level] || level;
};

export default function ApplyJobPage() {
  const params = useParams();
  const slug = params.jobId as string;

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<ApplicationInput | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema) as Resolver<ApplicationInput>,
    defaultValues: {
      screening_answers: {},
      terms_accepted: true,
    },
  });

  const resumeFile = watch("resume");
  const selectedCurrency = job?.salary_currency || "USD";

  useEffect(() => {
    const loadJob = async () => {
      if (slug) {
        try {
          const jobData = await getPublicJob(slug);
          setJob(jobData);
        } catch {
          // Silently fail - error state is handled by checking if job is null
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadJob();
  }, [slug]);

  async function handleConfirmSubmit() {
    if (!job || !pendingData) return;

    const data = pendingData;

    try {
      setIsSubmitting(true);
      setShowConfirmDialog(false);
      setPendingData(null);

      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);

      if (data.phone) formData.append("phone", data.phone);
      if (data.linkedin_url) formData.append("linkedin_url", data.linkedin_url);
      if (data.github_url) formData.append("github_url", data.github_url);
      if (data.portfolio_url)
        formData.append("portfolio_url", data.portfolio_url);
      if (data.current_ctc)
        formData.append("current_ctc", data.current_ctc.toString());
      if (data.expected_ctc)
        formData.append("expected_ctc", data.expected_ctc.toString());
      if (data.notice_period_days)
        formData.append(
          "notice_period_days",
          data.notice_period_days.toString()
        );
      if (data.cover_letter) formData.append("cover_letter", data.cover_letter);

      if (
        data.screening_answers &&
        Object.keys(data.screening_answers).length > 0
      ) {
        formData.append(
          "screening_answers",
          JSON.stringify(data.screening_answers)
        );
      }

      formData.append("resume", data.resume);

      await api.applications.submitApplication(slug, formData);

      showToast.success("Application submitted successfully!");
      setSubmitted(true);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      showToast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function onSubmit(data: ApplicationInput) {
    setPendingData(data);
    setShowConfirmDialog(true);
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg-base)" }}
      >
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2"
          style={{ borderColor: "var(--color-primary)" }}
        ></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg-alt)" }}
      >
        <div className="text-center">
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Job not found
          </h3>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            This job posting doesn&apos;t exist or is no longer available.
          </p>
        </div>
      </div>
    );
  }

  // Don't show draft jobs to public
  if (job.status === "draft") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg-alt)" }}
      >
        <div className="text-center">
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Job not found
          </h3>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            This job posting doesn&apos;t exist or is no longer available.
          </p>
        </div>
      </div>
    );
  }

  const isActivelyRecruiting = job.status === "active";
  const showApplicationForm = job.status === "active";

  // Share button handler
  const handleShare = () => {
    const baseUrl = window.location.href.split("?")[0];
    const utmParams = new URLSearchParams({
      utm_source: "job_page",
      utm_medium: "share_button",
      utm_campaign: "job_sharing",
    });

    const shareUrl = `${baseUrl}?${utmParams.toString()}`;

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        showToast.success("Link copied to clipboard!");
      })
      .catch(() => {
        showToast.error("Failed to copy link");
      });
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg-alt)" }}
      >
        <div
          className="max-w-md w-full p-8 rounded-2xl"
          style={{
            backgroundColor: "var(--color-bg-base)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="text-center">
            <CheckCircleIcon
              className="mx-auto h-12 w-12"
              style={{ color: "var(--color-success)" }}
            />
            <h2
              className="mt-4 text-xl font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Application Submitted Successfully!
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text)" }}>
              Thank you for your interest in the <strong>{job.title}</strong>{" "}
              position. We&apos;ve received your application and will review it
              shortly.
            </p>
            <p
              className="mt-4 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              You should receive a confirmation email within the next few
              minutes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg-alt)" }}
    >
      <div className="max-w-4xl mx-auto py-4 sm:py-8 px-0 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="rounded-none sm:rounded-2xl mb-6 sm:mb-8 border"
          style={{
            backgroundColor: "var(--color-bg-base)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            {/* Company Branding */}
            {job.company && (
              <div
                className="flex items-center gap-4 mb-6 pb-5"
                style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}
              >
                {job.company.logo_url ? (
                  <Image
                    src={job.company.logo_url}
                    alt={job.company.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover border-2 flex-shrink-0"
                    style={{ borderColor: "var(--color-border)" }}
                  />
                ) : (
                  <div
                    className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
                    style={{
                      backgroundColor: "var(--color-bg-subtle)",
                      color: "var(--color-text-primary)",
                      border: "2px solid var(--color-border)",
                    }}
                  >
                    {job.company.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div
                  className="flex-1 min-w-0 flex flex-col justify-center"
                  style={{ marginTop: "-0.125rem" }}
                >
                  <h3
                    className="text-lg font-bold leading-tight"
                    style={{
                      color: "var(--color-text-primary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {job.company.name}
                  </h3>
                  {job.company.tagline && (
                    <p
                      className="text-sm leading-tight"
                      style={{
                        color: "var(--color-text-secondary)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {job.company.tagline}
                    </p>
                  )}
                  {job.company.website_url && (
                    <a
                      href={job.company.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline inline-flex items-center gap-1 leading-tight"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Visit website
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Job Title + Share Button */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1
                className="text-2xl sm:text-3xl font-bold flex-1"
                style={{ color: "var(--color-text-primary)" }}
              >
                {job.title}
              </h1>

              <button
                onClick={handleShare}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  color: "var(--color-text-secondary)",
                  backgroundColor: "var(--color-bg-subtle)",
                  border: "1px solid var(--color-border)",
                }}
                aria-label="Share job"
                title="Share job"
              >
                <ShareIcon className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Supplementary Metadata Line */}
            <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600 mb-4">
              <span>{formatRelativeTime(job.created_at)}</span>
              <span>•</span>
              <span>{formatApplicantCount()}</span>
              <span>•</span>
              {isActivelyRecruiting ? (
                <span className="text-green-600 font-medium">
                  Actively recruiting
                </span>
              ) : (
                <span className="text-gray-500">Not actively recruiting</span>
              )}
            </div>

            {/* Metadata Tags */}
            <div
              className="flex flex-wrap gap-2 mb-6 pb-8"
              style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}
            >
              {/* Location */}
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "var(--color-bg-subtle)",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                📍
                <span>
                  <span style={{ opacity: 0.7 }}>Workplace:</span>{" "}
                  {formatLocation(job)}
                </span>
              </span>

              {/* Position Type */}
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "var(--color-bg-subtle)",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                💼
                <span>
                  <span style={{ opacity: 0.7 }}>Type:</span>{" "}
                  {formatPositionType(job.position_type)}
                </span>
              </span>

              {/* Experience Level */}
              {job.experience_level && (
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "var(--color-bg-subtle)",
                    color: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  👾
                  <span>
                    <span style={{ opacity: 0.7 }}>Level:</span>{" "}
                    {formatExperienceLevel(job.experience_level)}
                  </span>
                </span>
              )}

              {/* Experience Range */}
              {formatExperienceRange(job) && (
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "var(--color-bg-subtle)",
                    color: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  🪄
                  <span>
                    <span style={{ opacity: 0.7 }}>Experience:</span>{" "}
                    {formatExperienceRange(job)}
                  </span>
                </span>
              )}

              {/* Department */}
              {job.department && (
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "var(--color-bg-subtle)",
                    color: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  🏢
                  <span>
                    <span style={{ opacity: 0.7 }}>Department:</span>{" "}
                    {job.department}
                  </span>
                </span>
              )}
            </div>

            {/* Job Description */}
            <div className="mt-8">
              <h2
                className="text-lg sm:text-xl font-semibold mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                Job Description
              </h2>
              <MarkdownRenderer
                content={job.description}
                className="max-w-none"
                style={{
                  color: "var(--color-text)",
                  fontSize: "0.9375rem",
                  lineHeight: "1.6",
                  letterSpacing: "0",
                  wordSpacing: "normal",
                }}
              />
            </div>

            {/* Skills Section */}
            {((job.required_skills && job.required_skills.length > 0) ||
              (job.preferred_skills && job.preferred_skills.length > 0)) && (
              <div
                className="pt-6 mt-6"
                style={{ borderTop: "1px solid rgba(0, 0, 0, 0.05)" }}
              >
                {/* Required Skills */}
                {job.required_skills && job.required_skills.length > 0 && (
                  <div className="mb-6">
                    <h2
                      className="text-lg sm:text-xl font-semibold mb-3"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Required Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {job.required_skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: "var(--color-bg-subtle)",
                            color: "var(--color-text-primary)",
                            border: "1px solid var(--color-border)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preferred Skills */}
                {job.preferred_skills && job.preferred_skills.length > 0 && (
                  <div>
                    <h2
                      className="text-lg sm:text-xl font-semibold mb-3"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Nice to Have
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {job.preferred_skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: "var(--color-bg-subtle)",
                            color: "var(--color-text-primary)",
                            border: "1px solid var(--color-border)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Application Form - Only show if job is active */}
        {showApplicationForm ? (
          <div
            id="application-form"
            className="rounded-none sm:rounded-2xl"
            style={{
              backgroundColor: "var(--color-bg-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="px-4 py-5 sm:px-8 sm:py-10">
              <div>
                <div className="mb-6">
                  <h2
                    className="text-lg sm:text-xl font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Application Details
                  </h2>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Please fill out all required fields to submit your
                    application.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Resume Upload */}
                  <label htmlFor="resume" className="block cursor-pointer">
                    <div
                      className="space-y-3 p-8 rounded-2xl border-2 border-dashed hover:border-primary transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-bg-alt)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <DocumentArrowUpIcon
                          className="h-8 w-8"
                          style={{ color: "var(--color-text-secondary)" }}
                        />
                      </div>
                      <div className="text-center">
                        <p
                          className="text-base font-semibold"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          Upload Resume/CV{" "}
                          <span style={{ color: "var(--color-error)" }}>*</span>
                        </p>
                        <p
                          className="mt-1 text-sm"
                          style={{ color: "var(--color-text)" }}
                        >
                          PDF format only, maximum 5MB
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <input
                          id="resume"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setValue("resume", file);
                              clearErrors("resume");
                            }
                          }}
                        />
                        <div
                          className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors pointer-events-none"
                          style={{
                            borderColor: "var(--color-border)",
                            color: "var(--color-text-primary)",
                            backgroundColor: "var(--color-bg-surface)",
                          }}
                        >
                          <DocumentTextIcon className="h-5 w-5 mr-2" />
                          {resumeFile ? "Change File" : "Choose File"}
                        </div>
                        {resumeFile && (
                          <div
                            className="mt-3 flex items-center space-x-2 text-sm px-3 py-2 rounded-xl"
                            style={{
                              color: "var(--color-primary)",
                              backgroundColor: "rgba(0, 70, 255, 0.08)",
                            }}
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                            <span className="font-medium">
                              {resumeFile.name}
                            </span>
                          </div>
                        )}
                      </div>
                      {errors.resume && (
                        <p
                          className="text-sm text-center"
                          style={{ color: "var(--color-error)" }}
                        >
                          {errors.resume.message}
                        </p>
                      )}
                    </div>
                  </label>

                  {/* Personal Information */}
                  <div
                    className="space-y-5 pt-6 mt-2"
                    style={{ borderTop: "1px solid rgba(0, 0, 0, 0.05)" }}
                  >
                    <h3
                      className="text-base font-semibold flex items-center gap-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {/* <UserIcon className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} /> */}
                      👤 Personal Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        id="first_name"
                        label="First Name"
                        placeholder="John"
                        required
                        error={errors.first_name?.message}
                        {...register("first_name")}
                      />

                      <FormField
                        id="last_name"
                        label="Last Name"
                        placeholder="Doe"
                        required
                        error={errors.last_name?.message}
                        {...register("last_name")}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        required
                        error={errors.email?.message}
                        {...register("email")}
                      />

                      <FormField
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        required
                        error={errors.phone?.message}
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  {/* Professional Links */}
                  <div
                    className="space-y-5 pt-6 mt-2"
                    style={{ borderTop: "1px solid rgba(0, 0, 0, 0.05)" }}
                  >
                    <h3
                      className="text-base font-semibold flex items-center gap-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {/* <LinkIcon className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} /> */}
                      🔗 Professional Links
                    </h3>

                    <FormField
                      id="linkedin_url"
                      label="LinkedIn Profile"
                      type="url"
                      placeholder="https://linkedin.com/in/johndoe"
                      required
                      error={errors.linkedin_url?.message}
                      {...register("linkedin_url")}
                    />

                    <FormField
                      id="github_url"
                      label="GitHub Profile"
                      type="url"
                      placeholder="https://github.com/johndoe"
                      error={errors.github_url?.message}
                      {...register("github_url")}
                    />

                    <FormField
                      id="portfolio_url"
                      label="Portfolio/Website"
                      type="url"
                      placeholder="https://yourportfolio.com"
                      error={errors.portfolio_url?.message}
                      {...register("portfolio_url")}
                    />
                  </div>

                  {/* Compensation & Availability */}
                  <div
                    className="space-y-5 pt-6 mt-2"
                    style={{ borderTop: "1px solid rgba(0, 0, 0, 0.05)" }}
                  >
                    <h3
                      className="text-base font-semibold flex items-center gap-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {/* <BanknotesIcon className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} /> */}
                      💰 Compensation & Availability
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col">
                        <Label
                          htmlFor="current_ctc"
                          className="mb-2"
                          style={{
                            fontSize: "var(--label-font-size)",
                            fontWeight: "var(--label-font-weight)",
                          }}
                        >
                          Current CTC ({selectedCurrency})
                        </Label>
                        <Input
                          id="current_ctc"
                          type="number"
                          step="1000"
                          placeholder="e.g. 50000"
                          hasError={!!errors.current_ctc}
                          {...register("current_ctc", { valueAsNumber: true })}
                        />
                        {errors.current_ctc && (
                          <p
                            className="text-xs mt-1.5"
                            style={{
                              color: "var(--color-error)",
                              fontSize: "var(--error-font-size)",
                              marginTop: "var(--error-margin-top)",
                            }}
                          >
                            {errors.current_ctc.message}
                          </p>
                        )}
                        {!errors.current_ctc && (
                          <p
                            className="text-xs mt-1.5"
                            style={{
                              color: "var(--color-text-secondary)",
                              fontSize: "var(--error-font-size)",
                              marginTop: "var(--error-margin-top)",
                            }}
                          >
                            Your current annual salary
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <Label
                          htmlFor="expected_ctc"
                          className="mb-2"
                          style={{
                            fontSize: "var(--label-font-size)",
                            fontWeight: "var(--label-font-weight)",
                          }}
                        >
                          Expected CTC ({selectedCurrency})
                        </Label>
                        <Input
                          id="expected_ctc"
                          type="number"
                          step="1000"
                          placeholder="e.g. 65000"
                          hasError={!!errors.expected_ctc}
                          {...register("expected_ctc", { valueAsNumber: true })}
                        />
                        {errors.expected_ctc && (
                          <p
                            className="text-xs mt-1.5"
                            style={{
                              color: "var(--color-error)",
                              fontSize: "var(--error-font-size)",
                              marginTop: "var(--error-margin-top)",
                            }}
                          >
                            {errors.expected_ctc.message}
                          </p>
                        )}
                        {!errors.expected_ctc && (
                          <p
                            className="text-xs mt-1.5"
                            style={{
                              color: "var(--color-text-secondary)",
                              fontSize: "var(--error-font-size)",
                              marginTop: "var(--error-margin-top)",
                            }}
                          >
                            Your expected annual salary
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <Label
                        htmlFor="notice_period_days"
                        className="mb-2"
                        style={{
                          fontSize: "var(--label-font-size)",
                          fontWeight: "var(--label-font-weight)",
                        }}
                      >
                        Notice Period (Days)
                      </Label>
                      <Input
                        id="notice_period_days"
                        type="number"
                        min={0}
                        max={999}
                        placeholder="e.g. 30"
                        hasError={!!errors.notice_period_days}
                        {...register("notice_period_days", {
                          setValueAs: (v) => (v === "" ? undefined : Number(v)),
                        })}
                      />
                      {errors.notice_period_days && (
                        <p
                          className="text-xs mt-1.5"
                          style={{
                            color: "var(--color-error)",
                            fontSize: "var(--error-font-size)",
                            marginTop: "var(--error-margin-top)",
                          }}
                        >
                          {errors.notice_period_days.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div
                    className="space-y-5 pt-6 mt-2"
                    style={{ borderTop: "1px solid rgba(0, 0, 0, 0.05)" }}
                  >
                    <h3
                      className="text-base font-semibold flex items-center gap-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {/* <DocumentTextIcon className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} /> */}
                      📝 Cover Letter
                    </h3>
                    <div className="flex flex-col">
                      <Label
                        htmlFor="cover_letter"
                        className="mb-2"
                        style={{
                          fontSize: "var(--label-font-size)",
                          fontWeight: "var(--label-font-weight)",
                        }}
                      >
                        Tell us why you&apos;re a great fit{" "}
                        <span
                          style={{
                            color: "var(--color-text-secondary)",
                            fontWeight: "normal",
                          }}
                        >
                          (Optional)
                        </span>
                      </Label>
                      <Textarea
                        id="cover_letter"
                        rows={6}
                        placeholder="Share your motivation, relevant experience, and why you're excited about this role..."
                        hasError={!!errors.cover_letter}
                        maxLength={5000}
                        {...register("cover_letter")}
                      />
                      {errors.cover_letter && (
                        <p
                          className="text-xs mt-1.5"
                          style={{
                            color: "var(--color-error)",
                            fontSize: "var(--error-font-size)",
                            marginTop: "var(--error-margin-top)",
                          }}
                        >
                          {errors.cover_letter.message}
                        </p>
                      )}
                      {!errors.cover_letter && (
                        <p
                          className="text-xs mt-1.5"
                          style={{
                            color: "var(--color-text-secondary)",
                            fontSize: "var(--error-font-size)",
                            marginTop: "var(--error-margin-top)",
                          }}
                        >
                          Maximum 5000 characters
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Screening Questions */}
                  {job.screening_questions &&
                    job.screening_questions.length > 0 && (
                      <div
                        className="space-y-5 pt-6 mt-2"
                        style={{ borderTop: "1px solid rgba(0, 0, 0, 0.05)" }}
                      >
                        <h3
                          className="text-base font-semibold flex items-center gap-2"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {/* <PencilSquareIcon className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} /> */}
                          📝 Screening Questions
                        </h3>

                        {job.screening_questions.map((question) => (
                          <div key={question.id} className="flex flex-col">
                            <Label
                              htmlFor={`screening_${question.id}`}
                              className="mb-2"
                              style={{
                                fontSize: "var(--label-font-size)",
                                fontWeight: "var(--label-font-weight)",
                              }}
                            >
                              {question.question}
                              {question.required && (
                                <span
                                  style={{ color: "var(--color-error)" }}
                                  className="ml-1"
                                >
                                  *
                                </span>
                              )}
                            </Label>

                            {question.type === "text" && (
                              <Input
                                id={`screening_${question.id}`}
                                placeholder="Your answer..."
                                {...register(
                                  `screening_answers.${question.id}`
                                )}
                              />
                            )}

                            {question.type === "textarea" && (
                              <Textarea
                                id={`screening_${question.id}`}
                                rows={4}
                                placeholder="Your answer..."
                                {...register(
                                  `screening_answers.${question.id}`
                                )}
                              />
                            )}

                            {(question.type === "select" ||
                              question.type === "radio") &&
                              question.options && (
                                <Select
                                  id={`screening_${question.id}`}
                                  {...register(
                                    `screening_answers.${question.id}`
                                  )}
                                >
                                  <option value="">Select an option...</option>
                                  {question.options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Select>
                              )}
                          </div>
                        ))}
                      </div>
                    )}

                  {/* Terms and Conditions */}
                  <div className="pt-2">
                    <div className="flex items-start gap-3">
                      <input
                        id="terms_accepted"
                        type="checkbox"
                        defaultChecked={true}
                        className="mt-1 h-4 w-4 rounded border-2 cursor-pointer transition-colors"
                        style={{
                          borderColor: errors.terms_accepted
                            ? "var(--color-error)"
                            : "var(--color-border-input)",
                          accentColor: "var(--color-primary)",
                        }}
                        {...register("terms_accepted")}
                      />
                      <label
                        htmlFor="terms_accepted"
                        className="text-sm cursor-pointer leading-relaxed"
                        style={{
                          color: "var(--color-text)",
                          fontSize: "var(--input-font-size)",
                        }}
                      >
                        By submitting this application, I agree to the{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:opacity-80 transition-opacity"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:opacity-80 transition-opacity"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Privacy Policy
                        </a>
                        , and consent to the collection and processing of my
                        personal data as described therein.
                      </label>
                    </div>
                    {errors.terms_accepted && (
                      <p
                        className="text-xs mt-1.5 ml-7"
                        style={{
                          color: "var(--color-error)",
                          fontSize: "var(--error-font-size)",
                          marginTop: "var(--error-margin-top)",
                        }}
                      >
                        {errors.terms_accepted.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting
                        ? "Submitting Application..."
                        : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="rounded-none sm:rounded-2xl bg-yellow-50 border border-yellow-200 p-8"
            style={{ borderColor: "rgba(234, 179, 8, 0.3)" }}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Applications Closed
              </h3>
              <p className="text-gray-700">
                This position is no longer accepting new applications.
              </p>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setShowConfirmDialog(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl p-8"
              style={{
                backgroundColor: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                Confirm Submission
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Are you sure you want to submit your application for{" "}
                <strong>{job.title}</strong>? Please make sure all information
                is correct before submitting.
              </p>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowConfirmDialog(false)}
                  variant="outline"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSubmit}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm & Submit"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <MinimalFooter />
      </div>
    </div>
  );
}
