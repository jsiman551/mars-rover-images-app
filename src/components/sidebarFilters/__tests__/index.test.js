import { render, screen } from '@testing-library/react';
import SidebarFilters from '../index';
import '@testing-library/jest-dom';

describe('Loading Siderbar Filters', () => {
  it('renders Sidebar Filters', () => {
    render(<SidebarFilters />);

    const sidebarFiltersContainer = screen.getByTestId('sidebar-container', {});

    expect(sidebarFiltersContainer).toBeInTheDocument();
  });
});
