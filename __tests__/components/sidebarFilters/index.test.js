import { render, screen } from '@testing-library/react'
import SidebarFilters from '../../../src/components/sidebarFilters/index'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

describe('Loading Siderbar Filters', () => {
  it('renders Sidebar Filters', () => {
    render(
      <Provider store={store}>
        <SidebarFilters />
      </Provider>,
    )

    const sidebarFiltersContainer = screen.getByTestId('sidebar-container', {})

    expect(sidebarFiltersContainer).toBeInTheDocument()
  })
})
