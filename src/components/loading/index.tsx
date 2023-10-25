'use client'
import { Spinner, Box } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Box data-testid="loading-container" textAlign={'center'}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        data-testid="loading-spinner"
      />
    </Box>
  )
}
