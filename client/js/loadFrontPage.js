/*globals define, window*/

define([
	"text!../html/frontPage.html!strip"
], function (
	frontPageHtml
) {

	return function (lib, state) {
		state.$ui.html(frontPageHtml).enhanceWithin();

		state.$page.find(".aboutButton").click(function () {
			lib.loadAboutPanel(lib, lib.$.extend(true, {}, state, {
				$ui: state.$page.find(".aboutSection")
			}));
		});
	};

});