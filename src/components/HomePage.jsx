import React, { useState, useEffect } from 'react';
import { Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TextField, MenuItem, Typography } from '@mui/material';
import { Navbar } from './Navbar'
import {useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/userSlice';
export const HomePage = () => {
  const dispatch= useDispatch();
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const { isLightMode, searchQuery } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchEmails = async () => {
      const response = await fetch(`${import.meta.env.VITE_BURL}/emails`);
      const data = await response.json();
      setEmails(data);
      setFilteredEmails(data);
    };
    fetchEmails();
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);

  const handleFilter = () => {
    let filteredData = emails;
  
    // Filter by status
    if (statusFilter !== 'All') {
      filteredData = filteredData.filter((eml) => eml._source.category === statusFilter);
    }
  
    // Filter by date range
    if (dateFilter.start || dateFilter.end) {
      filteredData = filteredData.filter((eml) => {
        const emailDate = new Date(eml._source.header.date);
        const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
        const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
  
        return (
          (!startDate || emailDate >= startDate) &&
          (!endDate || emailDate <= endDate)
        );
      });
    }
  
    setFilteredEmails(filteredData);
  };
  
 
  useEffect(handleFilter, [statusFilter, dateFilter]);

  return (
    <Box sx={{display:'flex', flexDirection:'column'}} >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '25px 10px 10px', alignItems: 'center' }}>
        <Typography variant='h5' sx={{ display:{xs:'none', md:'flex'}, color: isLightMode ? 'black' : 'white' }}>All Emails : </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            select
            label="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: {
                color: isLightMode ? 'black' : 'white', // Label color
                fontSize: '14px' // Decrease label font size
              },
            }}
            InputProps={{
              style: {
                color: isLightMode ? 'black' : 'white', // Input text color
                fontSize: '14px', // Decrease input text font size
              },
            }}
            style={{ marginRight: '16px', color: isLightMode ? 'black' : 'white' }}
            size='small'
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Interested">Interested</MenuItem>
            <MenuItem value="Not Interested">Not Interested</MenuItem>
            <MenuItem value="Meeting">Meeting Booked</MenuItem>
            <MenuItem value="Spam">Spam</MenuItem>
            <MenuItem value="Unknown">Out of Office</MenuItem>
          </TextField>
          <TextField
            type="date"
            label="Start Date"
            onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
            InputLabelProps={{
              shrink: true,
              style: {
                color: isLightMode ? 'black' : 'white', // Label color
                fontSize: '14px' // Decrease label font size
              },
            }}
            InputProps={{
              style: {
                color: isLightMode ? 'black' : 'white', // Input text color
                fontSize: '14px', // Decrease input text font size
              },
            }}
            sx={{
              marginRight: '16px',
            }}
            size="small"
          />
          <TextField
            type="date"
            label="End Date"
            onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
            InputLabelProps={{
              shrink: true,
              style: {
                color: isLightMode ? 'black' : 'white', // Label color
                fontSize: '14px' // Decrease label font size
              },
            }}
            InputProps={{
              style: {
                color: isLightMode ? 'black' : 'white', // Input text color
                fontSize: '14px', // Decrease input text font size
              },
            }}
            sx={{
              marginRight: '16px',
            }}
            size="small"
          />

        </Box>
      </Box>
       <Divider sx={{ width: '100%', borderColor : isLightMode? "grey" :'white' }} />
      <Table border={'1px'} sx={{flexGrow:1}}>
        <TableHead>
          <TableRow >
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>S.NO.</TableCell>
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Email Subject</TableCell>
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmails.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((email, index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: isLightMode ? 'black' : 'whitesmoke' }}>{index + 1}.</TableCell>
              <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{email._source.header.subject}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{new Date(email._source.header.date).toLocaleDateString("en-US")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredEmails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        sx={{ backgroundColor:isLightMode ? 'white' : 'black', color: isLightMode ? 'black' : 'whitesmoke'}}
      />
    </Box>
  );
};
