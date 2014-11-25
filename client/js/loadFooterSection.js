/*globals define, window*/

define([
	"text!../html/footerSection.html!strip"
], function (
	footerSectionHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(footerSectionHtml, {
			appointmentButtonState: state.content === "appointment" ? "ui-btn-active ui-state-persist" : "",
			contactButtonState: state.content === "contact" ? "ui-btn-active ui-state-persist" : "",
			noteButtonState: state.content === "note" ? "ui-btn-active ui-state-persist" : "",
			taskButtonState: state.content === "task" ? "ui-btn-active ui-state-persist" : ""
		})).enhanceWithin();

		state.$ui.find("a").click(function () {
			var classname = lib.$(this).attr("class").split(" ")[0];

			lib.loadMain(lib, lib.$.extend(true, {}, lib._.omit(state, "entry"), {
				$ui: state.$page,
				content: classname
			}));
		});
	};

});