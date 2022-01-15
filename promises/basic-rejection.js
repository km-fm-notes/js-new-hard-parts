promise = new Promise(function(resolve, reject) {
  reject();
})
function displayRejected() {
	console.log('Challenge 3', 'Rejected!'); 
}
promise.catch(displayRejected);
