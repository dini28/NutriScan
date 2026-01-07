// App Configuration
export const APP_NAME = 'nutriSCAN';
export const APP_DESCRIPTION = 'Your Nutrition Guide';

// Navigation Links
export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#food', label: 'Category' },
  { href: '#food-menu', label: 'Menu' },
  { href: '#nutritional-content', label: 'Nutrition' },
  { href: '#contact', label: 'Contact' }
];

// Contact Form Validation
export const FORM_VALIDATION = {
  MIN_MESSAGE_LENGTH: 10,
  EMAIL_REGEX: /\S+@\S+\.\S+/
};

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  RECIPES: '/api/recipes'
};

// Theme Colors
export const COLORS = {
  PRIMARY: '#007bff',
  SECONDARY: '#6c757d',
  SUCCESS: '#28a745',
  DANGER: '#dc3545',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
  LIGHT: '#f8f9fa',
  DARK: '#343a40'
}; 