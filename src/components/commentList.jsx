import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

const FIELDS = { comment: 'comment'}

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {
      comments : [],
    };
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.commentToDelete)
    if (this.props.commentToDelete) {
      this.render();
    }
  }
  delete = (id) => {
    this.props.removeComment(id)
    this.render();
  }

  render(){
    const comments = this.props.comment
    const commentToDelete = this.props.commentToDelete
    const listItems = comments.filter((d, index) => d._id !== this.props.commentToDelete).map((d, index) =>
        <li className=" post_dx" key={index}>
        <div className="col-md-12 content_post">
          <h4 className="row col-md-12 post_title">{d.author}</h4>
          <p>{d.comment}</p>
        </div>
        <button
          type="button"
          className="btn row btn-danger  col-md-2"
          onClick={this.delete.bind(this, d._id)}
          >
          Delete Comment
        </button>
      </li>
    )
    return(
      <ul>{listItems}</ul>
    )}
}




export default connect(null, actions) (CommentList)
