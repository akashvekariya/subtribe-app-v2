import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Subtribe",
  description:
    "Learn how Subtribe collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <article>
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: December 24, 2024
      </p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Subtribe (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
          committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use
          our applicant tracking system (ATS) platform.
        </p>
        <p>
          By using our services, you agree to the collection and use of
          information in accordance with this policy.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>

        <h3>2.1 Personal Information</h3>
        <p>When you apply for a job through our platform, we collect:</p>
        <ul>
          <li>
            Full name and contact information (email address, phone number)
          </li>
          <li>Professional information (resume/CV, work history, education)</li>
          <li>Professional links (LinkedIn, GitHub, portfolio websites)</li>
          <li>Compensation details (current and expected salary)</li>
          <li>Availability information (notice period)</li>
          <li>Responses to screening questions</li>
          <li>Cover letter and additional documents you choose to submit</li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <p>
          We automatically collect certain information when you visit our
          platform:
        </p>
        <ul>
          <li>IP address and device information</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent</li>
          <li>Referring website or source</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use the collected information for:</p>
        <ul>
          <li>
            <strong>Processing job applications:</strong> Reviewing and
            evaluating your candidacy
          </li>
          <li>
            <strong>Communication:</strong> Contacting you about your
            application status, interviews, and job offers
          </li>
          <li>
            <strong>Legal compliance:</strong> Meeting our legal obligations and
            responding to legal requests
          </li>
          <li>
            <strong>Service improvement:</strong> Analyzing usage patterns to
            improve our platform
          </li>
          <li>
            <strong>Security:</strong> Detecting and preventing fraud, abuse,
            and security incidents
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Data Storage and Security</h2>
        <p>
          Your data is stored securely on cloud infrastructure provided by
          Google Cloud Platform, with servers located in the Asia-Pacific
          region. We implement industry-standard security measures including:
        </p>
        <ul>
          <li>Encryption of data in transit (TLS/SSL) and at rest</li>
          <li>Access controls and authentication requirements</li>
          <li>Regular security audits and monitoring</li>
          <li>Secure backup and disaster recovery procedures</li>
        </ul>
      </section>

      <section>
        <h2>5. Data Sharing</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>
            <strong>Employers:</strong> Companies you apply to through our
            platform
          </li>
          <li>
            <strong>Service providers:</strong> Third-party vendors who assist
            in operating our platform (hosting, email, analytics)
          </li>
          <li>
            <strong>Legal authorities:</strong> When required by law or to
            protect our rights
          </li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>
            <strong>Access:</strong> Request a copy of your personal data
          </li>
          <li>
            <strong>Rectification:</strong> Request correction of inaccurate
            data
          </li>
          <li>
            <strong>Erasure:</strong> Request deletion of your data (subject to
            legal retention requirements)
          </li>
          <li>
            <strong>Portability:</strong> Receive your data in a structured,
            machine-readable format
          </li>
          <li>
            <strong>Objection:</strong> Object to certain processing of your
            data
          </li>
          <li>
            <strong>Withdraw consent:</strong> Withdraw consent at any time
            where processing is based on consent
          </li>
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <a href="mailto:privacy@thesubtribe.com">privacy@thesubtribe.com</a>
        </p>
      </section>

      <section>
        <h2>7. Data Retention</h2>
        <p>
          We retain your application data for a period of 2 years from the date
          of submission, unless you request earlier deletion or the hiring
          company specifies a different retention period. This allows companies
          to consider you for future opportunities.
        </p>
        <p>
          After the retention period, your data will be anonymized or deleted in
          accordance with our data retention policies.
        </p>
      </section>

      <section>
        <h2>8. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries
          other than your country of residence. We ensure appropriate safeguards
          are in place, including standard contractual clauses and compliance
          with applicable data protection laws.
        </p>
      </section>

      <section>
        <h2>9. Children&apos;s Privacy</h2>
        <p>
          Our services are not intended for individuals under 16 years of age.
          We do not knowingly collect personal information from children. If you
          believe we have collected information from a child, please contact us
          immediately.
        </p>
      </section>

      <section>
        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new policy on this page and updating
          the &quot;Last updated&quot; date.
        </p>
      </section>

      <section>
        <h2>11. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:privacy@thesubtribe.com">privacy@thesubtribe.com</a>
          </li>
          <li>
            Website:{" "}
            <a
              href="https://thesubtribe.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              thesubtribe.com
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
