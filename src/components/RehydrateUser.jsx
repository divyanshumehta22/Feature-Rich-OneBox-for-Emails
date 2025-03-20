import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAuth } from '../features/authSlice'
import { setUser } from '../features/userSlice';
export const Rehydrate = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('userToken'))

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const fetchedUserResponse = await fetch(`${import.meta.env.VITE_BURL}/user/get-user`, {
          method: "GET",
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const fetchedUserData = await fetchedUserResponse.json();
        if (fetchedUserData.user) {
          dispatch(setUser(fetchedUserData.user))
          dispatch(setUserAuth({ token: token, userId: fetchedUserData.user._id }));
        }

      }
      fetchUser();
    }
    setLoading(false);
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner here if you like
  }

  return children;
};
