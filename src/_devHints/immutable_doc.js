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
