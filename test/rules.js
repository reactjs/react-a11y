import React from 'react';
import ReactDOM from 'react-dom';

import rules from '../src/rules';
import testRules from '../src/util/test-rules';


testRules({
    React,
    ReactDOM,
    rules
});

