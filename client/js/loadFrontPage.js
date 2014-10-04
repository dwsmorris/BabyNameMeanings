/*globals define, window*/

define([
	"text!../html/frontPage.html!strip",
	"text!../html/aboutPanel.html"
], function (
	frontPageHtml,
	aboutPanelHtml
) {

	return function (lib, state) {
		state.$ui.html(frontPageHtml).enhanceWithin();

		state.$page.find(".aboutButton").click(function () {
			state.$page.find(".aboutSection").html(aboutPanelHtml).enhanceWithin();

			var $aboutPanel = state.$page.find(".aboutPanel");

			// Hook up a click handler to the clear confirmation dialog's "yes" button.
			$("#confirmClearYes").on("click", function () {
				lib.clearData(lib, state);
			});

			$aboutPanel.panel("open");
		});
	};

});