import { Avatar, Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaGraduationCap, FaCalendarAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const ProfileName = ({ name }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profileedit");
  }

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/kullanici/getUser/username/${name}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [name]);

  if (loading) {
    return <Spinner />;
  }

  if (!userData) {
    return <Text>User data could not be loaded.</Text>;
  }

  const nameParts = userData.fullName.split(" ");
  const isim = nameParts[0];
  const soyisim = nameParts[1];
  const fullName = `${isim} ${soyisim}`;
  const isAlperenAkal = isim === "Alperen" && soyisim === "Akal";

  const formatDate = (isoDate) => {
    return format(new Date(isoDate), 'd MMMM yyyy', { locale: tr });
  };
  console.log(userData)
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
            <Flex>{fullName}</Flex>
            <Flex bg="gray" color="white" p="2px 5px" borderRadius="5px" mt="5px">
              {userData.points || 0} Puan
            </Flex>
          </Flex>
        </Flex>
        <Flex mt={"30px"} direction="row" align="center" justify="space-between" borderRadius={"10px"} p="20px" bg="#EEEEEE">
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            pl="30px"
            bg="#58A399"
            w="30%"
            fontWeight="bold"
            height="50px"
            borderRadius={"10px"}
          >
            Çirak
          </Flex>
          {!isAlperenAkal && (
            <Button
              size="lg"
              bg="#EEE"
              height="50px"
              width="300px"
              leftIcon={<FaUserPlus size="1.5em" />}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Takipten Çık" : "Takip Et"}
            </Button>
          )}
        </Flex>
      </Flex>
      {isAlperenAkal && (
        <Flex alignItems="flex-start" mt="30px">
          <Button width="300px" borderRadius="30px" fontWeight="bold" gap={2} onClick={handleClick}>
            <FaPencilAlt />
            Profili Düzenle
          </Button>
        </Flex>
      )}
      <Flex alignItems="flex-start" w="100%" mt="30px" direction="column">
        <Flex>Hakkinda</Flex>
        <Box height="5px" width="100%" bg="gray.200" mt="4px" />
        <Flex mt="20px" gap={3}>
          <Flex fontWeight="bold" fontSize="25px"><FaGraduationCap /></Flex>
          <Flex fontWeight="light">Seviye:</Flex>
          <Flex fontWeight="bold">{userData.seviye}</Flex>
        </Flex>
        <Flex mt="20px" gap={3}>
          <Flex fontWeight="bold" fontSize="25px"><FaCalendarAlt /></Flex>
          <Flex fontWeight="light">Katılma Tarihi:</Flex>
          <Flex fontWeight="bold">{formatDate(userData.updatedAt)}</Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileName;
