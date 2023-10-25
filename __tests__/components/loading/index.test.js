import { render, screen } from '@testing-library/react'
import Loading from '../../../src/components/loading/index'
import '@testing-library/jest-dom'

describe('Loading Spinner', () => {
  it('renders loading spinner', () => {
    render(<Loading />)

    const loadingContainer = screen.getByTestId('loading-container', {})

    expect(loadingContainer).toBeInTheDocument()
  })
})
