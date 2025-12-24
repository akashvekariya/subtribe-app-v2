import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Collection & Processing | Subtribe",
  description:
    "Information about how Subtribe collects and processes your data in compliance with GDPR.",
};

export default function DataProcessingPage() {
  return (
    <article>
      <h1>Data Collection & Processing</h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: December 24, 2024
      </p>

      <div className="p-4 rounded-lg mb-8 info-box">
        <p className="!mb-0">
          <strong>GDPR Notice:</strong> This document outlines our data
          collection and processing practices in compliance with the General
          Data Protection Regulation (GDPR) and other applicable data protection
          laws.
        </p>
      </div>

      <section>
        <h2>1. Data Controller</h2>
        <p>
          Subtribe acts as a <strong>Data Processor</strong> on behalf of the
          companies (Data Controllers) using our platform. When you submit a job
          application, the hiring company is the Data Controller responsible for
          your personal data.
        </p>
        <p>
          For general platform data (account information, usage data), Subtribe
          acts as the Data Controller.
        </p>
      </section>

      <section>
        <h2>2. Legal Basis for Processing</h2>
        <p>
          We process your personal data based on the following legal grounds:
        </p>

        <table>
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Legal Basis</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Application data</td>
              <td>Consent / Contract</td>
              <td>Process your job application</td>
            </tr>
            <tr>
              <td>Contact information</td>
              <td>Legitimate interest</td>
              <td>Communication about your application</td>
            </tr>
            <tr>
              <td>Technical data</td>
              <td>Legitimate interest</td>
              <td>Security and service improvement</td>
            </tr>
            <tr>
              <td>Cookies</td>
              <td>Consent</td>
              <td>Analytics and preferences</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>3. Data Collection Points</h2>
        <p>We collect data at the following points:</p>

        <h3>3.1 Job Application Form</h3>
        <ul>
          <li>Name, email, phone number</li>
          <li>Resume/CV (PDF format)</li>
          <li>Professional links (LinkedIn, GitHub, portfolio)</li>
          <li>Salary expectations and notice period</li>
          <li>Cover letter and screening question responses</li>
        </ul>

        <h3>3.2 Platform Usage</h3>
        <ul>
          <li>Pages visited and interaction patterns</li>
          <li>Device and browser information</li>
          <li>IP address (anonymized for analytics)</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Retention Schedule</h2>

        <table>
          <thead>
            <tr>
              <th>Data Category</th>
              <th>Retention Period</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Job applications</td>
              <td>2 years</td>
              <td>Future opportunity consideration</td>
            </tr>
            <tr>
              <td>Hired candidate data</td>
              <td>Duration of employment + 7 years</td>
              <td>Legal compliance</td>
            </tr>
            <tr>
              <td>Analytics data</td>
              <td>14 months</td>
              <td>Service improvement</td>
            </tr>
            <tr>
              <td>Server logs</td>
              <td>90 days</td>
              <td>Security monitoring</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>5. Data Subject Rights (GDPR)</h2>
        <p>
          Under GDPR, you have the following rights regarding your personal
          data:
        </p>

        <div className="grid gap-4 mt-4">
          <div className="p-4 rounded-lg info-box">
            <h4>Right of Access (Article 15)</h4>
            <p className="text-sm !mb-0">
              Request a copy of all personal data we hold about you.
            </p>
          </div>

          <div className="p-4 rounded-lg info-box">
            <h4>Right to Rectification (Article 16)</h4>
            <p className="text-sm !mb-0">
              Request correction of inaccurate or incomplete data.
            </p>
          </div>

          <div className="p-4 rounded-lg info-box">
            <h4>Right to Erasure (Article 17)</h4>
            <p className="text-sm !mb-0">
              Request deletion of your data (&quot;right to be forgotten&quot;).
            </p>
          </div>

          <div className="p-4 rounded-lg info-box">
            <h4>Right to Data Portability (Article 20)</h4>
            <p className="text-sm !mb-0">
              Receive your data in a structured, machine-readable format.
            </p>
          </div>

          <div className="p-4 rounded-lg info-box">
            <h4>Right to Object (Article 21)</h4>
            <p className="text-sm !mb-0">
              Object to processing based on legitimate interests.
            </p>
          </div>

          <div className="p-4 rounded-lg info-box">
            <h4>Right to Withdraw Consent</h4>
            <p className="text-sm !mb-0">
              Withdraw consent at any time for consent-based processing.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>6. Data Processing Activities</h2>

        <h3>6.1 Automated Processing</h3>
        <p>
          We may use automated systems to assist with application processing:
        </p>
        <ul>
          <li>Resume parsing to extract structured information</li>
          <li>Application scoring based on job requirements</li>
          <li>Duplicate detection to prevent multiple applications</li>
        </ul>
        <p>
          <strong>Note:</strong> No hiring decisions are made solely based on
          automated processing. All applications are reviewed by human
          recruiters.
        </p>

        <h3>6.2 Third-Party Processors</h3>
        <p>We use the following sub-processors:</p>
        <ul>
          <li>
            <strong>Google Cloud Platform:</strong> Cloud infrastructure and
            storage (Mumbai, India)
          </li>
          <li>
            <strong>Supabase:</strong> Database services
          </li>
          <li>
            <strong>Resend:</strong> Transactional email delivery
          </li>
        </ul>
      </section>

      <section>
        <h2>7. International Transfers</h2>
        <p>
          Your data may be transferred to countries outside the European
          Economic Area (EEA). We ensure appropriate safeguards through:
        </p>
        <ul>
          <li>Standard Contractual Clauses (SCCs) with sub-processors</li>
          <li>Data Processing Agreements (DPAs)</li>
          <li>Adequacy decisions where applicable</li>
        </ul>
      </section>

      <section>
        <h2>8. Exercising Your Rights</h2>
        <p>
          To exercise any of your data protection rights, please contact us:
        </p>
        <ul>
          <li>
            Email: <a href="mailto:dpo@thesubtribe.com">dpo@thesubtribe.com</a>
          </li>
          <li>Response time: Within 30 days of receiving your request</li>
        </ul>
        <p>
          If you are not satisfied with our response, you have the right to
          lodge a complaint with your local data protection authority.
        </p>
      </section>

      <section>
        <h2>9. Updates to This Document</h2>
        <p>
          We review and update this document regularly to reflect changes in our
          data processing activities. Material changes will be communicated
          through our platform.
        </p>
      </section>
    </article>
  );
}
