# parkbench
<img src='data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="56.88" width="79.43" version="1.1" viewBox="0 0 281.43 201.54"><g fill-rule="evenodd" transform="translate(-86.429 -39.121)"><rect rx="7" ry="7" height="17.14" width="248.57" y="111.42" x="98.96"/><rect rx="7" ry="7" height="17.14" width="248.57" y="81.11" x="98.96"/><rect rx="7" ry="7" height="17.14" width="248.57" y="50.81" x="98.96"/><path d="m306.53 39.12c-3.88 0-7 3.12-7 7v94.39h17.14v-94.38c0-3.88-3.12-7-7-7h-3.14zm-7 112.67v61.22c0 3.88 3.12 7 7 7h3.14c3.88 0 7-3.12 7-7v-61.22h-17.14zM140.86 39.12c-3.88 0-7 3.12-7 7v94.39h17.15v-94.38c0-3.88-3.12-7-7-7h-3.14zm-7 112.67v61.22c0 3.88 3.12 7 7 7h3.14c3.88 0 7-3.12 7-7v-61.22h-17.14z"/><rect rx="7.93" ry="10.94" height="26.8" width="281.43" y="150.36" x="86.43"/><rect ry="7" rx="6.27" transform="rotate(90)" height="17.14" width="86.5" y="-121.43" x="154.16"/><rect ry="7" rx="6.34" transform="rotate(90)" height="17.14" width="87.51" y="-347.14" x="153.15"/></g></svg>' alt="Parkbench Logo"/>


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
