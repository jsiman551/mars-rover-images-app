import { 
    Button, 
    Drawer, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    DrawerBody, 
    Input, 
    DrawerFooter 
} from "@chakra-ui/react"
import { RefObject } from "react"

interface Props {
    isOpen: boolean,
    onClose: () => void,
    btnRef: RefObject<HTMLInputElement>
}

export default function SidebarFilters({ 
    isOpen, 
    onClose, 
    btnRef 
}: Props) {
    return (
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
          size={'md'}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
                Filters
            </DrawerHeader>
  
            <DrawerBody>
              <Input placeholder='Type here...' />
            </DrawerBody>
  
            <DrawerFooter>
              <Button colorScheme='blue'>Apply</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
    )
  }