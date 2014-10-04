/*globals define, window*/

define([
	"text!../html/contactList.html"
], function (
	contactListHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(contactListHtml)).enhanceWithin();

		state.$ui.find("select.contactFilterCategory").change(function () {
			lib.populateList(lib, state, "category", lib.$(this).val());
		});
	};

});