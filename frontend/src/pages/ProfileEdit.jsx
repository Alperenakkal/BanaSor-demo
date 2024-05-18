import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Avatar,
    useToast,
    Select,
    Flex,
    Heading,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [user, setUser] = useState({
        isim: '',
        soyisim: '',
        email: '',
        password: '',
        seviye: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.isim.trim() || !user.soyisim.trim() || !user.email.trim() || !user.password.trim() || !user.seviye) {
            toast({
                title: "Hata",
                description: "Lütfen tüm alanları doldurun.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        toast({
            title: "Profil Güncellendi",
            description: "Profiliniz başarıyla güncellendi.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        navigate("/profile");
    };

    return (
        <Flex direction="column">
            <Box maxW="md" w="1000px" mx="auto" p={5} bg="gray.100">
                <Heading as="h1" size="xl" textAlign="center" mb={6}>
                    Profili Güncelle
                </Heading>

                <Stack spacing={4} as="form" onSubmit={handleSubmit}>
                    <FormControl id="isim">
                        <FormLabel>İsim</FormLabel>
                        <Input name="isim" type="text" value={user.isim} onChange={handleChange} />
                    </FormControl>

                    <FormControl id="soyisim">
                        <FormLabel>Soyisim</FormLabel>
                        <Input name="soyisim" type="text" value={user.soyisim} onChange={handleChange} />
                    </FormControl>

                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input name="email" type="email" value={user.email} onChange={handleChange} />
                    </FormControl>

                    <FormControl id="password">
                        <FormLabel>Şifre</FormLabel>
                        <Input name="password" type="password" value={user.password} onChange={handleChange} />
                    </FormControl>

                    <FormControl id='seviye'>
                        <FormLabel>Seviye</FormLabel>
                        <Select name='seviye' placeholder='Seviye Seç' value={user.seviye} onChange={handleChange}>
                            <option value="İlkokul">İlkokul</option>
                            <option value="Ortaokul">Ortaokul</option>
                            <option value="Lise">Lise</option>
                            <option value="Üniversite">Üniversite</option>
                            <option value="Mezun">Mezun</option>
                        </Select>
                    </FormControl>

                    <FormControl id="profile-photo">
                        <FormLabel>Profil Fotoğrafı</FormLabel>
                        <Stack direction="row" spacing={4} align="center">
                            <Avatar>
                              
                            </Avatar>
                            <Button as="label">
                                Yükle <Input type="file" hidden accept="image/*" />
                            </Button>
                        </Stack>
                    </FormControl>

                    <Button type="submit" colorScheme="blue" size="lg">
                        Profili Güncelle
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
}

export default ProfileEdit;
