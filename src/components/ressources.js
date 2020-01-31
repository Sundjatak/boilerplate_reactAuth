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
// import Loading from './loadSpinner'
import FormData from 'form-data';
require("../style.css");

class Ressources extends Component  {
  constructor(props) {
     super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.props.getPosts();
    this.state = {
      displayForm: false,
      posts : [],
      displayEditForm: false,
      editID : 0
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postList !== this.props.postList ) {
      this.renderPosts();
    }
  }

  add = () => {
     this.setState({
      displayEditForm: false,
      displayForm: !this.state.displayForm
     })
  }

  delete = id => {
    this.props.removePost(id)
  }

  edit = id => {
    this.setState({
      displayEditForm: !this.state.displayEditForm,
      displayForm: false,
      editID: id
    })
  }


  renderPosts(){

    const post = this.props.postList
    if(post){
      const listItems = post.map((d) =>
        <li className="container" key={d._id}>
          <div className="row justify-content-md-center">
            <div className="col-md-5">
              <h4 className="row col-md-4">{d.title}</h4>
              <p className="row col-md-4">{d.text}</p>
            </div>
            { this.state.displayEditForm == true && this.state.editID == d._id ?
              <button
                type="button"
                className="btn row btn-warning  col-md-2"
                onClick={this.edit.bind(this, d._id)}
                >
                cancel edition
              </button> :
              <button
                type="button"
                className="btn row btn-warning  col-md-2"
                onClick={this.edit.bind(this, d._id)}
                >
                Edit Post
              </button>
             }

            <button
              type="button"
              className="btn row btn-danger  col-md-2"
              onClick={this.delete.bind(this, d._id)}
              >
              Delete Post
            </button>
          </div>
          {this.state.displayEditForm == true && this.state.editID == d._id &&
            <Post
              id={d._id}
              title={d.title}
              subtitle={d.subtitle}
              text={d.text}
              tags={d.tags}
              category={d.category}
              vip={d.vip}
              action={this.edit}
              />
           }
        </li>
      );
      return (
        <div> {listItems}</div>
      )
    }
  }

  render() {
    const { error, loading, postList } = this.props;
    const admin = localStorage.getItem('email');
    const displayForm = this.state.displayForm;
    return (
      <div className="container">
        <div>
          <h1>Bonjour { admin }</h1>
            <button type="button" className="btn btn-primary"  onClick={this.add}>
              Add Post
            </button>
            {this.state.displayForm == true &&
              <Post />
             }
          <ul>  { this.renderPosts()} </ul>
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
    postList: state.ressources.post,
    isDeleted: state.ressources.isDeleted
  };
};
export default connect(mapStateToProps, actions) (Ressources)
