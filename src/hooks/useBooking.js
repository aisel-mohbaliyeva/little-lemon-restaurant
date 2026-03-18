import { useReducer, useCallback } from 'react';
import { fetchAPI, submitAPI, validateBookingForm } from '../utils/bookingUtils';

// Initial form state
const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  occasion: '',
  specialRequests: '',
};

// Reducer for booking state management
function bookingReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return { ...state, availableTimes: action.payload };
    case 'SET_SUBMITTED':
      return { ...state, submitted: action.payload };
    case 'SET_SUBMITTING':
      return { ...state, submitting: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case 'RESET_FORM':
      return {
        ...state,
        formData: initialFormState,
        errors: {},
        submitted: false,
      };
    default:
      return state;
  }
}

const initialState = {
  availableTimes: [],
  formData: initialFormState,
  errors: {},
  submitted: false,
  submitting: false,
};

/**
 * Custom hook for managing table booking state and logic.
 */
export function useBooking() {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Fetch available times when date changes
  const updateTimes = useCallback((date) => {
    if (!date) {
      dispatch({ type: 'UPDATE_TIMES', payload: [] });
      return;
    }
    const times = fetchAPI(date);
    dispatch({ type: 'UPDATE_TIMES', payload: times });
  }, []);

  // Handle field changes
  const handleChange = useCallback((field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
    if (field === 'date') {
      updateTimes(value);
      // Reset time when date changes
      dispatch({ type: 'UPDATE_FIELD', field: 'time', value: '' });
    }
  }, [updateTimes]);

  // Handle form submission
  const handleSubmit = useCallback(() => {
    const errors = validateBookingForm(state.formData);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return false;
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });
    const success = submitAPI(state.formData);

    setTimeout(() => {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
      if (success) {
        dispatch({ type: 'SET_SUBMITTED', payload: true });
      } else {
        dispatch({
          type: 'SET_ERRORS',
          payload: { submit: 'Booking failed. Please try again.' }
        });
      }
    }, 800);

    return true;
  }, [state.formData]);

  // Reset form
  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  return {
    availableTimes: state.availableTimes,
    formData: state.formData,
    errors: state.errors,
    submitted: state.submitted,
    submitting: state.submitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
