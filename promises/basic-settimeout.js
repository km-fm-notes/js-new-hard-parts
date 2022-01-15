'use strict';

function sayHello() {
	function printHello() {
    console.log('Hello me second');
  }
  setTimeout(printHello, 0);
}

sayHello();
console.log('me first');
