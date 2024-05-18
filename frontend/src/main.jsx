import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom"
const styles ={
  global :() =>({
    body:{
      color : "gray.800" ,
      bg : "milk"
    }
  })
}
const thema =extendTheme({styles})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={thema}>
    <App />
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
