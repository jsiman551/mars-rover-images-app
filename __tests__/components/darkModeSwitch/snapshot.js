import { render } from '@testing-library/react'
import DarkModeSwitch from '../../../src/components/darkModeSwitch/index'

it('renders dark mode switcher unchanged', () => {
  const { container } = render(<DarkModeSwitch />)
  expect(container).toMatchSnapshot()
})
