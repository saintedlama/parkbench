const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');

module.exports = function parkbench(name, options) {
  const suite = new Benchmark.Suite(name, options);

  return {
    add(name, test) {
      if (test.length == 1) {
        suite.add(name, {
          defer: true,
          fn: function(deferred) {
            test((err) => {
              if (err) { deferred.resolve(); }
              else { deferred.resolve(); }
            });
          }
        });
      } else {
        suite.add(name, test);
      }

      return this;
    },

    on(event, handler) {
      suite.on(event, handler);
      return this;
    },

    run(options, done) {
      if (typeof options == 'function') {
        done = options;
        options = undefined;
      }

      // replace beautify-benchmark cause it is stateful -> Running a couple of benchmarks in parallel would fail!
      suite
        .on('cycle', event => benchmarks.add(event.target))
        .on('complete', result => {
          benchmarks.log();
          benchmarks.reset();

          if (done) {
            done(null, result);
          }
        })
        .run(options);
    }
  }
};
