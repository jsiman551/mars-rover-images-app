import { render, screen } from '@testing-library/react';
import PaginationButtons from '../index';
import '@testing-library/jest-dom';

describe('Loading Pagination Buttons', () => {
  it('renders pagination buttons', () => {
    render(<PaginationButtons />);

    const paginationContainer = screen.getByTestId('pagination-container', {});

    expect(paginationContainer).toBeInTheDocument();
  });
});
