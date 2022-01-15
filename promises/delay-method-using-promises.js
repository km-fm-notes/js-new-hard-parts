function sayHello() {
  console.log('Hello');
}
function delay(ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);    
  });
}
delay(1000).then(sayHello);
