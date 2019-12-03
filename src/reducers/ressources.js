import { ADD_RESSOURCE, PARSE_MESSAGE, GET_POSTS } from '../actions/action-types';

const initialState = {
  ressourceList : [0],
  postList : [0],
  message: ""
    }

export default function RessourcesReducer (state= initialState, action){
  switch(action.type){
    case ADD_RESSOURCE:
    return{
      ressourceList: [
        ...state.ressourceList,
        state.ressourceList[ state.ressourceList.length - 1 ] +1
      ]
    };
    case PARSE_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
      case GET_POSTS:
        return {
          ressourceList: [
            ...state.postList,
            state.ressourceList[ state.postList.length - 1 ] +1
          ]
        };
    default:
      return state;
  }
}
