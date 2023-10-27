import { render } from '@testing-library/react'
import TabsContent from '../../../src/components/tabsContent/index'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

it('renders tabs content unchanged', () => {
  const { container } = render(
    <Provider store={store}>
      <TabsContent />
    </Provider>,
  )
  expect(container).toMatchSnapshot()
})
