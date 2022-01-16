
// Using generators, we can accomplish our async JS goal of
// not having long tasks clog the synchronous thread
const createFlowAsyncGenerator_success = "\
starting `async-generator` block\
(1st - `async-generator` block) regular sync code\
(2nd - createFlowAsyncGenerator) starting slow task\
(3rd - `async-generator` block) more regular sync code\
(4th - `async-generator` block – triggerDataProcessing) promise resolved. passing value back to generator.\
(5th - createFlowAsyncGenerator) received data from yield. initiating processData(data)\
(last) processing data, i.e. updating dom, changing colors, swapping routes, etc. data received: Success: Payload 'hi'. Processing time: 3000 ms. Caller: createFlowAsyncGenerator\
";
const createFlowAsyncGenerator_err = "\
starting `async-generator` block\
(1st - `async-generator` block) regular sync code\
(2nd - createFlowAsyncGenerator) starting slow task\
(3rd - `async-generator` block) more regular sync code\
(4th - `async-generator` block – handleError) promise rejected. received error: Error: server is down. Processing time: 3000 ms.\
";

// Async - await syntax builds on this generator philosophy with a cleaner API

// Improvement: catch block means we don't crash the program on promise rejections
// Rules:
  // 1. NOT OK to do work concurrently (DONT do task_1 until task_0 has RESOLVED successfully)
  // 2. If ANY rejection, stop processing and throw an error to the catch block
// Use case 1:
  // The task_1 request REQUIRES the result of task_0 in order to execute
    // Example:
      // task_0 exchanges the current user id and for the user's favorite artist
      // task_1 exchanges an artist id for the artist's top album
// Use case 2:
  // The task_1 request may WASTE resources
    // Example:
      // Let's say these tasks are calls to an analytics API
      // task_1 does not require the result of task_0, per se.
      // However, if task_0 fails, task_1 is also likely to fail.
      // This is especially true if the runtime context is driving task_0's failure:
        // slow internet, low battery, low memory, backend service outages
// Note:
  // Sometimes `processData(task_0_payload)` makes more sense immediately after task_0 resolves, before kicking off task_1
  // Example scenarios
    // (A) we still want to process task_0_payload even if task_1 is unsuccessful
    // (B) task_0_payload contains enough data to populate a limited UI while task_1 works in the background to fetch the details

const createFlowAsyncOneAtATime_success = "\
starting `async-one-at-a-time` block\
(1st – `async-one-at-a-time` block) regular sync code\
(2nd – createFlowAsyncOneAtATime) starting slow tasks\
(3rd – `async-one-at-a-time` block) more regular sync code\
(4th – createFlowAsyncOneAtATime) task_0 promise resolved.\
(5th – createFlowAsyncOneAtATime) BOTH promises resolved. initiating processData calls\
(last) processing data, i.e. updating dom, changing colors, swapping routes, etc. data received: Success: Payload 'task_0_payload'. Processing time: 4000 ms. Caller: createFlowAsyncOneAtATime\
(last) processing data, i.e. updating dom, changing colors, swapping routes, etc. data received: Success: Payload 'task_1_payload'. Processing time: 2000 ms. Caller: createFlowAsyncOneAtATime\
(finally – createFlowAsyncOneAtATime) Approx runtime: 6009\
";
const createFlowAsyncOneAtATime_err = "\
starting `async-one-at-a-time` block\
(1st – `async-one-at-a-time` block) regular sync code\
(2nd – createFlowAsyncOneAtATime) starting slow tasks\
(3rd – `async-one-at-a-time` block) more regular sync code\
(createFlowAsyncOneAtATime) received error: Error: server is down. Processing time: 4000 ms.\
(finally – createFlowAsyncOneAtATime) Approx runtime: 4006\
";

// Improvement: does the slow tasks concurrently instead of one at a time.
// Rules:
  // 1. OK to do work concurrently
  // 2. ONLY process data after ALL tasks RESOLVE
  // 3. If ANY rejection, don't process any data. Instead throw an error to the catch block
// Note:
  // all() means you only resolve if all promises resolve

// Use case 1:
  // BOTH task_0 and task_1 need to resolve before the program continues, and
  // the task_1 request does NOT REQUIRE the result of task_0 in order to execute
    // Example:
      // task_0 exchanges the current user id and for the user's favorite artist
      // task_1 exchanges the current user id for the the user's favorite genre
      // Both data points are required to make a recommended song prediction

