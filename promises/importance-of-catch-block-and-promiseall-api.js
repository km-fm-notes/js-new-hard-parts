'use strict';

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
  const apiPromises = [fakeAPICall(0), fakeAPICall(1), fakeAPICall(2)]
  return Promise.all(apiPromises)
  	.then(function(values) {
  		return values;
		});
}

// Bug here with fakeAPICall(10)
function getAllDataErr() {
  const apiPromises = [fakeAPICall(10), fakeAPICall(1), fakeAPICall(2)]
  return Promise.all(apiPromises)
  	.then(function(values) {
  		return values;
		});
}

getAllData().then((values) => console.log('getAllData() then me second', values));
getAllDataErr().then((values) => console.log('getAllDataErr() then', values))
  .catch(e => console.log('getAllDataErr() catch me first', e));
// Program throws exception without catch block under getAllDataErr()

` Prints
getAllDataErr() catch { message: 'index out of range' }
getAllData() then [
  { name: 'Rudolph', hasPets: false, currentTemp: 98.6 },
  { name: 'Zebulon', hasPets: true, currentTemp: 22.6 },
  { name: 'Harold', hasPets: true, currentTemp: 98.3 }
]
`