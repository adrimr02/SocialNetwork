import axios from 'axios'

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: 'LOGIN_START' })
  try {
    const res = await axios.post('auth/login', userCredentials)
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user })
  } catch (err) {
    console.log(err)
    dispatch({ type: 'LOGIN_FAILURE', payload: err })
  }
}

export const registerCall = async (userData, dispatch) => {
  dispatch({ type: 'REGISTER_START' })
  try {
    const res = await axios.post('auth/register', userData)
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user })
  } catch (err) {
    console.log(err)
    dispatch({ type: 'REGISTER_FAILURE', payload: err })
  }
}