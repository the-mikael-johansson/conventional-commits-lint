#!/usr/bin/env node

const { exec } = require('child_process');
const { executeCallback, validate } = require('./validator');
const { program } = require('commander');

program
  .option('-s, --subject <value>', 'Commit subject to check')
  .parse(process.argv);

const { subject } = program.opts();

if (!subject) {
  exec('git log -1 --pretty=%B', executeCallback);
}
else {
  validate(subject);
}