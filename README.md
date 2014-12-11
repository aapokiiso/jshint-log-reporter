##jshint-log-reporter

This JSHint reporter is intended for logging errors into logfiles instead of
command line output. It's especially useful when linting big projects for
the first time, as you might tens or even hundreds of warnings and notices.

Here's an example output:

```
public\js\configure.js

	[W098] line 40, column 12:
		Error: 'require' is defined but never used.
		Code block: "var require = {"


public\js\utilities\color.js

	[W033] line 96, column 3:
		Error: Missing semicolon.
		Code block: "})"

	[W098] line 7, column 10:
		Error: '$' is defined but never used.
		Code block: "	var $ = require('jquery');"
```

### Installation

To use `jshint-log-reporter`, you have to have JSHint installed on your system.

```bash
$ npm install jshint -g
```

Now you can install the reporter with the following command:

```bash
$ npm install jshint-log-reporter --save-dev
```

### Usage

Here's a simple example implementation with [Grunt](http://gruntjs.com).

```javascript
grunt.initConfig({
	jshint: {
		options: {
			reporter: require('jshint-log-reporter'),
			reporterOutput: 'path_to_an_output_file.log'
		},
		files: {
			src: ["public/js/**/*.js"]
		}
	}
}
```

This task executes JSHint on the given files
(files matching `["public/js/**/*.js"]`) and runs them through
`jshint-log-reporter`, which returns the formatted error messages.
These error messages will then be written inside
`path_to_an_output_file.log`.

### Testing

To run the tests you have to have [Nodeunit](https://github.com/caolan/nodeunit)
installed on your system.

```bash
$ npm install nodeunit -g
```

Execute `nodeunit test/index.js` on the command line to run the tests.
