import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarGroup, Box, Button, Card, CardBody, CardFooter, Flex, Image, Text } from '@chakra-ui/react';
import RancedList from './RancedList';
import DersList from './DersList';

const SoruDetail = () => {
    const { konu } = useParams(); // konu parametresini al
    const [sorular, setSorular] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/sorular.json') // Veri kaynağınızın URL'si
            .then(response => response.json())
            .then(data => {
                // Tüm soruları alıp, seçilen konu ile eşleşenleri filtrele
                const filtrelenmisSorular = data.sorular
                    .flatMap(ders => ders.sorular.map(soru => ({ ...soru, dersIsim: ders.isim }))) // Önce ders ve soru bilgilerini birleştir
                    .filter(soru => soru.dersIsim === konu); // Seçilen konu ile eşleşen soruları filtrele
                setSorular(filtrelenmisSorular);
            });
    }, [konu]); // konu değişkenini bağımlılıklara ekle

    // handleClick fonksiyonu (Örnek amaçlı, detaylar sizin kullanımınıza göre değişebilir)
    const handleClick = (dersIsim) => {
        navigate(`/konu/${dersIsim}`)
    };
    const handleClick2=(soruid)=>{
        navigate(`/sorudetay/${soruid}`)
    }
    

    return (
        
            <Flex direction={"column"}> {/* Yeni ana Flex, yönünü sütun olarak ayarla */}
                <Flex direction="column" alignItems="center" justifyContent="center" p="5px" w="100%"> {/* DersList'i içeren Flex */}
                    <DersList/>
                </Flex>
                <Flex direction={"row"} gap={-1} >
                <Flex direction="column" alignItems="center" justifyContent="center" p="5px" w="100%">

                {sorular.map((soru, index) => (
                         <Flex minWidth={"608px"} maxWidth="608px" height="auto" px={4}>
                         <Card overflow='hidden' variant='outline' sx={{ minWidth: '608px', maxWidth: '608px', minHeight: '200px' }}>
                             <Flex pl={"20px"} pt={"15px"} alignItems="center">
                                 <Avatar size={"sm"} name={`${soru.isim} ${soru.soyisim}`} src={soru.avatar} />
                                 <Flex alignItems="center">
                                     <Button
                                         ml={2}
                                         bg="transparent"
                                         _hover={{ bg: "transparent", textDecoration: "underline" }}
                                         alignItems="center"
                                         fontWeight="bold" fontFamily="heading"
                                         onClick={() => handleClick(soru.dersIsim)}
                                     >
                                         {soru.dersIsim}
                                     </Button>
                                     <Box w={1} h={1} bg="gray.800" borderRadius="full" ml={2} />
                                 </Flex>
                                 <Text pl={2} fontSize="sm" fontWeight="bold" fontFamily="heading">1 dakika önce</Text>
                             </Flex>

                             <CardBody pl={"50px"} p={2}>
                                 <Text
                                     cursor="pointer"
                                     _hover={{ textDecoration: "underline" }}
                                     borderRadius="md"
                                     fontFamily={"ProximaNova, Helvetica, Arial, sans-serif"}
                                     _active={{ bg: "gray.200" }}
                                     onClick={()=>handleClick2(soru.globalId)}
                                 >
                                     {soru.soru}
                                 </Text>
                             </CardBody>

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
    );
};

export default SoruDetail;
