import { createSelector } from 'reselect';
import lodash from 'lodash';

export const getIntegerList = state => {
  return state.ressources.ressourceList
}
export const getPostList = state => {
  return state.ressources.postList
}

// export const getSpecialPostList = createSelector (
//   return getPostList(state)
// )

export const getContainsOne  = state => {
  return getIntegerList(state).filter( r => r.toString().indexOf('1') > -1 );
}
export const getRessourceMessage = state => state.ressources.message
export const getPrimeNumber  = state => {
  return getIntegerList(state).filter( r => isPrimeNumber(r));
}

function isPrimeNumber(value){
  for( var i=2; i < value; i++){
    if( value % i === 0 ){
      return false
    }
  }
  return value > 1;
}
export const getSpecialNumberList = createSelector (
  getContainsOne,
  getPrimeNumber,
  (containsOneList, primeNumberList) => {
    return lodash.intersection(containsOneList, primeNumberList);
  }
)
