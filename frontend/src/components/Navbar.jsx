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
          <Box cursor="pointer" onClick={handleClick1} display="flex" alignItems="center">
            <Box ml={2} fontWeight="bold" fontSize="lg">
              <Image src="/banasorlogo.png" alt="Logo" w={20} h={20} />
            </Box>
          </Box>
          <Flex display={{ base: "none", md: "flex" }} ml={10} alignItems="center">
            <InputGroup w="470px" size="md">
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
            <Flex direction="column" mt="4" w="470px">
              {results.length === 0 && !loading && (
                <Box mt="4" color="gray.600">
                  Arama sonuçları bulunamadı.
                </Box>
              )}

              {results.length > 0 && (
                <Flex direction="column" mt="4" w="470px">
                  {results.map((result) => (
                    <Box key={result._id} p="2" borderWidth="1px" borderRadius="lg" mb="2">
                      <Heading as="h3" size="md" mb="1">{result.soru}</Heading>
                      <Box>{result.dersName}</Box>
                    </Box>
                  ))}
                </Flex>
              )}
            </Flex>
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
      <Collapse in={isOpen} animateOpacity>

      </Collapse>
    </Box>
  );
};

export default Navbar;
