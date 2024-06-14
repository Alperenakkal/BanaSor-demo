import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimeCal } from './TimeCal';
import { FaPencilAlt, FaRegStar } from 'react-icons/fa';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';

const Alperen = () => {
    const [isOpen, setIsOpen] = useState(false); // Modal açma/kapama state'i
    const [selectedSoruIndex, setSelectedSoruIndex] = useState(null); // Seçili soru index'i
    const [dersler, setDersler] = useState([]); // Derslerin tutulacağı state
    const [tumDersleriGoster, setTumDersleriGoster] = useState(false); // Tüm dersleri gösterme state'i
    const [sorular, setSorular] = useState([]); // Soruların tutulacağı state
    const [tempRating, setTempRating] = useState(0); // Geçici olarak seçilen puanın tutulacağı state
    const navigate = useNavigate(); // React Router ile sayfa yönlendirme fonksiyonu

    // Derslerin API'den alınması için useEffect kullanımı
    useEffect(() => {
        axios.get('/soru/dersler')
            .then((response) => {
                setDersler(response.data.dersler);
            })
            .catch((error) => console.error('Dersleri alırken hata:', error));
    }, []);

    // Soruların API'den alınması için useEffect kullanımı
    useEffect(() => {
        axios.get('/soru/sorular')
            .then((response) => {
                const filtrelenmisSorular = response.data.sorular.reduce((acc, ders) => {
                    const sorular = ders.sorular.map((soru) => ({
                        ...soru,
                        dersIsim: ders.isim,
                        zamanFarki: TimeCal(soru.soruSorulmaSuresi),
                        selectedRating: 0,
                    }));
                    return acc.concat(sorular);
                }, []);
                setSorular(filtrelenmisSorular);
            })
            .catch((error) => console.error('Soruları alırken hata:', error));
    }, []);

    // Modal'ı açma fonksiyonu ve seçili soru index'ini ayarlama
    const handleOpenModal = (soruIndex) => {
        setSelectedSoruIndex(soruIndex);
        setTempRating(sorular[soruIndex].selectedRating);
        setIsOpen(true); // Modal'ı aç
    };

    // Modal'ı kapatma fonksiyonu
    const handleCloseModal = () => {
        setIsOpen(false); // Modal'ı kapat
    };

    // Yıldıza tıklama işlemi
    const handleStarClick = (starIndex) => {
        setTempRating(starIndex + 1); // Seçilen yıldızın index'i üzerinden tempRating state'ini güncelle
    };

    // Puanı onaylama ve backend'e gönderme işlemi
    const handleSubmitRating = () => {
        if (selectedSoruIndex !== null) {
            const soruId = sorular[selectedSoruIndex]._id; // Seçili sorunun ID'si
            const points = tempRating; // Seçilen puan

            const token = localStorage.getItem("jwt");
            axios.put(`/soru/rate/${soruId}`, {
                rating: points // API'ye gönderilen puan
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                // Güncellenen puan ortalaması ve puan sayısını frontend'de güncelle
                const updatedSorular = [...sorular];
                updatedSorular[selectedSoruIndex].rating = response.data.averageRating;
                updatedSorular[selectedSoruIndex].voteCount = response.data.voteCount;
                setSorular(updatedSorular);
                
                // İşlem tamamlandığında modal'ı kapat
                handleCloseModal();
            })
            .catch((error) => {
                console.error('Puanlama işlemi sırasında hata oluştu:', error);
                // Hata durumunda kullanıcıya bildirim veya işlem yapılabilir
            });
        } else {
            console.error('Seçili soru indexi null');
        }
    };

    // Ders veya soru tıklama işlemleri için yönlendirme fonksiyonları
    const handleClick = (konu) => {
        navigate(`/konu/${konu}`);
    };

    const handleClick2 = (soruId) => {
        navigate(`/sorudetay/${soruId}`);
    };

    const handleClick3 = (soruId) => {
        navigate(`/soruguncelle/${soruId}`);
    };

    // Derslerin listelendiği bölüm
    const dersleriGoster = tumDersleriGoster ? dersler : dersler.slice(0, 11);

    return (
        <Flex direction="row">
            <Flex direction="column" alignItems="center" justifyContent="center" p="5px" w="100%">
                <h2>Ders Listesi</h2>
                {/* Dersleri listeleme */}
                <div>
                    {dersleriGoster.map((ders) => (
                        <Button
                            key={ders.id}
                            mt="10px"
                            mr="30px"
                            bg="transparent"
                            _hover={{ bg: 'transparent' }}
                            variant="unstyled"
                            alignItems="center"
                            onClick={() => handleClick(ders.name)}
                        >
                            <Flex direction="column" alignItems="center" gap={2}>
                                <Image src={`/derslerimg/${ders.icon}`} boxSize="50px" />
                                <Box fontSize="12px" fontFamily="ProximaNova, Helvetica, Arial, sans-serif" textAlign="center" mt={2}>
                                    {ders.name}
                                </Box>
                            </Flex>
                        </Button>
                    ))}
                </div>
            </Flex>
            {/* Puanlama modalı */}
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Puan Ver</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex justifyContent="center">
                            {[...Array(5)].map((_, index) => (
                                <FaRegStar
                                    key={index}
                                    onClick={() => handleStarClick(index)}
                                    color={index < tempRating ? 'yellow' : 'gray.300'}
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
    );
};

export default Alperen;
