const fs  = require('fs');
const R = require('ramda');

let stringify = R.curry(JSON.stringify)(R.__, null, 2);

if (process.argv[2]) {
  fs.readFile(process.argv[2], 'utf-8', (err, data) => {
    if (err) {
      return console.error(err);
    }
    R.pipe(
      JSON.parse, 
      summarize, 
      stringify,
      console.log
    )(data);
  });
}

function summarize(data) {
  let sortBySize = R.sortBy(R.compose(R.negate, R.prop('size')));
  return sortBySize(data);
}
