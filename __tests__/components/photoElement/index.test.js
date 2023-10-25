import { render, screen } from '@testing-library/react'
import PhotoElement from '../../../src/components/photoElement/index'
import '@testing-library/jest-dom'

describe('Loading Photo Element', () => {
  it('renders photo element', () => {
    render(<PhotoElement />)

    const photoElementContainer = screen.getByTestId(
      'photo-element-container',
      {},
    )

    expect(photoElementContainer).toBeInTheDocument()
  })
})
