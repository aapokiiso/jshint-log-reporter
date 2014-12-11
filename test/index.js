/* ----------------------------------- */
/*    ~ JSHint error logger tests ~    */
/* ----------------------------------- */

/**
*	Tests make sure everything is working as expected.
*/

/* ------------------ */
/*    Dependencies    */
/* ------------------ */

var nodeunit = require('nodeunit');
var reporter = require('../lib/reporter');

/* ----------- */
/*    Tests    */
/* ----------- */

/**
 *  Miscellanneous tests.
 */

exports.miscellaneous = {
  not_testing: function(test) {
    test.equal(reporter.reporter(undefined, false), undefined);
    test.done();
  }
};

/**
*   Make sure empty input return empty response.
*/

exports.noErrors = {
	value_undefined: function(test){
		test.equal(reporter.reporter(undefined, true), 'JSHint found no errors in your code.');
		test.done();
	},
	undefined_value: function(test){
		test.equal(reporter.reporter(null, true), 'JSHint found no errors in your code.');
		test.done();
	},
	empty_value: function(test){
		test.equal(reporter.reporter('', true), 'JSHint found no errors in your code.');
		test.done();
	},
	empty_array: function(test){
		test.equal(reporter.reporter([], true), 'JSHint found no errors in your code.');
		test.done();
	},
	empty_object: function(test){
		test.equal(reporter.reporter({}, true), 'JSHint found no errors in your code.');
		test.done();
	}
};

/**
*	  Test with insufficient error data.
*/

exports.malformedErrors = {
	missing_error_data: function(test){
		test.equal(reporter.reporter([{file: 'testfile.js'}], true), 'JSHint found no errors in your code.');
		test.done();
	},
	missing_file: function(test){
		test.equal(reporter.reporter([{
      error: {
        line: 12,
        character: 36,
        reason: 'Testing',
        evidence: 'undefined',
        code: 'TEST'
      }
    }], true), 'JSHint found a total of 1 errors in 1 file.\n\n(unknown file)\n\n  [TEST] line 12, column 36:\n    Error: Testing\n    Code block: "undefined"');
		test.done();
	},
	missing_some_error_values: function(test){
		test.equal(reporter.reporter([{
      error: {
        reason: 'Testing',
        evidence: 'undefined',
        code: 'TEST'
      }
    }], true), 'JSHint found a total of 1 errors in 1 file.\n\n(unknown file)\n\n  [TEST] line (unknown line), column (unknown column):\n    Error: Testing\n    Code block: "undefined"');
		test.done();
	},
	missing_all_error_values: function(test){
		test.equal(reporter.reporter([{
      error: {

      }
    }], true), 'JSHint found a total of 1 errors in 1 file.\n\n(unknown file)\n\n  [(unknown error code)] line (unknown line), column (unknown column):\n    Error: (unknown error)\n    Code block: "(unknown problem)"');
		test.done();
	},
	error_data_is_array: function(test){
		test.equal(reporter.reporter([{
      file: 'testfile.js',
      error: ['testing', 'some', 'code']
    }], true), 'JSHint found no errors in your code.');
		test.done();
	},
};
