/*globals define, $, window*/

define(function () {

	/**
	 * Downloads all data from the server for all entity types at app startup,
	 * assuming a connection is available.  If connection is not available then
	 * local data will be used and no updates will be allowed until the app is
	 * restarted (and assuming a connection is available at that point).
	 */
	return function (lib, state) {

		$.mobile.loading("show");

		/**
		 * Structure used during loading.
		 */
		var fetching = {
			loaded_appointment: false, loaded_contact: false,
			loaded_note: false, loaded_task: false,
			data_appointment: null, data_contact: null,
			data_note: null, data_task: null
		};

		// Function executed when each of the four AJAX requests returns, regardless
		// of whether they succeeded or not.  Passed to this is the type of entity
		// completed and the response from the server, or null if the call failed.
		var completeLoad = function (inType, inResponse) {

			// Record that this entity type was loaded and the server's response.
			fetching["loaded_" + inType] = true;
			fetching["data_" + inType] = inResponse;

			// When all four have completed then it's time to get to work.
			if (fetching.loaded_appointment && fetching.loaded_contact &&
			  fetching.loaded_note && fetching.loaded_task) {

				var networkavailable = state.networkavailable;

				// If we got back data for all four entity types then we're good to go.
				if (fetching.data_appointment && fetching.data_contact &&
				  fetching.data_note && fetching.data_task
				) {

					// Clear localStorage and then populate it with the fresh data.
					window.localStorage.clear();
					var types = ["appointment", "contact", "note", "task"];
					for (var i = 0; i < types.length; i += 1) {
						var typ = types[i];
						var dat = fetching["data_" + typ];
						var len = dat.length;
						var lst = window.localStorage;
						for (var j = 0; j < len; j += 1) {
							var obj = dat[j];
							lst.setItem(typ + "_" + obj._id, JSON.stringify(obj));
						}
					}

				} else {

					// One or more entities were not fetched, which we take to mean there's
					// a connectivity problem, so let the user know what's up.  Whatever
					// data is in localStorage will be used for this run.
					networkavailable = false;
					lib.showConnectivityMessage(lib, state);

				}

				// To conserve memory, erase the temporary load structure.
				fetching = null;

				// Unmask screen and we're done here.
				$.mobile.loading("hide");

				lib.loadFrame(lib, lib.$.extend(true, {}, state, {
					networkavailable: networkavailable
				}));
			}

		};

		// Get all appointments.
		$.ajax({ url: state.ajaxURLPrefix + "appointment" })
		.done(function (inResponse) { completeLoad("appointment", inResponse); })
		.fail(function (inXHR, inStatus) { completeLoad("appointment", null); });

		// Get all contacts.
		$.ajax({ url: state.ajaxURLPrefix + "contact" })
		.done(function (inResponse) { completeLoad("contact", inResponse); })
		.fail(function (inXHR, inStatus) { completeLoad("contact", null); });

		// Get all notes.
		$.ajax({ url: state.ajaxURLPrefix + "note" })
		.done(function (inResponse) { completeLoad("note", inResponse); })
		.fail(function (inXHR, inStatus) { completeLoad("note", null); });

		// Get all tasks.
		$.ajax({ url: state.ajaxURLPrefix + "task" })
		.done(function (inResponse) { completeLoad("task", inResponse); })
		.fail(function (inXHR, inStatus) { completeLoad("task", null); });

	};

});