'use strict';

function *createFlow() {
  yield 4; // yielding "intermediate returns"
  yield 5;
  yield 6;
}

function *createFlowDynamic() {
  const num = 10;
  const newNum = yield num;
  yield 5 + newNum;
  yield 6;
}

function simulateLoad(ms, payload = 'hi', forceResolve = false, onComplete = null) {
  return new Promise(function (resolve, reject) {
    setTimeout(
      () => {
        let value = `Success: Payload '${payload}'. Processing time: ${ms} ms.`;
        if (forceResolve) {
          if (onComplete) {
            onComplete(value);
            resolve();
          }
          resolve(value);
        } else {
          const coins = ['heads', 'tails'];
          const coin = coins[Math.floor(Math.random() * 2)];
          if (coin === 'heads') {
            if (onComplete) {
              onComplete(value);
              resolve();
            }
            resolve(value);
          } else {
            value = `Error: server is down. Processing time: ${ms} ms.`;
            reject(value);
          }
        }
      },
      ms,
    );
  });
}
function processData(data, caller) {
  console.log(
    '(last) processing data, i.e. updating dom, changing colors, swapping routes, etc. data received:',
    data,
    'Caller:',
    caller
  );
}
function getRunTime(start_time) {
  return Date.now() - start_time;
}
function *createFlowAsyncGenerator() {
  console.log('(2nd - createFlowAsyncGenerator) starting slow task');
  const data = yield simulateLoad(3000);
  console.log('(5th - createFlowAsyncGenerator) received data from yield. initiating processData(data)');
  processData(data, 'createFlowAsyncGenerator');
}
async function createFlowAsyncOneAtATime(start_time) {
  try {
    console.log('(2nd – createFlowAsyncOneAtATime) starting slow tasks');
    const task_0_payload = await simulateLoad(4000, 'task_0_payload', false); // might reject
    console.log('(4th – createFlowAsyncOneAtATime) task_0 promise resolved.');
    const task_1_payload = await simulateLoad(2000, 'task_1_payload', true); // forced to resolve
    console.log('(5th – createFlowAsyncOneAtATime) BOTH promises resolved. initiating processData calls');
    processData(task_0_payload, 'createFlowAsyncOneAtATime');
    processData(task_1_payload, 'createFlowAsyncOneAtATime');
  }
  catch (e) {
    console.error('(createFlowAsyncOneAtATime) received error:', e);
  }
  finally {
    console.log('(finally – createFlowAsyncOneAtATime) Approx runtime:', getRunTime(start_time));
  }
}
async function createFlowAsyncConcurrent(start_time) {
  try {
    console.log('(2nd – createFlowAsyncConcurrent) starting slow tasks');
    const task_0 = simulateLoad(4000, 'task_0_payload', true); // forced to resolve
    const task_1 = simulateLoad(2000, 'task_1_payload', false); // might reject
    const [task_0_payload, task_1_payload] = await Promise.all([task_0, task_1]);
    console.log('(4th – createFlowAsyncConcurrent) BOTH promises resolved. initiating processData calls');
    processData(task_0_payload, 'createFlowAsyncConcurrent');
    processData(task_1_payload, 'createFlowAsyncConcurrent');
  }
  catch (e) {
    console.error('(createFlowAsyncConcurrent) received error:', e);
  }
  finally {
    console.log('(finally createFlowAsyncConcurrent) Approx runtime:', getRunTime(start_time));
  }
}

async function createFlowAsyncConcurrentWithImmediateProcessing(start_time) {
  try {
    console.log('(2nd – createFlowAsyncConcurrentWithImmediateProcessing) starting slow tasks');
    const task_0 = simulateLoad(4000, 'task_0_payload', true, _onComplete); // forced to resolve
    const task_1 = simulateLoad(2000, 'task_1_payload', false, _onComplete); // might reject
    await Promise.allSettled([task_0, task_1]);
    console.log('(dead last – createFlowAsyncConcurrentWithImmediateProcessing) ALL promises resolved or rejected.');
    function _onComplete(v) {
      processData(v, 'createFlowAsyncConcurrentWithImmediateProcessing');
    }
  }
  catch (e) {
    console.error('(createFlowAsyncConcurrentWithImmediateProcessing) received unanticipated error:', e);
  }
  finally {
    console.log('(finally createFlowAsyncConcurrentWithImmediateProcessing) Approx runtime:', getRunTime(start_time));
  }
}

module.exports.createFlow = createFlow;
module.exports.createFlowDynamic = createFlowDynamic;
module.exports.createFlowAsyncGenerator = createFlowAsyncGenerator;
module.exports.createFlowAsyncOneAtATime = createFlowAsyncOneAtATime;
module.exports.createFlowAsyncConcurrent = createFlowAsyncConcurrent;
module.exports.createFlowAsyncConcurrentWithImmediateProcessing = createFlowAsyncConcurrentWithImmediateProcessing;

