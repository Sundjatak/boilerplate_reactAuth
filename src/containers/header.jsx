import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component  {


  renderAuthentificationLink = () => {
    if(this.props.isLoggedIn){
      return(
        <li className="nav-item">
          <Link className="nav-link_dx" to ={"/signout"}>Déconnexion</Link>
        </li>
      );
    } else {
      return [
          <li key={1} className="nav-item">
            <Link className="nav-link_dx" to ={"/signin"}>Connexion</Link>
          </li>,
          <li key={2} className="nav-item">
            <Link className="nav-link_dx" to ={"/signup"}>Inscription</Link>
          </li>
      ];
      }
    };
  render () {
    return (
      <ul className="nav nav-tabs nav_dx framed">
        <li className="nav-item">
          <Link className="nav-link_dx" to="/">Accueil</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link_dx" to="/ressources">Ressource</Link>
        </li>
        {this.renderAuthentificationLink()}
      </ul>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.authentification.isLoggedIn
  };
};
export default connect(mapStateToProps, actions) (Header)
