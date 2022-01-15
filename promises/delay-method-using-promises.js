'use strict';

function sayHello() {
  console.log('Hello me after 1sec');
}
function delay(ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);    
  });
}
delay(1000).then(sayHello);
