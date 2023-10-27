import { render, screen } from '@testing-library/react'
import PhotoElement from '../../../src/components/photoElement/index'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

describe('Loading Photo Element', () => {
  it('renders photo element', () => {
    render(
      <Provider store={store}>
        <PhotoElement
          photoData={{
            img_src: '',
            camera: '',
            earth_date: '',
            sol: 1000,
            id: '',
          }}
        />
      </Provider>,
    )

    const photoElementContainer = screen.getByTestId(
      'photo-element-container',
      {},
    )

    expect(photoElementContainer).toBeInTheDocument()
  })
})
