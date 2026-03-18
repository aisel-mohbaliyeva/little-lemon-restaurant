import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders the navigation bar', () => {
    render(<App />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  test('renders the footer', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('renders the home page by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /little lemon/i, level: 1 })).toBeInTheDocument();
  });

  test('navigates to reservations page when "Reserve a Table" is clicked', () => {
    render(<App />);
    const reserveBtn = screen.getByRole('button', { name: /reserve a table/i });
    fireEvent.click(reserveBtn);
    expect(screen.getByRole('heading', { name: /reserve a table/i, level: 1 })).toBeInTheDocument();
  });

  test('navigates to reservations via nav link', () => {
    render(<App />);
    
    const navBtns = screen.getAllByRole('button', { name: /reservations/i });
    fireEvent.click(navBtns[0]);
    expect(screen.getByText(/book your table/i)).toBeInTheDocument();
  });

  test('renders skip to main content link for accessibility', () => {
    render(<App />);
    expect(screen.getByText(/skip to main content/i)).toBeInTheDocument();
  });

  test('nav link shows active state for current page', () => {
    render(<App />);
    const homeBtn = screen.getAllByRole('button', { name: /home/i }).find(
      b => b.getAttribute('aria-current') === 'page'
    );
    expect(homeBtn).toBeTruthy();
  });
});
