import { ADD_COMMENT, GET_COMMENTS } from '../actions/action-types';

const commentState = {
    comment : [],
    }

export default function CommentsReducer (state= commentState, action){
  switch(action.type){
    case ADD_COMMENT:
    console.log(action.payload.dataComment)
      return {
        ...state,
        comment:[ ...state.comment, action.payload.dataComment ]
      }
    case GET_COMMENTS:
    console.log(action.payload)
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
