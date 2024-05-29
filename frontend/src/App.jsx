import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Container, Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


import Huseyin from './components/Huseyin'
import Beyza from './components/Beyza'
import Emine from './components/RancedList'
import KonuList from './components/KonuList'

import AllSoruListesi from './pages/AllSoruListesi'

import SoruDetay from './components/SoruDetay'

import SoruSorSayfasi from './components/SoruSorSayfasi'
import SoruArama from './components/SoruArama'

import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import SoruGüncelle from './components/SoruGüncelle'
import CevapGuncelle from './components/CevapGuncelle'

import Login from './components/GirisYap'






function App() {
 

  return (
    
   <Container maxW={"90%"} flexDirection={"column"}  >
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sorulistesi' element={<AllSoruListesi/>}/>
      <Route path='/emine' element={<Emine/>}/>
      <Route path='/huseyin' element={<Huseyin/>}/>
      <Route path='/beyza' element={<Beyza/>}/>
      <Route path='/konu/:konu' element={<KonuList/>} />
      <Route path='/sorudetay/:soruid' element={<SoruDetay/>}/>

      <Route path='/sorusorsayfasi' element={<SoruSorSayfasi/>}/>
      <Route path='/sorugüncelle/:soruid' element={<SoruGüncelle/>}/>
      <Route path='/cevapguncelle/:soruid' element={<CevapGuncelle/>}/>

      <Route path='/profile/:name'  element={<Profile/>}/>
      <Route path='/profileedit/:userName' element={<ProfileEdit/>} />




    </Routes>

    <Footer/>

      
   </Container>
  )
}

export default App
