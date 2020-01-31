import {SET_AUTHENTIFICATION, INCREMENT_ACTION_COUNT, ADD_POSTS, PARSE_MESSAGE, PARSE_ERROR, RESET_ERROR, GET_USER, GET_POSTS, DELETE_POST, SET_POST} from './action-types'
import axios from "axios";
import FormData from 'form-data'

const BASE_URL = "http://localhost:3090";

export function setAuthentification(isLoggedIn) {
  return {
      type: SET_AUTHENTIFICATION,
      payload : isLoggedIn
  };
}

export function incrementActionCount() {
  return {
    type: INCREMENT_ACTION_COUNT
  }
}

export function signinUser({ email, password }, history) {
  return function(dispatch){
    axios
    .post(`${BASE_URL}/signin`, {
      email,
      password
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email);
      dispatch(setAuthentification(true));
      history.push('/ressources');
    }).catch((error) => {
      console.log(parseError(error));

      // dispatch(parseError(error.response.data.message));
    });
  }
}

export function signoutUser() {
  return function(dispatch){
    dispatch(setAuthentification(false));
    localStorage.removeItem('token');
  }
}

export function signupUser({ email, password }, history) {
  return function(dispatch){
    axios
    .post(`${BASE_URL}/signup/`, {
      email,
      password
    })
    .then(response => {
      dispatch(setAuthentification(true));
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('email', email);
      history.push('/ressources');
    }).catch((error) => {
        console.log(error);
    });
  }
}

export function getSpecialRessource() {
  return function(dispatch){
    axios
    .get(`${BASE_URL}/specialRessource/`, {
      headers: {
        authorization : localStorage.getItem("token")
      }
    })
    .then((response) => {
      dispatch({ type : GET_USER, payload: response.data.result })
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export function getPosts() {
  return dispatch => {

    axios
    .get(`${BASE_URL}/posts/`, {
      headers: {
        authorization : localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
        dispatch({ type : GET_POSTS, payload: response.data.dataPost })
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export function postForm({ title, subtitle, text, tags }, history) {
    const newPost = {
      title : title,
      subtitle: subtitle,
      text: text,
      tags: tags
  };
  return function(dispatch){
    axios
    .post(`${BASE_URL}/add-post`, {
      title,
      subtitle,
      text,
      tags
    })
    .then(response => {
      dispatch({ type : ADD_POSTS, payload: response.data })

    })
   .catch((error) => {
      console.log("Tu n'es qu'une merde Jerry", error);
    });
  }
}



export function setPost(id, { title, subtitle, text, tags }, history) {
    const newPost = {
      title : title,
      subtitle: subtitle,
      text: text,
      tags: tags
  };
  return function(dispatch){
    axios
    .post(`${BASE_URL}/set-post/` + id, {
      title,
      subtitle,
      text,
      tags
    })
    .then(response => {
      dispatch({ type : SET_POST, payload: response.data })
    })
   .catch((error) => {
      console.log("Tu n'es qu'une merde Ralphy", error);
    });
  }
}


export function removePost(id) {
  return function(dispatch){
    axios
    .delete(`${BASE_URL}/rm-post/` + id)
    .then((response) => {
        dispatch({ type : DELETE_POST, payload: response.data })
    })
    .catch((error) => {
      console.log(error);
    });
  }
}



export function parseError(errorMessage){
  return{
    type: PARSE_ERROR, payload: errorMessage
  }
}

export function resetError(errorMessage){
  return{
    type: RESET_ERROR
  }
}
/////


export function postImage(data, history) {
  let formData = new FormData();
  formData.append('file', data, data.name);
  return function(dispatch){
    axios
    .post(`${BASE_URL}/log-entries/5dcedbc43d84143a44800739/images`, formData, {
      headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data;`,
        }
      })
    .then(response => {
      history.push('/ressources');
      console.log('Bonne reponse', response);

    }).catch((error) => {
        console.log('Pas bonne reponse', error);
    });
  }
}

/////
