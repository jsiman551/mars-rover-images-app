'use client'
import { useState, useEffect, ReactNode, useRef, RefObject } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, Grid, GridItem, Image, Button, useDisclosure, Flex } from "@chakra-ui/react";
import { getPhotos } from '@/api/apiCall';
import { roversNames } from '@/contants';
import Loading from './loading';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import PaginationButtons from './paginationButtons';
import SidebarFilters from './sidebarFilters';

export default function TabsContent() {
    const [ curiosity ] = roversNames
    const openFiltersRef = useRef<any>()
    /* sidebar filters  states */
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ roverName, setRoverName ] = useState<string>(curiosity)
    /* loading state, data won't render until is fully fetched */
    const [ loadingState, setLoadingState ] = useState<boolean>(true)
    const [ photosData, setPhotosData ] = useState<Array<object>>([])
    /* pagination number */
    const [ pageNumber, setPageNumber ] = useState<number>(1)
    /* pagination number */
    const [ cameraName, setCameraName ] = useState<string>('')

    /* handle tabs change */
    const handleTabsChange = (index: number): void => {
        /* set numberPage to 1 each time the user changes tab */
        setPageNumber(1)
        roversNames.forEach((name: string, i: number) => {
            if(index === i) {
                setRoverName(name)
            }
        })
    }

    /* call rover photos */
    useEffect(() => {
        const getPhotosData = async () => {
            /* set loading state to true for new calls */
            setLoadingState(true)
            const apiResponde = await getPhotos(roverName, pageNumber, cameraName)
            if (apiResponde) {
                setPhotosData(apiResponde)
                /* set loading state to false, so photos can be rendered */
                setLoadingState(false)
            } 
        }
        getPhotosData()
    }, [ 
        roverName, 
        pageNumber,
        cameraName
    ])

    console.log(photosData)
    return (
        <>
            <Heading 
                mb={4} 
                textAlign={'center'}
            >
                Mars Rover Photos
            </Heading>
            <Tabs 
                isFitted 
                variant='enclosed' 
                onChange={handleTabsChange}
            >
                <TabList mb='1em'>
                    {roversNames.map((
                        name: string, 
                        i: number): ReactNode => {
                        return(
                            <Tab key={i}>
                                {capitalizeFirstLetter(name)}
                            </Tab>
                        )
                    })}
                </TabList>
                <TabPanels>
                {roversNames.map((roverName: string, i: number): ReactNode => {
                        return(
                            <TabPanel key={i}>
                                <Flex 
                                    alignItems={'center'} 
                                    justifyContent={'space-between'}
                                    px={{ md: 24}}
                                    pt={6}
                                    pb={12}
                                >
                                    <Button 
                                        ref={openFiltersRef} 
                                        colorScheme='blue' 
                                        onClick={onOpen}
                                        variant='outline'
                                        size={{ base: 'md', xl: 'lg'}}
                                    >
                                        Apply Filters
                                    </Button>
                                    <Heading>
                                        {`Page: ${pageNumber}`}
                                    </Heading>
                                </Flex>
                                {loadingState ?
                                    <Loading /> 
                                        :
                                        <> 
                                    <Grid 
                                        templateColumns={{ 
                                            base: 'repeat(2, 1fr)', 
                                            md: 'repeat(3, 1fr)', 
                                            xl: 'repeat(4, 1fr)'
                                        }} 
                                        gap={{ base: 3, xl: 2}}
                                    >
                                        {photosData.map((
                                            item: any,
                                            itemIndex: number): ReactNode => {
                                            return (
                                                <GridItem 
                                                    w='100%' 
                                                    bg='gray.100' 
                                                    key={itemIndex}
                                                >
                                                    <Image 
                                                        src={item.img_src} 
                                                        alt={roverName} 
                                                    />
                                                </GridItem>
                                            )
                                        })}
                                    </Grid>
                                    <PaginationButtons 
                                        pageNumber={pageNumber} 
                                        setPageNumber={setPageNumber}
                                        dataLength={photosData.length}
                                    />
                                </>
                                }
                            </TabPanel>
                        )
                    })}
                </TabPanels>
            </Tabs>
            <SidebarFilters 
                isOpen={isOpen} 
                onClose={onClose} 
                btnRef={openFiltersRef} 
            />
        </>
    )
}