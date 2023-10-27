'use client'
import { Provider } from 'react-redux'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
// import moment from 'moment'
import DarkModeSwitch from '@/components/darkModeSwitch'
import TabsContent from '@/components/tabsContent'
import { Box } from '@chakra-ui/react'
import { store } from '@/redux/store'

export default function Home() {
  return (
    <Provider store={store}>
      <CacheProvider>
        <ChakraProvider>
          <main data-testid="main">
            <Box p={4}>
              <DarkModeSwitch />
              <TabsContent />
            </Box>
          </main>
        </ChakraProvider>
      </CacheProvider>
    </Provider>
  )
}
