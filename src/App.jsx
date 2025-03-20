import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {HomePage} from './components/HomePage'
import { SchoolTransactions } from './components/SchoolTransactions'
import Layout from './components/Layout'
import { useEffect } from 'react'
import { UserProfile } from './components/UserPage'
import {SignIn} from './components/SignIn'
import {SignUp} from './components/SignUp'
import { setNavigate } from './utils/navigationService'
import {Rehydrate} from './components/RehydrateUser'

function App() {
  const navigate= useNavigate();

  useEffect(() => {
    setNavigate(navigate); // Set the navigation function globally
  }, [navigate]);
  return (
    <Rehydrate>
    <Routes>
       <Route path="/sign-up" element={<SignUp />} />
       <Route path="/sign-in" element={<SignIn />} />
      <Route path='/' element={<Layout/>} >
        <Route path="/" element={<HomePage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/search-by-school" element={<SchoolTransactions />} />
      </Route>
    </Routes>
    </Rehydrate>
  )
}

export default App
