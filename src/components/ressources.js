import React, { Component } from 'react'
import * as actions from "../actions"
import { connect } from 'react-redux'
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

  onClickHandler = (e) => {
     e.preventDefault()
     const file = document.getElementById('inputGroupFile01').files
     const formData = new FormData()
     formData.append('img', file[0])
     console.log(file[0])
     this.props.postImage(file[0], this.props.history);
  }

  componentWillMount() {
    this.props.getPosts();
    console.log(this.props.getPosts());
  }

  renderPosts = dataPosts => {
    return (
      dataPosts.map( dataPosts => <li key={dataPosts}>{dataPosts}</li> )
    )
  }

//   componentWillMount() {
//     this.props.getSpecialRessource();
//   }
//   renderRessource = ressources => {
//     return (
//       ressources.map( ressource => <li key={ressource}>{ressource}</li>)
//     )
//   }
//     render () {
//         return (
//           <div className='row'>
//             <div className='col'>
//               <button
//                 type='button'
//                 onClick={ () => this.props.addRessource() }
//                 className='btn btn-raised btn-primary'
//                 >
//                 Ajouter un nombre
//               </button>
//             </div>
//             <div className='col'>
//               Entiers
//               <ul> {this.renderRessource(this.props.integerRessources)}</ul>
//             </div>
//             <div className='col'>
//               Contiennent '1'
//               <ul> {this.renderRessource(this.props.constainsOneRessources)}</ul>
//
//             </div>
//             <div className='col'>
//               Entiers premiers
//               <ul> {this.renderRessource(this.props.getPrimeNumberList)}</ul>
//
//             </div>
//             <div className='col'>
//               Entiers premiers contenant '1'
//               <ul> {this.renderRessource(this.props.specialRessources)}</ul>
//
//             </div>
//             {this.props.message}
//           </div>
//         )
//     }
// }
// const mapStateToProps = state => {
//   return {
//     integerPost : getIntegerList(state),
//
//   }
// }


  render() {
    const admin = localStorage.getItem('email');
    return (
      <div className="container">
        <div>
          <h1>Bonjour { admin }</h1>
        </div>
        <div className="jumbotron">
          <h1 className="display-4">Image Uplaoder</h1>
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
        <button type="button" className="btn btn-primary"  onClick={this.onClickHandler}>
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

export default connect(null, actions) (Ressources)

// export default connect(mapStateToProps, actions) (Ressources);
