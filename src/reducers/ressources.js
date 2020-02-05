import { ADD_POSTS, PARSE_MESSAGE, GET_POSTS, DELETE_POST, SET_POST, SEND_PICTURE, GET_PICTURE } from '../actions/action-types';

const ressourcesState = {
  ressourceList : [0],
  postList : [],
  message: "",
  post: [],
  isDeleted: false,
  pictureName: ""
    }

export default function RessourcesReducer (state= ressourcesState, action){
  switch(action.type){
    case ADD_POSTS:
      return {
        ...state,
        post:[ ...state.post, action.payload ]
      }
    case GET_POSTS:
      const post = action.payload.reverse().map((post, index) => {
        if(index === action.index) {
          return Object.assign({}, post, {
            completed : !post.completed
          })
        }
        return post
      })
      return {
      ...state,
      post: post
    }
    case DELETE_POST:
      const postList = state.post.filter(post => post._id !== action.payload.id)
      return{
        ...state,
        post: postList
      }
    case SET_POST:
      const editedPostID = action.payload._id
      const posts = state.post.map((post, i) => {
        if(post._id == editedPostID){
          return {
            ...post,
            title: action.payload.title,
            subtitle: action.payload.subtitle,
            text: action.payload.text,
            tags: action.payload.tags,
            vip: action.payload.vip,
            image: action.payload.image
          }
        }else{
          return {...post}
        }
      })
      return {
         ...state,
         post: posts
      }
    case SEND_PICTURE:
      const pictureName = action.payload.file.filename
      return {
         ...state,
         pictureName: pictureName
      }
    default:
      return state;
  }
}
