import { render, screen } from '@testing-library/react'
import PaginationButtons from '../../../src/components/paginationButtons/index'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

describe('Loading Pagination Buttons', () => {
  it('renders pagination buttons', () => {
    render(
      <Provider store={store}>
        <PaginationButtons />
      </Provider>,
    )

    const paginationContainer = screen.getByTestId('pagination-container', {})

    expect(paginationContainer).toBeInTheDocument()
  })
})
