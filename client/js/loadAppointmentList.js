/*globals define, window*/

define([
	"text!../html/appointmentList.html"
], function (
	appointmentListHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(appointmentListHtml)).enhanceWithin();

		state.$ui.find("select.appointmentFilterCategory").change(function () {
			lib.populateList(lib, state, "category", lib.$(this).val());
		});

		state.$ui.find("input.appointmentFilterAllDay").change(function () {
			lib.populateList(lib, state, "allDay", lib.$(this).val());
		});
	};

});