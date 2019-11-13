import React, { Component }  from 'react';
import Header from '../containers/header';
import {shallow, mount} from "enzyme";
import { Provider } from "react-redux";
import {setAuthentification} from "../actions";
import AuthentificationReducer from "../reducers/authentification";
import { SET_AUTHENTIFICATION, INCREMENT_ACTION_COUNT } from '../actions/action-types';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import {MemoryRouter} from 'react-router-dom';
import RootTest from "./root-test";
import { incrementActionCount} from '../actions';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);



describe("Test sur Header", () => {
  it("Test sur Header sans erreur", () => {
  const wrapper = shallow(
    <RootTest>
      <Header />
    </RootTest>
    );
  });

  it("Test que le libellé du bouton connexion est bien 'connexion' puis 'deconnexion' après clique", () => {
  const wrapper = mount(
    <RootTest>
      <Header />
    </RootTest>
    );

    expect(wrapper.find('a').at(2).text()).toEqual('Connexion');
    wrapper.find('a').at(2).simulate('click');
    expect(wrapper.find('a').at(2).text()).toEqual("Deconnexion")
  });

  it('Test le payload d\'une action', () => {
    const action = incrementActionCount();
    expect(action.type).toEqual(INCREMENT_ACTION_COUNT)
  });

  it('Test le reducer authentification sans action type', () => {
    const action = { type : SET_AUTHENTIFICATION, payload: true}
    const initialState = {
      isLoggedIn : false
    }
    expect(AuthentificationReducer(initialState, action).isLoggedIn).toEqual(true);
  });

});
