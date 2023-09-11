'use client';
import { FormControl, FormLabel, Switch, useColorMode } from '@chakra-ui/react';

export default function DarkModeSwitch() {
  const { toggleColorMode } = useColorMode();
  return (
    <FormControl display="flex" alignItems="center" p={4}>
      <FormLabel htmlFor="dark-mode-switch" mb="0">
        Enable dark mode?
      </FormLabel>
      <Switch
        size={{ base: 'md', lg: 'lg' }}
        onChange={() => toggleColorMode()}
        id="dark-mode-switch"
      />
    </FormControl>
  );
}
