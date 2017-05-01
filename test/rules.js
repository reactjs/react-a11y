import React from 'react';
import ReactDOM from 'react-dom';
import path from 'path';

import rules from '../src/rules';
import testRules from '../src/util/test-rules';

// const ctx = require.context('../src/rules', true, /\.js$/)

testRules({
    React,
    ReactDOM,
    ruleDir: path.resolve(__dirname, '..', 'src', 'rules'),
    rules
});

