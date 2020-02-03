import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';
import FormData from 'form-data';

const FIELDS = {title: 'title', subtitle: 'subtitle', text: 'text', tags: 'tags', category: 'category', vip: 'vip'}

class Post extends Component {
  constructor(props) {
      super(props);
      this.state = {
        id: props.id || '',
        title: props.title || '',
        subtitle: props.subtitle || '',
        text: props.text || '',
        tags: props.tags || '',
        vip: props.vip || '',
        file: null,
        imagePosted: props.filename.image
      };
       this.onChange = this.onChange.bind(this);
    }
  handleSubmit = credentials => {
    console.log(this.props.initialValues.id === undefined)
    if (this.props.initialValues.id === undefined){
      this.props.postForm(credentials);
    }else{
      this.props.setPost(this.state.id, credentials);
      this.props.action()
    }
  };

  onChange(e) {
    this.setState({file:e.target.files[0]});
  }
  onClickHandlerAdd = (e) => {
     // e.preventDefault()
     const file = this.state.file
     this.props.postImage(file)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filename !== this.props.filename) {
      const file = this.props.filename;

      this.setState({imagePosted: file})
    }
  }

  renderImage(file){
    if(file){
      console.log('renderImage ' + file)
      const fileUrl = '/uploads/' + file
      return {
        render(){
          <div className="jumbotron">
            <img src={fileUrl} alt="image article" />
          </div>
        }
      }
    }
  }


  render(){

    const edit = this.state
    const imageUrl = "/uploads/" + this.state.imagePosted
    return(
      <form
        className={ this.state.title ? "p-3 bg-warning rounded shadow col-md-12 justify-content-md-center" : "p-3 bg-primary rounded shadow col-md-12 justify-content-md-center"}
        id = { this.state.id }
        onSubmit={ this.props.handleSubmit(this.handleSubmit) }>
        <div className='justify-content-md-center'>
            <div className=" justify-content-md-center">
              <div className="row justify-content-md-center">
               <fieldset className="col-md-10 form-group">
                 <label className=" text-light bmd-label-floating">Titre</label>
                 <Field
                   name={FIELDS.title}
                   placeholder= {edit.title}
                   component="input"
                   type="text"
                   className="form-control text-light"
                   />
               </fieldset>
             </div>
             <div className="row justify-content-md-center">
               <fieldset className="col-md-10 form-gtoup">
                 <label className="bmd-label-floating text-light">Sous Titre</label>
                 <Field
                   name={FIELDS.subtitle}
                   component="input"
                   type="text"
                   className="form-control text-light"
                   />
               </fieldset>
             </div>
             <div className="row justify-content-md-center">
               <fieldset className="col-md-10 form-gtoup">
                 <label className="bmd-label-floating text-light">Texte</label>
                 <Field
                   name={FIELDS.text}
                   component="input"
                   type="text"
                   className="form-control text-light"
                   />
               </fieldset>
             </div>
             <div className="row justify-content-md-center">
               <fieldset className="col-md-10 form-gtoup">
                 <label className="bmd-label-floating text-light">Tags</label>
                 <Field
                   name={FIELDS.tags}
                   component="input"
                   type="text"
                   className="form-control text-light"
                   />
               </fieldset>
             </div>
             <div className="jumbotron">
               <h1 className="display-4">Image Uploader</h1>
               <p className="lead">
                 This is a simple application to upload and retrieve images from a
                 database
               </p>
               { this.state.imagePosted ? <img src={imageUrl} />: "ERR"}
               <hr className="my-4" />
             </div>
               <div className="input-group mb-3">
                 <div className="custom-file">
                   <input
                     type="file"
                     name="image"
                     onChange={this.onChange}
                     className="custom-file-input"
                     id="inputGroupFile01"
                     aria-describedby="inputGroupFileAddon01"
                   />
                   <label className="custom-file-label" htmlFor="inputGroupFile01">
                     Choose file
                   </label>
                 </div>
               </div>
               <button type="button" className="btn btn-danger" onClick={this.onClickHandlerAdd}>
                 Upload
               </button>
             <div className="row justify-content-md-center">
               <fieldset className="col-md-5 form-gtoup">
                 <label className="bmd-label-floating text-light">Categorie</label>
                 <Field
                   name={FIELDS.category}
                   component="input"
                   type="radio"
                   className="form-control text-light"
                   />
                   <Field
                     name={FIELDS.category}
                     component="input"
                     type="radio"
                     className="form-control text-light"
                     />
               </fieldset>
               <fieldset className="col-md-5 form-gtoup">
                 <label className="bmd-label-floating text-light">VIP</label>
                 <Field
                   name={FIELDS.vip}
                   component="input"
                   type="checkbox"
                   className="form-control text-light"
                   />
               </fieldset>
             </div>
             <div className="row justify-content-md-center mt-3">
               { this.state.title ?
                 <button type="submit" className="btn btn-default btn-raised" >
                 Modifier
               </button> :
               <button type="submit"className= "btn btn-primary btn-raised" >
                 Submit
               </button>
                }
              </div>
            </div>
        </div>
      </form>

    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      id: ownProps.id,
      title: ownProps.title,
      subtitle: ownProps.subtitle,
      text: ownProps.text,
      tags: ownProps.tags,
      vip: ownProps.vip,
    },
    filename: state.ressources.pictureName

  }
}

const postForm = reduxForm({
  form : 'post',
  fields: Object.keys(FIELDS),

  enableReinitialize : true,
})(Post);

export default connect(mapStateToProps, actions)(postForm);
