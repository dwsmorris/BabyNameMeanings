/*globals define, $, window*/

define([
	"text!../json/internalData.txt"
], function (
	internalData	
) {

	/**
	 * Downloads all data from the server for all entity types at app startup,
	 * assuming a connection is available.  If connection is not available then
	 * local data will be used and no updates will be allowed until the app is
	 * restarted (and assuming a connection is available at that point).
	 */
	return function (lib, state) {

		//$.mobile.loading("show");

		// Function executed when each of the four AJAX requests returns, regardless
		// of whether they succeeded or not.  Passed to this is the type of entity
		// completed and the response from the server, or null if the call failed.
		var completeLoad = function (inResponse) {
			var networkavailable = state.networkavailable;
			var localStorage = {};

				// If we got back data for all four entity types then we're good to go.
				if (inResponse!==null) {

					// Clear localStorage and then populate it with the fresh data.
					//window.localStorage.clear();
					localStorage = lib._.reduce(inResponse, function (memo, data, type) {
						if (data.length === 0) {
							return memo;
						} else {
							var entries = lib._.map(data, function(entry) {
								return lib._.object([type + "_" + entry._id],[entry]);
							});

							var extend=lib._.partial(lib._.extend, {}, memo);

							return extend.apply(null, entries);
						}
					}, {});
				} else {
					// One or more entities were not fetched, which we take to mean there's
					// a connectivity problem, so let the user know what's up.  Whatever
					// data is in localStorage will be used for this run.
					networkavailable = false;
					lib.showConnectivityMessage(lib, state);
				}

				// Unmask screen and we're done here.
				//$.mobile.loading("hide");

				lib.loadFrame(lib, lib.$.extend(true, {}, state, {
					networkavailable: networkavailable,
					localStorage: localStorage,
					internalData: JSON.parse(internalData)
				}));

		};

		// Get all data.
		$.ajax({ url: state.ajaxURLPrefix })
		.done(function (inResponse) { completeLoad(inResponse); })
		.fail(function (inXHR, inStatus) { completeLoad(null); });
	};

});