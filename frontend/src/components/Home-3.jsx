import { Avatar, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from "typewriter-effect";
import TextComp from './TextComp';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare, BiSolidLike, BiSolidShare } from "react-icons/bi";
import { useSpring, animated } from 'react-spring';





const Home3 = () => {

    const [isFlipped, setIsFlipped] = useState(true);
    const [liked, setLiked] = useState(false);
    const [share, setShare] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: isFlipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });
    const frontshareInfo = () => {
        setShare(!share)
        navigator.share({
            url: window.location.href
        })
    }
    const backshareInfo = () => {
        setShare(!share)
        navigator.share({
            url: window.location.href
        })
    }
    useEffect(() => {
        AOS.init();
    }, []);


    // Topun animasyonunu tanımla
    const { x } = useSpring({
        x: isFlipped ? 0 : 85, // Örnek olarak, her buton arası 100px mesafe varsayıyoruz
        config: { tension: 200, friction: 20 },
    });
    const BackSide = () => (
        <Flex flex={1}>
            <Card maxW={{ base: '90%', md: 'md' }}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name='Emine Aydınlı' src='/emine.jpg' />
                            <Box>
                                <Heading size='sm'>Emine Aydınlı</Heading>
                                <Flex align="center" justify="center" gap="2">
                                    <Text>Matematik</Text>
                                    <Box flexShrink={0} w={1.5} h={1.5} bg="gray.800" borderRadius="full" />
                                    <Text>Lise</Text>
                                </Flex>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                    Verilen dik üçgenin bir açısı 30° ve hipotenüsü 10 cm. Bu bir 30°-60°-90° özel dik üçgendir. Bu tür üçgenlerde, 30° karşısındaki kenar hipotenüsün yarısı, yani 5 cm'dir. 60° karşısındaki kenar ise karşı kenarın √3 katı, yani 5√3 cm'dir. Dolayısıyla üçgenin kenarları 5 cm ve 5√3 cm'dir, doğru cevap A) 5 cm ve 5√3 cm.
                    </Text>
                </CardBody>
                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <Button onClick={backshareInfo} flex='1' variant='ghost' leftIcon={share ? <BiSolidShare /> : <BiShare />}>
                        Share
                    </Button>

                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                        Comment
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={liked ? <BiSolidLike /> : <BiLike />} onClick={() => setLiked(!liked)}>
                        Like
                    </Button>
                </CardFooter>
            </Card>
        </Flex>
    );

    const FrontSide = () => (
        <Flex flex={1}>


            <Card maxW='md'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar src='/alperen.img' name='Alperen Akal' />

                            <Box>
                                <Heading size='sm'>Alperen Akal</Heading>
                                <Flex align="center" justify="center" gap="2">
                                    <Text>Matematik</Text>
                                    <Box flexShrink={0} w={1.5} h={1.5} bg="gray.800" borderRadius="full" />
                                    <Text>Lise</Text>
                                </Flex>
                            </Box>
                        </Flex>

                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                        Bir geometri dersinde, bir dik üçgenin hipotenüsünün uzunluğu 10 cm ve bir açısı 30° olarak verilmiştir. Bu bilgiye göre, üçgenin diğer iki kenarının uzunlukları nedir?

                        A) 5 cm ve 5√3 cm
                        B) 5 cm ve 10√3 cm
                        C) 10 cm ve 10√3 cm
                        D) 5√3 cm ve 15 cm
                    </Text>
                </CardBody>


                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <Button flex='1' variant='ghost' leftIcon={liked ? <BiSolidLike /> : <BiLike />} onClick={() => setLiked(!liked)}>
                        Like
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                        Comment
                    </Button>
                    <Button onClick={frontshareInfo} flex='1' variant='ghost' leftIcon={share ? <BiSolidShare /> : <BiShare />}>
                        Share
                    </Button>
                </CardFooter>
            </Card>





        </Flex>

    );


    return (
        <Flex flexDirection="column" gap={2} mb={2} py={5}>
            <Flex align="center" flexDirection={"column"}>
                <Box>
                    <div data-aos="flip-left">
                        <Image
                            src={"/verified.svg"}
                            w={"100px"}
                            h={"100px"}

                        />
                    </div>
                </Box>
                <Box>
                    <Text
                        whiteSpace="pre-line"
                        fontFamily="Source Code Pro, monospace" // Projenize uygun bir font ile değiştirebilirsiniz.
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }} // Responsive font boyutu ayarı
                        textAlign="center"
                        lineHeight="taller"
                        mt={5} // Üstten boşluk ekleyerek metni daha rahat okunabilir yapar
                        fontWeight={"bold"}
                    > <Typewriter
                            options={{
                                strings: [
                                    "Bir soru sormak, bilginin kapılarını aralar.",
                                    "Her cevap, yeni ufuklar açar.",
                                    "Birlikte öğrenelim, birlikte büyüyelim."
                                ],
                                autoStart: true,
                                loop: true,
                                delay: 100
                            }}
                        />
                    </Text>
                </Box>


            </Flex>
            <Divider m={1} borderColor={"#58A399"} borderWidth={"2px"} />
            <Flex flexDir={"row"} w={"100%"} gap={5}>

                <Box flex={1} >
                    <Flex flexDirection="column" alignItems="center" gap="4">
                        <Flex m={5} p={5} direction={"column"} gap={5}>
                            <Flex
                                justifyContent="center" // Yatayda ortala

                            >
                                <Button
                                    whiteSpace="pre-line"
                                    fontFamily="ProximaNova, Helvetica, Arial, sans-serif;" // Projenize uygun bir font ile değiştirebilirsiniz.
                                    fontSize={{ base: 'md', md: '4xl' }}// Responsive font boyutu ayarı
                                    textAlign="center"
                                    lineHeight="taller"
                                    mt={5} // Üstten boşluk ekleyerek metni daha rahat okunabilir yapar
                                    fontWeight="bold"
                                    height={30}
                                    size='md'
                                    color="#00000"
                                    backgroundColor={isFlipped ? "#58A399" : "#00000"}

                                    p={5}

                                    onClick={() => { setIsFlipped(true); setSelectedButton(0); }}
                                >
                                    Sorunu Sor
                                </Button>
                            </Flex>

                            <Flex
                                justifyContent="center" // Yatayda ortala

                            >
                                <Button
                                    whiteSpace="pre-line"
                                    fontFamily="ProximaNova, Helvetica, Arial, sans-serif;" // Projenize uygun bir font ile değiştirebilirsiniz.
                                    fontSize={{ base: 'lg', md: '4xl' }}// Responsive font boyutu ayarı
                                    textAlign="center"
                                    size='lg'
                                    lineHeight="taller"
                                    mt={5} // Üstten boşluk ekleyerek metni daha rahat okunabilir yapar
                                    fontWeight="bold"
                                    color="#00000"
                                    p={5}
                                    backgroundColor={isFlipped ? "#00000" : "#58A399"}

                                    onClick={() => { setIsFlipped(false); setSelectedButton(1) }}
                                >
                                    Cevabını gör
                                </Button>

                            </Flex>

                            <Box flex={1} position="absolute" height="10px">
                                <animated.div
                                    style={{
                                        position: 'absolute',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '10px',
                                        backgroundColor: 'blue',
                                        top: '28px',
                                        transform: x.interpolate(x => `translateY(${x}px)`),
                                    }}
                                />
                            </Box>


                        </Flex>

                    </Flex>

                </Box>


                <Flex flex={1} justifyContent="center" alignItems="center" >


                    <animated.div
                        style={{
                            opacity: opacity.interpolate(o => 1 - o),
                            transform,
                        }}
                    >
                        <BackSide />

                    </animated.div>

                    <animated.div
                        style={{
                            opacity,
                            transform: transform.interpolate(t => `${t} rotateY(180deg)`),
                            position: 'absolute',
                        }}
                    >
                        <FrontSide />
                    </animated.div>




                </Flex>



            </Flex>

        </Flex >
    );
}

export default Home3;
