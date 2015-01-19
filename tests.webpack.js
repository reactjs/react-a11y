var context = require.context('./lib', true, /-test\.js$/);
context.keys().forEach(context);
