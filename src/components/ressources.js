import React, { Component } from 'react'
import * as actions from "../actions"
import { getPosts } from "../actions"
import { connect } from 'react-redux'
import Post from './post'
import Comments from './comments'
import CommentList from './commentList'

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
    this.hideForm = this.hideForm.bind(this);
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
     console.log(file[0].name)
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

  hideForm = () => {
     this.setState({
      displayEditForm: false,
      displayForm: false
     })
  }

  renderPosts(){
    const post = this.props.postList
    console.log()
    console.log(this.props)
    if(post){
      const listItems = post.map((d) =>
        <li className=" post_dx" key={d._id}>
          {this.state.displayEditForm == true && this.state.editID == d._id ?
          <div className="justify-content-md-center">
              <Post
                id={d._id}
                title={d.title}
                subtitle={d.subtitle}
                text={d.text}
                tags={d.tags}
                category={d.category}
                vip={d.vip}
                action={this.edit}
                image={d.image}
                buttonClick={this.hideForm.bind(this)}
                />
            </div> :
            <div className="justify-content-md-center">
              <img className="head-article-img head-article" src={"/uploads/" + d.image} />
              <div className="col-md-12 content_post">
                <h4 className="row col-md-12 post_title">{d.title}</h4>
                <div  dangerouslySetInnerHTML={{__html: d.text}} />
              </div>
              <Comments
                postID={d._id}
                author={d._id}
                />
              <CommentList
                comment={d.commentIDs}
                commentToDelete={this.props.commentToDelete}
                />
              {this.props.comment ?
                <CommentList
                  comment={this.props.comment}
                  />
                :
                  <span></span>
              }
            </div>
            }

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
              <Post
                text='<p></p>'
                action={this.add}
                />
             }
          <ul className="postList">  { this.renderPosts()} </ul>
        </div>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postList: state.ressources.post,
    isDeleted: state.ressources.isDeleted,
    comment: state.ressources.comment,
    commentToDelete: state.ressources.commentToDelete,
    id: state.authentification.id
  };
};
export default connect(mapStateToProps, actions) (Ressources)
