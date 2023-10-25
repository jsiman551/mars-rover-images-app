import { render } from '@testing-library/react'
import PaginationButtons from '../../../src/components/paginationButtons/index'

it('renders pagination buttons unchanged', () => {
  const { container } = render(<PaginationButtons />)
  expect(container).toMatchSnapshot()
})
