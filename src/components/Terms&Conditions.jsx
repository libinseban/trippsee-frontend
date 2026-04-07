import React from "react";
import "../style/termsConditions.css";

export default function TermsConditions() {
  return (
    <div className="terms-page">
      <div className="terms-container">

        <h1 className="terms-title">Terms and Conditions for Trippsee</h1>

        <p className="terms-intro">
          Welcome to <strong>Trippsee</strong>. By using our application, you
          agree to comply with and be bound by the following terms and
          conditions. Trippsee is a platform dedicated exclusively to
          authentic homestay experiences.
        </p>

        {/* Section 1 */}

        <div className="terms-section">
          <h2>1. Booking and Service Fees</h2>

          <p>
            Trippsee facilitates stays between Guests and Homestay Service
            Providers ("Hosts").
          </p>

          <ul>
            <li>
              <strong>Service Fee:</strong> Trippsee charges a 10% service fee
              on the base price of every booking.
            </li>

            <li>
              <strong>Taxation:</strong> A total of 23% tax is applied to each
              transaction. This flat rate covers the GST/Tax obligations for
              both the Homestay Service Provider and the Trippsee platform.
            </li>
          </ul>
        </div>

        {/* Section 2 */}

        <div className="terms-section">
          <h2>2. Payment Policy</h2>

          <p>
            To ensure security for both parties, Trippsee operates on a
            "Pre-Paid" model:
          </p>

          <ul>
            <li>
              <strong>Payment Requirement:</strong> A booking is only confirmed
              once the full payment is received and cleared in the Trippsee
              official account.
            </li>

            <li>
              <strong>Fund Disbursement:</strong> To protect the Guest, funds
              are held by Trippsee and only credited to the Host’s account
              once the Guest has successfully checked into the property.
            </li>
          </ul>
        </div>

        {/* Section 3 */}

        <div className="terms-section">
          <h2>3. Cancellation and Refund Policy</h2>

          <p>
            We maintain a strict timeline for cancellations to protect the
            livelihood of our authentic homestay hosts.
          </p>

          <ul>
            <li>
              <strong>Eligibility:</strong> Cancellation must occur at least
              24 hours prior to the scheduled check-in time.
            </li>

            <li>
              <strong>Refund Processing:</strong> Approved refunds will be
              processed within 42 hours of the cancellation request.
            </li>

            <li>
              <strong>Late Cancellation:</strong> Cancellations made less than
              24 hours before check-in are non-refundable.
            </li>
          </ul>
        </div>

        {/* Section 4 */}

        <div className="terms-section">
          <h2>4. Authenticity Guarantee</h2>

          <p>Trippsee is strictly for real homestays.</p>

          <ul>
            <li>
              Hosts represent that the property is a a genuine residential
              stay and not a standard commercial hotel.
            </li>

            <li>
              Trippsee reserves the right to remove any listing that does not
              meet our "Authentic Homestay" criteria.
            </li>
          </ul>
        </div>

        {/* Section 5 */}

        <div className="terms-section">
          <h2>5. User Responsibilities</h2>

          <ul>
            <li>
              <strong>Guests:</strong> Must provide valid identification upon
              check-in and respect the house rules of the homestay.
            </li>

            <li>
              <strong>Hosts:</strong> Must ensure the property is safe, clean,
              and accurately represented in the app gallery.
            </li>
          </ul>
        </div>

        {/* Section 6 */}

        <div className="terms-section">
          <h2>6. Limitation of Liability</h2>

        <span className="lastOne">
          Trippsee acts solely as a facilitator and is not liable for any
          damages, losses, or disputes arising from the booking, stay, or
          interactions between Guests and Hosts. Users agree to hold Trippsee
          harmless from any claims related to their use of the platform.
        </span>
        </div>

      </div>
    </div>
  );
}