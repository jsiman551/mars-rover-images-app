import { render } from '@testing-library/react'
import Loading from '../../../src/components/loading/index'

it('renders loading unchanged', () => {
  const { container } = render(<Loading />)
  expect(container).toMatchSnapshot()
})
