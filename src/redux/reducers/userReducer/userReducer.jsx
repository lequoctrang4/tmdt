import { createSlice } from '@reduxjs/toolkit'
import { eraseCookie, getCookie, getLocalStorage, removeLocalStorage, setCookie, setLocalStorage, TOKEN, USER } from '../../../util/config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { history } from '../../../App';

const initialState = {
    userLogin: getLocalStorage(USER) ? getLocalStorage(USER) : null,
    profile: {
        email: '',
        name: '',
        phone: '',
        password: '',
        gender: null,
    },
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginAction: (state, action) => {
        state.userLogin = action.payload
    },
    profileAction: (state, action) => {
        state.profile = action.payload
    }
  }
});

export const {loginAction, profileAction} = userReducer.actions;
export default userReducer.reducer;

// async action 

export const loginAPI = (value) => {
  
  return async (dispatch) => {
    const result = await axios({
      url: 'https://shop.cyberlearn.vn/api/Users/signin',
      method: 'POST',
      data: value,
    }).catch(err => {
      toast.error('Email or password is incorrect.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })

    if (result) {
      const action = loginAction(result.data.content);
      dispatch(action)
      setLocalStorage(USER, result.data.content);
      setCookie(TOKEN, result.data.content.accessToken);
    }

  }   
}

export const loginFacebookAPI = (value) => {

  return async (dispatch) => {
    const result = await axios({
      url: 'https://shop.cyberlearn.vn/api/Users/facebooklogin',
      method: 'POST',
      data: {
        facebookToken: value
      }
    }).catch(err => {
      toast.error('Login unsuccessful.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })

    if (result ) {
      const action = loginAction(result.data.content);
      dispatch(action)
      setLocalStorage(USER, result.data.content);
      setCookie(TOKEN, result.data.content.accessToken);
    }
  }
}   

export const profileAPI = () => {

  return async (dispatch) => {
    let token = getLocalStorage(USER);
    const result = await axios({
      url: 'https://shop.cyberlearn.vn/api/Users/getProfile',
      method: "POST",
      headers: {
          Authorization: `Bearer ${token?.accessToken}`
      }
    }).catch(err => {
      if (err.response?.status === 401 || err.response?.status === 400) {
        history.push('/home');
      }
      removeLocalStorage(USER);
      eraseCookie(TOKEN);
      alert("Login session has expired. Please log in again.");
      window.location.reload();
    })

    if (result) {
      const action = profileAction(result.data.content);
      dispatch(action)
    }
  }
}

export const updateProfileAPI = (value) => {

  return async (dispatch) => {
    const result = await axios({
      url: 'https://shop.cyberlearn.vn/api/Users/updateProfile',
      method: 'POST',
      data: value,
      headers: {
        Authorization: `Bearer ${getCookie(TOKEN)}`
      }
    })
  }
}

export const changePasswordAPI = (value) => {

  return async (dispatch) => {
    const result = await axios({
      url: 'https://shop.cyberlearn.vn/api/Users/changePassword',
      method: "POST",
      data: value,
      headers: {
        Authorization: `Bearer ${getCookie(TOKEN)}`
      }
    })
  }
}

export const deleteOrderAPI = async (value) => {
  try {
    return await axios({
      url: 'https://shop.cyberlearn.vn/api/Users/deleteOrder',
      method: "POST",
      data: value,
      headers: {
        Authorization: `Bearer ${getCookie(TOKEN)}`
      }
    })
  } catch (error) {
    console.log(error);
  }
}