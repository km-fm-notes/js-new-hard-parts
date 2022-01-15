'use strict';

function logMe(value) {
  console.log(value);
}

const second_promise = new Promise(function (resolve, reject) {
  resolve('second_promise');
});
console.log({ second_promise, second_promise_value: second_promise.value });
"{ second_promise: Promise { 'second_promise' }, second_promise_value: undefined }";
// Synchronous code does not have access to promise value. Only callbacks have access.

console.log('me first');

const firstPromiseRes = new Promise(function (resolve, reject) {
  resolve(second_promise);
  console.log('me seconnd');
});

firstPromiseRes.then(value => logMe('res (me third) ' + value));


const firstPromiseNoRes = new Promise(function (resolve, reject) {
  return second_promise;
});
// Never evaluates because there is no resolve() or reject() in the promise
firstPromiseNoRes
  .then(value => logMe('no res (me never)' + value))
  .catch(value => logMe('no res catch (me never)' + value));

