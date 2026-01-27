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
        Last updated: December 24, 2025
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
          enable core functionality such as authentication and security. These
          cookies cannot be disabled.
        </p>

        <h3>3.2 Functional Cookies</h3>
        <p>
          These cookies enable enhanced functionality and personalization, such
          as remembering your preferences and settings.
        </p>

        <h3>3.3 Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our
          website, allowing us to improve our services.
        </p>
      </section>

      <section>
        <h2>4. Third-Party Cookies</h2>
        <p>
          Some third-party services we use may set their own cookies for
          analytics and functionality purposes. We do not have control over
          third-party cookies. Please refer to each provider&apos;s privacy
          policy for more information.
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

        <h3>5.2 Opt-Out</h3>
        <p>
          You can opt out of analytics cookies through your browser settings or
          by using opt-out tools provided by analytics service providers.
        </p>

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
          <a href="mailto:contact@thesubtribe.com">contact@thesubtribe.com</a>
        </p>
      </section>
    </article>
  );
}
