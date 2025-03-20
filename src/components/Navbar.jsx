import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleMode } from '../features/userSlice';
import { setSearchQuery } from '../features/userSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

export function Navbar() {
  const dispatch = useDispatch()
  const { userDetails, searchQuery, isLightMode } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const location = useLocation();
  const fullPath = location.pathname;
  const lastSegment = fullPath.split('/').pop();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{navigate('/user-profile'), handleMenuClose()}}>Profile</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      {
      lastSegment != ''
        &&
        <MenuItem onClick={() => { navigate('/') }}>
          <p>Home</p>
        </MenuItem>
        }

      {
        isLightMode
          ?
          <MenuItem onClick={() => dispatch(toggleMode())} >
            <IconButton  size="large" sx={{ margin:'0px 10px',backgroundColor: 'whitesmoke', color: 'black', width: '28px', height: '28px' }} ><DarkModeIcon /></IconButton>
            <p>Toggle</p>
          </MenuItem>
          :
          <MenuItem onClick={() => dispatch(toggleMode())}>
           <IconButton  size="large" sx={{margin:'0px 10px', backgroundColor: 'black', color: 'white', width: '28px', height: '28px' }} ><LightModeIcon /></IconButton>
           <p>Toggle</p>
          </MenuItem>
      }
      {
        userDetails
          ?
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          :
          <MenuItem onClick={() => navigate('/sign-in')}>
            <p>Login</p>
          </MenuItem>
      }
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#a248f7' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              OneBOX-Email
            </Typography>
            {
              lastSegment != 'check-status'
                ?
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search(Email Subject...)"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={(event) => { dispatch(setSearchQuery(event.target.value)) }}
                  />
                </Search>
                :
                null
            }
          </Box>
          <Box sx={{ flexGrow: 1 }}>

          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {lastSegment != ''
              &&
              <Button variant="outlined" size="small" onClick={() => { navigate('/') }} sx={{ marginLeft: '10px', textTransform: "capitalize", color: '#29388c', borderColor: '#29388c', fontSize: '12px', fontWeight: '600', marginRight: '8px' }}>Home</Button>
            }
            {
              isLightMode
                ?
                <IconButton sx={{ backgroundColor: 'whitesmoke', color: 'black', width: '28px', height: '28px' }} onClick={() => dispatch(toggleMode())}><DarkModeIcon /></IconButton>
                :
                <IconButton sx={{ backgroundColor: 'black', color: 'white', width: '28px', height: '28px' }} onClick={() => dispatch(toggleMode())}><LightModeIcon /></IconButton>
            }
            {
              userDetails
                ?
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle sx={{ width: '30px', height: '30px' }} />
                </IconButton>
                :
                <Button variant="contained" size="small"
                  onClick={() => navigate('/sign-in')}
                  sx={{ marginLeft: '10px', textTransform: "capitalize", color: 'whitesmoke', borderColor: '#29388c', fontSize: '12px', fontWeight: '600', marginRight: '8px' }}>
                  Login
                </Button>}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
