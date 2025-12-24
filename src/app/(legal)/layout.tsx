import Link from "next/link";
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

        {/* Footer Links */}
        <div
          className="mt-8 pt-8 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="hover:underline transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:underline transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/data-processing"
              className="hover:underline transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Data Processing
            </Link>
            <Link
              href="/cookie-policy"
              className="hover:underline transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Cookie Policy
            </Link>
          </div>
          <p
            className="text-center text-xs mt-4"
            style={{ color: "var(--color-text-secondary)", opacity: 0.7 }}
          >
            © {new Date().getFullYear()} Subtribe. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
