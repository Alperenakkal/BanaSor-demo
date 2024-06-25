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
  Input,
  Button,
  Image,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SettingsIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const [userTokenData, setUserTokenData] = useState(null);

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
      } catch (error) {
        console.error("Kullanıcı verilerini alma hatası:", error);
      }
    };
    fetchTokenUserData();
  }, []);

  const handleSearch = async () => {
    if (searchText.trim() === '') return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(`http://localhost:3000/soru/search?q=${searchText}`);
      setResults(response.data);
      if (response.data.length === 0) {
        setError('Arama sonucu bulunamadı.');
      }
    } catch (error) {
      console.error('Arama sırasında hata oluştu:', error);
      setError('Arama sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClick1 = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Çıkış işlemi
    // localStorage veya state temizleme gibi işlemler yapılabilir
    navigate("/");
  };

  const handleSoruDetay = (soruId) => {
    navigate(`/sorudetay/${soruId}`);
  };

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
        direction="column" // Navbar içeriğinin dikey yönde sıralanmasını sağlar
      >
        <Flex
          w="100%"
          justify="space-between"
          align="center"
          px={{ base: 4 }}
          mb={{ base: 2, md: 0 }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
            display={{ base: "flex", md: "none" }}
          />

          <Box cursor="pointer" onClick={handleClick1} display="flex" alignItems="center">
            <Box ml={2} fontWeight="bold" fontSize="lg">
              <Image src="/banasorlogo.png" alt="Logo" w={20} h={20} />
            </Box>
          </Box>

          <Flex
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            w="100%"
            maxW="470px" // İlgili alana uygun genişlik sınırı
          >
            <InputGroup size="md" w="100%">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Herhangi bir soruya cevap arayabilirsin."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <InputRightElement>
                <IconButton
                  h="1.75rem"
                  size="sm"
                  aria-label="Ara"
                  icon={loading ? <Spinner size="xs" /> : <SearchIcon />}
                  onClick={handleSearch}
                />
              </InputRightElement>
            </InputGroup>
            {error && <Box color="red" mt="0.5rem">{error}</Box>}
            
            <Button ml={2} onClick={handleSearch} colorScheme="teal">
              Search
            </Button>
          </Flex>
          
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
        </Flex>

        <Flex direction="column" mt="4" w="100%">
          {results.map((soru) => (
            <Box
              key={soru._id}
              p="2"
              borderWidth="1px"
              borderRadius="lg"
              mb="2"
              cursor="pointer"
              onClick={() => handleSoruDetay(soru._id)}
            >
              <Heading as="h3" size="md" mb="1">
                {soru.soru}
              </Heading>
              <Box>{soru.dersName}</Box>
            </Box>
          ))}
        </Flex>

        <Collapse in={isOpen} animateOpacity>

        </Collapse>
      </Flex>
    </Box>
  );
};

export default Navbar;
