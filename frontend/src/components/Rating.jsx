import { Box, Flex } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { BsStar ,BsStarFill, BsStarHalf } from "react-icons/bs";
import { useParams } from 'react-router-dom';


const Rating = ({count}) => {
  const { soruid } = useParams();

  const handleRating = async (points) => {
    if (!rated) {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.post(`http://localhost:3000/soru/rate/${soruid}`, {
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ points }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data); // Log the response data (averageRating, voteCount) if needed
          setRated(true); // Set rated to true to prevent rating again
        } else {
          const error = await response.json();
          console.error('Error:', error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };


  const RanderStars=()=>{
    let stars=[]
    for(let i=1;i<=5;i++){
      if(i<= Math.floor(count)){
        stars.push(<BsStarFill key={i} color="#58A399"   size={"30px"} onClick={() => handleRating(i)}/>)
      }
      else if(i=== Math.floor(count)+1 && count%1>=0.5){
        stars.push(<BsStarHalf key={i} color="#58A399"   size={"30px"} onClick={() => handleRating(i)} />)
      }
      else{
        stars.push(<BsStar key={i} color="#58A399"   size={"30px"} onClick={() => handleRating(i)} />)
      }
    }
    return stars
  }

  return (
    <Flex gap={2} flexDirection={"column"} alignItems="center"  justifyContent={"center"} padding="20px" >
      <Flex fontSize={"20px"} fontWeight="bold"  >
        {count}
      </Flex>
      <Flex flexDirection={"row"}>
      {RanderStars()}
      </Flex>
      

    </Flex>
  )
}

export default Rating