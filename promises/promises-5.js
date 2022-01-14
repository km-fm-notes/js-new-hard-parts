// Challenge 5
function sayHello() {
	function printHello() {
    console.log('Challenge 1, 5', 'Hello');
  }
  setTimeout(printHello, 1000);
}

function delay(){
	return new Promise(function (resolve, reject) {
		setTimeout(resolve, 1000);    
  });
}

// Uncomment the code below to test
// This code should log "Hello" after 1000ms
delay().then(sayHello);


// prints after 2 seconds
