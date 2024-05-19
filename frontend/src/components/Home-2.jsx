import React from 'react'
import { useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon, StarIcon } from '@chakra-ui/icons';
import { Flex, Box, WrapItem, Wrap, Stack, useColorModeValue, Button, Divider, } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'




import {
  Heading,
  Icon,
  Container,

} from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from './Rating';










const Home2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const kisiler = [
    {
      name: "Emine Aydınlı",
      comment: "Kısaca harika. Yapamadığım ya da internette bulamadığım çözümleri burda bulabiliyorum.",
      src: '/emine.jpg'

    },
    {
      name: "Alperen Akal",
      comment: "Çok faydalı, inanılmaz pratik bir uygulama.",
      src: '/alperen.img'
    },
    {
      name: "Ali Veli",
      comment: "Bütün sorularımın cevaplarını burda bulabiliyorum, çok yardımcı oluyor. Teşekkürler."
    },
    {
      name: "Mehmet Yılmaz",
      comment: "Harika bir platform. Her konuda yardımcı oluyor. Teşekkürler."
    }
  ];



  const handleNext = () => {
    setCurrentIndex(currentIndex === kisiler.length - 1 ? 0 : currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? kisiler.length - 1 : currentIndex - 1);
  };

  const Testimonial = ({ children }) => <Box>{children}</Box>;

  const TestimonialContent = ({ children }) => (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );

  const TestimonialHeading = ({ children }) => (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );

  const TestimonialText = ({ children }) => (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
    >
      {children}
    </Text>
  );

  const TestimonialAvatar = ({ src, name, title }) => (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );









  return (
    

    <Flex flexDirection="column">

      <Divider m={1} borderColor={"#58A399"} borderWidth={"2px"} />

      <Text mt="105px" textAlign="center" fontWeight="bold" fontFamily="Nunito, sans-serif" fontSize="39px" lineHeight="44px">
        Eğitimde Yenilik, Ödevde Kolaylık
      </Text>

      <Box justifyContent="center" alignItems="center" mt="90px" borderRadius={"xl"} textAlign={"center"} >
        <Rating count={3.5}></Rating>



      </Box>
      <Box bg={useColorModeValue('gray.100', 'gray.700')} margin="60px">
        <Container maxW={'7xl'} py={12} as={Stack} spacing={12} justifyContent="center" alignItems="center">
          <Stack spacing={0} align={'center'}>
            <Heading>Sizden Gelenler</Heading>
            <Text>Yorumlarınız için teşekkürler! İyi ki varsınız.</Text>
          </Stack>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            <Button size="lg" fontSize="xl" leftIcon={<ArrowBackIcon />} onClick={handlePrev}></Button>
            <TestimonialContent>
              <TestimonialText>{kisiler[currentIndex].comment}</TestimonialText>
            </TestimonialContent>

            <Button size="lg" fontSize="xl" leftIcon={<ArrowForwardIcon />} onClick={handleNext}></Button>
          </Stack>
          <TestimonialAvatar 

            src={kisiler[currentIndex].src}
            name={kisiler[currentIndex].name}
          />
        </Container>
      </Box>
    </Flex>



  );




}
export default Home2

