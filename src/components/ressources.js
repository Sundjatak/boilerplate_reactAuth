import React, { Component } from 'react'
import * as actions from "../actions"
import { getPosts } from "../actions"
import { connect } from 'react-redux'
import Post from './post'
import {
  getIntegerList,
  getContainsOne,
  getPrimeNumber,
  getSpecialNumberList,
  getRessourceMessage
} from '../selectors'
import FormData from 'form-data';
require("../style.css");

class Ressources extends Component  {
  constructor(props) {
     super(props);
    this.state = {
      displayForm: false,
      posts : []
     }
  }

  onClickHandler = (e) => {
     e.preventDefault()
     const file = document.getElementById('inputGroupFile01').files
     const formData = new FormData()
     formData.append('img', file[0])
     console.log(file[0])
     this.props.postImage(file[0], this.props.history);
  }

  componentDidMount() {
    console.log(this.props.getPosts());

   }


 displayForm = () => {
     this.setState({
         displayForm: !this.state.displayForm
     })
 }

 renderForm(){
    return (
      <Post  />
    );
  }

  render() {
    const post = this.props.postList
    console.log(post)
    const listItems = post.map((d) => <li key={d._id}><h4>{d.title}</h4><p>{d.text}</p></li>);
    const { error, loading, postList } = this.props;
    const admin = localStorage.getItem('email');
    const displayForm = this.state.displayForm;
    return (
      <div className="container">
        <div>
          <h1>Bonjour { admin }</h1>
            <button type="button" className="btn btn-primary"  onClick={this.displayForm}>
              Add Post
            </button>
            {this.state.displayForm == true &&
              <Post />
             }
          <ul>  {listItems} </ul>
        </div>

        <div className="jumbotron">
          <h1 className="display-4">Image Uploader</h1>
          <p className="lead">
            This is a simple application to upload and retrieve images from a
            database
          </p>
          <hr className="my-4" />
        </div>
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              onChange={this.onChangeHandler}
              className="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
              Choose file
            </label>
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.onClickHandler}>
          Upload
        </button>
        <img
          id="img_profile"
          style={{
            display: "block"
          }}
          src="/uploads/1574428909274/gus.jpg"
        ></img>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postList : state.ressources
  };

};
export default connect(mapStateToProps, actions) (Ressources)
