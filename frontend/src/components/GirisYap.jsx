import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

function App() {
  return (
  
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Hesabınıza giriş yapın</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Tekrar hoşgeldiniz! Lütfen bilgilerinizi giriniz.
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Mail Adresi</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Şifre</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Beni hatırla</Checkbox>
                <Text color={'blue.500'}>Şifremi Unuttum?</Text>
              </Stack>
              <Button colorScheme={'blue'} variant={'solid'}>
                Giriş Yap
              </Button>
            </Stack>
          </Stack>
        </Box>
      
        {/* Google ile giriş yap butonu */}
        <Button colorScheme="red" variant="solid" onClick={() => alert('Google ile giriş yap butonuna tıklandı.')}>
          Google ile Giriş Yap
        </Button>
      </Stack>
    </Flex>
  );
}

export default App;