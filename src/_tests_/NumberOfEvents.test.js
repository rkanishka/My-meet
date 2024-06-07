import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('NumberOfEvents component', () => {
  test('renders input element with role of textbox', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('default value of input field is 32', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const inputElement = getByRole('textbox');
    expect(inputElement.value).toBe('32');
  });

  test('value of input field changes when user types in it', async () => {
    const { getByRole } = render(<NumberOfEvents />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '10' } });
    expect(inputElement.value).toBe('10');
  });
});