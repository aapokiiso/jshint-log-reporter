/* ----------------------------- */
/*    ~ JSHint error logger ~    */
/* ----------------------------- */

/**
*	This module takes JSHint errors, formats them and saves them to a user-defined filepath.
*/

/* ------------------ */
/*    Dependencies    */
/* ------------------ */

/* --------------- */
/*    Functions    */
/* --------------- */

/**
*	function reporter(Array [errors])
*		Loop through errors, format them and  write to file.
*
*		[errors]: list of errors JSHint has generated.
*/

function reporter(errors){

	/**
	*	Return empty string if no errors given.
	*/

	if(! errors || (errors && ! (errors instanceof Array)) || (errors && errors instanceof Array && errors.length === 0)){
		return "";
	}

	/**
	*	Organize errors into groups by filename.
	*/

	var error_groups = group_errors(errors);

	/**
	*	Loop through error groups.
	*/

	var log = ""; // Log message.

	for(var e = 0; e < error_groups.length; e++){

		/**
		*	Append formatted error to log message.
		*/

		log += format_errors(error_groups[e]);

	}

	/**
	*	Return log message.
	*/

	return log;

}

/**
*	function group_errors(Array [errors])
*		Organize errors into arrays of objects by filename.
*
*		[errors]: list of errors JSHint has generated.
*/

function group_errors(errors){

	/**
	*	Array of objects for error groups, initialize with object for errors of uknown origin (fallback group).
	*/

	var error_groups = [{
		file: "(unknown file)",
		errors: []
	}];

	var filenames = []; // Array for already used filenames.
	var group_found = false; // Boolean for cases when error group isn't found --> fallbacks to "unknown" group.

	/**
	*	Loop through errors.
	*/

	for(var e = 0; e < errors.length; e++){

		group_found = false;

		var error = errors[e];

		/**
		*	Check if there already is a group for this file's errors.
		*/

		if(! error.file || filenames.indexOf(error.file) >= 0){

			/**
			*	Group already exists, now we'll loop through the error groups to find the one matching the filename.
			*/

			for(var eg in error_groups){
				if(error_groups[eg].file == error.file){

					/**
					*	Filename matches, now append error to group's array of errors.
					*/

					error_groups[eg].errors.push(error.error);

					/**
					*	Set boolean [group_found] to true to make sure error isn't added into the fallback group.
					*/

					group_found = true;

				}
			}

			/**
			*	If group was not found, add to fallback group.
			*/

			if(group_found === false){
				error_groups[0].errors.push(error.error);
			}

		}
		else{

			/**
			*	Group doesn't exist, create it with current error if error exists.
			*/

			if(error.error){

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

	if(error_groups.length > 1 || (error_groups[0].errors.length > 0)){
		return error_groups;
	}

	/**
	*	Elsewise return empty string.
	*/

	return "";

}

/**
*	function format_errors(Object [error_group])
*		Format file's errors into a string to be more easily readable.
*
*		[error_group]: JSHint-generated errors in a single file.
*/

function format_errors(error_group){

	/**
	*	If there are no errors defined, return empty string.
	*/

	if(! error_group.errors || (error_group.errors && error_group.errors.length === 0)){
		return "";
	}

	var file_errors = error_group.file + "\n\n"; // Formatted error message, initialize with filename heading.

	/**
	*	Loop through errors.
	*/

	for(var e = 0; e < error_group.errors.length; e++){

		var error = error_group.errors[e];
		
		/**
		*	Fallback for empty values.
		*/

		if(! error.line) error.line = "(unknown line)";
		if(! error.character) error.character = "(unknown column)";
		if(! error.reason) error.reason = "(unknown error)";
		if(! error.evidence) error.evidence = "(unknown problem)";
		if(! error.code) error.code = "(unknown code)";

		/**
		*	Append formatted error to log message.
		*/

		file_errors += "\tline " + error.line + ", column " + error.character + ":\n\t\tError: " + error.reason + "\n\t\tProblem: " + error.evidence + "\n\t\tCode: " + error.code + "\n\n";

	}

	file_errors += "\n\n\n";

	return file_errors;

}

/* ------------- */
/*    Exports    */
/* ------------- */

module.exports = {
	reporter: reporter
};
