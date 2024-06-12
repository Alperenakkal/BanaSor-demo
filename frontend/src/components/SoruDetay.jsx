import React, { useEffect, useState } from "react";
import {
    Card, Text, Flex, Avatar, Button, Box, Image, CardBody, CardFooter, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { TimeCal } from './TimeCal';
import { FaPencilAlt, FaRegStar } from "react-icons/fa";
import YorumYapma from "./YorumYapma";
import axios from "axios";

const SoruDetay = () => {
    const [soru, setSoru] = useState(null);
    const [yorumlar, setYorumlar] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [tempRating, setTempRating] = useState(0);
    const [selectedSoruIndex, setSelectedSoruIndex] = useState(null);
    const [likeCount, setLikeCount] = useState(0); // Like sayısı için state
    const navigate = useNavigate();
    const { soruid } = useParams();

    useEffect(() => {
        axios.get(`/api/sorular/${soruid}`)
            .then(response => {
                setSoru(response.data);
            })
            .catch(error => {
                console.error("Kullanıcı verilerini alma hatası:", error);
            });
    }, [soruid]);

    if (!soru) return <div>Yüklüyor...</div>;

    const zamanFarki = TimeCal(soru.soruSorulmaSuresi);

    const handleClick = (konu) => {
        navigate(`/konu/${konu}`);
    };

    const handleClick3 = (soruid) => {
        navigate(`/soruguncelle/${soruid}`);
    };

    const handleClick2 = (name) => {
        navigate(`/profile/${name}`);
    };

    const handleOpenModal = () => {
        setTempRating(soru.selectedRating);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleYorumSubmit = (yeniYorum) => {
        setYorumlar([...yorumlar, yeniYorum]);
    };

    const handleYorumSil = (index) => {
        setYorumlar(yorumlar.filter((_, i) => i !== index));
    };

    const handleStarClick = (starIndex) => {
        setTempRating(starIndex + 1);
    };

    const handleSubmitRating = () => {
        setSoru(prevSoru => ({
            ...prevSoru,
            selectedRating: tempRating,
        }));
        handleCloseModal();
    };

    const handleLikeClick = () => {
        setLikeCount(likeCount + 1); // Like sayısını 1 artır
    };

    return (
        <Flex flexDirection="row">
            <Flex flexDirection="column">
                <Flex p="5px" w="100%">
                    <Flex minWidth={"608px"} maxW="608px" height="auto" px={4}>
                        <Card overflow='hidden' variant='outline' sx={{ minWidth: '608px', maxW: '608px', minHeight: '200px' }}>
                            <Flex pl={"20px"} pt={"15px"} align="center" justify="space-between">
                                <Flex align="center">
                                    <Avatar size={"sm"} src={soru.avatar} name={`${soru.isim} ${soru.soyisim}`} />
                                    <Flex align="center" ml={2}>
                                        <Button
                                            bg="transparent"
                                            _hover={{ bg: "transparent", textDecoration: "underline" }}
                                            align="center"
                                            fontWeight="bold" fontFamily="heading"
                                            onClick={() => handleClick2(soru.isim)}
                                        >
                                            {soru.isim} {soru.soyisim}
                                        </Button>
                                        <Box w={1} h={1} bg="gray.800" borderRadius="full" ml={2} />
                                        <Button
                                            bg="transparent"
                                            _hover={{ bg: "transparent", textDecoration: "underline" }}
                                            align="center"
                                            fontFamily="heading"
                                            fontSize="xs"
                                            onClick={() => handleClick(soru.dersIsim)}
                                        >
                                            {soru.dersIsim}
                                        </Button>
                                    </Flex>
                                    <Text pl={2} fontSize="xs" fontFamily="heading">{zamanFarki}</Text>
                                </Flex>
                                <Flex>
                                    <Button size="m" marginRight="10px" onClick={handleOpenModal}>
                                        <FaRegStar />
                                    </Button>
                                    <Button size="m" marginRight="10px" onClick={() => handleClick3(soru.globalId)}>
                                        <FaPencilAlt />
                                    </Button>
                                    <Button size="m" onClick={handleLikeClick}> {/* Like butonu */}
                                        <Image boxSize={"18px"} src='/like.svg' />
                                    </Button>
                                    <Text ml={1}>{likeCount}</Text> {/* Like sayısını göster */}
                                </Flex>
                                <Modal isOpen={isOpen} onClose={handleCloseModal}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Puan Ver</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Flex justifyContent="center">
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <FaRegStar
                                                        key={starIndex}
                                                        onClick={() => handleStarClick(starIndex)}
                                                        color={starIndex < tempRating ? 'yellow' : 'gray.300'}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                ))}
                                            </Flex>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="blue" mr={3} onClick={handleSubmitRating}>
                                                Onayla
                                            </Button>
                                            <Button variant="ghost" onClick={handleCloseModal}>
                                                Kapat
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Flex>
                            <CardBody pl={"50px"} p={2}>
                                <Text borderRadius="md" fontFamily={"ProximaNova, Helvetica, Arial, sans-serif"}>
                                    {soru.soru}
                                </Text>
                            </CardBody>
                            <CardFooter pl={"50px"} gap={3} display="flex">
                                <Button variant='outline'>
                                    <Image boxSize={"18px"} src='/like.svg' />
                                </Button>
                                <Text>{likeCount}</Text> {/* Like sayısını göster */}
                                <Button marginLeft={"auto"} colorScheme='teal' variant='outline'>
                                    Cevapları Gör
                                </Button>
                            </CardFooter>
                        </Card>
                    </Flex>
                </Flex>
                <Flex mt={4}>
                    <Flex minWidth={"608px"} maxW="608px" height="auto" px={4}>
                        <Card overflow='hidden' variant='outline' sx={{ minWidth: '608px', maxW: '608px', minHeight: '200px' }}>
                            <CardBody>
                                <YorumYapma onYorumSubmit={handleYorumSubmit} />
                                {yorumlar.map((yorum, index) => (
                                    <Card key={index} mt={2} p={4} width="100%" variant='outline'>
                                        <Text>{yorum}</Text>
                                    </Card>
                                ))}
                            </CardBody>
                        </Card>
                    </Flex>
                </Flex>
            </Flex>
            <Flex pl={"100px"}>
                <Image w={"10px"} h="10px" src='/alperen.img' />
            </Flex>
        </Flex>
    );
};

export default SoruDetay;