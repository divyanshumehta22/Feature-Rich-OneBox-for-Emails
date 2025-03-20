import { Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TextField, MenuItem, Typography, Button } from '@mui/material';
import React, { useState } from 'react'
import { Navbar } from './Navbar';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setSearchQuery } from '../features/userSlice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "lightblue",
    '&:hover': {
        backgroundColor: "lightblue",
    },
    borderRadius: '0px',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

export const EmailList = () => {
   
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    return (
        <Box >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Box sx={{ width: { xs: '100vw', md: '95vw' }, border: '1px solid grey', margin: '15px 2px' }}>
                    <Box sx={{ padding: '0px 5px', margin: '10px 0px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h5' sx={{color : isLightMode? 'black' :'white'}}>Search by School Id :</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Type School ID..."
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchedSchoolId}
                                    onChange={(e) => setSearchedSchoolId(e.target.value)}
                                />
                            </Search>
                            <Button size='small' onClick={handleSearchSchoolTransactions} sx={{ backgroundColor: 'lightblue', borderLeft: '1px solid white', color: 'blue', textTransform: 'capitalize', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>Search</Button>
                        </Box>
                    </Box>
                    <Divider sx={{ width: '100%', borderColor : isLightMode? "grey" :'white' }} />
                    <Box >
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>S.NO.</TableCell>
                                    <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Collect ID</TableCell>
                                    <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>School ID</TableCell>
                                    <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Gateway</TableCell>
                                    <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Order Amount</TableCell>
                                    <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Transaction AMT.</TableCell>
                                    <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Custom Order ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {SearchedTransactions.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((txn, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{index+1}</TableCell>
                                        <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.collect_id._id}</TableCell>
                                        <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.collect_id.school_id}</TableCell>
                                        <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.gateway}</TableCell>
                                        <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.collect_id.order_amount}</TableCell>
                                        <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.transaction_amount}</TableCell>
                                        <TableCell sx={{ color: txn.status == 'SUCCESS' ? 'green' : 'orange' }}>{txn.status}</TableCell>
                                        <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.collect_id.custom_order_id}</TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                        <Box sx={{ display: 20 > 0 ? 'none' : 'flex', justifyContent: 'center', marginTop: '15px', width: '100%' }}>
                            <Typography variant='h6' sx={{color:isLightMode ? 'black' : 'white'}}>Please Search a School !</Typography>
                        </Box>
                        <TablePagination
                            component="div"
                            count={schoolTransactions.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
                            sx={{ backgroundColor: isLightMode ? 'white' : 'black', color: isLightMode ? 'black' : 'whitesmoke' }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}