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
import FormData from 'form-data'

class Ressources extends Component  {

 onClickHandler = (e) => {
   e.preventDefault()
   const file = document.getElementById('inputGroupFile01').files
   const formData = new FormData()
   formData.append('img', file[0])
   console.log(file[0])
   this.props.postImage(file[0], this.props.history);
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
//     integerRessources : getIntegerList(state),
//     constainsOneRessources: getContainsOne(state),
//     getPrimeNumberList: getPrimeNumber(state),
//     specialRessources: getSpecialNumberList(state),
//     message: getRessourceMessage(state)
//   }
// }
  //
  // handleSubmit= e => {
  //         const file = document.getElementById('inputGroupFile01').files
  //         const fd = new FormData()
  //         fd.append('img',file[0])
  //         console.log(fd.filename)
  //         this.props.postImage(fd, this.props.history);
  //
  //     }


  //
  // Post = e => {
  //   e.preventDefault();
  //   const file = document.getElementById("inputGroupFile01").files;
  //   const formData = new FormData();
  //
  //   formData.append("img", file[0]);
  //
  //   fetch("http://localhost:3090/", {
  //     method: "POST",
  //     body: formData
  //   }).then(r => {
  //     console.log(r);
  //   });
  //
  //   document
  //     .getElementById("img")
  //     .setAttribute("src", `http://localhost:3000/${file[0].name}`);
  //     console.log(file[0]);
  // };

  render() {
    return (
      <div className="container">
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
          id="img"
          style={{
            display: "block"
          }}
        ></img>
      </div>
    );
  }
}

export default connect(null, actions) (Ressources)

// export default connect(mapStateToProps, actions) (Ressources);
