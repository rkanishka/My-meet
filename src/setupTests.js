// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// setupTests.js
// Import necessary testing utilities
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

// Make `act` globally available
global.act = act;

// Define the messages you want to ignore
const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into act(...):",
  "Error:",
  "The above error occurred"
];

// Preserve the original console.error function
const originalError = console.error.bind(console.error);

// Override console.error to filter out specific messages
console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find(message => args.toString().includes(message));
  if (!ignoreMessage) {
    originalError(...args);
  }
};