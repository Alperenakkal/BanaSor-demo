import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Flex,
  Avatar,
  Button,
  Box,
  Image,
  CardBody,
  CardFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { AiOutlineEllipsis } from "react-icons/ai";
import axios from "axios";

const calculateElapsedTime = (isoDate) => {
  const currentDate = new Date();
  const givenDate = new Date(isoDate);
  const timeDifferenceInMilliseconds = currentDate - givenDate;

  const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
  const timeDifferenceInHours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
  const timeDifferenceInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));

  if (timeDifferenceInDays > 0) {
    return `${timeDifferenceInDays} gün önce`;
  } else if (timeDifferenceInHours > 0) {
    return `${timeDifferenceInHours} saat önce`;
  } else if (timeDifferenceInMinutes > 0) {
    return `${timeDifferenceInMinutes} dakika önce`;
  } else {
    return `${timeDifferenceInSeconds} saniye önce`;
  }
};

const SoruDetay = () => {
  const [soru, setSoru] = useState(null);
  const navigate = useNavigate();
  const { soruid } = useParams();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const soruResponse = await axios.get(`http://localhost:3000/soru/soru/${soruid}`);
        const soruData = soruResponse.data;

        const userId = soruData.userId;
        const userDataResponse = await axios.get(`http://localhost:3000/kullanici/getUser/id/${userId}`);
        const userData = userDataResponse.data;

        const updatedSoru = {
          ...soruData,
          userData: userData
        };

        setSoru(updatedSoru);
      } catch (error) {
        console.error('Veri alma hatası:', error);
        toast({
          title: "Hata",
          description: "Veri alınırken bir hata oluştu.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [soruid, toast]);

  const handleClick = (konu) => {
    navigate(`/konu/${konu}`);
  };

  const handleClick2 = (name) => {
    navigate(`/profile/${name}`);
  };

  const handleClick3 = (soruid) => {
    navigate(`/soruguncelle/${soruid}`);
  };

  const handleDelete = async (soruid) => {
    try {
      await axios.delete(`http://localhost:3000/soru/soru/${soruid}`);
      toast({
        title: "Başarılı",
        description: "Soru başarıyla silindi.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/'); // Navigate to home or another relevant page
    } catch (error) {
      console.error('Silme hatası:', error);
      toast({
        title: "Hata",
        description: "Soru silinirken bir hata oluştu.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!soru) return <div>Yükleniyor...</div>;

  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        <Flex p="5px" w="100%">
          <Flex minWidth={"608px"} maxWidth="608px" height="auto" px={4}>
            <Card
              overflow="hidden"
              variant="outline"
              sx={{ minWidth: "608px", maxWidth: "608px", minHeight: "200px" }}
            >
              <Flex pl={"20px"} pt={"15px"} alignItems="center">
                <Avatar
                  size={"sm"}
                  src={soru.userData.profilePic}
                  name={soru.userData.fullName}
                />
                <Flex alignItems="center" ml={2}>
                  <Button
                    bg="transparent"
                    _hover={{ bg: "transparent", textDecoration: "underline" }}
                    alignItems="center"
                    fontWeight="bold"
                    fontFamily="heading"
                    onClick={() => handleClick2(soru.userData.userName)}
                  >
                    {soru.userData.fullName}
                  </Button>
                  <Box w={1} h={1} bg="gray.800" borderRadius="full" ml={2} />
                  <Button
                    bg="transparent"
                    _hover={{ bg: "transparent", textDecoration: "underline" }}
                    alignItems="center"
                    fontFamily="heading"
                    fontSize="xs"
                    onClick={() => handleClick(soru.dersName)}
                  >
                    {soru.dersName}
                  </Button>
                </Flex>
                <Text pl={2} fontSize="xs" fontFamily="heading">
                  {calculateElapsedTime(soru.createdAt)}
                </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    marginLeft="auto"
                    size="m"
                    marginRight="25px"
                  >
                    <AiOutlineEllipsis />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleClick3(soru.globalId)}>
                      <FaPencilAlt /> Soru Güncelle
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(soru.globalId)}>
                      <FaTrash /> Soru Sil
                    </MenuItem>
                  </MenuList>
                </Menu>
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
                <Button variant="outline">
                  <Image boxSize={"18px"} src="/like.svg" />
                </Button>
                <Button
                  marginLeft={"auto"}
                  colorScheme="teal"
                  variant="outline"
                >
                  Cevapları Gör
                </Button>
              </CardFooter>
            </Card>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SoruDetay;
