function res() {
  return Promise.resolve();
}
function rej() {
  return Promise.reject();
}
function handleRes() {
  console.log('resolved');
}
function handleRej() {
  console.log('rejected');
}
const res_obj = res();
res_obj.then(handleRes, handleRej); // logs 'resolved'
const rej_obj = rej();
rej_obj.then(handleRes, handleRej); // logs 'rejected'
