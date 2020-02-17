import { ADD_COMMENT, GET_COMMENTS } from '../actions/action-types';

const commentState = {
    comment : [],
    }

export default function CommentsReducer (state= commentState, action){
  switch(action.type){
  
    case GET_COMMENTS:
      console.log("aaaa  " + action.payload)
      const comment = action.payload.dataComment.reverse().map((comment, index) => {
        if(index === action.index) {
          return Object.assign({}, comment, {
            completed : !comment.completed
          })
        }
        return comment
      })
      return {
      ...state,
      comment: comment
    }
    default:
      return state;
  }
}
