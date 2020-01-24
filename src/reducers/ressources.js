import { ADD_POSTS, PARSE_MESSAGE, GET_POSTS } from '../actions/action-types';

const ressourcesState = {
  ressourceList : [0],
  postList : [],
  message: "",
  post: []
    }

export default function RessourcesReducer (state= ressourcesState.post, action){
  switch(action.type){
    case ADD_POSTS:
      return state.concat([action.payload]);
    // case 'DELETE_POST':
    //     return state.filter((post)=>post.id !== action.id);
  //   case PARSE_MESSAGE:
  //     return {
  //       ...state,
  //       message: action.payload
  //     };
    case GET_POSTS:
      const post = action.payload.reverse().map((post, index) => {
        if(index === action.index) {
          return Object.assign({}, post, {
            completed : !post.completed
          })
        }
      return post
    })
    console.log(post)
      return post
      default:
        return state;
  }
}
