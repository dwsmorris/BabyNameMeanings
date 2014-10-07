/*globals define*/

define([
	"text!../html/aboutPanel.html"
], function (
	aboutPanelHtml
) {

	return function (lib, state) {
		state.$ui.html(aboutPanelHtml).enhanceWithin();

		var $aboutPanel = state.$page.find(".aboutPanel");

		// Hook up a click handler to the clear confirmation dialog's "yes" button.
		$aboutPanel.find(".clearData").on("click", function () {
			lib.loadConfirmDialog(lib, state, "Are you sure you want to clear ALL data from both the server and local cache?", lib.clearData);
		});

		$aboutPanel.panel("open");
	};

});