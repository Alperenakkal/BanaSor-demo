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
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileEdit = () => {
const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);
const [profilePicPreview, setProfilePicPreview] = useState(null);

const navigate = useNavigate();
const { userName } = useParams();
const toast = useToast();
const [user, setUser] = useState({
  fullName: "",
  userName: "",
  email: "",
  password: "",
  gender: "",
  seviye: "",
});
const [profilePic, setProfilePic] = useState(null);

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/kullanici/${userName}`);
      setUser(response.data);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  fetchUserData();
}, [userName]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setUser((prev) => ({ ...prev, [name]: value }));
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user.fullName.trim() || !user.userName.trim() || !user.email.trim() || !user.seviye.trim() || !user.gender.trim()) {
    toast({
      title: "Hata",
      description: "Lütfen tüm alanları doldurun.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  const formData = new FormData();
  formData.append('fullName', user.fullName);
  formData.append('userName', user.userName);
  formData.append('email', user.email);
  formData.append('password', user.password);
  formData.append('gender', user.gender);
  formData.append('seviye', user.seviye);
  if (profilePic) {
    formData.append('profilePic', profilePic);
  }

  try {
    const token = localStorage.getItem('jwt');
    await axios.put(`http://localhost:3000/kullanici/updateUser/${userName}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    toast({
      title: "Profil Güncellendi",
      description: "Profiliniz başarıyla güncellendi.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    navigate("/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    toast({
      title: "Hata",
      description: "Profil güncellenirken bir hata oluştu.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};

if (loading) {
  return <div>Loading...</div>;
}

return (
  <Flex direction="column">
    <Box maxW="md" w="1000px" mx="auto" p={5} bg="gray.100">
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Profili Güncelle
      </Heading>

      <Stack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl id="fullName">
          <FormLabel>İsim</FormLabel>
          <Input name="fullName" type="text" value={user.fullName} onChange={handleChange} />
        </FormControl>

        <FormControl id="userName">
          <FormLabel>Kullanıcı Adı</FormLabel>
          <Input name="userName" type="text" value={user.userName} onChange={handleChange} />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" value={user.email} onChange={handleChange} />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Şifre</FormLabel>
          <Input name="password" type="password" value={user.password} onChange={handleChange} />
        </FormControl>

        <FormControl id="seviye">
          <FormLabel>Seviye</FormLabel>
          <Select name="seviye" placeholder="Seviye Seç" value={user.seviye} onChange={handleChange}>
            <option value="İlkokul">İlkokul</option>
            <option value="Ortaokul">Ortaokul</option>
            <option value="Lise">Lise</option>
            <option value="Üniversite">Üniversite</option>
            <option value="Mezun">Mezun</option>
          </Select>
        </FormControl>

        <FormControl id="gender">
          <FormLabel>Cinsiyet</FormLabel>
          <Select name="gender" value={user.gender} onChange={handleChange}>
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </Select>
        </FormControl>

        <FormControl id="profile-photo">
          <FormLabel>Profil Fotoğrafı</FormLabel>
          <Stack direction="row" spacing={4} align="center">
            <Avatar src={profilePicPreview || userData?.profilePic || ''} />
            <Button as="label">
              Yükle <Input type="file" hidden accept="image/*" onChange={handleFileChange} />
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
};

export default ProfileEdit;
