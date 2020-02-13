import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

const FIELDS = { comment: 'comment'}

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.props.getComments(this.props.post);
    this.state = {
      comments : [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.commentList !== this.props.commentList ) {
      this.render();
    }
  }

  render(){
    const comment = this.props.commentList

    console.log(comment)
    const listItems = comment.map((d) =>
      <li className=" post_dx" key={d._id}>
        <div className="col-md-12 content_post">
          <h4 className="row col-md-12 post_title">{d.author}</h4>
          <p>{d.comment}</p>
        </div>
      </li>
    );
    return(
      <ul>{listItems}</ul>
    )}
}


const mapStateToProps = (state) => {
  return {
    commentList: state.comments.comment,
  };
};
export default connect(mapStateToProps, actions) (CommentList)
