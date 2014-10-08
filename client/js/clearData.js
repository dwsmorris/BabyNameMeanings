/*globals define, window*/

define(function () {

	/**
	 * Clears ALL data on both the server AND in localStorage.
	 */
	return function (lib, state) {
		$.mobile.loading("show");
		$.ajax({ url: state.ajaxURLPrefix + "clear" })
		.done(function (inResponse) {
			// Now clear localStorage.
			window.localStorage.clear();
			$.mobile.loading("hide");

			lib.loadInfoDialog(lib, lib.$.extend(true, {}, state, {
				content: "frontPage",
				list: true
			}), "Operation succeeded", "Data cleared", function (lib, state) {
				lib.downloadServerData(lib, lib._.extend({}, state, {
					$ui: state.$page
				}));
			});
		})
		.fail(function (inXHR, inStatus) {
			$.mobile.loading("hide");
			lib.loadInfoDialog(lib, lib.$.extend(true, {}, state, {
				content: "frontPage",
				list: true
			}), "Operation failed", "Data not cleared", function () { });
		});

	};

});