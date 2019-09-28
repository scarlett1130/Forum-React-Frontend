import API_ROUTE from "../apiRoute";
import axios from 'axios'

export const fetchPosts = () => {
  return (dispatch) => {
    axios.get(`${API_ROUTE}/posts`).then(res => {
      dispatch({ type: "FETCH_POSTS", payload: res.data.response })
    }).catch(err => {
      console.log("This is the error: ", err)
    })
  }
}