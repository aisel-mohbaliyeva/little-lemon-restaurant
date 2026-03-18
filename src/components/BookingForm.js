import React from 'react';
import './BookingForm.css';
import { getTodayString, getMaxDateString } from '../utils/bookingUtils';

/**
 * BookingForm component for table reservation.
 * Handles user input with validation and accessible error messages.
 *
 * @param {Object} props
 * @param {Object} props.formData - current form values
 * @param {Object} props.errors - validation errors per field
 * @param {string[]} props.availableTimes - available time slots for selected date
 * @param {boolean} props.submitting - whether the form is being submitted
 * @param {Function} props.onChange - handler for field changes
 * @param {Function} props.onSubmit - handler for form submission
 */
function BookingForm({ formData, errors, availableTimes, submitting, onChange, onSubmit }) {
  const today = getTodayString();
  const maxDate = getMaxDateString();

  const occasions = [
    { value: '', label: 'Select an occasion' },
    { value: 'birthday', label: '🎂 Birthday' },
    { value: 'anniversary', label: '💍 Anniversary' },
    { value: 'date', label: '❤️ Date Night' },
    { value: 'business', label: '💼 Business Meal' },
    { value: 'graduation', label: '🎓 Graduation' },
    { value: 'other', label: '🌟 Other' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Table reservation form"
    >
      {/* Personal Info */}
      <fieldset className="booking-form__section">
        <legend className="booking-form__legend">Personal Information</legend>
        <div className="booking-form__row">
          <div className="booking-form__field">
            <label htmlFor="firstName" className="booking-form__label">
              First Name <span aria-hidden="true" className="booking-form__required">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              className={`booking-form__input${errors.firstName ? ' booking-form__input--error' : ''}`}
              value={formData.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              placeholder="John"
              autoComplete="given-name"
              aria-required="true"
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <span id="firstName-error" className="booking-form__error" role="alert" aria-live="polite">
                {errors.firstName}
              </span>
            )}
          </div>

          <div className="booking-form__field">
            <label htmlFor="lastName" className="booking-form__label">
              Last Name <span aria-hidden="true" className="booking-form__required">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              className={`booking-form__input${errors.lastName ? ' booking-form__input--error' : ''}`}
              value={formData.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              placeholder="Doe"
              autoComplete="family-name"
              aria-required="true"
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <span id="lastName-error" className="booking-form__error" role="alert" aria-live="polite">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        <div className="booking-form__row">
          <div className="booking-form__field">
            <label htmlFor="email" className="booking-form__label">
              Email Address <span aria-hidden="true" className="booking-form__required">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`booking-form__input${errors.email ? ' booking-form__input--error' : ''}`}
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="john@example.com"
              autoComplete="email"
              aria-required="true"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span id="email-error" className="booking-form__error" role="alert" aria-live="polite">
                {errors.email}
              </span>
            )}
          </div>

          <div className="booking-form__field">
            <label htmlFor="phone" className="booking-form__label">
              Phone Number <span aria-hidden="true" className="booking-form__required">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              className={`booking-form__input${errors.phone ? ' booking-form__input--error' : ''}`}
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+1 312 555 0167"
              autoComplete="tel"
              aria-required="true"
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <span id="phone-error" className="booking-form__error" role="alert" aria-live="polite">
                {errors.phone}
              </span>
            )}
          </div>
        </div>
      </fieldset>

      {/* Booking Details */}
      <fieldset className="booking-form__section">
        <legend className="booking-form__legend">Booking Details</legend>
        <div className="booking-form__row">
          <div className="booking-form__field">
            <label htmlFor="date" className="booking-form__label">
              Date <span aria-hidden="true" className="booking-form__required">*</span>
            </label>
            <input
              id="date"
              type="date"
              className={`booking-form__input${errors.date ? ' booking-form__input--error' : ''}`}
              value={formData.date}
              min={today}
              max={maxDate}
              onChange={(e) => onChange('date', e.target.value)}
              aria-required="true"
              aria-describedby={errors.date ? 'date-error' : 'date-hint'}
              aria-invalid={!!errors.date}
            />
            <span id="date-hint" className="booking-form__hint">
              Book up to 3 months in advance
            </span>
            {errors.date && (
              <span id="date-error" className="booking-form__error" role="alert" aria-live="polite">
                {errors.date}
              </span>
            )}
          </div>

          <div className="booking-form__field">
            <label htmlFor="time" className="booking-form__label">
              Time <span aria-hidden="true" className="booking-form__required">*</span>
            </label>
            <select
              id="time"
              className={`booking-form__select${errors.time ? ' booking-form__input--error' : ''}`}
              value={formData.time}
              onChange={(e) => onChange('time', e.target.value)}
              aria-required="true"
              aria-describedby={errors.time ? 'time-error' : 'time-hint'}
              aria-invalid={!!errors.time}
              disabled={!formData.date || availableTimes.length === 0}
            >
              <option value="">
                {!formData.date
                  ? 'Select a date first'
                  : availableTimes.length === 0
                  ? 'No slots available'
                  : 'Choose a time'}
              </option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {!formData.date && (
              <span id="time-hint" className="booking-form__hint">
                Please select a date to see available times
              </span>
            )}
            {errors.time && (
              <span id="time-error" className="booking-form__error" role="alert" aria-live="polite">
                {errors.time}
              </span>
            )}
          </div>
        </div>

        <div className="booking-form__row">
          <div className="booking-form__field">
            <label htmlFor="guests" className="booking-form__label">
              Number of Guests <span aria-hidden="true" className="booking-form__required">*</span>
            </label>
            <input
              id="guests"
              type="number"
              className={`booking-form__input${errors.guests ? ' booking-form__input--error' : ''}`}
              value={formData.guests}
              min="1"
              max="10"
              onChange={(e) => onChange('guests', e.target.value)}
              aria-required="true"
              aria-describedby={errors.guests ? 'guests-error' : 'guests-hint'}
              aria-invalid={!!errors.guests}
            />
            <span id="guests-hint" className="booking-form__hint">
              1 to 10 guests. For larger parties, call us.
            </span>
            {errors.guests && (
              <span id="guests-error" className="booking-form__error" role="alert" aria-live="polite">
                {errors.guests}
              </span>
            )}
          </div>

          <div className="booking-form__field">
            <label htmlFor="occasion" className="booking-form__label">
              Occasion <span aria-hidden="true" className="booking-form__required">*</span>
            </label>
            <select
              id="occasion"
              className={`booking-form__select${errors.occasion ? ' booking-form__input--error' : ''}`}
              value={formData.occasion}
              onChange={(e) => onChange('occasion', e.target.value)}
              aria-required="true"
              aria-describedby={errors.occasion ? 'occasion-error' : undefined}
              aria-invalid={!!errors.occasion}
            >
              {occasions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {errors.occasion && (
              <span id="occasion-error" className="booking-form__error" role="alert" aria-live="polite">
                {errors.occasion}
              </span>
            )}
          </div>
        </div>

        {/* Special Requests */}
        <div className="booking-form__field booking-form__field--full">
          <label htmlFor="specialRequests" className="booking-form__label">
            Special Requests <span className="booking-form__optional">(optional)</span>
          </label>
          <textarea
            id="specialRequests"
            className="booking-form__textarea"
            value={formData.specialRequests}
            onChange={(e) => onChange('specialRequests', e.target.value)}
            placeholder="Dietary requirements, seating preferences, accessibility needs..."
            rows="3"
            maxLength="500"
            aria-describedby="specialRequests-hint"
          />
          <span id="specialRequests-hint" className="booking-form__hint">
            {formData.specialRequests.length}/500 characters
          </span>
        </div>
      </fieldset>

      {/* Submit error */}
      {errors.submit && (
        <div className="booking-form__submit-error" role="alert" aria-live="assertive">
          ⚠️ {errors.submit}
        </div>
      )}

      {/* Required fields note */}
      <p className="booking-form__note">
        <span aria-hidden="true" className="booking-form__required">*</span> Required fields
      </p>

      {/* Submit */}
      <button
        type="submit"
        className="booking-form__submit"
        disabled={submitting}
        aria-label={submitting ? 'Submitting your reservation...' : 'Make your reservation'}
      >
        {submitting ? (
          <span className="booking-form__spinner" aria-hidden="true">
            <span></span><span></span><span></span>
          </span>
        ) : (
          'Make Your Reservation'
        )}
      </button>
    </form>
  );
}

export default BookingForm;
