'use strict';

const {
  createFlowAsyncGenerator,
  createFlowAsyncOneAtATime,
  createFlowAsyncConcurrent,
  createFlowAsyncConcurrentWithImmediateProcessing,
} = require('./index');

const valid_styles = [
  // 'async-generator',
  // 'async-one-at-a-time',
  // 'async-concurrent',
  'async-concurrent-with-immediate-processing',
];
for (const valid_style of valid_styles) {
  if (valid_style === 'async-generator') {
    console.log('starting `async-generator` block');
    console.log('(1st - `async-generator` block) regular sync code');
    function triggerDataProcessing(value) {
      console.log('(4th - `async-generator` block – triggerDataProcessing) promise resolved. passing value back to generator.');
      flowAsyncGen.next(value);
    }
    function handleError(value) {
      console.error('(4th - `async-generator` block – handleError) promise rejected. received error:', value);
    }
    const flowAsyncGen = createFlowAsyncGenerator();
    const server_data = flowAsyncGen.next();
    server_data.value.then(triggerDataProcessing).catch(handleError);
    console.log('(3rd - `async-generator` block) more regular sync code');
  }
  if (valid_style === 'async-one-at-a-time') {
    console.log('starting `async-one-at-a-time` block');
    console.log('(1st – `async-one-at-a-time` block) regular sync code');
    createFlowAsyncOneAtATime(Date.now());
    console.log('(3rd – `async-one-at-a-time` block) more regular sync code');
  }
  if (valid_style === 'async-concurrent') {
    console.log('starting `async-concurrent` block');
    console.log('(1st – `async-concurrent` block) regular sync code');
    createFlowAsyncConcurrent(Date.now());
    console.log('(3rd – `async-concurrent` block) more regular sync code');
  }
  if (valid_style === 'async-concurrent-with-immediate-processing') {
    console.log('starting `async-concurrent-with-immediate-processing` block');
    console.log('(1st – `async-concurrent-with-immediate-processing` block) regular sync code');
    createFlowAsyncConcurrentWithImmediateProcessing(Date.now());
    console.log('(3rd – `async-concurrent-with-immediate-processing` block) more regular sync code');
  }
}
