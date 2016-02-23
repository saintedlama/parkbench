'use strict';

const glob = require('glob');
const exists = require('fs').existsSync || require('path').existsSync;
const basename = require('path').basename;
const readdirSync = require('fs').readdirSync;
const statSync = require('fs').statSync;
const watchFile = require('fs').watchFile;
const join = require('path').join;

/**
 * Lookup file names at the given `path`.
 *
 * @api public
 * @param {string} path Base path to start searching from.
 * @param {string[]} extensions File extensions to look for.
 * @param {boolean} recursive Whether or not to recurse into subdirectories.
 * @return {string[]} An array of paths.
 */
module.exports = function lookupFiles(path, extensions, recursive) {
  var files = [];
  var re = new RegExp('\\.(' + extensions.join('|') + ')$');

  if (!exists(path)) {
    if (exists(path + '.js')) {
      path += '.js';
    } else {
      files = glob.sync(path);
      if (!files.length) {
        throw new Error("cannot resolve path (or pattern) '" + path + "'");
      }
      return files;
    }
  }

  try {
    var stat = statSync(path);
    if (stat.isFile()) {
      return path;
    }
  } catch (err) {
    // ignore error
    return;
  }

  readdirSync(path).forEach(function(file) {
    file = join(path, file);
    try {
      var stat = statSync(file);
      if (stat.isDirectory()) {
        if (recursive) {
          files = files.concat(lookupFiles(file, extensions, recursive));
        }
        return;
      }
    } catch (err) {
      // ignore error
      return;
    }
    if (!stat.isFile() || !re.test(file) || basename(file)[0] === '.') {
      return;
    }
    files.push(file);
  });

  return files;
};