/* ----------------------------- */
/*    ~ JSHint error logger ~    */
/* ----------------------------- */

/**
*	  This module takes JSHint errors, formats them and saves them to a
*   user-defined filepath.
*/

/* ---------------------- */
/*    Helper functions    */
/* ---------------------- */

/**
* function valid_errors(Array [errors])
*   Determines if JSHint gave valid errors.
*
*   [errors]: list of errors JSHint has generated.
*/

function valid_errors(errors) {

  /**
   *  Return false if [errors] is empty or if it isn't a non-empty array.
   */

  if (! errors) {
    return false;
  } else {
    if (! (errors instanceof Array)) {
      return false;
    } else {
      if (errors.length === 0) {
        return false;
      }
    }
  }

  return true;

}

/**
*	function group_errors(Array [errors])
*		Organize errors into arrays of objects by filename.
*
*		[errors]: list of errors JSHint has generated.
*/

function group_errors(errors) {

	/**
	 *  Array of objects for error groups, initialize with object for errors of
   *  uknown origin (fallback group).
	 */

	var error_groups = [
    {
  		file: '(unknown file)',
  		errors: []
    }
  ];

	var filenames = []; // Array for already used filenames.
	var group_found = false; // Boolean for cases when error group isn't found
                           // --> fallbacks to 'unknown' group.

	/**
	 *	Loop through errors.
	 */

	for (var e = 0; e < errors.length; e++) {

		group_found = false;

		var error = errors[e];

		/**
		 *	Check if there already is a group for this file's errors.
		 */

		if (! error.file || filenames.indexOf(error.file) >= 0) {

			/**
			 *	Group already exists, now we'll loop through the error groups
       *  to find the one matching the filename.
			 */

			for (var eg in error_groups) {
				if (error_groups[eg].file === error.file) {

					/**
					 *	Filename matches, now append error to group's array of errors.
					 */

					error_groups[eg].errors.push(error.error);

					/**
					 *	Set boolean [group_found] to true to make sure error isn't
           *  added into the fallback group.
					 */

					group_found = true;

				}
			}

			/**
			 *	If group was not found, add to fallback group.
			 */

			if (group_found === false) {
				error_groups[0].errors.push(error.error);
			}

		} else {

			/**
			 *	Group doesn't exist, create it with current error if error exists.
			 */

			if (error.error && (error.error instanceof Object) && ! (error.error instanceof Array)) {

				var error_group = {
					file: error.file,
					errors: [error.error]
				};

				error_groups.push(error_group);

				/**
				 *	Add error's filename into used filenames.
				 */

				filenames.push(error.file);

			}

		}

	}

	/**
	 *	Returned organized errors, but only if there are errors.
	 */

	if (error_groups.length > 1 || (error_groups[0].errors.length > 0)) {
		return error_groups;
	}

	/**
	 *	Elsewise return empty string.
	 */

	return '';

}

/**
*	function format_errors(Object [error_group])
*		Format file's errors into a string to be more easily readable.
*
*		[error_group]: JSHint-generated errors in a single file.
*/

function format_errors(error_group) {

  /**
   *  Formatted error message, initialize with filename heading.
   */

	var file_errors = error_group.file + '\n\n';

	/**
	 *	Loop through errors.
	 */

	for (var e = 0; e < error_group.errors.length; e++) {

		var error = error_group.errors[e];

		/**
		 *	Fallback for empty values.
		 */

    if (! error.line && error.line !== 0) {
      error.line = '(unknown line)';
    }

    if (! error.character && error.character !== 0) {
      error.character = '(unknown column)';
    }

    if (! error.reason) {
      error.reason = '(unknown error)';
    }

    if (! error.evidence) {
      error.evidence = '(unknown problem)';
    }

    if (! error.code) {
      error.code = '(unknown error code)';
    }

		/**
		 *	Append formatted error to log message.
		 */

		file_errors += '  ['+error.code+'] line ' + error.line + ', column '
      + error.character + ':\n    Error: ' + error.reason
      + '\n    Code block: "' + error.evidence + '"\n\n';

	}

	file_errors += '\n';

	return file_errors;

}

/* ------------- */
/*    Exports    */
/* ------------- */

/**
* function reporter(Array [errors], Boolean [testing])
*   Loop through errors, format them and write to file.
*
*   [errors]: list of errors JSHint has generated.
*   [testing]: return error in string instead of console output.
*/

function reporter(errors, testing) {

  var error_log = '',
    default_log = 'JSHint found no errors in your code.';

  /**
   *  Make sure JSHint errors were valid.
   */

  if (! valid_errors(errors)) {

    if (testing) {
      return default_log;
    }

    return console.log(default_log);

  }

  /**
   *  Organize errors into groups by filename.
   */

  var error_groups = group_errors(errors);

  /**
   *  Loop through error groups.
   */

  var error_amount = 0,
    invalid_files_amount = error_groups.length;

  for(var e = 0; e < error_groups.length; e++){

    /**
     *  Increment error count.
     */

    if (error_groups[e].errors) {
      error_amount += error_groups[e].errors.length;
    }

    /**
     *  Append formatted error to log message.
     */

    error_log += format_errors(error_groups[e]);

  }

  /**
   *  If no log generated, return default message.
   */

  if (! error_log) {

    if (testing) {
      return default_log;
    }

    return console.log(default_log);

  }

  /**
   *  Add comments to error message.
   */

  var files_suffix = invalid_files_amount === 1 ? '' : 's';

  error_log = 'JSHint found a total of ' + error_amount + ' errors in ' +
    invalid_files_amount + ' file' + files_suffix + '.\n\n' + error_log;

  /**
   *  Strip newlines from end.
   */

  error_log = error_log.substr(0, error_log.lastIndexOf('\n\n\n'));

  /**
   *  JSHint reporters return a console log message.
   */

  if (testing) {
    return error_log;
  }

  return console.log(error_log);

}

module.exports = {
  reporter: reporter
};
