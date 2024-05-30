import { Avatar, Box, Button, Flex, Spinner, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Stack, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaGraduationCap, FaCalendarAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const ProfileName = ({ name }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [follower, setFollower] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kullanici, setKullanici] = useState(false);
  const [userid, setUserId] = useState(0);
  const [kullaniciid, setKullaniciId] = useState(0);
  const [userTokenData, setUserTokenData] = useState(null);
  const [kullaniciidReady, setKullaniciIdReady] = useState(false);
  const [useridReady, setUserIdReady] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [fallowData, setFallowData] = useState(null);
  const [fallowId, setFallowId] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleClick = (userName) => {
    navigate(`/profileedit/${userName}`);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/kullanici/getUser/username/${name}`);
        setUserData(response.data);
        if (response.data && response.data._id) {
          setUserId(response.data._id);
          setFallowId(response.data.followers);
          setUserIdReady(true);
        }
      } catch (error) {
        console.error('Kullanıcı verilerini alma hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [name]);

  useEffect(() => {
    const fetchTokenUserData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:3000/kullanici/getUser/kayitli`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserTokenData(response.data);
        if (response.data && response.data._id) {
          setKullaniciId(response.data._id);
          setKullaniciIdReady(true);
        }
      } catch (error) {
        console.error('Kullanıcı verilerini alma hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTokenUserData();
  }, []); 

  const fetchFollowingData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwt');
      await axios.post(`http://localhost:3000/kullanici/follow/${name}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFollowStatus(!followStatus);
    } catch (error) {
      console.error('Takip işlemi hatası:', error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleFollowClick = () => {
    fetchFollowingData();
  };

  useEffect(() => {
    if (kullaniciidReady && useridReady) {
      setKullanici(kullaniciid === userid);
    }
  }, [kullaniciidReady, useridReady, kullaniciid, userid]);

  useEffect(() => {
    if (kullaniciidReady && useridReady) {
      setFollower(userData?.followers?.includes(kullaniciid));
    }
  }, [kullaniciidReady, useridReady, userData, kullaniciid]);

  if (loading) {
    return <Spinner />;
  }

  if (!userData) {
    return <Text>User data could not be loaded.</Text>;
  }

  const fullName = userData.fullName || 'Ad Soyad';
  const formatDate = (isoDate) => format(new Date(isoDate), 'd MMMM yyyy', { locale: tr });

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  const handleSubmit = () => {
    // Şikayet gönderme işlemi burada yapılabilir
    console.log('Selected Options:', selectedOptions);
    onClose();
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      pt="10px"
      p="5px"
      w="100%"
      pl="30px"
      maxW="450px"
    >
      <Flex direction="column" w="100%">
        <Flex direction="row" alignItems="center">
          <Avatar size="xl" bg="teal.500" name={fullName} src={userData.profilePic} />
          <Flex direction="column" ml="10px" alignItems="flex-start">
            <Text fontSize="xl" fontWeight="bold">{fullName}</Text>
            <Flex bg="gray" color="white" p="2px 5px" borderRadius="5px" mt="5px">
              {userData.points || 0} Puan
            </Flex>
          </Flex>
        </Flex>
        <Flex mt="30px" direction="row" align="center" justify="space-between" borderRadius="10px" p="20px" bg="#EEEEEE">
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            pl="20px"
            bg="#58A399"
            w="30%"
            fontWeight="bold"
            height="50px"
            borderRadius="10px"
          >
            Çirak
          </Flex>
          <Flex direction="column">
            {!kullanici && (
              <Button
                size="lg"
                bg="#EEE"
                height="50px"
                width="300px"
                leftIcon={<FaUserPlus size="1.5em" />}
                onClick={handleFollowClick}
              >
                {follower ? "Takipten Çık" : "Takip Et"}
              </Button>
            )}
            <Box pl="30px" borderRadius="10px" size="lg" direction="row">
              <Flex>
                <Text fontWeight="bold" fontSize="lg" color="gray.800">Takipçi sayısı:</Text>
                <Text fontWeight="bold" fontSize="lg" color="gray.800" ml={2}>
                  {userData.followers?.length || 0}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {kullanici ? (
        <Flex alignItems="flex-start" mt="30px">
          <Button
            width="300px"
            borderRadius="30px"
            fontWeight="bold"
            gap={2}
            onClick={() => handleClick(userData.userName)}
          >
            <FaPencilAlt />
            Profili Düzenle
          </Button>
        </Flex>
      ) : (
        <Button
          width="300px"
          borderRadius="30px"
          fontWeight="bold"
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          _active={{ bg: "red.700" }}
          onClick={onOpen}
        >
          Şikayet Et
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Şikayet Et</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="fieldset">
              <FormLabel as="legend">Şikayet Nedeni</FormLabel>
              <Stack direction="column">
                {["Müstehcen", "Küfür", "YanilticiBilgi", "Tehdit"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleOptionChange(option)}
                    bg={selectedOptions.includes(option) ? "gray.300" : ""}
                    _hover={{ bg: "gray.200" }}
                    _active={{ bg: "gray.400" }}
                  >
                    {option}
                  </Button>
                ))}
              </Stack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Gönder
            </Button>
            <Button variant="ghost" onClick={onClose}>
              İptal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex alignItems="flex-start" w="100%" mt="30px" direction="column">
        <Text fontWeight="bold">Hakkında</Text>
        <Box height="5px" width="100%" bg="gray.200" mt="4px" />
        <Flex mt="20px" gap={3}>
          <FaGraduationCap fontSize="25px" />
          <Text fontWeight="light">Seviye:</Text>
          <Text fontWeight="bold">{userData.seviye}</Text>
        </Flex>
        <Flex mt="20px" gap={3}>
          <FaCalendarAlt fontSize="25px" />
          <Text fontWeight="light">Katılma Tarihi:</Text>
          <Text fontWeight="bold">{formatDate(userData.createdAt)}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileName;
