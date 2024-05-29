import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Input,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Burada kafa simgesini ekledik
import axios from "axios";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [kullaniciid, setKullaniciId] = useState(0);
  const [userTokenData, setUserTokenData] = useState(null);
  const [kullaniciidReady, setKullaniciIdReady] = useState(false);


  const handleClick1 = () => {
    navigate("/");
  };

  const handleSearch = () => {
    console.log("Aranan metin:", searchText);
    setSearchText("");
  };

  const handleClick = () => {
    navigate("/singup");
  };

  const handleLogout = () => {
    navigate("/");
  };
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
  }, []); // Bağımlılıklar arasından token kaldırıldı
  
  
  

 


  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={handleClick1}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
          <Image src="/banasorlogo.png" alt="Logo" w={20} h={20} />
        </Flex>
        <Button
          onClick={handleClick1}
          variant="ghost"
          aria-label="Toggle Navigation"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ boxShadow: "none" }}
        >
          <Image src="/banasorlogo.png" alt="Logo" w={20} h={20} />
        </Button>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Input
            type="text"
            placeholder="Ara..."
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            border={0}
            _focus={{
              bg: "whiteAlpha.300",
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            htmlSize={50}
            width="auto"
            ml={20}
          />
          <Button
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            onClick={handleSearch}
          >
            Ara
          </Button>
          <Flex display={{ base: "none", md: "flex" }} ml={10}></Flex>
        </Flex>
        <Flex></Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            GİRİŞ YAP
          </Button>

          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            bg={useColorModeValue("blue.400", "blue.800")}
            color={useColorModeValue("white", "gray.800")}
            _hover={{
              bg: "blue.600",
            }}
            onClick={handleClick}
          >
            KAYIT OL
          </Button>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Settings"
              icon={<FaUser />} // Kafa simgesini burada değiştirdik
              variant="ghost"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              _focus={{ boxShadow: "none" }}
            />
            <MenuList>
            {userTokenData ? (
  <MenuItem as={"a"} href={`/profile/${userTokenData.userName}`}>
    Profilim
  </MenuItem>
) : (
  <Spinner size="sm" />
)}
               
              <MenuItem onClick={handleLogout}>ÇIKIŞ YAP</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity></Collapse>
    </Box >
  );
};

export default Navbar;