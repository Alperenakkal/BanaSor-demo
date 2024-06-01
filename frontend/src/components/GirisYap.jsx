import React, { useState } from 'react';
import axios from 'axios';
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

function GirisYap() {
  const[username, setUserName]= useState(' ');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        // Giriş başarılıysa istenen işlemleri gerçekleştirin (örneğin, kullanıcıyı yönlendirin)
      } else {
        console.error('Login failed:', response.statusText);
        // Giriş başarısızsa hata mesajını kullanıcıya gösterin
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Hata oluşursa hata mesajını kullanıcıya gösterin
    }
  };

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
            <FormControl id="userName">
              <FormLabel>Kullanıcı adı</FormLabel>
              <Input type="userName" />
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

export default GirisYap;