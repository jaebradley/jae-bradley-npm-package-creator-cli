#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';

program.version(pkg.version)
  .description('Creates starting npm package structure using base template I like')
  .command('create', 'Create an npm package')
  .parse(process.argv);
