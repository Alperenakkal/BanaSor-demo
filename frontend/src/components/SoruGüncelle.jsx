import React, { useEffect, useState } from "react";
import { Card, Box, Flex, Text, Textarea, Select, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';

const SoruGüncelle = () => {
  const { soruid } = useParams(); // Parametreleri al
  const navigate = useNavigate();
  const toast = useToast();
  const [soru, setSoru] = useState({}); // Soru state'i
  const [soruMetni, setSoruMetni] = useState(""); // Soru metni state'i
  const [konuSecimi, setKonuSecimi] = useState(""); // Konu seçimi state'i
  const [sınıfSecimi, setSınıfSecimi] = useState("");

  // Component yüklendiğinde
  useEffect(() => {
    fetchSoru();
  }, [soruid]);

  // Soruyu getiren fonksiyon
  const fetchSoru = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/soru/${soruid}`);
      if (response.status === 200) {
        const data = response.data;
        setSoru(data);
        setSoruMetni(data.soru);
        setKonuSecimi(data.dersName);
        setSınıfSecimi(data.sınıf);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Soru getirme hatası:", error);
    }
  };

  // Soruyu güncelleyen fonksiyon
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/soru/guncelle/${soruid}`, {
        dersName: konuSecimi,
        soru: soruMetni
      });
      toast({
        title: "Başarılı!",
        description: "Soru güncellendi.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/sorulistesi");
    } catch (error) {
      console.error("Soru güncelleme hatası:", error);
      toast({
        title: "Hata!",
        description: "Soru güncellenirken bir hata oluştu.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex gap={4}>
      <Card w="700px" h="460px">
        <Box
          p="4"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Text mb="5" fontWeight="bold">
            Soruyu Güncelle
          </Text>
          <Textarea
            borderRadius="35px"
            mb="8"
            width="600px"
            height="200px"
            value={soruMetni}
            onChange={(e) => setSoruMetni(e.target.value)}
          />
          <Select
            borderRadius="50px"
            mb="6"
            w="200px"
            placeholder="Sınıf Seçin"
            value={sınıfSecimi}
            onChange={(e) => setSınıfSecimi(e.target.value)}
          >
            <option value="">Seçiniz</option>
            <option value="İlkokul">İlkokul</option>
            <option value="Ortaokul">Ortaokul</option>
            <option value="Lise">Lise</option>
            <option value="Üniversite">Üniversite</option>
          </Select>
          <Select
            borderRadius="50px"
            mb="6"
            w="200px"
            value={konuSecimi}
            onChange={(e) => setKonuSecimi(e.target.value)}
          >
            <option value="Matematik">Matematik</option>
            <option value="Fizik">Fizik</option>
            <option value="Kimya">Kimya</option>
            {/* Diğer konu seçenekleri */}
          </Select>
          <Button
            borderRadius="50px"
            bg={"#36454F"}
            color="white"
            onClick={handleUpdate}
          >
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
