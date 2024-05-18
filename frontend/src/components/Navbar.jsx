import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Container, Flex, Link } from '@chakra-ui/react'
import  { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate()

  // Dışa tıklama kontrolü için
  useEffect(() => {
      const checkIfClickedOutside = e => {
          // Eğer açıkken ve dışarıya tıklanmışsa kapat
          if (isOpen && ref.current && !ref.current.contains(e.target)) {
              setIsOpen(false);
          }
      }

      document.addEventListener("mousedown", checkIfClickedOutside);

      return () => {
          // Temizlik yap
          document.removeEventListener("mousedown", checkIfClickedOutside);
      }
  }, [isOpen]);
  const handleClick = () =>{
    navigate(`/profile/${"Alperen Akal"}`)
  }
  return (
    <Flex display={"flex"} justifyContent={"flex-end"} padding={"10px"}  position={"relative"}>
    <Avatar
        
        onClick={() => setIsOpen(oldOpen => !oldOpen)}
        style={{ width: 50, height: 50, cursor: 'pointer',   borderRadius: '50%'}}
        
    />
    {isOpen && (
        <div style={{ position: 'absolute', top: '55px', right: 0, background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 1000, display:"block" }}>
            {/* Menü içeriği burada olacak */}
            <Button onClick={handleClick}>Profil</Button>
            <a href="/settings">Settings</a>
            <a href="/logout">Logout</a>
        </div>
    )}
</Flex>
  )
}

export default Navbar