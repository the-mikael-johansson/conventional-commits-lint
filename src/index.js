#!/usr/bin/env node

const { exec } = require('child_process');
const { executeCallback } = require('./validator');

exec('git log -1 --pretty=%B', executeCallback);
