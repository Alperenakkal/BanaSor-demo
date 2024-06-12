import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Collapse,
  useDisclosure,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Importing the user icon
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
    navigate("/signup");
  };

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchTokenUserData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(`http://localhost:3000/kullanici/getUser/kayitli`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserTokenData(response.data);
        if (response.data && response.data._id) {
          setKullaniciId(response.data._id);
          setKullaniciIdReady(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Kullanıcı verilerini alma hatası:", error);
        setLoading(false);
      }
    };
    fetchTokenUserData();
  }, []);

  return (
    <Box>
      <Flex
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
        <Box cursor="pointer" onClick={() => handleClick1()} display="flex" alignItems="center">

            
            <Box ml={2} fontWeight="bold" fontSize="lg">
            <Image src="/banasorlogo.png" alt="Logo" w={20} h={20} />
            </Box>
          </Box>
          <Flex display={{ base: "none", md: "flex" }} ml={10} alignItems="center">
            <Input
              variant="filled"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              _focus={{ boxShadow: "none" }}
            />
            <Button ml={2} onClick={handleSearch} colorScheme="teal">
              Search
            </Button>
          </Flex>
        </Flex>
        <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={6}>
          <Menu>
            <MenuButton as={IconButton} icon={<SettingsIcon />} />
            <MenuList>
              {userTokenData ? (
                <MenuItem as="a" href={`/profile/${userTokenData.userName}`}>
                  Profilim
                </MenuItem>
              ) : (
                <MenuItem>
                  <Spinner size="sm" />
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>ÇIKIŞ YAP</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity></Collapse>
    </Box>
  );
};

export default Navbar;
