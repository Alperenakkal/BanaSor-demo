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



  
 
  


  
  return (
    <Flex p={"30px"} gap={50} alignItems="flex-start" justifyContent="flex-start">
    <ProfileName name={name}/>
    <ProfilePast name={name}/>
  </Flex>
  
  
  )
}

export default Profile