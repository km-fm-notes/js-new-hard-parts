'use strict';

const is_strict = (function() { return !this; })();

const { test, expect } = require('@jest/globals');
const {
  createIterator,
  createIteratorNext,
  createIteratorSet,
  createIteratorIndex,
  WordsFunc,
  WordsClass,
  validMaxHeap,
} = require('./index');


const nums = [4,5,6];


// Challenge #1:
test('basic iterator implementation', () => {
  const i = createIterator(nums);
  const e0 = i();
  const e1 = i();
  const e2 = i();
  const e3 = i();
  const e4 = i();
  expect(e0).toBe(4);
  expect(e1).toBe(5);
  expect(e2).toBe(6);
  expect(e3).toBeUndefined();
  expect(e4).toBeUndefined();
});



// Challenge #2:
test('iterator implementation with next() api', () => {
  const iN = createIteratorNext(nums);
  const e0 = iN.next();
  const e1 = iN.next();
  const e2 = iN.next();
  const e3 = iN.next();
  const e4 = iN.next();
  expect(e0).toBe(4);
  expect(e1).toBe(5);
  expect(e2).toBe(6);
  expect(e3).toBeUndefined();
  expect(e4).toBeUndefined();
});



// Challenge #3:
function sumArray(arr) {
  let tally = 0;
  const iN = createIteratorNext(arr);
  let next_element = iN.next();
  while (typeof next_element === 'number') { // remember that 0 is falsy
    tally += next_element;
    next_element = iN.next();
  }
  return tally;
}
test('implementat a function that adds elements of array using iterator', () => {
  expect(sumArray(nums)).toBe(15);
  expect(sumArray([-1,0,2,0,39,2.5])).toBe(42.5);
  expect(sumArray([])).toBe(0);
  expect(sumArray([0,0,0])).toBe(0);
});



// Challenge #4:
test('Implement set iterator', () => {
  const mySet = new Set('hey');
  const iS = createIteratorSet(mySet);
  const e0 = iS.next();
  const e1 = iS.next();
  const e2 = iS.next();
  const e3 = iS.next();
  const e4 = iS.next();
  expect(e0).toBe('h');
  expect(e1).toBe('e');
  expect(e2).toBe('y');
  expect(e3).toBeUndefined();
  expect(e4).toBeUndefined();
});


// Challenge #5:
test('implement index iterator', () => {
  const chars = ['a', 'b', 'c', 'd'];
  const iI = createIteratorIndex(chars);
  const e0 = iI.next();
  const e1 = iI.next();
  const e2 = iI.next();
  const e3 = iI.next();
  const e4 = iI.next();
  expect(e0).toEqual([0, 'a']);
  expect(e1).toEqual([1, 'b']);
  expect(e2).toEqual([2, 'c']);
  expect(e3).toEqual([3, 'd']);
  expect(e4).toEqual([4, undefined]);
});



// Challenge #6:
test('Symbol iterator exploration with functions and classes', () => {
  
  // Notice usage of new keyword
  const wf0 = [];
  const hwF0 = new WordsFunc('Hello World');
  expect(hwF0?.str).toBe('Hello World');
  for (const word of hwF0) {
    wf0.push(word);
  }
  expect(wf0).toEqual(['Hello', 'World']);
  expect(wf0[2]).toBeUndefined();

  const wf1 = [];
  const hwF1 = new WordsFunc('Hello World Again');
  expect(hwF1?.str).toBe('Hello World Again');
  for (const word of hwF1) {
    wf1.push(word);
  }
  expect(wf1).toEqual(['Hello', 'World', 'Again']);
  expect(wf1[3]).toBeUndefined();
  
  // Notice the new keyword is missing
  // Note: Throws error in strict mode
  if (!is_strict) {
    const hwF_NN0 = WordsFunc('Hello World');
    expect(hwF_NN0).toBeUndefined();
    expect(hwF_NN0?.str).toBeUndefined();
  }

  // Implementation with classes is the same
  const wc0 = [];
  const hwC0 = new WordsClass('Hello World');
  expect(hwC0?.str).toBe('Hello World');
  for (const word of hwC0) {
    wc0.push(word);
  }
  expect(wc0).toEqual(['Hello', 'World']);
  expect(wc0[2]).toBeUndefined();

});


// Random:
test.skip('validates a max heap', () => {
  const valid_max_heap = [10, 7, 9, 6, 5, 2, 8, 3, 4, 1];
  const valid_max_heap_with_dups = [10, 7, 10, 6, 5, 2, 8, 3, 4, 1];
  const invalid_max_heap = [10, 7, 9, 6, 5, 2, 8, 3, 4, 1, 11];
  expect(validMaxHeap(valid_max_heap, true)).toBe(true);
  expect(validMaxHeap(valid_max_heap_with_dups)).toBe(true);
  expect(validMaxHeap(invalid_max_heap)).toEqual({
    invalid_node: {
      value: 5,
      children: [1, 11]
    }
  });
  expect(validMaxHeap([])).toBe(true);
  expect(validMaxHeap([0])).toBe(true);
  expect(validMaxHeap([1, 0])).toBe(true);
});


