#!/usr/bin/env node
'use strict';


// TODO: WIP
const argv = require('yargs').argv;

const lookupFiles = require('./lib/lookup-files');

// if no path given take benchmark
let pattern = 'benchmark';
if (argv._.length > 0) {
  pattern = argv._[0];
}

const files = lookupFiles(pattern, ['js'], argv.recursive);

global.suite = function(name, fn) {

}

global.benchmark = function(name, fn) {
  
}

// Require all files
files.map(f => require(f));