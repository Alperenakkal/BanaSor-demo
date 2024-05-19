import React, { useEffect, useState } from 'react';
import {
    Card, Text, Flex, Avatar, Button, Box, Image, CardBody, CardFooter, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { TimeCal } from './TimeCal';
import { FaPencilAlt, FaRegStar } from "react-icons/fa";

const SoruDetay = () => {
    const [soru, setSoru] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [tempRating, setTempRating] = useState(0);
    const [selectedSoruIndex, setSelectedSoruIndex] = useState(null);
    const navigate = useNavigate();
    const { soruid } = useParams();

    useEffect(() => {
        fetch('/sorular.json')
            .then(response => response.json())
            .then(data => {
                const bulunanSoru = data.sorular
                    .flatMap(ders => ders.sorular.map(soru => ({ ...soru, dersIsim: ders.isim })))
                    .find(soru => soru.globalId === parseInt(soruid));
                setSoru(bulunanSoru);
            });
    }, [soruid]);

    const handleClick = (konu) => {
        navigate(`/konu/${konu}`);
    };

    const handleClick3 = (soruid) => {
        navigate(`/sorugüncelle/${soruid}`);
    };

    const handleOpenModal = () => {
        setTempRating(soru.selectedRating);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
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

    if (!soru) return <div>Yüklüyor...</div>;

    const zamanFarki = TimeCal(soru.soruSorulmaSuresi);

    return (
        <Flex flexDirection="row">
            <Flex flexDirection="column">
                <Flex p="5px" w="100%">
                    <Flex minWidth={"608px"} maxWidth="608px" height="auto" px={4}>
                        <Card overflow='hidden' variant='outline' sx={{ minWidth: '608px', maxWidth: '608px', minHeight: '200px' }}>
                            <Flex pl={"20px"} pt={"15px"} alignItems="center" justifyContent="space-between">
                                <Flex alignItems="center">
                                    <Avatar size={"sm"} src={soru.avatar} name={`${soru.isim} ${soru.soyisim}`} />
                                    <Flex alignItems="center" ml={2}>
                                        <Button
                                            bg="transparent"
                                            _hover={{ bg: "transparent", textDecoration: "underline" }}
                                            alignItems="center"
                                            fontWeight="bold" fontFamily="heading"
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
                                <Button marginLeft={"auto"} colorScheme='teal' variant='outline'>
                                    Cevapları Gör
                                </Button>
                            </CardFooter>
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
