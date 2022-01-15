function displayResolveSetTimeout() {
	console.log('Resolved setTimeout! me 5th'); 
}
function displayResolveImmediate() {
	console.log('Resolved Immediate! me 4th'); 
}
const promise_settimeout = new Promise(function (resolve, reject) {
  setTimeout(resolve, 0);
});
const promise_immediate = new Promise(function (resolve, reject) {
  resolve();
});
console.log('me first');
promise_settimeout.then(displayResolveSetTimeout);
console.log('me second');
promise_immediate.then(displayResolveImmediate);
console.log('me third');
