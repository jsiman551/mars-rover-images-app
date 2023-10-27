import { render, screen } from '@testing-library/react'
import TabsContent from '../../../src/components/tabsContent/index'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

describe('Loading Tabs Content', () => {
  it('renders Tabs Content', () => {
    render(
      <Provider store={store}>
        <TabsContent />
      </Provider>,
    )

    const tabsContentContainer = screen.getByTestId('tabs-container', {})

    expect(tabsContentContainer).toBeInTheDocument()
  })
})
