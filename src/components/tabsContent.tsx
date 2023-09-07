'use client'
import { useState, useEffect, ReactNode, Fragment } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, Grid, GridItem, Image } from "@chakra-ui/react";
import { getPhotos } from '@/api/apiCall';
import { roversNames } from '@/contants';
import Loading from './loading';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

export default function TabsContent() {
    const [ curiosity ] = roversNames
    /* by default, photos from curiosity will be called */
    const [ roverName, setRoverName ] = useState(curiosity)
    /* loading state, data won't render until is fully fetched */
    const [ loadingState, setLoadingState ] = useState(true)
    const [ photosData, setPhotosData ] = useState([])

    /* handle tabs change */
    const handleTabsChange = (index: number): void => {
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
            const apiResponde = await getPhotos(roverName)
            if (apiResponde) {
                setPhotosData(apiResponde)
                /* set loading state to false, so photos can be rendered */
                setLoadingState(false)
            } 
        }
        getPhotosData()
    }, [ roverName ])

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
                                {loadingState ?
                                    <Loading /> 
                                        : 
                                    <Grid 
                                        templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)'}} 
                                        gap={{ base: 3, xl: 2}}
                                    >
                                        {photosData.map((
                                            item: { 
                                                img_src: string 
                                            },
                                            itemIndex: number): ReactNode => {
                                            return (
                                                <GridItem 
                                                    w='100%' 
                                                    bg='blue.500' 
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
                                }
                            </TabPanel>
                        )
                    })}
                </TabPanels>
            </Tabs>
        </>
    )
}