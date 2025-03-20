import { Box } from '@mui/material'
import { useState } from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

function Layout() {
  const {isLightMode} = useSelector((state)=>state.user)
  return (
     <Box sx={{backgroundColor:isLightMode ? 'white' : '#141414'}}>
          <ToastContainer />
         <Navbar/>
         <Outlet/>
     </Box>
  )
}

export default Layout
