import Link from "next/link";
import { MinimalFooter } from "@/components/shared/MinimalFooter";
import "./legal.css";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg-alt)" }}
    >
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back to Home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--color-primary)" }}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Content */}
        <div
          className="legal-content rounded-2xl p-8 sm:p-12"
          style={{
            backgroundColor: "var(--color-bg-base)",
            border: "1px solid var(--color-border)",
          }}
        >
          {children}
        </div>

        {/* Footer */}
        <MinimalFooter />
      </div>
    </div>
  );
}
