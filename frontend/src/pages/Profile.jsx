import { Avatar, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProfileName from '../components/ProfileName'
import ProfilePast from '../components/ProfilePast'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';


const Profile = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [userData, setUserData] = useState(null);
  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue); // Cookie değerini decode edelim
        }
    }

    return "cookie yok";
};

const jwtToken = getCookie("jwt");
console.log("Stored token:", jwtToken);


  
 
  


  
  return (
    <Flex p={"30px"} gap={50} >
           <ProfileName name={name}/>
           <ProfilePast name={name}/>

         

    </Flex>
  
  
  )
}

export default Profile