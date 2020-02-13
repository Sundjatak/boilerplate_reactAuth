import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

const FIELDS = { comment: 'comment'}

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.author || '',
      postID: props.postID || '',
      text: '',
    };
  }

  handleSubmit = credentials => {
    const author = this.state.author
    const postID = this.state.postID
    this.props.postComment(credentials, author, postID);
  };


  render(){
    return(
      <form
        className="p-3 form_add rounded shadow col-md-12 justify-content-md-center"
        id = { this.state.postID }
        onSubmit={ this.props.handleSubmit(this.handleSubmit) }
      >
        <div className='justify-content-md-center'>
            <div className=" justify-content-md-center">
             <div className="row justify-content-md-center">
               <fieldset className="col-md-10 form-gtoup row">
                 <label className="bmd-label-floating text-light">Commentaire</label>
                  <div className="row col-md-12">
                   <Field
                     name={FIELDS.comment}
                     component="input"
                     type="text"
                     className="form-control text-light col-md-12"
                     />
                    <button type="submit" className= "btn btn-primary btn-raised col-md-2" >
                     Submit
                   </button>
                 </div>
               </fieldset>
             </div>
           </div>
        </div>
      </form>
    )}
}


const commentForm = reduxForm({
  form : 'comment',
  fields: Object.keys(FIELDS),
  enableReinitialize : true,
})(Comments);


export default connect(null, actions) (commentForm)
