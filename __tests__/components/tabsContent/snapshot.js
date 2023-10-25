import { render } from '@testing-library/react'
import TabsContent from '../../../src/components/tabsContent/index'

it('renders tabs content unchanged', () => {
  const { container } = render(<TabsContent />)
  expect(container).toMatchSnapshot()
})
