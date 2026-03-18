import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from '../components/BookingForm';

const defaultProps = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    specialRequests: '',
  },
  errors: {},
  availableTimes: ['17:00', '18:00', '19:00', '20:00'],
  submitting: false,
  onChange: jest.fn(),
  onSubmit: jest.fn(),
};

describe('BookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with all required fields', () => {
    render(<BookingForm {...defaultProps} />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  });

  test('renders the submit button', () => {
    render(<BookingForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
  });

  test('calls onChange when first name input changes', () => {
    render(<BookingForm {...defaultProps} />);
    const input = screen.getByLabelText(/first name/i);
    fireEvent.change(input, { target: { value: 'John' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('firstName', 'John');
  });

  test('calls onChange when email input changes', () => {
    render(<BookingForm {...defaultProps} />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: 'test@test.com' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('email', 'test@test.com');
  });

  test('calls onSubmit when form is submitted', () => {
    render(<BookingForm {...defaultProps} />);
    fireEvent.submit(screen.getByRole('form', { hidden: true }) || document.querySelector('form'));
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  test('displays error messages when errors are provided', () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        firstName: 'First name must be at least 2 characters.',
        email: 'Please enter a valid email address.',
      },
    };
    render(<BookingForm {...propsWithErrors} />);
    expect(screen.getByText('First name must be at least 2 characters.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  test('disables time select when no date is selected', () => {
    render(<BookingForm {...defaultProps} />);
    const timeSelect = screen.getByLabelText(/time/i);
    expect(timeSelect).toBeDisabled();
  });

  test('enables time select when date and available times exist', () => {
    const propsWithDate = {
      ...defaultProps,
      formData: { ...defaultProps.formData, date: '2025-06-15' },
    };
    render(<BookingForm {...propsWithDate} />);
    const timeSelect = screen.getByLabelText(/time/i);
    expect(timeSelect).not.toBeDisabled();
  });

  test('renders available time options', () => {
    const propsWithDate = {
      ...defaultProps,
      formData: { ...defaultProps.formData, date: '2025-06-15' },
    };
    render(<BookingForm {...propsWithDate} />);
    expect(screen.getByRole('option', { name: '17:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '19:00' })).toBeInTheDocument();
  });

  test('submit button is disabled while submitting', () => {
    render(<BookingForm {...defaultProps} submitting={true} />);
    const btn = screen.getByRole('button', { name: /submitting/i });
    expect(btn).toBeDisabled();
  });

  test('renders special requests textarea', () => {
    render(<BookingForm {...defaultProps} />);
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  test('inputs have correct accessibility attributes', () => {
    render(<BookingForm {...defaultProps} />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toHaveAttribute('aria-required', 'true');
  });

  test('error fields have aria-invalid set', () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: { firstName: 'Required' },
    };
    render(<BookingForm {...propsWithErrors} />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('displays submit-level error when present', () => {
    const propsWithSubmitError = {
      ...defaultProps,
      errors: { submit: 'Booking failed. Please try again.' },
    };
    render(<BookingForm {...propsWithSubmitError} />);
    expect(screen.getByText(/booking failed/i)).toBeInTheDocument();
  });

  test('character count updates for special requests', () => {
    const propsWithText = {
      ...defaultProps,
      formData: { ...defaultProps.formData, specialRequests: 'No nuts please' },
    };
    render(<BookingForm {...propsWithText} />);
    expect(screen.getByText(/14\/500/)).toBeInTheDocument();
  });
});
