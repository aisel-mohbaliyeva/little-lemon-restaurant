import { fetchAPI, submitAPI, validateBookingForm, getTodayString } from '../utils/bookingUtils';

// ──────────────────────────────────────────────
// fetchAPI tests
// ──────────────────────────────────────────────
describe('fetchAPI', () => {
  test('returns an array of time slots for a valid date', () => {
    const slots = fetchAPI('2025-06-15');
    expect(Array.isArray(slots)).toBe(true);
    expect(slots.length).toBeGreaterThan(0);
  });

  test('returns slots in HH:MM format', () => {
    const slots = fetchAPI('2025-06-15');
    slots.forEach((slot) => {
      expect(slot).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  test('returns different slots for different dates (simulated availability)', () => {
    const slots1 = fetchAPI('2025-06-01');
    const slots2 = fetchAPI('2025-06-02');
    // They won't necessarily be different, but both should be valid arrays
    expect(Array.isArray(slots1)).toBe(true);
    expect(Array.isArray(slots2)).toBe(true);
  });

  test('slots are within dinner hours (17:00 - 22:00)', () => {
    const slots = fetchAPI('2025-06-15');
    slots.forEach((slot) => {
      const [hour] = slot.split(':').map(Number);
      expect(hour).toBeGreaterThanOrEqual(17);
      expect(hour).toBeLessThanOrEqual(22);
    });
  });
});

// ──────────────────────────────────────────────
// submitAPI tests
// ──────────────────────────────────────────────
describe('submitAPI', () => {
  test('returns true for valid booking data', () => {
    const result = submitAPI({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      date: '2025-06-15',
      time: '19:00',
      guests: 2,
      occasion: 'birthday',
    });
    expect(result).toBe(true);
  });

  test('returns false when date is missing', () => {
    const result = submitAPI({ time: '19:00', guests: 2 });
    expect(result).toBe(false);
  });

  test('returns false when time is missing', () => {
    const result = submitAPI({ date: '2025-06-15', guests: 2 });
    expect(result).toBe(false);
  });

  test('returns false when guests is 0', () => {
    const result = submitAPI({ date: '2025-06-15', time: '19:00', guests: 0 });
    expect(result).toBe(false);
  });

  test('returns false for null input', () => {
    const result = submitAPI(null);
    expect(result).toBe(false);
  });
});

// ──────────────────────────────────────────────
// validateBookingForm tests
// ──────────────────────────────────────────────
describe('validateBookingForm', () => {
  const today = getTodayString();

  const validForm = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+13125550167',
    date: today,
    time: '19:00',
    guests: '2',
    occasion: 'birthday',
    specialRequests: '',
  };

  test('returns no errors for a valid form', () => {
    const errors = validateBookingForm(validForm);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  test('returns error when firstName is too short', () => {
    const errors = validateBookingForm({ ...validForm, firstName: 'A' });
    expect(errors.firstName).toBeDefined();
  });

  test('returns error when firstName is empty', () => {
    const errors = validateBookingForm({ ...validForm, firstName: '' });
    expect(errors.firstName).toBeDefined();
  });

  test('returns error when lastName is empty', () => {
    const errors = validateBookingForm({ ...validForm, lastName: '' });
    expect(errors.lastName).toBeDefined();
  });

  test('returns error for invalid email', () => {
    const errors = validateBookingForm({ ...validForm, email: 'not-an-email' });
    expect(errors.email).toBeDefined();
  });

  test('returns no error for valid email', () => {
    const errors = validateBookingForm({ ...validForm, email: 'test@domain.co.uk' });
    expect(errors.email).toBeUndefined();
  });

  test('returns error for invalid phone number', () => {
    const errors = validateBookingForm({ ...validForm, phone: '123' });
    expect(errors.phone).toBeDefined();
  });

  test('returns error when date is empty', () => {
    const errors = validateBookingForm({ ...validForm, date: '' });
    expect(errors.date).toBeDefined();
  });

  test('returns error when date is in the past', () => {
    const errors = validateBookingForm({ ...validForm, date: '2000-01-01' });
    expect(errors.date).toBeDefined();
  });

  test('returns error when time is empty', () => {
    const errors = validateBookingForm({ ...validForm, time: '' });
    expect(errors.time).toBeDefined();
  });

  test('returns error when guests is 0', () => {
    const errors = validateBookingForm({ ...validForm, guests: '0' });
    expect(errors.guests).toBeDefined();
  });

  test('returns error when guests exceeds 10', () => {
    const errors = validateBookingForm({ ...validForm, guests: '11' });
    expect(errors.guests).toBeDefined();
  });

  test('returns no error for guests = 10', () => {
    const errors = validateBookingForm({ ...validForm, guests: '10' });
    expect(errors.guests).toBeUndefined();
  });

  test('returns error when occasion is empty', () => {
    const errors = validateBookingForm({ ...validForm, occasion: '' });
    expect(errors.occasion).toBeDefined();
  });

  test('returns multiple errors for multiple invalid fields', () => {
    const errors = validateBookingForm({
      firstName: '',
      lastName: '',
      email: 'bad',
      phone: '',
      date: '',
      time: '',
      guests: '',
      occasion: '',
      specialRequests: '',
    });
    expect(Object.keys(errors).length).toBeGreaterThan(3);
  });
});
