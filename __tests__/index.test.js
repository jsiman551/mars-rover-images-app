import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders main content', () => {
    render(<Home />);

    const main = screen.getByTestId('main', {
      name: '',
    });

    expect(main).toBeInTheDocument();
  });
});
