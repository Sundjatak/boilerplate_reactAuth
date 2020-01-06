import { Map, List, fromJS } from 'immutable';

// -- Data to ImmutableData
const person = {  name: 'Will',  pets: ['cat', 'dog']};
const immutablePerson = fromJS(person);

// -- ImmutableData to Data
const immutablePerson = Map({ name: 'Will' });
const person = immutablePerson.toJS();
console.log(person); // prints { name: 'Will' };

// --- Getting a nested value from an object without checking if it exists
// in Immutable:
const data = fromJS({ my: { nested: { name: 'Will' } } });
const goodName = data.getIn(['my', 'nested', 'name']);
console.log(goodName); // prints Will

// --- Chaining manipulations
// Now in Immutable:
const pets = List(['cat', 'dog']);
const finalPets = pets.push('goldfish').push('tortoise');
console.log(pets.toJS()); // prints ['cat', 'dog'];
console.log(finalPets.toJS()); // prints ['cat', 'dog', 'goldfish', 'tortoise'];

// You create an Immutable object and you update it — with Immutable,
// the initial data structure is not changed. It is immutable.
const data = fromJS({ name: 'Will' });
const newNameData = data.set('name', 'Susie');
console.log(data.get('name')); // prints 'Will'
console.log(newNameData.get('name')); // prints 'Susie'

// # Tutorials/References
// https://reactjs.org/tutorial/tutorial.html
// https://egghead.io/courses/the-beginner-s-guide-to-reactjs
// https://www.valentinog.com/blog/react-redux-tutorial-beginners/
// https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3
// https://www.raywenderlich.com/178012/react-native-tutorial-building-android-apps-javascript
// https://medium.com/@rajaraodv/step-by-step-guide-to-building-react-redux-apps-using-mocks-48ca0f47f9a
// https://www.gatsbyjs.org/tutorial/part-four/
// https://redux.js.org/advanced/example-reddit-api
