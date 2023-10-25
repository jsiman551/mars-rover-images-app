import { render } from '@testing-library/react'
import SidebarFilters from '../../../src/components/sidebarFilters/index'

it('renders siderbar filters unchanged', () => {
  const { container } = render(<SidebarFilters />)
  expect(container).toMatchSnapshot()
})
