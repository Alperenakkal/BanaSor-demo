import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Card, CardBody } from '@chakra-ui/card';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios eklenmeli

const Kisiler = () => {
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/kullanici/eniyiler'); // Backend endpointi
                console.log(response.data);
                setTopUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTopUsers();
    }, []);

    const [expanded, setExpanded] = useState(false);

    const displayedUsers = expanded ? topUsers : topUsers.slice(0, 5);
    const buttonText = expanded ? "Daralt" : "Genişlet";

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    // displayedUsers null veya undefined ise, yükleniyor durumunu göster
    if (!displayedUsers) {
        return <div>Loading...</div>; // veya uygun bir yükleme göstergesi
    }

    console.log(displayedUsers);
    if (!Array.isArray(displayedUsers)) {
        // displayedUsers bir dizi değilse veya undefined/null ise, hata işlemlerini burada yapabilirsiniz
        console.error('displayedUsers bir dizi değil veya tanımsız.');
        return null; // veya boş bir JSX döndürebilirsiniz
      }
      

    return (
        <Flex flexDirection="column" alignItems="center">
            <Card height={expanded ? "auto" : "400px"} width="300px" mb="4">
                <CardBody>
                    <Flex mb="20px" alignItems="center">
                        <Image src="/crown-icon.svg" w="30" h="30" mr="2" />
                        <Text fontSize="18px" fontWeight="bold" textDecoration="underline">En İyiler</Text>
                    </Flex>
                    <Flex flexDirection="column" alignItems="flex-start">
                        {displayedUsers.map((user, index) => (
                            <Box key={index} maxW="200px" margin="auto" mb="7" mr="1" ml="2" display="flex" alignItems="center">
                                <Avatar src={user.profilePic} size="xs" />
                                <Text mt={2} ml={2} fontSize="13px" fontWeight="bold">{user.userName}</Text>
                                <Text ml={8} fontSize="15px">{user.totalPoints} p</Text>
                            </Box>
                        ))}
                    </Flex>
                </CardBody>
                <Button colorScheme="teal" size="sm" alignSelf="center" onClick={toggleExpansion} mb="10px">
                    {buttonText}
                </Button>

            </Card>
        </Flex>
    );
};

export default Kisiler;
