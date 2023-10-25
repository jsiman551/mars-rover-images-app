import { render } from '@testing-library/react'
import PhotoElement from '../../../src/components/photoElement/index'

it('renders pagination buttons unchanged', () => {
  const { container } = render(<PhotoElement />)
  expect(container).toMatchSnapshot()
})
