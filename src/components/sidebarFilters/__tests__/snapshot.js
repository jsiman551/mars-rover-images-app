import { render } from '@testing-library/react';
import SidebarFilters from '../index';

it('renders siderbar filters unchanged', () => {
  const { container } = render(<SidebarFilters />);
  expect(container).toMatchSnapshot();
});
