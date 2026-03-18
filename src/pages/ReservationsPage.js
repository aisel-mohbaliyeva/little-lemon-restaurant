import React from 'react';
import BookingForm from '../components/BookingForm';
import ConfirmationPage from '../components/ConfirmationPage';
import { useBooking } from '../hooks/useBooking';
import './ReservationsPage.css';

/**
 * ReservationsPage - Handles the full table booking flow.
 * Uses useBooking hook for state management and validation.
 *
 * @param {Function} onHome - callback to navigate to home
 */
function ReservationsPage({ onHome }) {
  const {
    availableTimes,
    formData,
    errors,
    submitted,
    submitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useBooking();

  if (submitted) {
    return (
      <main id="main-content">
        <div className="reservations__confirmation-wrap">
          <ConfirmationPage
            bookingData={formData}
            onNewBooking={resetForm}
            onHome={onHome}
          />
        </div>
      </main>
    );
  }

  return (
    <main id="main-content">
      <section className="reservations" aria-labelledby="reservations-heading">
        {/* Header */}
        <div className="reservations__hero">
          <div className="container">
            <h1 id="reservations-heading" className="reservations__title">
              Reserve a Table
            </h1>
            <p className="reservations__subtitle">
              Book your table at Little Lemon and enjoy an unforgettable Mediterranean dining experience.
            </p>
          </div>
        </div>

        {/* Form area */}
        <div className="container">
          <div className="reservations__layout">
            {/* Sidebar info */}
            <aside className="reservations__info" aria-label="Restaurant information">
              <div className="info-card">
                <h2 className="info-card__title">📍 Location</h2>
                <address className="info-card__text">
                  263 S Wabash Ave<br />
                  Chicago, IL 60604
                </address>
              </div>
              <div className="info-card">
                <h2 className="info-card__title">🕐 Hours</h2>
                <dl className="info-card__hours">
                  <div>
                    <dt>Mon – Thu</dt>
                    <dd>5:00 PM – 10:00 PM</dd>
                  </div>
                  <div>
                    <dt>Fri – Sat</dt>
                    <dd>5:00 PM – 11:00 PM</dd>
                  </div>
                  <div>
                    <dt>Sunday</dt>
                    <dd>Closed</dd>
                  </div>
                </dl>
              </div>
              <div className="info-card">
                <h2 className="info-card__title">📞 Contact</h2>
                <p className="info-card__text">
                  <a href="tel:+13125550167" className="info-card__link">
                    +1 (312) 555-0167
                  </a>
                  <br />
                  <a href="mailto:hello@littlelemon.com" className="info-card__link">
                    hello@littlelemon.com
                  </a>
                </p>
              </div>
              <div className="info-card info-card--note">
                <p className="info-card__text">
                  🎉 For parties of more than 10 guests or private events,
                  please call us directly.
                </p>
              </div>
            </aside>

            {/* The form */}
            <div className="reservations__form-wrap">
              <BookingForm
                formData={formData}
                errors={errors}
                availableTimes={availableTimes}
                submitting={submitting}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ReservationsPage;
