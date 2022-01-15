'use strict';

// Iterators
// Assume the arrays are of only numbers
// Assume set includes only numbers and letters

// Allow us to abstract the details of data access and focus on data processing
// Turn our data into "streams"

// Their job when called is to
  // remember the index of the next element up for processing
  // if in bounds:
    // return the element
    // prep for their next call by incrementing the index
  // else:
    // return nothing

// Iterators rely on javascript closures
// JS is a lexically or statically scoped language
// i.e. location / positioning of definition determines what data I have available

// closure
// closed over variable environment: cove
// `array` and `i` are persistent, lexically scoped- referenced data

function createIterator(array) {
  let i = 0;
  return function () {
    return i < array.length
      ? array[i++]
      : undefined;
  };
}

function createIteratorNext(array) {
  const i = createIterator(array);
  return {
    next() {
      return i();
    }
  };
}

function createIteratorSet(set) {
  return createIteratorNext([...set]);
}

function createIteratorIndex(array) {
  let i = 0;
  return {
    next() {
      return i < array.length
        ? [i, array[i++]]
        : [i++, undefined];
    }
  };
}

function WordsFunc(string) {
  this.str = string;
}
WordsFunc.prototype[Symbol.iterator] = function() {
  let index = 0;
  const words = this.str.split(/\s/);
  return {
    next: function () {
      const done = index > words.length - 1;
      if (done) {
        return { done };
      } else {
        const value = words[index++];
        return { value, done };
      }
    }
  }
};
class WordsClass {
  constructor(string) {
    this.str = string;
  }
}
WordsClass.prototype[Symbol.iterator] = function() {
  let index = 0;
  const words = this.str.split(/\s/);
  return {
    next: function () {
      const done = index > words.length - 1;
      if (done) {
        return { done };
      } else {
        const value = words[index++];
        return { value, done };
      }
    }
  }
};

class MaxHeap {
  constructor(heap) {
    this.heap = heap;
  }
}
MaxHeap.prototype[Symbol.iterator] = function() {
  let index = 0;
  const { heap } = this;
  return {
    next: function () {
      const done = index > heap.length - 1;
      if (done) {
        return { done };
      } else {
        const value = {
          value: heap[index],
          children: [heap[2 * index + 1], heap[2 * index + 2]],
        };
        index++;
        return { value, done };
      }
    }
  }
};

function validMaxHeap(array, verbose = false) {
  const max_heap = new MaxHeap(array);
  const nodes = [];
  for (const node of max_heap) {
    if (invalidNode(node)) {
      return { invalid_node: node };
    }
    nodes.push(node);
  }
  if (verbose) {
    console.log('valid max heap', JSON.stringify(nodes, null, '\t'));
  }
  return true;
  
  function invalidNode(node) {
    const { value, children } = node;
    return children[0] > value || children[1] > value;
  }
}

module.exports.createIterator = createIterator;
module.exports.createIteratorNext = createIteratorNext;
module.exports.createIteratorSet = createIteratorSet;
module.exports.createIteratorIndex = createIteratorIndex;
module.exports.WordsFunc = WordsFunc;
module.exports.WordsClass = WordsClass;
module.exports.validMaxHeap = validMaxHeap;


// This max heap logic has
// 5 different ways to write it
// `nots` vs. `ors` vs. `ands`
// `>` vs `>=` 
// explicitly checking for `undefined`
// etc.
// Therefore it's easy to make bugs

// Strategy:
// Separate the heuristic structure from the heuristic details using function stubs
// function invalidNodeOG(node) {
//   const { value, children } = node;
//   return childIsGreater(children[0]) || childIsGreater(children[1])
//   function childIsGreater(child) {
//     return child > value; // handles undefined and equals in one line!
//   }
// }
// After some iterations it will be clear which is the simplest because
// The best version takes advantage of JS rules
  // truthy rules 
  // boolean expression rules between nums and non-numbers (always false)
