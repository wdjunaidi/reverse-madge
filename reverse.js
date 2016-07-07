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
      reverse,
      destructure,
      stringify,
      console.log)(data);
  });
}

function propToObject(obj, key) {
  return {
    target: key,
    dependents: obj[key],
    size: obj[key].length
  };
}

function destructure(obj) {
  let keys = R.keys(obj);
  let propFromX = R.curry(propToObject)(obj);
  return R.map(propFromX, keys);
}

function reverse(data) {
  let keys = R.keys(data);

  return R.reduce((acc, key) => {
    let dependencies = data[key];
    if (dependencies && dependencies.length > 0) {
      R.forEach((dependency) => {
        acc[dependency] = acc[dependency] || [];
        acc[dependency].push(key);
      }, dependencies);
    }
    return acc;
  }, {}, keys);

}
