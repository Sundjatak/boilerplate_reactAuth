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
class Ressources extends Component  {
  componentWillMount() {
    this.props.getSpecialRessource();
  }
  renderRessource = ressources => {
    return (
      ressources.map( ressource => <li key={ressource}>{ressource}</li>)
    )
  }
    render () {
        return (
          <div className='row'>
            <div className='col'>
              <button
                type='button'
                onClick={ () => this.props.addRessource() }
                className='btn btn-raised btn-primary'
                >
                Ajouter un nombre
              </button>
            </div>
            <div className='col'>
              Entiers
              <ul> {this.renderRessource(this.props.integerRessources)}</ul>
            </div>
            <div className='col'>
              Contiennent '1'
              <ul> {this.renderRessource(this.props.constainsOneRessources)}</ul>

            </div>
            <div className='col'>
              Entiers premiers
              <ul> {this.renderRessource(this.props.getPrimeNumberList)}</ul>

            </div>
            <div className='col'>
              Entiers premiers contenant '1'
              <ul> {this.renderRessource(this.props.specialRessources)}</ul>

            </div>
            {this.props.message}
          </div>
        )
    }
}
const mapStateToProps = state => {
  return {
    integerRessources : getIntegerList(state),
    constainsOneRessources: getContainsOne(state),
    getPrimeNumberList: getPrimeNumber(state),
    specialRessources: getSpecialNumberList(state),
    message: getRessourceMessage(state)
  }
}

export default connect(mapStateToProps, actions) (Ressources);
