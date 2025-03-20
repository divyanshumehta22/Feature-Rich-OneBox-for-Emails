import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export const UserProfile = () => {
    const {userDetails} = useSelector((state)=>state.user)
  return (
    <Box sx={{width:'100vw',height:'80vh' , backgroundColor:'whitesmoke', display:'flex',alignItems:'center', justifyContent:'center'}}>
        <Box sx={{width:{xs:'90%', sm:'60%', md:'50%'}, height:'50%', backgroundColor:'white', padding:'10px'}}>
        <Typography>Name : {userDetails?.name}</Typography>
        <Typography>Email : {userDetails?.email}</Typography>
        <Typography>Number : {userDetails?.number}</Typography>
        <Typography>Password : {userDetails?.password}</Typography>
        </Box>
    </Box>
  )
}
