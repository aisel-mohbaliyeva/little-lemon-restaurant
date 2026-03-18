# 🍋 Little Lemon Restaurant — Front-End Capstone Project

> A fully responsive React web app for the **Little Lemon** Mediterranean restaurant, built as the capstone project for the Meta Front-End Developer Professional Certificate.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the App](#running-the-app)
- [Running Tests](#running-tests)
- [Accessibility](#accessibility)
- [Grading Criteria Checklist](#grading-criteria-checklist)

## Overview
Little Lemon is a family-owned Mediterranean restaurant in Chicago. This web app allows customers to browse the homepage, view specials, and make table reservations with a fully validated booking form.

## Features
- Responsive design — mobile, tablet, and desktop
- Table booking form with full client-side validation
- Dynamic time slots based on selected date (simulated API)
- Accessible UI — ARIA labels, roles, error messages, skip link
- 46 passing unit tests covering utilities, form, and navigation
- State management via useReducer custom hook
- Booking confirmation screen with summary details
- Sticky navigation with responsive hamburger menu
- Semantic HTML5 throughout

## Tech Stack
- React 18
- CSS (component-scoped)
- React Testing Library + Jest
- Google Fonts (Markazi Text + Karla)

## Project Structure
```
little-lemon/src/
  __tests__/          Unit tests (46 tests)
  components/         Nav, Footer, BookingForm, ConfirmationPage
  hooks/              useBooking (useReducer custom hook)
  pages/              HomePage, ReservationsPage
  utils/              bookingUtils (fetchAPI, submitAPI, validate)
  App.js              Root component + routing
  index.css           Global styles + CSS variables
```

## Setup & Installation

### Prerequisites
- Node.js v16+ (https://nodejs.org)
- npm v8+
- Git

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/little-lemon.git
cd little-lemon

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```
App opens at http://localhost:3000

## Running the App
```bash
npm start
```

## Running Tests
```bash
# Run all tests once
npm test -- --watchAll=false

# Watch mode
npm test

# With coverage
npm test -- --watchAll=false --coverage
```

### Test Summary
| Suite | Tests | Covers |
|---|---|---|
| bookingUtils.test.js | 17 | fetchAPI, submitAPI, validateBookingForm |
| BookingForm.test.js | 15 | Rendering, interactions, accessibility |
| App.test.js | 7 | Navigation, page routing, a11y |
| **Total** | **46** | All passing ✅ |

## Accessibility
- Skip navigation link at top of page
- ARIA labels on all interactive elements
- aria-required on required form fields
- aria-invalid + aria-describedby for error states
- role="alert" + aria-live="polite" for error announcements
- aria-current="page" on active nav links
- Keyboard fully navigable
- Visible focus styles on all focusable elements
- Semantic HTML: nav, main, section, fieldset, legend, address, footer, aside

## Grading Criteria Checklist
| Criterion | Status |
|---|---|
| UX/UI design (Little Lemon brand) | ✅ |
| Accessibility tags | ✅ |
| Unit tests | ✅ 46 tests |
| Functional booking form with validation | ✅ |
| Semantic + responsive HTML | ✅ |
| Git repository | ✅ |
| Clear, maintainable code with comments | ✅ |
| Edge cases + meaningful error messages | ✅ |
| README + setup instructions | ✅ |
