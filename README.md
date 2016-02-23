# parkbench
![Logo](https://raw.github.com/saintedlama/parkbench/master/assets/logo.svg)

Simplified benchmarks module built on top of benchmark.js (https://benchmarkjs.com/)

## Installation

    > npm i parkbench --save

## Usage

parkbench exposes a simplified benchmark interface to benchmark.js

**benchmark.js**

```js
var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
.add('String#match', function() {
  !!'Hello World!'.match(/o/);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });
```

**parkbench**

```js
var f = parkbench()
  .add('RegExp#test', function() {
    /o/.test('Hello World!');
  })
  .add('String#indexOf', function() {
    'Hello World!'.indexOf('o') > -1;
  })
  .add('String#match', function() {
    !!'Hello World!'.match(/o/);
  })
  .run({ 'async': false });
```

### Simplified Async

Benchmarking async functionality in benchmark.js can get a bit weird

**benchmark.js**

```js
var bench = new Benchmark('async', {
    defer: true,
    fn: function(deferred) {
      fs.readFile(__filename, { encoding: 'utf-8'}, function(err) {
        deferred.resolve();
      });
    }
  })
  .run();
```

**parkbench**

With parkbench you can pass a function with a single callback argument. Done!

```js
parkbench('async')
  .add('RegExp#test', function(next) {
    fs.readFile(__filename, { encoding: 'utf-8'}, next);
  })
  .run(done);
```

## API

**parkbench([name], [options])**
Creates a new parkbench benchmark suite

**suite.add([name], functionOrObject)**
Add a benchmark to the benchmark suite

**suite.run([options], [callback])**
Run the benchmark suite and print result to console.log
