// Challenge 3

promise = new Promise(function(resolve, reject) {
  // ADD CODE HERE
  reject();
})

// Should print out "Reject!"
// ADD CODE HERE
function displayRejected() {
	console.log('Challenge 3', 'Rejected!'); 
}
promise.catch(displayRejected);

// immediately prints
