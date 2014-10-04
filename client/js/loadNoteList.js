/*globals define, window*/

define([
	"text!../html/noteList.html"
], function (
	noteListHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(noteListHtml)).enhanceWithin();

		state.$ui.find("select.noteFilterCategory").change(function () {
			lib.populateList(lib, state, "category", lib.$(this).val());
		});
	};

});