import React from "react";
import {
  Card,
  Box,
  Flex,
  Text,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const SoruSorSayfasi = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [soruMetni, setSoruMetni] = React.useState("");
  const [konuSecimi, setKonuSecimi] = React.useState("");
  const [sınıfSecimi, setSınıfSecimi] = React.useState("");

  const handleClick = () => {
    if (!soruMetni || !konuSecimi || !sınıfSecimi) {
      toast({
        title: "Hata!",
        description: "Lütfen önce bir soru metni yazın ve bir konu seçin!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      navigate("/sorulistesi");
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
            Ödevin hakkındaki sorunu sorabilirsin.
          </Text>
          <Textarea
            borderRadius="35px"
            mb="8"
            width="600px"
            height="200px"
            placeholder="Anlaşılır biçimde yazılan sorular daha çabuk cevap alır. Şimdi yazabilirsin..."
            value={soruMetni}
            onChange={(e) => setSoruMetni(e.target.value)}
          />
          <Flex gap={4}>
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
              placeholder="Konu Seçin"
              value={konuSecimi}
              onChange={(e) => setKonuSecimi(e.target.value)}
            >
              <option value="">Seçiniz</option>
              <option value="Matematik">Matematik</option>
              <option value="Fizik">Fizik</option>
              {/* Add more options */}
            </Select>
          </Flex>
          <Button
            borderRadius="50px"
            bg={"#36454F"}
            color="white"
            onClick={handleClick}
          >
            SORUNU EKLE
          </Button>
        </Box>
      </Card>

      <Flex alignItems="center" direction={"column"} gap="2" mt={"30px"}>
        <Text fontWeight="bold" fontSize="40px" color="#40E0D0">
          <span style={{ color: "#FFA500" }}>ZORLUKLARI </span>FIRSATA
        </Text>
        <Text fontWeight="bold" fontSize="40px" color="#40E0D0" ml="2">
          DÖNÜŞTÜR, <span style={{ color: "#FFA500" }}>BAŞARI </span>
        </Text>
        <Text fontWeight="bold" fontSize="40px" color="#40E0D0" ml="2">
          SENİNLE OLACAK.
        </Text>
      </Flex>
    </Flex>
  );
};

export default SoruSorSayfasi;