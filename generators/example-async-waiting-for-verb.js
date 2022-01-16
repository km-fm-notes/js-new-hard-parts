function waitForVerb(noun) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`The ${noun} runs.`), 3000);
  });
}
async function f(noun) {
  try {
    console.log('(2nd) synchronous kickoff of async code')
    const res = await waitForVerb(noun);
    console.log('(4th, if `res` resolves):', res);
  }
  catch (e) {
    console.log('(4th, if `res` rejects):', e);
  }
}

console.log('(1st) normal async code')
f('dog');
console.log('(3rd) more normal async code')

const log = "\
(1st) normal async code\
(2nd) synchronous kickoff of async code\
(3rd) more normal async code\
(4th, after `res` is done): The dog runs.\
";