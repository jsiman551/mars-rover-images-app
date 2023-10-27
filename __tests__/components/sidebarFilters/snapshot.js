import { render } from '@testing-library/react'
import SidebarFilters from '../../../src/components/sidebarFilters/index'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

it('renders siderbar filters unchanged', () => {
  const { container } = render(
    <Provider store={store}>
      <SidebarFilters />
    </Provider>,
  )
  expect(container).toMatchSnapshot()
})
