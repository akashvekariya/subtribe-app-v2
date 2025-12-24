import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Subtribe",
  description:
    "Learn about how Subtribe uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <article>
      <h1>Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: December 24, 2024
      </p>

      <section>
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device (computer,
          tablet, or mobile) when you visit a website. They help the website
          remember your preferences and understand how you use the site.
        </p>
      </section>

      <section>
        <h2>2. How We Use Cookies</h2>
        <p>Subtribe uses cookies and similar technologies to:</p>
        <ul>
          <li>Keep you signed in to your account</li>
          <li>Remember your preferences and settings</li>
          <li>Understand how you use our platform</li>
          <li>Improve our services based on usage patterns</li>
          <li>Ensure security and prevent fraud</li>
        </ul>
      </section>

      <section>
        <h2>3. Types of Cookies We Use</h2>

        <h3>3.1 Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They
          cannot be disabled.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie Name</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>access_token</code>
              </td>
              <td>Authentication session</td>
              <td>30 days</td>
            </tr>
            <tr>
              <td>
                <code>csrf_token</code>
              </td>
              <td>Security protection</td>
              <td>Session</td>
            </tr>
          </tbody>
        </table>

        <h3>3.2 Functional Cookies</h3>
        <p>These cookies enable enhanced functionality and personalization.</p>
        <table>
          <thead>
            <tr>
              <th>Cookie Name</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>theme</code>
              </td>
              <td>Stores theme preference</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>
                <code>locale</code>
              </td>
              <td>Language preference</td>
              <td>1 year</td>
            </tr>
          </tbody>
        </table>

        <h3>3.3 Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our
          website.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>_ga</code>
              </td>
              <td>Google Analytics</td>
              <td>Distinguishes users</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>
                <code>_gid</code>
              </td>
              <td>Google Analytics</td>
              <td>Distinguishes users</td>
              <td>24 hours</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>4. Third-Party Cookies</h2>
        <p>Some third-party services we use may set their own cookies:</p>
        <ul>
          <li>
            <strong>Google Analytics:</strong> Web analytics service
          </li>
          <li>
            <strong>Google Cloud Storage:</strong> File storage for resumes
          </li>
        </ul>
        <p>
          We do not have control over third-party cookies. Please refer to each
          provider&apos;s privacy policy for more information.
        </p>
      </section>

      <section>
        <h2>5. Managing Cookies</h2>

        <h3>5.1 Browser Settings</h3>
        <p>You can control and delete cookies through your browser settings:</p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h3>5.2 Opt-Out Links</h3>
        <p>You can opt out of analytics cookies:</p>
        <ul>
          <li>
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-Out Browser Add-on
            </a>
          </li>
        </ul>

        <div className="p-4 rounded-lg info-box">
          <p className="!mb-0">
            <strong>Note:</strong> Disabling certain cookies may affect the
            functionality of our website. Essential cookies cannot be disabled
            as they are necessary for the website to function.
          </p>
        </div>
      </section>

      <section>
        <h2>6. Similar Technologies</h2>
        <p>In addition to cookies, we may use similar technologies:</p>
        <ul>
          <li>
            <strong>Local Storage:</strong> Stores data locally in your browser
            with no expiration date
          </li>
          <li>
            <strong>Session Storage:</strong> Stores data for the duration of
            your browser session
          </li>
        </ul>
      </section>

      <section>
        <h2>7. Do Not Track</h2>
        <p>
          Some browsers have a &quot;Do Not Track&quot; feature that signals to
          websites that you don&apos;t want your online activity tracked.
          Currently, there is no industry standard for how companies should
          respond to Do Not Track signals.
        </p>
        <p>
          Our website does not currently respond to Do Not Track signals, but
          you can manage cookies through the methods described above.
        </p>
      </section>

      <section>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. We will notify you
          of any changes by posting the new policy on this page and updating the
          &quot;Last updated&quot; date.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies, please contact us
          at{" "}
          <a href="mailto:privacy@thesubtribe.com">privacy@thesubtribe.com</a>
        </p>
      </section>
    </article>
  );
}
