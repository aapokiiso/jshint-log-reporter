jshint-log-reporter
===================

JSHint reporter which saves formatted errors into a log file. 

## Installation

To use `jshint-log-reporter`, you have to have JSHint installed on your system.

```bash
$ npm install jshint -g
```

Now you can install the reporter with the following command:

```bash
$ npm install jshint-log-reporter --save-dev
```

## Usage

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

## Testing

To run the tests you have to have [Nodeunit](https://github.com/caolan/nodeunit) installed on your system. 

```bash
$ npm install nodeunit -g
```

Execute `nodeunit test/index.js` on the command line to run the tests.
