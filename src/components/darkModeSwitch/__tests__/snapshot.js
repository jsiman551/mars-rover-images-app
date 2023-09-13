import { render } from '@testing-library/react';
import DarkModeSwitch from '../index';

it('renders dark mode switcher unchanged', () => {
  const { container } = render(<DarkModeSwitch />);
  expect(container).toMatchSnapshot();
});
