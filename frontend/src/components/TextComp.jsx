import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const TextComp = ({ text }) => {
  return (
    <>
      <Flex
        justifyContent="center" // Yatayda ortala
       
      >
        <Button
          whiteSpace="pre-line"
          fontFamily="Source Code Pro, monospace" // Projenize uygun bir font ile değiştirebilirsiniz.
          fontSize="40px" // Responsive font boyutu ayarı
          textAlign="center"
          lineHeight="taller"
          mt={5} // Üstten boşluk ekleyerek metni daha rahat okunabilir yapar
          fontWeight="bold"
          color="dark"
          p={5}
          onClick={() => setLiked(!liked)}
        >
          {text}
        </Button>
      </Flex>
    </>
  )
}

export default TextComp