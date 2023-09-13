import { render } from '@testing-library/react';
import PaginationButtons from '../index';

it('renders pagination buttons unchanged', () => {
  const { container } = render(<PaginationButtons />);
  expect(container).toMatchSnapshot();
});
