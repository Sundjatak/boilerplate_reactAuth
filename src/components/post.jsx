import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

const FIELDS = {title: 'title', subtitle: 'subtitle', text: 'text', tags: 'tags', category: 'category', vip: 'vip'}

class Post extends Component {
  handleSubmit = credentials => {
    console.log(credentials)
    this.props.postForm(credentials);

  };
  render(){
    return(
      <form className='p-3 bg-primary rounded shadow col-md-12 justify-content-md-center' onSubmit={ this.props.handleSubmit(this.handleSubmit) }>
        <div className='justify-content-md-center'>
            <div className=" justify-content-md-center">
              <div className="row justify-content-md-center">
               <fieldset className="col-md-10 form-group">
                 <label className=" text-light bmd-label-floating">Titre</label>
                 <Field
                   name={FIELDS.title}
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
                <button type="submit" className="btn btn-primary btn-raised">
                  Submit
                </button>
              </div>
            </div>
        </div>
      </form>

      //   <div className="row justify-content-md-center">
      //     <fieldset className="col-md-10 form-group">
      //       <label className="bmd-label-floating">Titre</label>
      //       <Field
      //         name={FIELDS.title}
      //         component="input"
      //         type="text"
      //         className="form-control"
      //         />
      //     </fieldset>
      //   </div>
      //   <div className="row justify-content-md-center">
      //     <fieldset className="col-md-10 form-gtoup">
      //       <label className="bmd-label-floating">Sous Titre</label>
      //       <Field
      //         name={FIELDS.subtitle}
      //         component="input"
      //         type="text"
      //         className="form-control"
      //         />
      //     </fieldset>
      //   </div>
      //   <div className="row justify-content-md-center">
      //     <fieldset className="col-md-10 form-gtoup">
      //       <label className="bmd-label-floating">Texte</label>
      //       <Field
      //         name={FIELDS.text}
      //         component="input"
      //         type="text"
      //         className="form-control"
      //         />
      //     </fieldset>
      //   </div>
      //   <div className="row justify-content-md-center">
      //     <fieldset className="col-md-10 form-gtoup">
      //       <label className="bmd-label-floating">Tags</label>
      //       <Field
      //         name={FIELDS.tags}
      //         component="input"
      //         type="text"
      //         className="form-control"
      //         />
      //     </fieldset>
      //   </div>
      //   <div className="row justify-content-md-center">
      //     <fieldset className="col-md-10 form-gtoup">
      //       <label className="bmd-label-floating">Categorie</label>
      //       <Field
      //         name={FIELDS.category}
      //         component="input"
      //         type="radio"
      //         className="form-control"
      //         />
      //     </fieldset>
      //   </div>
      //   <div className="row justify-content-md-center">
      //     <fieldset className="col-md-10 form-gtoup">
      //       <label className="bmd-label-floating">VIP</label>
      //       <Field
      //         name={FIELDS.vip}
      //         component="input"
      //         type="checkbox"
      //         className="form-control"
      //         />
      //     </fieldset>
      //   </div>
      //   <div className="row justify-content-md-center">
      //     <button type="submit" className="btn btn-primary btn-raised">
      //       Submit
      //     </button>
      //   </div>
    )
  }
}

const postForm = reduxForm({
  form : 'post',
  fields: Object.keys(FIELDS)
})(Post);

export default connect(null, actions)(postForm);
