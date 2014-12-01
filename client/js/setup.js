/*globals define*/

/**
 * Startup code #1.  Do any non-UI setup here.
 */
$(document).on("mobileinit", function () {

	// Set JQM defaults.
	$.mobile.defaultPageTransition = "none";
	$.mobile.defaultDialogTransition = "none";
	$.mobile.phonegapNavigationEnabled = true;
	$.mobile.loader.prototype.options.text = "...Please Wait...";
	$.mobile.loader.prototype.options.textVisible = true;
	$.mobile.autoInitializePage = false;
});





