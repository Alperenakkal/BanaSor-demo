import { Avatar, AvatarGroup, Box, Button, Card, CardBody, CardFooter, Flex, Text, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaQuestion, FaPeopleArrows, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
const calculateTimeDifference = (isoDate) => {
  const currentDate = new Date();
  const givenDate = new Date(isoDate);
  const timeDifferenceInMilliseconds = currentDate - givenDate;
  const timeDifferenceInMinutes = Math.round(timeDifferenceInMilliseconds / (1000 * 60));

  return timeDifferenceInMinutes;
};

const ProfilePast = ({ name }) => {
  const [answers, setAnswers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [activeTab, setActiveTab] = useState('questions');
  const [sorular, setSorular] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userTokenData, setUserTokenData] = useState(null);
  const [kullanici, setKullanici] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userid ,setUserId]= useState(0);
  const [fullName,setFullName] = useState();
  const [kullaniciid,setKullaniciId]=useState(0);
  const [kullaniciidReady, setKullaniciIdReady] = useState(false);
  const [useridReady, setUserIdReady] = useState(false);

 


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:3000/kullanici/getUser/username/${name}`);
        setUserData(response.data);
        if (response.data && response.data._id) {
          setUserId(response.data._id);
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
  
 
  useEffect(() => {
    if (kullaniciidReady && useridReady) {
      if (kullaniciid === userid) {
        setKullanici(true);
      } else {
        setKullanici(false);
      }
    }
  }, [kullaniciidReady, useridReady]);

  console.log(kullanici)  
  useEffect(() => {
    const fetchSoruData = async () => {
      try { 
        const response = await axios.get(`http://localhost:3000/soru/user/${name}`);
        setSorular(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSoruData();
  }, [name]);
  const handleClick = (konu) => {
    navigate(`/konu/${konu}`);
  };

  const handleClick2 = (soruid) => {
    navigate(`/sorudetay/${soruid}`);
  };

  const handleClick3 = (soruid) => {
    navigate(`/sorugüncelle/${soruid}`);
  };

  const handleClick4 = () => {
    navigate("/sorusorsayfasi");
  };

  const handleClick5 = () => {
    navigate(`/sorulistesi`);
  };

  const handleClick6 = (soruid) => {
    navigate(`/cevapguncelle/${soruid}`);
  };
  
  const isim = fullName && fullName[0];
  const soyisim = fullName && fullName[1];
  const profilePic = userData && userData.profilePic;

 
  const calculateTimeDifference = (isoDate) => {
    const currentDate = new Date();
    const givenDate = new Date(isoDate);
    const timeDifferenceInMilliseconds = currentDate - givenDate;
  
    // Geçen zamanın gün, ay, yıl veya dakika cinsine dönüştürülmesi
    const timeDifferenceInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
    const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 30);
    const timeDifferenceInYears = Math.floor(timeDifferenceInDays / 365);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
  
    if (timeDifferenceInYears > 0) {
      return `${timeDifferenceInYears} yıl`;
    } else if (timeDifferenceInMonths > 0) {
      return `${timeDifferenceInMonths} ay`;
    } else if (timeDifferenceInDays > 0) {
      return `${timeDifferenceInDays} gün`;
    } else {
      return `${timeDifferenceInMinutes} dakika`;
    }
  };
  return (
    <Flex direction={"column"}>
      <Flex>
        <Flex gap={6} width={"700px"}>
          <Button
            bg={activeTab === 'questions' ? "#4A5568" : "#36454F"}
            color={"white"}
            onClick={() => setActiveTab('questions')}
          >
            Sorular
          </Button>
          <Box height="40px" width="3px" bg="gray.200" />
          <Button
            bg={activeTab === 'answers' ? "#4A5568" : "#36454F"}
            color={"white"}
            onClick={() => setActiveTab('answers')}
          >
            Cevaplar
          </Button>
          <Box height="40px" width="3px" bg="gray.200" />
          <Button
            bg={activeTab === 'followers' ? "#4A5568" : "#36454F"}
            color={"white"}
            onClick={() => setActiveTab('followers')}
          >
            Takip Ettiklerin
          </Button>
        </Flex>
      </Flex>

      <Flex >
        {activeTab === 'questions' && (
          sorular.filter(question => question.soru).length > 0 ? (
            <Flex flexDirection="column" mt="20px">
              {sorular.map((soru, index) => (
                <Flex w="100%" key={soru.globalId}>
                  <Flex minWidth={"608px"} maxWidth="608px" height="auto" px={4}>
                    <Card overflow='hidden' variant='outline' sx={{ minWidth: '608px', maxWidth: '608px', minHeight: '200px' }}>
                      <Flex pl={"20px"} pt={"15px"} alignItems="center">
                        <Avatar size={"sm"} name={`${isim} ${soyisim}`} src={profilePic} />
                        <Flex alignItems="center">
                          <Button
                            ml={2}
                            bg="transparent"
                            _hover={{ bg: "transparent", textDecoration: "underline" }}
                            alignItems="center"
                            fontWeight="bold" fontFamily="heading"
                            onClick={() => handleClick(soru.dersName)}
                          >
                            {soru.dersName}
                          </Button>
                          <Box w={1} h={1} bg="gray.800" borderRadius="full" ml={2} />
                        </Flex>
                        <Text pl={2} fontSize="sm" fontWeight="bold" fontFamily="heading">{calculateTimeDifference(soru.updatedAt)}</Text>
                        <Button
                          marginLeft="auto"
                          size="m"
                          marginRight="25px"
                          onClick={() => handleClick3(soru.globalId)}
                        >
                          {kullanici && <FaPencilAlt />}
                        </Button>
                      </Flex>

                      <CardBody pl={"50px"} p={2}>
                        <Text
                          cursor="pointer"
                          _hover={{ textDecoration: "underline" }}
                          borderRadius="md"
                          fontFamily={"ProximaNova, Helvetica, Arial, sans-serif"}
                          _active={{ bg: "gray.200" }}
                          onClick={() => handleClick2(soru.globalId)}
                        >
                          {soru.soru}
                        </Text>
                      </CardBody>

                      <CardFooter pl={"50px"} gap={3} display="flex">
                        <Image src={"/list.svg"} w={"30px"} h={"30px"} />
                        <AvatarGroup size='sm' max={3}>
                          <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                          <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                          <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                          <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                          <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                        </AvatarGroup>
                        <Button marginLeft="auto" colorScheme='teal' variant='outline'>
                          Cevapla
                        </Button>
                      </CardFooter>
                    </Card>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          ) : (
            (kullanici) ? (
              <Flex borderRadius="30px" mt="30px" w={"600px"} height="400px" justifyContent="center" bg="gray.200" direction="column" alignItems="center" fontWeight="bold" gap={3}>
                <FaQuestion fontSize="25px" />
                <Text color="dark">Henüz hiç soru sormadın.</Text>
                <Button width="200px" borderRadius="30px" fontWeight="bold" gap={2} bg="#36454F" color="white" onClick={handleClick4}>
                  Sorunu Sor
                </Button>
              </Flex>
            ) : (
              <Flex borderRadius="30px" mt="30px" w={"600px"} height="400px" justifyContent="center" bg="gray.200" direction="column" alignItems="center" fontWeight="bold" gap={3}>
                <Text color="dark" fontWeight="bold">Henüz hiç soru sormamış.</Text>
              </Flex>
            )
          )
        )}

        {activeTab === 'answers' && (
          sorular.some(question => question.isim === isim && question.soyisim === soyisim && question.cevap) ? (
            <Flex flexDirection="column" mt="20px">
              {sorular.filter(soru => soru.isim === isim && soru.soyisim === soyisim && soru.cevap).map((soru, index) => (
                <Flex w="100%" key={soru.globalId}>
                  <Flex minWidth={"608px"} maxWidth="608px" height="auto" px={4}>
                    <Card overflow='hidden' variant='outline' sx={{ minWidth: '608px', maxWidth: '608px', minHeight: '200px' }}>
                      <Flex pl={"20px"} pt={"15px"} alignItems="center">
                        <Avatar size={"sm"} name={`${soru.isim} ${soru.soyisim}`} src={soru.avatar} />
                        <Flex alignItems="center">
                          <Button
                            ml={2}
                            bg="transparent"
                            _hover={{ bg: "transparent", textDecoration: "underline" }}
                            alignItems="center"
                            fontWeight="bold" fontFamily="heading"
                            onClick={() => handleClick(soru.dersIsim)}
                          >
                            {soru.dersIsim}
                          </Button>
                          <Box w={1} h={1} bg="gray.800" borderRadius="full" ml={2} />
                        </Flex>
                        <Text pl={2} fontSize="sm" fontWeight="bold" fontFamily="heading">{soru.zamanFarki}</Text>
                        <Button
                          marginLeft="auto"
                          size="m"
                          marginRight="25px"
                          onClick={() => handleClick6(soru.globalId)}
                        >
                          <FaPencilAlt />
                        </Button>
                      </Flex>

                      <CardBody pl={"50px"} p={2}>
                        <Text
                          cursor="pointer"
                          _hover={{ textDecoration: "underline" }}
                          borderRadius="md"
                          fontFamily={"ProximaNova, Helvetica, Arial, sans-serif"}
                          _active={{ bg: "gray.200" }}
                          onClick={() => handleClick2(soru.globalId)}
                        >
                          {soru.cevap}
                        </Text>
                      </CardBody>

                      <CardFooter pl={"50px"} gap={3} display="flex">
                        <Image src={"/list.svg"} w={"30px"} h={"30px"} />
                        <AvatarGroup size='sm' max={3}>
                          <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                          <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        </AvatarGroup>
                        <Button marginLeft="auto" colorScheme='teal' variant='outline'>
                          Cevapla
                        </Button>
                      </CardFooter>
                    </Card>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          ) : (
            (kullanici) ? (
              <Flex borderRadius="30px" mt="30px" w={"600px"} height="400px" justifyContent="center" bg="gray.200" direction="column" alignItems="center" fontWeight="bold" gap={3}>
                <FaQuestion fontSize="25px" />
                <Text color="dark">Henüz hiç cevap vermedin.</Text>
                <Button width="200px" borderRadius="30px" fontWeight="bold" gap={2} bg="#36454F" color="white" onClick={handleClick5}>
                  Soruları gör
                </Button>
              </Flex>
            ) : (
              <Flex borderRadius="30px" mt="30px" w={"600px"} height="400px" justifyContent="center" bg="gray.200" direction="column" alignItems="center" fontWeight="bold" gap={3}>
                <Text color="dark" fontWeight="bold">Henüz hiç cevap vermemiş.</Text>
              </Flex>
            )
          )
        )}

        {activeTab === 'followers' && (followers.length > 0 ? (
          followers.map((follower, index) => <Text key={index} color={"white"}>{follower}</Text>)
        ) : (
          <Flex borderRadius="30px" mt="30px" w={"600px"} height="400px" justifyContent="center" bg="gray.200" direction="column" alignItems="center" fontWeight="bold" gap={3}>
            <FaPeopleArrows fontSize={"25px"} />
            <Text color={"dark"}>Henüz kimseyi takip etmedin</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ProfilePast;
