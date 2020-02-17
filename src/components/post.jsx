import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';
import FormData from 'form-data';
import { EditorState,ContentState, convertToRaw, convertToHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FIELDS = {title: 'title', subtitle: 'subtitle', text: 'text', tags: 'tags', category: 'category', vip: 'vip'}

class Post extends Component {
  constructor(props) {
      super(props);
      const editorstate = EditorState.createWithContent(ContentState.createFromText(props.text))
      this.state = {
        id: props.id || '',
        title: props.title || '',
        subtitle: props.subtitle || '',
        text: props.text || '',
        tags: props.tags || '',
        vip: props.vip || '',
        image: props.vip || '',
        file: null,
        editorstate,
        imagePosted: props.filename.image
      };
       this.onChange = this.onChange.bind(this);
    }

    onEditorStateChange = (editorstate) => {
     this.setState({
       editorstate,
     });
   };

  handleSubmit = credentials => {
    if (this.state.imagePosted){
      const imagePosted = this.state.imagePosted
      if (this.props.initialValues.id === undefined){
        const text = draftToHtml(convertToRaw(this.state.editorstate.getCurrentContent()))
        this.props.postForm(credentials, imagePosted, text);
        this.props.action()
      }else{
        const text = draftToHtml(convertToRaw(this.state.editorstate.getCurrentContent()))
        this.props.setPost(this.state.id, credentials, this.state.imagePosted, text);
        this.props.action()
      }
    } else {
      alert("Image missing")
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


  render(){
    const edit = this.state
    const imageUrl = "/uploads/" + this.state.imagePosted
    return(
      <form
        className={ this.state.title ? "p-3 form_add rounded shadow col-md-12 justify-content-md-center" : "p-3 form_add rounded shadow col-md-12 justify-content-md-center"}
        id = { this.state.id }
        onSubmit={ this.props.handleSubmit(this.handleSubmit) }
        ref={(form) => this.formRef = form}>
        <div className='justify-content-md-center'>
          <div className="jumbotron">
            <h1 className="display-4">Image Uploader</h1>
            <p className="lead">
              This is a simple application to upload and retrieve images from a
              database
            </p>
            { this.state.imagePosted ? <img className="head-article-img" src={imageUrl} />: "ERR" }
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
                   <Editor
                      editorState = {edit.editorstate}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={this.onEditorStateChange}
                    />
                  {console.log(edit.editorstate)}
                  <textarea
                      name={FIELDS.text}
                      component="textarea"
                      type="text"
                      className="form-control text-light"
                      disabled
                      value={edit.editorstate ? draftToHtml(convertToRaw(edit.editorstate.getCurrentContent())) : ""}
                      editorstate={edit.editorstate ? draftToHtml(convertToRaw(edit.editorstate.getCurrentContent())): ""}
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
      image: ownProps.image
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
