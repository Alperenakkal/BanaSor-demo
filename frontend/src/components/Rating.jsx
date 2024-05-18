import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import { BsStar ,BsStarFill, BsStarHalf } from "react-icons/bs";


const Rating = ({count}) => {

  const RanderStars=()=>{
    let stars=[]
    for(let i=1;i<=5;i++){
      if(i<= Math.floor(count)){
        stars.push(<BsStarFill key={i} color="#58A399"   size={"30px"} />)
      }
      else if(i=== Math.floor(count)+1 && count%1>=0.5){
        stars.push(<BsStarHalf key={i} color="#58A399"   size={"30px"} />)
      }
      else{
        stars.push(<BsStar key={i} color="#58A399"   size={"30px"} />)
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