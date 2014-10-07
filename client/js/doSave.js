/*globals define, window, $*/

define(function () {

	/**
	 * Save an entity.  This is used for adding a new entity as well as updating an
	 * existing entity.
	 *
	 * @param inType The type of entity to save.
	 */
	return function (lib, state) {
		var inType = state.content;

		/**
		 * Gets the data from a form as a string of JSON.
		 *
		 * @param  inType The type of entity to get form data for.
		 * @return        The JSON string of that data.
		 */
		var getFormAsJSON = function () {

			var frmData = $("#" + inType + "EntryForm").serializeArray();
			var frmObj = {};
			for (var i = 0; i < frmData.length; i += 1) {
				var fld = frmData[i];
				frmObj[fld.name] = fld.value;
			}
			return JSON.stringify(frmObj);

		}; // End getFormAsJSON();


		/**
* Checks if a given form field is blank.
*
* @param  inID The ID of a form field to check.
* @return      True if the object is blank, false if not.
*/
		function isBlank(inID) {

			var fld = $("#" + inID).val();

			if (fld === null) {
				return true;
			} else if (fld === undefined) {
				return true;
			} else if (fld === "") {
				return true;
			}

			return false;

		} // End isBlank().

		/**
		 * An object that contains functions for doing validations of the entry forms.
		 * Each of them returns true if the form is valid, false if not.
		 */
		var validations = {

			/**
			 * Validate appointment form.
			 */
			check_appointment: function () {
				if (isBlank("appointmentTitle")) { return false; }
				if (isBlank("appointmentDate")) { return false; }
				return true;
			},

			/**
			 * Validate contact form.
			 */
			check_contact: function () {
				if (isBlank("contactFirstName")) { return false; }
				if (isBlank("contactLastName")) { return false; }
				return true;
			},

			/**
			 * Validate note form.
			 */
			check_note: function () {
				if (isBlank("noteTitle")) { return false; }
				if (isBlank("noteText")) { return false; }
				return true;
			},

			/**
			 * Validate task form.
			 */
			check_task: function () {
				if (isBlank("taskTitle")) { return false; }
				return true;
			}

		};

		// First things first: validate the form and abort if something's not right.
		if (!validations["check_" + inType](inType)) {
			lib.loadInfoDialog(lib, lib.$.extend(true, {}, state, {
				content: inType,
				list: false
			}), "Error", "Please provide values for all required fields", function () { });

			return;
		}

		// Scrim screen for the duration of the call.
		$.mobile.loading("show");

		// Select appropriate HTTP method and ensure inUpdateID is a non-null value
		// no matter what.
		var httpMethod = "post";
		var uid = "";
		if (state.updateID) {
			httpMethod = "put";
			uid = "/" + state.updateID;
		}

		// Get form data and then clear the form and reset updateID.
		var frmData = getFormAsJSON();

		state.updateID = null;

		// Send to server.
		$.ajax({
			url: state.ajaxURLPrefix + inType + uid, type: httpMethod,
			contentType: "application/json", data: frmData
		})
		.done(function (inResponse) {
			// Add the item to localStorage.  Since we have the data in the form of a
			// string we just need to slice off the closing brace, then add the
			// two fields that MongoDB would add.
			frmData = frmData.slice(0, frmData.length - 1);
			frmData = frmData + ",\"__v\":\"0\",\"_id\":\"" + inResponse + "\"}";
			window.localStorage.setItem(inType + "_" + inResponse, frmData);
			// Now repopulate the listview from localStorage.  This is NOT the most
			// efficient way to go about doing this, but it's expedient in terms of
			// writing the code and for small data sets the performance will be fine.
			//window.populateList(inType);
			// Now update the UI as appropriate and we're done.
			$.mobile.loading("hide");

			lib.loadInfoDialog(lib, lib.$.extend(true, {}, state, {
				content: inType,
				list: true
			}), "Success", "Save to server complete", function (lib, state) {
				lib.loadMain(lib, state);
			});

		})
		.fail(function (inXHR, inStatus) {
			$.mobile.loading("hide");
			lib.loadInfoDialog(lib, lib.$.extend(true, {}, state, {
				content: inType,
				list: false
			}), "Error", inStatus, function () { });
		});

	};

});