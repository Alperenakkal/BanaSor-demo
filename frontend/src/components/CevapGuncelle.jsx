import React, { useEffect, useState } from 'react';
import { Card, Box, Flex, Text, Textarea, Button, Image, useToast, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { AttachmentIcon } from '@chakra-ui/icons';

const CevapGuncelle = () => {
    const { soruid } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [soru, setSoru] = useState(null); // İsmi "setSoru" olarak düzeltildi.
    const [soruMetni, setSoruMetni] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetch('/sorular.json')
            .then(response => response.json())
            .then(data => {
                const foundQuestion = data.sorular
                    .flatMap(ders => ders.sorular.map(soru => ({ ...soru, dersIsim: ders.isim })))
                    .find(soru => soru.globalId === parseInt(soruid));
                setSoru(foundQuestion);
                setSoruMetni(foundQuestion?.cevap);
            });
    }, [soruid]);

    const handleUpdate = () => {
        toast({
            title: "Başarılı!",
            description: "Soru ve fotoğraf güncellendi.",
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
            <Card w="700px" h="auto">
                <Box p="4" display="flex" flexDirection="column" alignItems="flex-start">
                    <Text mb="5" fontWeight="bold">Cevabı Güncelle</Text>
                    <Textarea
                        borderRadius="35px"
                        mb="8"
                        width="600px"
                        height="200px"
                        value={soruMetni}
                        onChange={(e) => setSoruMetni(e.target.value)}
                    />
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

export default CevapGuncelle;
