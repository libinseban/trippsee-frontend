import React from "react";
import "../style/privacy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">

        <h1 className="privacy-title">Privacy Policy for Trippsee</h1>

        <p className="privacy-intro">
          At <strong>Trippsee</strong>, your privacy is as important as the authenticity
          of your stay. This policy explains how we collect, use, and protect your
          information when you use our application.
        </p>

        {/* Section 1 */}

        <div className="privacy-section">
          <h2>1. Information We Collect</h2>
          <p>
            To provide a secure environment for both Guests and Hosts, we collect
            the following:
          </p>

          <ul>
            <li>
              <strong>Personal Identification:</strong> Full name, email address,
              phone number, and a government-issued ID (required for verification
              of "real homestay" participants).
            </li>

            <li>
              <strong>Payment Data:</strong> We collect billing information to
              process your 10% service fee and 23% tax. Sensitive credit card
              details are processed through secure, encrypted payment gateways.
            </li>

            <li>
              <strong>Location Data:</strong> With your permission, we use your
              location to show you nearby authentic homestays.
            </li>

            <li>
              <strong>Property Details (for Hosts):</strong> Photos, address, and
              amenities of the homestay to ensure it meets our quality standards.
            </li>
          </ul>
        </div>

        {/* Section 2 */}

        <div className="privacy-section">
          <h2>2. How We Use Your Information</h2>

          <ul>
            <li>
              <strong>Booking Fulfillment:</strong> To connect Guests and Hosts
              and facilitate the check-in process.
            </li>

            <li>
              <strong>Trust & Safety:</strong> To verify the identity of both
              parties, ensuring every stay is a genuine residential experience.
            </li>

            <li>
              <strong>Financial Compliance:</strong> To accurately calculate and
              report GST/tax for both the service provider and Trippsee.
            </li>

            <li>
              <strong>Communication:</strong> To send booking confirmations,
              refund updates (processed within 42 hours), and support messages.
            </li>
          </ul>
        </div>

        {/* Section 3 */}

        <div className="privacy-section">
          <h2>3. Data Sharing and Disclosure</h2>

          <p>We do not sell your data. We only share information in these cases:</p>

          <ul>
            <li>
              <strong>Between Guest and Host:</strong> Once a booking is confirmed
              and payment is received, limited contact information is shared to
              coordinate the stay.
            </li>

            <li>
              <strong>Service Providers:</strong> Data may be shared with trusted
              third-party partners like payment processors to operate services.
            </li>

            <li>
              <strong>Legal Requirements:</strong> Information may be disclosed to
              tax authorities or law enforcement if required by law, particularly
              for GST compliance.
            </li>
          </ul>
        </div>

        {/* Section 4 */}

        <div className="privacy-section">
          <h2>4. Data Security</h2>

          <p>
            We implement industry-standard security measures to protect your data
            from unauthorized access. Since payments are held in the Trippsee
            official account until check-in, we use high-level encryption to
            safeguard these transactions.
          </p>
        </div>

        {/* Section 5 */}

        <div className="privacy-section">
          <h2>5. Your Rights</h2>

          <p>You have the right to:</p>

          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>
              Request deletion of your account (subject to active booking
              obligations).
            </li>
          </ul>
        </div>

        {/* Section 6 */}

        <div className="privacy-section">
          <h2>6. Cookies and Tracking</h2>

          <p>
            The Trippsee app uses cookies and similar technologies to remember
            your preferences and improve your browsing experience.
          </p>
        </div>

      </div>
    </div>
  );
}