import { combineReducers } from "redux"
import { createPost, fetchPosts }  from "./postsReducer";
import authReducer from "./authReducer";



const reducer = combineReducers({
  Auth: authReducer,
  FetchPosts: fetchPosts,
  CreatePost: createPost,
})

export default reducer