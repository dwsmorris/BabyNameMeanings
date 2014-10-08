/*globals define, window*/

define(function () {

	/**
	 * Delete an entity.
	 *
	 * @param inType The type of entity to delete.
	 */
	return function (lib, state) {
		var inType = state.content;

		// Scrim screen for the duration of the call.
		$.mobile.loading("show");

		var uid = "/" + state.updateID;

		// Clear entry form and reset updateID.
		state.updateID = null;

		// Send to server.
		$.ajax({ url: state.ajaxURLPrefix + inType + uid, type: "delete" })
		.done(function (inResponse) {
			// Remove item from localStorage.
			window.localStorage.removeItem(inType + "_" + inResponse);
			// Now repopulate the listview from localStorage.  This is NOT the most
			// efficient way to go about doing this, but it's expedient in terms of
			// writing the code and for small data sets the performance will be fine.
			//window.populateList(inType);
			// Now update the UI as appropriate and we're done.
			$.mobile.loading("hide");

			lib.loadInfoDialog(lib, lib.$.extend(true, {}, state, {
				content: inType,
				list: true
			}), "Success", "Delete from server complete", function (lib, state) {
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