// Observe:
  // createFlowAsyncConcurrent success case run time: 4001 ms
  // createFlowAsyncOneAtATime success case run time: 6009 ms
const createFlowAsyncConcurrent_success = "\
starting `async-concurrent` block\
(1st – `async-concurrent` block) regular sync code\
(2nd – createFlowAsyncConcurrent) starting slow tasks\
(3rd – `async-concurrent` block) more regular sync code\
(4th – createFlowAsyncConcurrent) BOTH promises resolved. initiating processData calls\
(last) processing data, i.e. updating dom, changing colors, swapping routes, etc. data received: Success: Payload 'task_0_payload'. Processing time: 4000 ms. Caller: createFlowAsyncConcurrent\
(last) processing data, i.e. updating dom, changing colors, swapping routes, etc. data received: Success: Payload 'task_1_payload'. Processing time: 2000 ms. Caller: createFlowAsyncConcurrent\
(finally createFlowAsyncConcurrent) Approx runtime: 4001\
";
const createFlowAsyncConcurrent_err = "\
starting `async-concurrent` block\
(1st – `async-concurrent` block) regular sync code\
(2nd – createFlowAsyncConcurrent) starting slow tasks\
(3rd – `async-concurrent` block) more regular sync code\
(createFlowAsyncConcurrent) received error: Error: server is down. Processing time: 2000 ms.\
(finally createFlowAsyncConcurrent) Approx runtime: 2010\
";

// Improvement: processes data as soon as work is done
// Rules:
  // 1. OK to do work concurrently
  // 2. OK to process data as soon as after work is done,
  // 3. OK to simply ignore rejections
// Strategy:
  // Pass processing logic as a callback to run immediately after task completes.
  // Cleanest with curryN
// Note:
  // allSettled() means resolve once all promises resolve or reject (you don't care which)

// Use case 1:
  // task_0 and task_1 are completely independent
  // task_0 and task_1 have the same priority level
    // Example:
      // task_0 fetches an album cover for album #1
        // Once I receive the jpeg, I replace album #1's placeholder shimmer box with it
      // task_0 fetches an album cover for album #2
        // Once I receive the jpeg, I replace album #2's placeholder shimmer box with it

// Observe:
  // createFlowAsyncConcurrentWithImmediateProcessing first to process: task_1 after 2000 ms
  // createFlowAsyncConcurrent first to process: task_0 after 4001 ms
const createFlowAsyncConcurrentWithImmediateProcessing_double_success = "\
starting `async-concurrent-with-immediate-processing` block\
(1st – `async-concurrent-with-immediate-processing` block) regular sync code\
(2nd – createFlowAsyncConcurrentWithImmediateProcessing) starting slow tasks\
(3rd – `async-concurrent-with-immediate-processing` block) more regular sync code\
(last) processing data, i.e. updating dom, changing colors, swapping routes, etc. data received: Success: Payload 'task_1_payload'. Processing time: 2000 ms. Caller: createFlowAsyncConcurrentWithImmediateProcessing\
(last) processing data, i.e. updating dom, changing colors, swapping routes, etc. data received: Success: Payload 'task_0_payload'. Processing time: 4000 ms. Caller: createFlowAsyncConcurrentWithImmediateProcessing\
(dead last – createFlowAsyncConcurrentWithImmediateProcessing) ALL promises resolved or rejected.\
(finally createFlowAsyncConcurrentWithImmediateProcessing) Approx runtime: 4006\
";

// Observe:
  // createFlowAsyncConcurrentWithImmediateProcessing: rejections do not stop resolved tasks from processing
  // createFlowAsyncConcurrent: a single rejection prevents all tasks from processing
const createFlowAsyncConcurrentWithImmediateProcessing_single_success = "\
starting `async-concurrent-with-immediate-processing` block\
(1st – `async-concurrent-with-immediate-processing` block) regular sync code\
(2nd – createFlowAsyncConcurrentWithImmediateProcessing) starting slow tasks\
(3rd – `async-concurrent-with-immediate-processing` block) more regular sync code\
(last) processing data, i.e. updating dom, changing colors, swapping routes, etc. data received: Success: Payload 'task_0_payload'. Processing time: 4000 ms. Caller: createFlowAsyncConcurrentWithImmediateProcessing\
(dead last – createFlowAsyncConcurrentWithImmediateProcessing) ALL promises resolved or rejected.\
(finally createFlowAsyncConcurrentWithImmediateProcessing) Approx runtime: 4007\
";

