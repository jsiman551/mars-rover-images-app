'use client'
import { FormControl, FormLabel, Switch, useColorMode } from '@chakra-ui/react'

export default function DarkModeSwitch() {
  const { toggleColorMode } = useColorMode()
  return (
    <FormControl
      data-testid="switcher-control"
      display="flex"
      alignItems="center"
      p={4}
    >
      <FormLabel data-testid="switcher-label" htmlFor="dark-mode-switch" mb="0">
        Enable dark mode?
      </FormLabel>
      <Switch
        size={{ base: 'md', lg: 'lg' }}
        onChange={() => toggleColorMode()}
        id="dark-mode-switch"
        data-testid="switcher"
      />
    </FormControl>
  )
}
