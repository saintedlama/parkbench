const fs = require('fs');
const parkbench = require('../');

describe('parkbench', function() {
  this.timeout(50000);

  it('should expose a simplified benchmark interface', function() {
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
  });

  it('should expose a nicer async interface', function(done) {
    parkbench('async')
      .add('RegExp#test', function(next) {
        fs.readFile(__filename, { encoding: 'utf-8'}, next);
      })
      .run(done);
  });
});
