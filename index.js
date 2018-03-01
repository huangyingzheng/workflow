const _ = require('lodash');
const testFn = require('./test');

function getName() {
    const firstName = 'Yingzheng';
    const lastName = 'Huang';

    const name = _.head([firstName, lastName]);

    return name;
}

testFn();




console.log('hello ' + getName());