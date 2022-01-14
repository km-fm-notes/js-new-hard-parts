// Challenge 2
let promise = new Promise(function (resolve, reject) {
  // ADD CODE HERE
  setTimeout(resolve, 1000);
});

// Should print out "Resolved!"
// ADD CODE HERE
function displayResolve() {
	console.log('Challenge 2', 'Resolved!'); 
}
promise.then(displayResolve);

// Prints after 1sec


