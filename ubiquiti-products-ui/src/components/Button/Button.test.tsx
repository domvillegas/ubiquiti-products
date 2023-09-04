import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import '@testing-library/jest-dom/';

const mockFunction = jest.fn();

describe('Button', () => {
  test('Button text is rendered', () => {
    render(<Button buttonEffect={mockFunction} buttonText="Cool text" />);

    expect(screen.getByText('Cool text')).toBeInTheDocument();
  });

  test('buttonEffect prop is called when Button is clicked', async () => {
    render(<Button buttonEffect={mockFunction} buttonText="Cool text" />);

    expect(mockFunction).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });
});
