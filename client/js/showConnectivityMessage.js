/*globals define, window*/

define(function () {

	return function (lib, state) {
		lib.loadInfoDialog(lib, state, "No Network Connectivity", "Network connectivity is currently unavailable. The ability to " +
		  "create new items, update items and delete items has been " +
		  "disabled.  You can still browse locally-cached data. Restart " +
		  "the app when connectivity has been restored.", function () { });
	};

});