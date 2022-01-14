// Challenge 6
//
// ADD CODE BELOW
const secondPromise = new Promise(function (resolve, reject) {
  resolve('Second!');
});
const firstPromise = new Promise(function (resolve, reject) {
  resolve(secondPromise);
})

firstPromise.then((value) => console.log('Challenge 6', value));

// immediately prints Challenge 6 Second!