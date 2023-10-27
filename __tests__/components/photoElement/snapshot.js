import { render } from '@testing-library/react'
import PhotoElement from '../../../src/components/photoElement/index'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

it('renders pagination buttons unchanged', () => {
  const { container } = render(
    <Provider store={store}>
      <PhotoElement
        photoData={{
          img_src: '',
          camera: '',
          earth_date: '',
          sol: 1000,
          id: '',
        }}
        a
      />
    </Provider>,
  )
  expect(container).toMatchSnapshot()
})
