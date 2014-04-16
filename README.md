jshint-log-reporter
===================

JSHint reporter which saves formatted errors into a log file. 

## Install

To use this reporter, you have to have JSHint installed.

```bash
$ npm install jshint -g
```

Install the reporter with the following command.

```bash
$ npm install jshint-log-reporter --save-dev
```

## Use

Here's a simple example implementation with [Grunt](http://gruntjs.com).

```javascript
jshint: {
	options: {
		reporter: require('jshint-log-reporter'),
		reporterOutput: 'jshint.log'
	},
	files: {
		src: ["public/js/**/*.js"]
	}
}
```

This task executes JSHint on the given files (files matching `["public/js/**/*.js"]`) and runs them through `jshint-log-reporter`, which returns the formatted error messages. These error messages will then be written inside `jshint.log`.

## Test

To run the tests you have to have [Nodeunit](https://github.com/caolan/nodeunit) installed (globally). 

```bash
$ npm install nodeunit -g
```

Now simply execute `nodeunit test/index.js` on the command line to run the tests.
