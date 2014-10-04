/*globals define, window*/

define([
	"text!../html/appointmentPage.html",
	"text!../html/contactPage.html",
	"text!../html/notePage.html",
	"text!../html/taskPage.html"
], function (
	appointmentPageHtml,
	contactPageHtml,
	notePageHtml,
	taskPageHtml
) {

	return function (lib, state) {
		state.$ui.html(state.content === "appointment" ? appointmentPageHtml :
			state.content === "contact" ? contactPageHtml :
			state.content === "note" ? lib.mustache.to_html(notePageHtml, {
				deleteDisabledStatus: "disabled"
			}) : state.content === "task" ? taskPageHtml : ""
		).enhanceWithin();

		lib.pageShowHandler(lib, state);
	};

});