import { render, screen } from '@testing-library/react';
import DarkModeSwitch from '../index';
import '@testing-library/jest-dom';

describe('Dark Mode Switch', () => {
  it('renders Dark Mode Switcher', () => {
    render(<DarkModeSwitch />);

    const switcherControl = screen.getByTestId('switcher-control', {});

    expect(switcherControl).toBeInTheDocument();
  });
});
