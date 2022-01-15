'use strict';

function res() {
  return Promise.resolve();
}
function rej() {
  return Promise.reject();
}
function handleRes() {
  console.log('resolved me first');
}
function handleRej() {
  console.log('rejected me second');
}
const res_obj = res();
res_obj.then(handleRes, handleRej);
const rej_obj = rej();
rej_obj.then(handleRes, handleRej);
