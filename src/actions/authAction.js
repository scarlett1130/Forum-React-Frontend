import API_ROUTE from "../apiRoute";
import axios from 'axios'
import setAuthorizationToken  from "../utils/authorization";
import jwt from 'jsonwebtoken'
import { SET_CURRENT_USER, UPDATE_USER_AVATAR, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from './types'
import  {history} from '../history'
// import { push } from 'react-router-redux'

export const SetCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  };
}


export const SignIn = (credentials) => {
  return (dispatch) => {
    axios.post(`${API_ROUTE}/login`, credentials).then((res) => {
      let userData = res.data.response
      localStorage.setItem("token", userData.token)
      // localStorage.setItem("user_data", userData)
      localStorage.setItem('user_data', JSON.stringify(userData));

      
      setAuthorizationToken(userData.token)
      dispatch(SetCurrentUser(userData))
      // history.push('/');
    }).catch(err => {
      dispatch({ type: "LOGIN_ERROR", payload: err.response.data.error })
    })
  }
}

export const SignOut = () => {
  return (dispatch) => {
    localStorage.removeItem("token")
    setAuthorizationToken(false)
    dispatch(SetCurrentUser({}))
    // axios.post(`${API_ROUTE}/logout`).then(res => {
    //   dispatch({ type: "SIGNOUT_SUCCESS"})
    // })
  }
}

export const SignUp = (newUser) => {
    return (dispatch) => {
    axios.post(`${API_ROUTE}/users`, newUser).then(res => {
      dispatch({ type: "SIGNUP_SUCCESS"})
      history.push('/login');
    }).catch(err => {
      dispatch({ type: "SIGNUP_ERROR", payload: err.response.data.error })
      console.log("this is the error: ", err.response.data.error)
    })
  }
}

export const SetUserUpdate = (user) => {
  return {
    type: UPDATE_USER_AVATAR,
    user
  };
}

export const updateUserAvatar = (updateUserAvatar) => {
  return async (dispatch, getState) => {
    const { id } = getState().Auth.currentUser
    try {
      const res = await axios.put(`${API_ROUTE}/avatar/users/${id}`, updateUserAvatar, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      let updatedUser = res.data.response

      console.log("the updated: ", updatedUser)

      window.localStorage.setItem('user_data', JSON.stringify(updatedUser)); //update the localstorage

      dispatch(SetUserUpdate(updatedUser)) //update the redux store

    } catch (err) {
      console.log("this is the response  err: ", err)
    }
  }
}

export const updateUser = (updateUser) => {
  return async (dispatch, getState) => {
    const { id } = getState().Auth.currentUser
    try {
      const res = await axios.put(`${API_ROUTE}/users/${id}`, updateUser);
      console.log("this the response: ", res)
        dispatch({ type: UPDATE_USER_SUCCESS })
    } catch (err) {
      console.log("this is the response  err: ", err)
      dispatch({ type: UPDATE_USER_ERROR, payload: err.response.data.error })
    }
  }
}