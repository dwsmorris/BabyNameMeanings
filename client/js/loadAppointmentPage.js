/*globals define, window*/

define([
	"text!../html/appointmentPage.html"
], function (
	appointmentPageHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(appointmentPageHtml)).enhanceWithin();

		if (state.list) {
			lib.loadAppointmentList(lib, lib.$.extend(true, {}, state, {
				$ui: state.$ui.find(".content")
			}));
		} else {
			lib.loadAppointmentEntry(lib, lib.$.extend(true, {}, state, {
				$ui: state.$ui.find(".content")
			}));
		}

		lib.pageShowHandler(lib, state);
	};

});