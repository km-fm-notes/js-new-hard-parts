'use strict';

const { test, expect } = require('@jest/globals');
const { createFlow, createFlowDynamic } = require('./index');


// Generators: allows us to produce our flows of data using a function
// Instead of producing our flows using just a collection
// This function sets what value should be returned next

// When .next() is called, it takes us "back into" createFlow()'s execution context to continue

// Generators are more flexible than a traditional linear traversal across a collection

test('basic generator', () => {
  
  const f = createFlow();
  // f is assigned a generator object with a `next` property
  
  const e0 = f.next();
  // e0 is assigned an object with properties `done` and `value` 
  // This object is the result of evaluating createFlow() using persistent memory of the last invocation

  const e1 = f.next();
  const e2 = f.next();
  const e3 = f.next();
  const e4 = f.next();
  expect(e0).toEqual({ done: false, value: 4 });
  expect(e1).toEqual({ done: false, value: 5 });
  expect(e2).toEqual({ done: false, value: 6 });
  expect(e3).toEqual({ done: true, value: undefined });
  expect(e4).toEqual({ done: true, value: undefined });
});

test('basic generator with for of', () => {
  const f = createFlow();
  const nums = [4,5,6];
  const debug = [];
  let i = 0;
  for (let value of f) {
    debug.push(value);
    expect(value).toBe(nums[i]);
    i++;
  }
  expect(debug).toEqual(nums);
});

test('two generators working together', () => {

  const f0 = createFlow();
  const f1 = createFlow();
  
  const e0_0 = f0.next();
  const e0_1 = f0.next();
  const e1_0 = f1.next();
  expect(e0_0).toEqual({ done: false, value: 4 });
  expect(e0_1).toEqual({ done: false, value: 5 });
  expect(e1_0).toEqual({ done: false, value: 4 });
  
  const e0_2 = f0.next();
  const e0_3 = f0.next();
  const e0_4 = f0.next();
  expect(e0_2).toEqual({ done: false, value: 6 });
  expect(e0_3).toEqual({ done: true, value: undefined });
  expect(e0_4).toEqual({ done: true, value: undefined });
  
  const e1_1 = f1.next();
  const e1_2 = f1.next();
  const e1_3 = f1.next();
  const e1_4 = f1.next();
  expect(e1_1).toEqual({ done: false, value: 5 });
  expect(e1_2).toEqual({ done: false, value: 6 });
  expect(e1_3).toEqual({ done: true, value: undefined });
  expect(e1_4).toEqual({ done: true, value: undefined });

});

// This version of createFlow llustrates that we can programmatically orchestrate what happens when we
// "turn on the tap" to give ourselves the next element

// When we kickoff the first iteration, `num` is set to 10
// when we call `yield num` we return `num` to the caller of the first iteration and
// get booted out of the execution context immediately – so fast that we never
// have a chance to set the value of `newNum`, and it remains undefined.

// When we kickoff second iteration by calling `next` again
// we are allowed to pass an argument to `next`.

// If we do so, that argument becomes the result of evaluating the `yield num` expression
// As a result, that argument gets stored in `newNum`
// Otherwise, it remains undefined

test('generator with programming logic', () => {
  const fD = createFlowDynamic();
  
  const e0 = fD.next();
  expect(e0).toEqual({ done: false, value: 10 });

  // const e1 = fD.next();
  // expect(e1).toEqual({ done: false, value: NaN }); // 5 + undefined = NaN
  const e1 = fD.next(2);
  expect(e1).toEqual({ done: false, value: 7 }); // 5 + 2 = 7
  
  const e2 = fD.next();
  const e3 = fD.next();
  const e4 = fD.next();
  expect(e2).toEqual({ done: false, value: 6 });
  expect(e3).toEqual({ done: true, value: undefined });
  expect(e4).toEqual({ done: true, value: undefined });
});


function valueAndPrevIndex(array) {
  let i = 0;
  return {
    sentence() {
      if (i < array.length) {
        const element = array[i];
        let message;
        if (i === 0) {
          message = `${element} is the first element`;
        } else {
          message = `${element} was found after index ${i - 1}`;
        }
        i++;
        return message;
      } else {
        return 'no more elements';
      }
    }
  };
}
test('tests valueAndPrevIndex', () => {
  const returnedSentence = valueAndPrevIndex([4,5,6])
  const e0 = returnedSentence.sentence();
  const e1 = returnedSentence.sentence();
  const e2 = returnedSentence.sentence();
  const e3 = returnedSentence.sentence();
  const e4 = returnedSentence.sentence();
  expect(e0).toBe('4 is the first element');
  expect(e1).toBe('5 was found after index 0');
  expect(e2).toBe('6 was found after index 1');
  expect(e3).toBe('no more elements');
  expect(e4).toBe('no more elements');
});
