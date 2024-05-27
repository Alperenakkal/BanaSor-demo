import { Avatar, Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
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
  const [userid ,setUserId]= useState(0);
  const [kullaniciid,setKullaniciId]=useState(0);
  const [userTokenData, setUserTokenData] = useState(null);
  const [kullaniciidReady, setKullaniciIdReady] = useState(false);
  const [useridReady, setUserIdReady] = useState(false);
  const [followStatus, setFollowStatus] = useState(false); // Takip durumu için yeni bir durum
  const [fallowData,setFallowData] = useState(null);
  const [fallowId,setFallowId] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profileedit");
  }

 



  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:3000/kullanici/getUser/username/${name}`);
        setUserData(response.data);
        if (response.data && response.data._id) {
          setUserId(response.data._id);
          setFallowId(response.data.followers)
          setUserIdReady(true);

          setLoading(false);
        }
      } catch (error) {
        console.error('Kullanıcı verilerini alma hatası:', error);
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [name]);
  console.log(fallowId)
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
          setLoading(false);
        }
      } catch (error) {
        console.error('Kullanıcı verilerini alma hatası:', error);
        setLoading(false);
      }
    };
  
    fetchTokenUserData();
  }, [name]);
  const fetchFollowingData = async () => {
    try {
      setLoading(true); // İşlem başlamadan önce yüklenme durumunu aktif et
      const token = localStorage.getItem('jwt');
      const response = await axios.post(`http://localhost:3000/kullanici/follow/${name}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response.data);
      setFollowStatus(true); // Takip işlemi başarılı olduğunda durumu güncelle
    } catch (error) {
      console.error('Kullanıcı verilerini alma hatası:', error);
      setFollowStatus(false); // Takip işlemi hatası durumunda durumu güncelle
    } finally {
      setLoading(false); // İşlem tamamlandıktan sonra yüklenme durumunu kapat
    }
  };

  const handleFollowClick = () => {
    fetchFollowingData();
    
  
  };
  useEffect(() => {
    if (kullaniciidReady && useridReady) {
      if (kullaniciid === userid) {
        setKullanici(true);
      } else {
        setKullanici(false);
      }
    }
  }, [kullaniciidReady, useridReady]);
  useEffect(() => {
    if (kullaniciidReady && useridReady) {
      if (userData && userData.followers && userData.followers.includes(userid)) {
        setFollower(true);
      } else {
        setFollower(false);
      }
    }
  }, [kullaniciidReady, useridReady, userData, userid]);


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
 
console.log(userData)

  const formatDate = (isoDate) => {
    return format(new Date(isoDate), 'd MMMM yyyy', { locale: tr });
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
            pl="20px"
            bg="#58A399"
            w="30%"
            fontWeight="bold"
            height="50px"
            borderRadius={"10px"}
          >
            Çirak
          </Flex>
          <Flex direction={"column"}>
            
          
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
       <Box
      pl={"30px"}
     
      borderRadius={"10px"}
      size="lg"
      direction="row"
    >
        <Flex>
        <Text
          fontWeight="bold" // Yazıların kalın olmasını sağlar
          fontSize="lg"     // Yazıların boyutunu ayarlar
          color="gray.800"  // Yazıların rengini ayarlar
        >
          Takipçi sayısı:
        </Text>
        <Text
          fontWeight="bold" // Yazıların kalın olmasını sağlar
          fontSize="lg"     // Yazıların boyutunu ayarlar
          color="gray.800"  // Yazıların rengini ayarlar
          ml={2}            // İkinci Text bileşenine biraz sol marj ekler
        >
          {userData && userData.followers ? userData.followers.length : 0}
        </Text>
      </Flex>
    </Box>
          </Flex>
        </Flex>
      </Flex>
      {kullanici && (
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
