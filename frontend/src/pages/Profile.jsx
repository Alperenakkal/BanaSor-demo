import { Avatar, Flex } from '@chakra-ui/react'
import React from 'react'
import ProfileName from '../components/ProfileName'
import ProfilePast from '../components/ProfilePast'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  console.log(name)
  return (
    <Flex p={"30px"} gap={50} >
          <ProfileName name={name}/>
          <ProfilePast name={name}/>

    </Flex>
  
  
  )
}

export default Profile