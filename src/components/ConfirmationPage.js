import React from 'react';
import './ConfirmationPage.css';

/**
 * ConfirmationPage - shown after a successful booking submission.
 * Displays booking summary and offers navigation options.
 *
 * @param {Object} props
 * @param {Object} props.bookingData - the submitted booking data
 * @param {Function} props.onNewBooking - callback to make another booking
 * @param {Function} props.onHome - callback to go home
 */
function ConfirmationPage({ bookingData, onNewBooking, onHome }) {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const confirmationNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <section className="confirmation" aria-labelledby="confirmation-heading">
      <div className="confirmation__icon" aria-hidden="true">✓</div>

      <h1 id="confirmation-heading" className="confirmation__heading">
        Reservation Confirmed!
      </h1>

      <p className="confirmation__subheading">
        Thank you, <strong>{bookingData.firstName} {bookingData.lastName}</strong>!<br />
        We look forward to welcoming you to Little Lemon.
      </p>

      <div className="confirmation__details" aria-label="Booking summary">
        <h2 className="confirmation__details-title">Booking Summary</h2>
        <dl className="confirmation__list">
          <div className="confirmation__item">
            <dt>Confirmation #</dt>
            <dd aria-label={`Confirmation number ${confirmationNumber}`}>
              <span className="confirmation__code">{confirmationNumber}</span>
            </dd>
          </div>
          <div className="confirmation__item">
            <dt>Date</dt>
            <dd>{formatDate(bookingData.date)}</dd>
          </div>
          <div className="confirmation__item">
            <dt>Time</dt>
            <dd>{bookingData.time}</dd>
          </div>
          <div className="confirmation__item">
            <dt>Guests</dt>
            <dd>{bookingData.guests} {parseInt(bookingData.guests) === 1 ? 'guest' : 'guests'}</dd>
          </div>
          <div className="confirmation__item">
            <dt>Occasion</dt>
            <dd style={{ textTransform: 'capitalize' }}>{bookingData.occasion || 'None specified'}</dd>
          </div>
          {bookingData.specialRequests && (
            <div className="confirmation__item confirmation__item--full">
              <dt>Special Requests</dt>
              <dd>{bookingData.specialRequests}</dd>
            </div>
          )}
        </dl>
      </div>

      <p className="confirmation__email-note">
        📧 A confirmation has been sent to <strong>{bookingData.email}</strong>
      </p>

      <div className="confirmation__actions">
        <button
          className="confirmation__btn confirmation__btn--primary"
          onClick={onNewBooking}
          aria-label="Make another reservation"
        >
          Make Another Booking
        </button>
        <button
          className="confirmation__btn confirmation__btn--secondary"
          onClick={onHome}
          aria-label="Return to homepage"
        >
          Return Home
        </button>
      </div>
    </section>
  );
}

export default ConfirmationPage;
