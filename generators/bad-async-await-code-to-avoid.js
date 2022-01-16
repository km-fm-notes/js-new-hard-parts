'use strict';

// BAD BAD BAD
// If ANY promise rejects, JS throws an UnhandledPromiseRejection exception
async function exceptionCausedByMissingTryCatch() {
  console.log('(2nd - exceptionCausedByMissingTryCatch) starting slow tasks');
  const data_0 = await simulateLoad(4000, 'data_0 payload');
  const data_1 = await simulateLoad(2000, 'data_1 payload', true);
  console.log('(4th - exceptionCausedByMissingTryCatch) both promises resolved. initiating processData calls');
  processData(data_0, 'exceptionCausedByMissingTryCatch');
  processData(data_1, 'exceptionCausedByMissingTryCatch');
}

// BAD BAD BAD
// This is NOT how try-catch works
// If task_1 rejects, JS throws an UnhandledPromiseRejection exception
// ALSO BAD BAD BAD:
  // const task_0_payload = await task_0;
  // const task_1_payload = await task_1;
async function exceptionCausedByTwoAwaitCalls() {
  try {
    console.log('(2nd – exceptionCausedByTwoAwaitCalls) starting slow tasks');
    const task_0 = simulateLoad(4000, 'data_0 payload', true, _onComplete); // forced to resolve
    const task_1 = simulateLoad(2000, 'data_1 payload', false, _onComplete); // might reject
    await task_0;
    await task_1;
    console.log('(dead last – exceptionCausedByTwoAwaitCalls) BOTH promises resolved. BOTH processing functions complete.');
    function _onComplete(v) {
      processData(v, 'exceptionCausedByTwoAwaitCalls');
    }
  }
  catch (e) {
    console.error('(4th – exceptionCausedByTwoAwaitCalls) received error:', e);
  }
}


// BAD BAD BAD
// This is NOT how try-catch works
// If task_1 rejects, JS throws an UnhandledPromiseRejection exception
async function exceptionCausedByNestedTryCatch() {
  console.log('(2nd – exceptionCausedByNestedTryCatch) starting slow tasks');
  const task_0 = simulateLoad(4000, 'data_0 payload', true, _onComplete); // forced to resolve
  const task_1 = simulateLoad(2000, 'data_1 payload', false, _onComplete); // might reject
  try { await task_0; }
  catch (e) { console.error('(4th – exceptionCausedByNestedTryCatch) task_0 promise rejected. received error:', e); }
  try { await task_1; }
  catch (e) { console.error('(4th – exceptionCausedByNestedTryCatch) task_1 promise rejected. received error:', e); }
  console.log('(dead last – exceptionCausedByNestedTryCatch) BOTH promises resolved. BOTH processing functions complete.');
  function _onComplete(v) {
    processData(v, 'exceptionCausedByNestedTryCatch');
  }

  // This also does NOT work
  /*
    try {
      console.log('(2nd – exceptionCausedByNestedTryCatch) starting slow tasks');
      const task_0 = simulateLoad(4000, 'data_0 payload', true, _onComplete);
      const task_1 = simulateLoad(2000, 'data_1 payload', false, _onComplete);
      await task_0;
      try { await task_1; }
      catch (e) { console.error('(4th – exceptionCausedByNestedTryCatch) inner promise rejected. received error:', e); }
      console.log('(dead last – exceptionCausedByNestedTryCatch) BOTH promises resolved. BOTH processing functions complete.');
      function _onComplete(v) {
        processData(v, 'exceptionCausedByNestedTryCatch');
      }
    }
    catch (e) {
      console.error('(4th – exceptionCausedByNestedTryCatch) outer promise rejected. received error:', e);
    }
  */
}
