/*globals define, window*/

define(function () {

	/**
	 * Fired when an entity page is shown.
	 *
	 * @param inType The type of entity page being shown.
	 */
	return function (lib, state) {
		var inType = state.content;

		$.mobile.loading("show");

		// Populate the list.
		lib.populateList(lib, state);

		// If network connectivity is found to be unavailable at any
		// point then disable new and save capabilities.  Note that this is
		// done here rather than the more reasonable downloadServerData() when
		// the message is shown because we can't guarantee this page has been
		// loaded at that point.
		if (!state.networkAvailable) {
			$("#" + inType + "NewLink").remove();
			$("#" + inType + "SaveButton").button("disable");
		}

		$.mobile.loading("hide");
	};

});