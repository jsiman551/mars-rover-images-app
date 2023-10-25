import { render, screen } from '@testing-library/react'
import TabsContent from '../../../src/components/tabsContent/index'
import '@testing-library/jest-dom'

describe('Loading Tabs Content', () => {
  it('renders Tabs Content', () => {
    render(<TabsContent />)

    const tabsContentContainer = screen.getByTestId('tabs-container', {})

    expect(tabsContentContainer).toBeInTheDocument()
  })
})
