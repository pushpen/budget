//Destructuring Objects

//const person = {
//    name: 'Andrew',
//    age: 26,
//    location: {
//        city: 'Philadelphia',
//        temp: 56
//    }
//};
////
//////const name = person.name;
////const {name = 'Anonymous', age: aging = 600} = person;
////
////console.log(`${name} is ${aging}`);
//
//
//const {city, temp:temperature} = person.location;
//
//console.log(`${city} is ${temperature}`);

//Destructuring Arrays

const address = ['1299 S Juniper Street', 'Philadelphia', 'pennsylvia'];

const [,city, state] = address;

console.log(`You are in ${state}, ${city}`);