'use client';
import { Spinner, Box } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box textAlign={'center'}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
}
