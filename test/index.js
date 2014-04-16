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
var reporter = require('../index');

/* ----------- */
/*    Tests    */
/* ----------- */

/**
*	Make sure empty input return empty response.
*/

exports.noErrors = {
	value_undefined: function(test){
		test.equal(reporter.reporter(undefined), "");
		test.done();
	},
	undefined_value: function(test){
		test.equal(reporter.reporter(), "");
		test.done();
	},
	empty_value: function(test){
		test.equal(reporter.reporter(""), "");
		test.done();
	},
	empty_array: function(test){
		test.equal(reporter.reporter([]), "");
		test.done();
	},
	empty_object: function(test){
		test.equal(reporter.reporter({}), "");
		test.done();
	}
};

/**
*	Test with insufficient error data.
*/

exports.malformedErrors = {
	missing_error_data: function(test){
		test.equal(reporter.reporter([{file: "testfile.js"}]), "");
		test.done();
	},
	missing_file: function(test){
		test.equal(reporter.reporter([{error: { line: 12, character: 36, reason: "Testing", evidence: "undefined", code: "TEST" }}]), "(unknown file)\n\n\tline 12, column 36:\n\t\tError: Testing\n\t\tProblem: undefined\n\t\tCode: TEST\n\n\n\n\n");
		test.done();
	},
	missing_some_error_values: function(test){
		test.equal(reporter.reporter([{error: { reason: "Testing", evidence: "undefined", code: "TEST" }}]), "(unknown file)\n\n\tline (unknown line), column (unknown column):\n\t\tError: Testing\n\t\tProblem: undefined\n\t\tCode: TEST\n\n\n\n\n");
		test.done();
	},
	missing_all_error_values: function(test){
		test.equal(reporter.reporter([{error: {}}]), "(unknown file)\n\n\tline (unknown line), column (unknown column):\n\t\tError: (unknown error)\n\t\tProblem: (unknown problem)\n\t\tCode: (unknown code)\n\n\n\n\n");
		test.done();
	},
	error_data_is_array: function(test){
		test.equal(reporter.reporter([{file: "testfile.js", error: ["testing", "some", "code"]}]), "testfile.js\n\n\tline (unknown line), column (unknown column):\n\t\tError: (unknown error)\n\t\tProblem: (unknown problem)\n\t\tCode: (unknown code)\n\n\n\n\n");
		test.done();
	},
};
