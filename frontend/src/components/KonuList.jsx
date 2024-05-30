import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarGroup,    Divider,
    Box, Button, Card, CardBody, CardFooter, Flex, Image, Text } from '@chakra-ui/react';
import RancedList from './RancedList';
import DersList from './DersList';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';

const calculateElapsedTime = (isoDate) => {
    const currentDate = new Date();
    const givenDate = new Date(isoDate);
    const timeDifferenceInMilliseconds = currentDate - givenDate;

    // Geçen zamanın gün, saat, dakika veya saniye cinsine dönüştürülmesi
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
    const timeDifferenceInHours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    const timeDifferenceInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));

    // En uygun zaman birimini seçme
    if (timeDifferenceInDays > 0) {
        return `${timeDifferenceInDays} gün önce`;
    } else if (timeDifferenceInHours > 0) {
        return `${timeDifferenceInHours} saat önce`;
    } else if (timeDifferenceInMinutes > 0) {
        return `${timeDifferenceInMinutes} dakika önce`;
    } else {
        return `${timeDifferenceInSeconds} saniye önce`;
    }
};
const SoruDetail = () => {

    const { konu } = useParams(); // konu parametresini al
    const [sorular, setSorular] = useState([]);
    const [userData, setUserData] = useState(null);
    const [sorulist, setSoruList] =useState(null);
    const [tumDersleriGoster, setTumDersleriGoster] = useState(false);
    const [dersler, setDersler] = useState([]);
    const AnimatedDivider = animated(Divider);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/dersler.json')
            .then((response) => response.json())
            .then((data) => setDersler(data.dersler));
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Soru verilerini getir
                const soruResponse = await axios.get(`http://localhost:3000/soru/ders/${konu}`);
                const soruData = soruResponse.data;
                // Soru listesini ayarla
                setSoruList(soruData);
                
                // Kullanıcı verilerini getir
                const userDataPromises = soruData.map(async (item) => {
                    const response = await axios.get(`http://localhost:3000/kullanici/getUser/id/${item.userId}`);
                    return response.data;
                });
                const userData = await Promise.all(userDataPromises);
                // Verileri alınan kullanıcı verileriyle birlikte sorulist dizisine ekleyin
                const updatedSorulist = soruData.map((item, index) => {
                    return {
                        ...item,
                        userData: userData[index] // Her öğenin userData alanı, karşılık gelen kullanıcı verisiyle güncellenmiş olacak
                    };
                });
                setSoruList(updatedSorulist); // Güncellenmiş sorulist dizisini ayarlayın
            } catch (error) {
                console.error('Veri alma hatası:', error);
            }
        };
    
        // fetchData işlevini çağır
        fetchData();
    }, []);

           
        

    // sorulist dizisinin değişikliklerine bağlı olarak çalışması sağlanıyor
    
    console.log(sorulist)

    // handleClick fonksiyonu (Örnek amaçlı, detaylar sizin kullanımınıza göre değişebilir)
    const handleClick = (dersIsim) => {
        navigate(`/konu/${dersIsim}`)
        window.location.reload()

    };
    const handleClick2=(soruid)=>{
        navigate(`/sorudetay/${soruid}`)
    }
    const dersleriGoster = tumDersleriGoster ? dersler : dersler.slice(0, 11);
    const dahaFazlaAnimasyon = useSpring({
        to: {
            opacity: 1,
            height: tumDersleriGoster ? 'auto' : '0px',
            transform: tumDersleriGoster ? 'translateY(0%)' : 'translateY(-10%)',
        },
        from: {
            opacity: 1,
            height: 'auto',
            transform: 'translateY(-150%)',
        },
        config: {
            duration: 200,
        },
    });


    return (
    <Flex direction={"column"}>
        
            <Flex direction={"column"}> {/* Yeni ana Flex, yönünü sütun olarak ayarla */}
                <Flex direction="column" alignItems="center" justifyContent="center" p="5px" w="100%"> {/* DersList'i içeren Flex */}
                <h2>Ders Listesi</h2>
                <animated.div
                    style={dahaFazlaAnimasyon}
                    wrap="wrap"
                    justify="center"
                    gap={10}
                    maxWidth="1100px"
                    mt="3"
                    width="100%"
                    alignItems="center"
              
                    
                >
                    {dersleriGoster.map((ders) => (
                        <Button
                            key={ders.id}
                            mt="10px"
                            bg="transparent"
                            _hover={{ bg: 'transparent' }}
                            variant="unstyled"
                            alignItems="center"
                            onClick={() => handleClick(ders.name)}
                            mr="10px"
                            ml="10px"
                            
                            
                            
                        >
                            <Flex direction="column" alignItems="center" gap={3}>
                                <Image src={`/derslerimg/${ders.icon}`} boxSize="50px" />
                                <Box fontSize="12px" fontFamily="ProximaNova, Helvetica, Arial, sans-serif" textAlign="center" mt={2}>
                                    {ders.name}
                                </Box>
                            </Flex>
                        </Button>
                    ))}
                </animated.div>
                <Flex mt="50px" alignItems="center" justifyContent="center" width="87%">
                    <AnimatedDivider style={dahaFazlaAnimasyon} borderColor="#58A399" borderWidth="2px" flex={1} />
                    <Button mx="2" size="sm" onClick={() => setTumDersleriGoster(!tumDersleriGoster)} bg="transparent">
                        {tumDersleriGoster ? 'Daha Az' : 'Daha Fazlası'}
                    </Button>
                    <AnimatedDivider style={dahaFazlaAnimasyon} borderColor="#58A399" borderWidth="2px" flex={1} />
                </Flex>
                </Flex>
                <Flex direction={"row"} gap={-1} >
                <Flex direction="column" alignItems="center" justifyContent="center" p="5px" w="100%">

                { sorulist && sorulist.map((soru, index) => (
    <Flex key={index} minWidth={"608px"} maxWidth="608px" height="auto" px={4}>
        {/* Kart içeriği */}
        <Card overflow='hidden' variant='outline' sx={{ minWidth: '608px', maxWidth: '608px', minHeight: '200px' }}>
            {/* Kart başlığı */}
            <Flex pl={"20px"} pt={"15px"} alignItems="center">
            {soru.userData ? (
                <Avatar size={"sm"} name= {soru.userData.fullName} src={soru.userData.profilePic} />
            ) : (
                <Avatar size={"sm"} />
            )}
                <Flex alignItems="center">
                    <Button
                        ml={2}
                        bg="transparent"
                        _hover={{ bg: "transparent", textDecoration: "underline" }}
                        alignItems="center"
                        fontWeight="bold" fontFamily="heading"
                        onClick={() => handleClick(soru.dersName)}
                    >
                        {soru.dersName}
                    </Button>
                    <Box w={1} h={1} bg="gray.800" borderRadius="full" ml={2} />
                </Flex>
                <Text pl={2} fontSize="sm" fontWeight="bold" fontFamily="heading">{calculateElapsedTime(soru.createdAt)}</Text>
            </Flex>

            {/* Kart gövdesi */}
            <CardBody pl={"50px"} p={2}>
                <Text
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    borderRadius="md"
                    fontFamily={"ProximaNova, Helvetica, Arial, sans-serif"}
                    _active={{ bg: "gray.200" }}
                    onClick={() => handleClick2(soru._id)}
                >
                    {soru.soru}
                </Text>
            </CardBody>

            {/* Kart altbilgisi */}
            <CardFooter pl={"50px"} gap={3} display="flex">
                <Image src={"/list.svg"} w={"30px"} h={"30px"} />
                <AvatarGroup size='sm' max={3}>
                    <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                    <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                    <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                    <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                </AvatarGroup>
                <Button marginLeft="auto" colorScheme='teal' variant='outline'>
                    Cevapla
                </Button>
            </CardFooter>
        </Card>
    </Flex>
))}

                </Flex>
                  <Flex pr={"100px"}>
                        <RancedList />
                    </Flex>
                    
            </Flex>
          
        </Flex>
        </Flex>
    );
};

export default SoruDetail;
