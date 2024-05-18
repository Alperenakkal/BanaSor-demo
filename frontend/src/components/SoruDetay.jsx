import React, { useEffect, useState } from 'react';
import { Card, Text, Flex, Avatar, Button, Box, Image, CardBody, CardFooter } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { TimeCal } from './TimeCal';
import { FaPencilAlt } from "react-icons/fa";


const SoruDetay = () => {
    const [soru, setSorular] = useState([]);
    const navigate = useNavigate();
    const { soruid }=useParams()
  

    useEffect(() => {
        fetch('/sorular.json')
            .then(response => response.json())
            .then(data =>{
                const bulunanSorular=data.sorular
                .flatMap(ders=>ders.sorular.map(soru=>({...soru,dersIsim:ders.isim})))
                .find(soru=>soru.globalId===parseInt(soruid));
                setSorular(bulunanSorular)
            } );
    }, [soruid]);


    const handleClick =(konu) =>{
        navigate(`/konu/${konu}`)
    } 
    const handleClick2 = (name) =>{
        navigate(`/profile/${name}`)
    }

    const handleClick3=(soruid)=>{
        navigate(`/sorugüncelle/${soruid}`)
    }
    
    if(!soru)return <div>Yüklüyor...</div>
   
    const zamanFarki = soru?  TimeCal(soru.soruSorulmaSuresi) : "EVVEL ZAMAN ÖNCE";
    const simdi = new Date();
    
    


    return (
        <Flex   flexDirection="row">
            <Flex  flexDirection="column">
             
                <Flex  p="5px" w="100%">
                    <Flex minWidth={"608px"} maxWidth="608px" height="auto" px={4}>
                        <Card overflow='hidden' variant='outline' sx={{ minWidth: '608px', maxWidth: '608px', minHeight: '200px' }}>
                            <Flex pl={"20px"} pt={"15px"} alignItems="center">
                                <Avatar size={"sm"} src={soru.avatar} name={`${soru.isim} ${soru.soyisim}`} />
                                <Flex alignItems="center" ml={2}>
                                    <Button
                                        bg="transparent"
                                        _hover={{ bg: "transparent", textDecoration: "underline" }}
                                        alignItems="center"
                                        fontWeight="bold" fontFamily="heading"
                                        onClick={()=>{handleClick2(`${soru.isim} ${soru.soyisim}`)}}
                                       
                                    >
                                        {soru.isim} {soru.soyisim}
                                    </Button>
                                    <Box w={1} h={1} bg="gray.800" borderRadius="full" ml={2} />
                                    <Button
                                        bg="transparent"
                                        _hover={{ bg: "transparent", textDecoration: "underline" }}
                                        alignItems="center"
                                        fontFamily="heading"
                                        fontSize="xs"
                                        onClick={() =>{handleClick(soru.dersIsim)}}
                                     
                                    >
                                        {soru.dersIsim}
                                        
                                    </Button>
                                </Flex>
                                <Text pl={2} fontSize="xs" fontFamily="heading">{zamanFarki}</Text>

                                <Button 
                                               marginLeft="auto"  
                                               size="m" 
                                               marginRight="25px"
                                               onClick={() => handleClick3(soru.globalId)}
                                               >
                                                
                                                <FaPencilAlt />
                                                </Button>
                            </Flex>
                            <CardBody pl={"50px"} p={2}>
                           
                                <Text
                                    borderRadius="md"
                                    fontFamily={"ProximaNova, Helvetica, Arial, sans-serif"}
                                >
                                    {soru.soru}
                                </Text>
                            </CardBody>
                            <CardFooter pl={"50px"} gap={3} display="flex">
                                <Button variant='outline'>
                                    <Image boxSize={"18px"} src='/like.svg'></Image>
                                </Button>
                                <Button marginLeft={"auto"} colorScheme='teal' variant='outline'>
                                    Cevapları Gör
                                </Button>
                            </CardFooter>
                        </Card>
                    </Flex>
                </Flex>
            
            <Flex  mt={4}>
                <Flex minWidth={"608px"} maxWidth="608px" height="auto" px={4}>
                    <Card overflow='hidden' variant='outline' sx={{ minWidth: '608px', maxWidth: '608px', minHeight: '200px' }}>
                        <CardBody>
                            <Text>View a summary of all your customers over the last month.</Text>
                        </CardBody>
                    </Card>
                </Flex>
            </Flex>
            </Flex>
            <Flex pl={"100px"}>
               
            </Flex>
        </Flex>
    );
};

export default SoruDetay;
