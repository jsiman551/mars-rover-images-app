import { render } from '@testing-library/react'
import PaginationButtons from '../../../src/components/paginationButtons/index'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

it('renders pagination buttons unchanged', () => {
  const { container } = render(
    <Provider store={store}>
      <PaginationButtons />
    </Provider>,
  )
  expect(container).toMatchSnapshot()
})
