import { render } from '@testing-library/react';
import TabsContent from '../index';

it('renders tabs content unchanged', () => {
  const { container } = render(<TabsContent />);
  expect(container).toMatchSnapshot();
});
