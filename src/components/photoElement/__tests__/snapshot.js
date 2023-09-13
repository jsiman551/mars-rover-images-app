import { render } from '@testing-library/react';
import PhotoElement from '../index';

it('renders pagination buttons unchanged', () => {
  const { container } = render(<PhotoElement />);
  expect(container).toMatchSnapshot();
});
