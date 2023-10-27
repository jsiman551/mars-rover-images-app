import { PhotoObjType } from '@/types'
import {
  GridItem,
  Card,
  CardBody,
  Stack,
  Heading,
  UnorderedList,
  ListItem,
  Image,
  Text,
} from '@chakra-ui/react'

interface Props {
  photoData: PhotoObjType
  roverName: string
}

export default function PhotoElement({ photoData, roverName }: Props) {
  const { img_src, camera, earth_date, sol, id } = photoData
  return (
    <GridItem
      borderRadius={'lg'}
      w="100%"
      bg="gray.100"
      data-testid="photo-element-container"
    >
      <Card variant={'filled'}>
        <CardBody>
          <Image src={img_src} alt={roverName} />
          <Stack mt="6" spacing="3">
            <Heading size="md">Photo Description</Heading>
            <UnorderedList>
              <ListItem>{`${camera?.full_name} (${camera?.name})`}</ListItem>
              <ListItem>{`Earth Date: ${earth_date}`}</ListItem>
              <ListItem>{`Sol Date: ${sol}`}</ListItem>
            </UnorderedList>
            <Text color="blue.600" fontSize="2xl">
              {`Id: ${id}`}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </GridItem>
  )
}
