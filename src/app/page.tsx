'use client'
import DarkModeSwitch from "@/components/darkModeSwitch";
import TabsContent from "@/components/tabsContent";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <Box p={4}>
        <DarkModeSwitch />
        <TabsContent />
      </Box>
    </main>
  )
}
