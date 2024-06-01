import React, { useEffect, useState } from 'react';
import { Card, Box, Flex, Text, Textarea, Select, Button, IconButton, Image } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { AttachmentIcon, CloseIcon } from '@chakra-ui/icons';

const SoruGüncelle = () => {
    const { soruid } = useParams(); // Parametreleri al
    const navigate = useNavigate();
    const toast = useToast();
    const [soru, setSorular] = useState([]);
    const [soruMetni, setSoruMetni] = useState(""); // Soru metni state'i
    const [konuSecimi, setKonuSecimi] = useState(""); // Konu seçimi state'i
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    


    // Component yüklendiğinde
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

    const handleUpdate = () => {
        // Güncelleme işlemi burada gerçekleştirilecek
        toast({
            title: "Başarılı!",
            description: "Soru güncellendi.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        navigate("/sorulistesi");
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImagePreview = () => {
        setImage(null);
        setImagePreview(null);
    };

    return (
        <Flex gap={4}>
            <Card w="700px" h="auto" maxH={"600px"}>
                <Box p="4" display="flex" flexDirection="column" alignItems="flex-start">
                    <Text mb="5" fontWeight="bold">Soruyu Güncelle</Text>
                    <Textarea
                        borderRadius="35px"
                        mb="8"
                        width="600px"
                        height="200px"
                        value={soru.soru}
                        onChange={(e) => setSoruMetni(e.target.value)}
                    />
                    <Select
                        borderRadius="50px"
                        mb="6"
                        w="200px"
                        value={soru.dersIsim}
                        onChange={(e) => setKonuSecimi(e.target.value)}
                    >
                        <option value='Matematik'>Matematik</option>
                        <option value='Fizik'>Fizik</option>
                        <option value='Kimya'>Kimya</option>
                        {/* Diğer konu seçenekleri */}
                    </Select>
                    {imagePreview && (
                        <Box position="relative" width="100px" height="100px">
                            <Image
                                src={imagePreview}
                                alt="Fotoğraf Önizlemesi"
                                borderRadius="md"
                                maxWidth="100px"
                                maxHeight="100px"
                                objectFit="cover"
                            />
                            <IconButton
                                icon={<CloseIcon />}
                                aria-label="Resmi Kaldır"
                                position="absolute"
                                right="0"
                                top="0"
                                size="sm"
                                onClick={removeImagePreview}
                                variant="ghost"
                                colorScheme="red"
                            />
                        </Box>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="file-upload">
                        <IconButton
                            icon={<AttachmentIcon />}
                            aria-label="Dosya Yükle"
                            variant="outline"
                            as="span"
                            mb="2"
                        />
                    </label>
                    <Button borderRadius="50px" bg={"#36454F"} color="white" onClick={handleUpdate}>
                        GÜNCELLE
                    </Button>
                </Box>
            </Card>
            

            <Flex alignItems="center" direction={"column"} gap="2" mt={"30px"}>
                <Text fontWeight="bold" fontSize="40px" color="#6495ED">
                   HER AN
                </Text>
                <Text fontWeight="bold" fontSize="40px" color="#6495ED" ml="2">
                    YENİ, BİR
                </Text>
                <Text fontWeight="bold" fontSize="40px" color="#6495ED" ml="2">
                    BAŞLANGIÇTIR.
                </Text>
            </Flex>
        </Flex>
    );
};

export default SoruGüncelle;
