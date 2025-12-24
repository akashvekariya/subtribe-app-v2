import React from "react";
import { Button } from "@/components/ui/Button";

export function ApplyPageFooter() {
  return (
    <footer className="mt-12 mb-8">
      <div className="relative">
        {/* Decorative line with glow effect */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          style={{ opacity: 0.4 }}
        ></div>

        {/* Main footer content */}
        <div className="pt-8 flex flex-col items-center justify-center space-y-3">
          {/* Emoji with subtle animation */}
          <div className="relative text-2xl transition-all duration-300 hover:scale-110">
            ❤️
          </div>

          {/* Main text with Instrument Serif */}
          <div className="text-center">
            {/* "Powered By" - smaller heading */}
            <p
              className="text-sm font-medium uppercase mb-2"
              style={{
                color: "var(--color-text-secondary)",
                letterSpacing: "0.05em",
              }}
            >
              Powered By
            </p>

            {/* "Subtribe" - large and prominent with Instrument Serif */}
            <h2
              className="text-5xl sm:text-6xl font-bold subtribe-brand"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                color: "#262626",
              }}
            >
              Subtribe
            </h2>

            {/* Tagline */}
            <p
              className="text-base mt-3"
              style={{
                color: "var(--color-text-secondary)",
                letterSpacing: "0.01em",
              }}
            >
              Earn your seat at the fire
            </p>
          </div>

          {/* CTA Link */}
          <div className="pt-2">
            <a
              href="https://thesubtribe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                color: "var(--color-primary)",
                backgroundColor: "var(--color-bg-subtle)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span>Learn More</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ transform: "rotate(-45deg)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.1}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Links and Social */}
          <div className="pt-4 flex flex-col items-center gap-4">
            {/* Footer Links */}
            <div className="flex items-center flex-wrap justify-center gap-x-1 gap-y-1 text-xs">
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Privacy
              </a>
              <span
                style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
              >
                •
              </span>
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Terms
              </a>
              <span
                style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
              >
                •
              </span>
              <a
                href="/data-processing"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Data Processing
              </a>
              <span
                style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
              >
                •
              </span>
              <a
                href="/cookie-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Cookies
              </a>
            </div>

            {/* LinkedIn Social Link */}
            <Button asChild variant="pill" size="xs">
              <a
                href="https://www.linkedin.com/company/subtribe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>Follow us on LinkedIn</span>
              </a>
            </Button>

            {/* Copyright text */}
            <p
              className="text-xs"
              style={{
                color: "var(--color-text-secondary)",
                opacity: 0.7,
              }}
            >
              © {new Date().getFullYear()} Subtribe. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
