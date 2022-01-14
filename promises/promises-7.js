// Challenge 7
const fakePeople = [
  { name: 'Rudolph', hasPets: false, currentTemp: 98.6 },
  { name: 'Zebulon', hasPets: true, currentTemp: 22.6 },
  { name: 'Harold', hasPets: true, currentTemp: 98.3 },
]

const fakeAPICall = (i) => {
  const returnTime = Math.floor(Math.random() * 1000);
  return new Promise((resolve, reject) => {
    if (i >= 0 && i < fakePeople.length) {
      setTimeout(() => resolve(fakePeople[i]), returnTime);
    } else {
      reject({ message: "index out of range" });
    }
  });
};

function getAllData() {
  // CODE GOES HERE
  const apiPromises = [fakeAPICall(0), fakeAPICall(1), fakeAPICall(2)]
  return Promise.all(apiPromises)
  	.then(function(values) {
  		return values;
		});
}

function getAllDataErr() {
  // CODE GOES HERE
  const apiPromises = [fakeAPICall(10), fakeAPICall(1), fakeAPICall(2)]
  return Promise.all(apiPromises)
  	.then(function(values) {
  		return values;
		});
}
  
getAllData().then((values) => console.log('Challenge 7', values));
getAllDataErr().then((values) => console.log('Challenge 7', values))
  .catch(e => console.log('Challenge 7', e));

` Prints
Challenge 7 { message: 'index out of range' }
Challenge 7 [
  { name: 'Rudolph', hasPets: false, currentTemp: 98.6 },
  { name: 'Zebulon', hasPets: true, currentTemp: 22.6 },
  { name: 'Harold', hasPets: true, currentTemp: 98.3 }
]

Throws error without catch
`