import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
export function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
     const dispatch=useDispatch();
    const handleSignIn =()=>{
       try {
          dispatch(loginUser({email:email, password:password}));    
       } catch (error) {
          toast('User not found please signUp')
          console.log("error in handleSignIn : "+error)
       }
    }

    return (
        <Box sx={{
            height: '100vh', width: '100vw', backgroundColor: 'whitesmoke', display: 'flex',
            flexDirection: 'column', alignContent: 'center', alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center',
                backgroundColor: 'white', width: { xs: '100%', sm: '50%', md: '30%' }
            }}>
                <Box sx={{
                    display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center',
                    backgroundColor: 'white', width: '90%', margin: '10px 0px'
                }}>
                    <Typography variant='h5' sx={{ margin: '5px 0px' }}>SignIn</Typography>
                    <TextField id="email" label="Email" variant="filled" fullWidth required value={email} 
                      onChange={(e)=>setEmail(e.target.value)}
                      sx={{ marginBottom: 2 }} 
                      />
                    <TextField id="password" label="Password" variant="filled" fullWidth required value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    sx={{ marginBottom: 2 }} />
                    <Box sx={{ margin: '5px 0px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <Button variant='contained' onClick={handleSignIn}>SignIn</Button>
                    </Box>
                </Box>
                <Box sx={{
                    width: '100%',
                    color: 'grey',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ fontSize: '15px' }}>Or</Typography>
                    <Typography variant='body2' sx={{ fontSize: '15px' }}>
                        Create an account <Typography variant='span' onClick={() => { navigate('/sign-up') }} sx={{ fontSize: '15px', color: 'blue', cursor: 'pointer' }}>SignUp</Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}