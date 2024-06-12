import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    Image,
    Text,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { useSpring, animated } from "react-spring";
  import { useNavigate } from "react-router-dom";
  import { TimeCal } from "./TimeCal";
  import { FaPencilAlt } from "react-icons/fa";
  import RancedList from "./RancedList";
  
  const AnimatedDivider = animated(Divider);
  
  const Alperen = () => {
    const [dersler, setDersler] = useState([]);
    const [tumDersleriGoster, setTumDersleriGoster] = useState(false);
    const [sorular, setSorular] = useState([]);
    const [siniflar, setSiniflar] = useState([]);
    const [aktifSinif, setAktifSinif] = useState(null);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("/dersler.json")
        .then((response) => response.json())
        .then((data) => setDersler(data.dersler));
    }, []);
  
    useEffect(() => {
      fetch("/siniflar.json")
        .then((response) => response.json())
        .then((data) => setSiniflar(data.siniflar));
    }, []);
  
    useEffect(() => {
      fetch("/sorular.json")
        .then((response) => response.json())
        .then((data) => {
          const filtrelenmisSorular = data.sorular.flatMap((ders) =>
            ders.sorular.map((soru) => ({
              ...soru,
              dersIsim: ders.isim,
              sinifIsim: ders.sinif,
              zamanFarki: TimeCal(soru.soruSorulmaSuresi),
            }))
          );
          setSorular(filtrelenmisSorular);
        });
    }, []);
  
    const handleSinifClick = (sinifId) => {
      setAktifSinif(sinifId); // Seçilen sınıfı state içinde saklıyoruz
    };
  
    const handleClick = (konu) => {
      console.log("Metne tıklandı!");
      navigate(`/konu/${konu}`);
    };
  
    const handleClick2 = (soruid) => {
      navigate(`/sorudetay/${soruid}`);
    };
  
    const handleClick3 = (soruid) => {
      navigate(`/soruguncelle/${soruid}`);
    };
  
    const dersleriGoster = tumDersleriGoster ? dersler : dersler.slice(0, 11);
    const AnimatedFlex = animated(Flex);
    const dahaFazlaAnimasyon = useSpring({
      to: {
        opacity: 1,
        height: tumDersleriGoster ? "auto" : "0px",
        transform: tumDersleriGoster ? "translateY(0%)" : "translateY(-10%)",
      },
      from: {
        opacity: 1,
        height: "auto",
        transform: "translateY(-150%)",
      },
      config: {
        duration: 200,
      },
    });
  
    const filtrelenmisSorular = aktifSinif
      ? sorular.filter((soru) => soru.sinifId === aktifSinif)
      : sorular;
    return (
      <Flex direction={"row"} justifyContent="center">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          p="5px"
          w="20%"
        >
          <h2>Sınıflar</h2>
          <AnimatedFlex
            style={dahaFazlaAnimasyon}
            wrap="wrap"
            justify="center"
            gap={10}
            maxWidth="200px"
            mt={"3"}
            width="100%"
            alignItems={"center"}
          >
            {siniflar.map((sinif) => (
              <Button
                key={sinif.id}
                mt={"10px"}
                bg={"transparent"}
                _hover={{ bg: "transparent" }}
                variant="unstyled"
                alignItems="center"
                onClick={() => handleClick(sinif.name)}
              >
                <Flex direction="column" alignItems="center" gap={2}>
                  <Box
                    fontSize={"12px"}
                    fontFamily={"ProximaNova, Helvetica, Arial, sans-serif"}
                    textAlign="center"
                    mt={2}
                  >
                    {sinif.name}
                  </Box>
                </Flex>
              </Button>
            ))}
          </AnimatedFlex>
        </Flex>
  
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          p="5px"
          w="80%"
        >
          <h2>Ders Listesi</h2>
          <AnimatedFlex
            style={dahaFazlaAnimasyon}
            wrap="wrap"
            justify="center"
            gap={10}
            maxWidth="1100px"
            mt={"3"}
            width="100%"
            alignItems={"center"}
          >
            {dersleriGoster.map((ders) => (
              <Button
                key={ders.id}
                mt={"10px"}
                bg={"transparent"}
                _hover={{ bg: "transparent" }}
                variant="unstyled"
                alignItems="center"
                onClick={() => handleClick(ders.name)}
              >
                <Flex direction="column" alignItems="center" gap={2}>
                  <Image src={`/derslerimg/${ders.icon}`} boxSize="50px" />
                  <Box
                    fontSize={"12px"}
                    fontFamily={"ProximaNova, Helvetica, Arial, sans-serif"}
                    textAlign="center"
                    mt={2}
                  >
                    {ders.name}
                  </Box>
                </Flex>
              </Button>
            ))}
          </AnimatedFlex>
          <Flex mt="50px" alignItems="center" justifyContent="center" width="87%">
            <AnimatedDivider
              style={dahaFazlaAnimasyon}
              borderColor="#58A399"
              borderWidth="2px"
              flex={1}
            />
            <Button
              mx="2"
              size="sm"
              onClick={() => setTumDersleriGoster(!tumDersleriGoster)}
              bg={"transparent"}
            >
              {tumDersleriGoster ? "Daha Az" : "Daha Fazlası"}
            </Button>
            <AnimatedDivider
              style={dahaFazlaAnimasyon}
              borderColor="#58A399"
              borderWidth="2px"
              flex={1}
            />
          </Flex>
          <Flex direction={"row"} gap={10} justifyContent="center">
            <Flex p={"0"}>
              <s />
            </Flex>
  
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              p="0px"
              w="90%"
            >
              {sorular.map((soru, index) => (
                <Flex
                  justifyContent="flex-start"
                  p="5px"
                  w="110%"
                  key={soru.globalId}
                >
                  <Flex minWidth={"608px"} maxWidth="608px" height="auto" px={4}>
                    <Card
                      overflow="hidden"
                      variant="outline"
                      sx={{
                        minWidth: "608px",
                        maxWidth: "608px",
                        minHeight: "200px",
                      }}
                    >
                      <Flex pl={"20px"} pt={"15px"} alignItems="center">
                        <Avatar
                          size={"sm"}
                          name={`${soru.isim} ${soru.soyisim}`}
                          src={soru.avatar}
                        />
                        <Flex alignItems="center">
                          <Button
                            ml={2}
                            bg="transparent"
                            _hover={{
                              bg: "transparent",
                              textDecoration: "underline",
                            }}
                            alignItems="center"
                            fontWeight="bold"
                            fontFamily="heading"
                            onClick={() => handleClick(soru.dersIsim)}
                          >
                            {soru.sinifIsim}
                          </Button>
                          <Box
                            w={1}
                            h={1}
                            bg="gray.800"
                            borderRadius="full"
                            ml={2}
                          />
                        </Flex>
                        <Text
                          pl={2}
                          fontSize="sm"
                          fontWeight="bold"
                          fontFamily="heading"
                        >
                          {soru.zamanFarki}
                        </Text>
  
                        <Button
                          marginLeft="auto"
                          size="m"
                          marginRight="25px"
                          onClick={() => handleClick3(soru.globalId)}
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
                          {soru.soru}
                        </Text>
                      </CardBody>
  
                      <CardFooter pl={"50px"} gap={3} display="flex">
                        <Image src={"/list.svg"} w={"30px"} h={"30px"} />
                        <AvatarGroup size="sm" max={3}>
                          <Avatar
                            name="Ryan Florence"
                            src="https://bit.ly/ryan-florence"
                          />
                          <Avatar
                            name="Segun Adebayo"
                            src="https://bit.ly/sage-adebayo"
                          />
                          <Avatar
                            name="Kent Dodds"
                            src="https://bit.ly/kent-c-dodds"
                          />
                          <Avatar
                            name="Prosper Otemuyiwa"
                            src="https://bit.ly/prosper-baba"
                          />
                          <Avatar
                            name="Christian Nwamba"
                            src="https://bit.ly/code-beast"
                          />
                        </AvatarGroup>
                        <Button
                          marginLeft="auto"
                          colorScheme="teal"
                          variant="outline"
                        >
                          Cevapla
                        </Button>
                      </CardFooter>
                    </Card>
                  </Flex>
                </Flex>
              ))}
            </Flex>
            <Flex>
              <RancedList />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  };
  
  export default Alperen;