/**
 * Generates available time slots for a given date.
 * Simulates an API call to fetch available times.
 * @param {string} date - ISO date string
 * @returns {string[]} array of available time slots
 */
export function fetchAPI(date) {
  const d = new Date(date);
  const seed = d.getDate() + d.getMonth() * 31;
  const allSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];
  // Remove some slots based on seed to simulate real availability
  return allSlots.filter((_, i) => (seed + i) % 3 !== 0);
}

/**
 * Submits a booking to the API (simulated).
 * @param {Object} formData - booking form data
 * @returns {boolean} true if successful
 */
export function submitAPI(formData) {
  // Simulate API call - returns true for valid data
  return !!(formData && formData.date && formData.time && formData.guests > 0);
}

/**
 * Returns today's date in YYYY-MM-DD format (minimum bookable date).
 */
export function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Returns max bookable date (3 months from now).
 */
export function getMaxDateString() {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().split('T')[0];
}

/**
 * Validates the booking form fields.
 * @param {Object} fields - form field values
 * @returns {Object} errors object (empty = valid)
 */
export function validateBookingForm(fields) {
  const errors = {};
  const today = getTodayString();

  if (!fields.firstName || fields.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  }
  if (!fields.lastName || fields.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.phone || !/^\+?[\d\s\-()]{7,15}$/.test(fields.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!fields.date) {
    errors.date = 'Please select a date.';
  } else if (fields.date < today) {
    errors.date = 'Date cannot be in the past.';
  }
  if (!fields.time) {
    errors.time = 'Please select a time slot.';
  }
  const guests = parseInt(fields.guests, 10);
  if (!fields.guests || isNaN(guests) || guests < 1 || guests > 10) {
    errors.guests = 'Number of guests must be between 1 and 10.';
  }
  if (!fields.occasion) {
    errors.occasion = 'Please select an occasion.';
  }

  return errors;
}
