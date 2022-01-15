// Challenge 1

function sayHello() {
	function printHello() {
    console.log('Challenge 1, 5', 'Hello'); // prints 2nd, regardless of setTimeout time value
  }
  setTimeout(printHello, 0);
}

sayHello();
console.log('me first'); // 1st
