import { useState } from 'react';
import { Card, Box, Flex, Text, Textarea, Select, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const SoruSorSayfasi = () => {
  const [soru, setSoru] = useState("");
  const [ders, setDers] = useState("");
  const [sinif, setSinif] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("jwt");
      console.log(token);
      const response = await axios.post(
        "http://localhost:3000/soru/sor",
        {
          soru: soru,
          dersName: ders,
          sinif: sinif,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        toast({
          title: "Soru başarıyla eklendi.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/sorulistesi");
      } else {
        throw new Error("Soru eklenemedi");
      }
    } catch (error) {
      toast({
        title: "Bir hata oluştu.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Flex gap={4}>
      <Card w="700px" h="460px">
        <Box p="4" display="flex" flexDirection="column" alignItems="flex-start">
          <Text mb="5" fontWeight="bold">
            Ödevin hakkındaki sorunu sorabilirsin.
          </Text>
          <form onSubmit={handleSubmit}>
            <Textarea
              borderRadius="35px"
              mb="8"
              width="600px"
              height="200px"
              placeholder="Anlaşılır biçimde yazılan sorular daha çabuk cevap alır. Şimdi yazabilirsin..."
              value={soru}
              onChange={(e) => setSoru(e.target.value)}
              isRequired
            />
            <Flex gap={4}>
              <Select
                borderRadius="50px"
                mb="6"
                w="200px"
                placeholder="Sınıf Seçin"
                value={sinif}
                onChange={(e) => setSinif(e.target.value)}
                isRequired
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
                placeholder="Ders Seçin"
                value={ders}
                onChange={(e) => setDers(e.target.value)}
                isRequired
              >
                <option value="">Seçiniz</option>
                <option value="Matematik">Matematik</option>
                <option value="Fizik">Fizik</option>
                {/* Diğer seçenekler */}
              </Select>
            </Flex>
            <Button borderRadius="50px" bg={"#36454F"} color="white" type="submit">
              SORUNU EKLE
            </Button>
          </form>
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
