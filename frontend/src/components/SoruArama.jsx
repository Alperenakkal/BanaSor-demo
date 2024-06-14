import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Flex,
  IconButton,
  InputGroup,
  InputRightElement,
  Input,
  Spinner,
  Box,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SoruArama = () => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === '') return;

    setLoading(true);
    setError('');
    setResults([]); // Önceki sonuçları temizle

    try {
      const response = await axios.get(`http://localhost:3000/soru/search?q=${query}`);
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Flex direction="column" align="center" mt="4">
      <InputGroup w="470px" size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Herhangi bir soruya cevap arayabilirsin."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
    </Flex>
  );
};

export default SoruArama;

