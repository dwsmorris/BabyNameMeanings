/*globals define, window*/

define([
	"text!../html/contactPage.html"
], function (
	contactPageHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(contactPageHtml)).enhanceWithin();

		if (state.list) {
			lib.loadContactList(lib, lib.$.extend(true, {}, state, {
				$ui: state.$ui.find(".content")
			}));
		} else {
			lib.loadContactEntry(lib, lib.$.extend(true, {}, state, {
				$ui: state.$ui.find(".content")
			}));
		}

		lib.pageShowHandler(lib, state);
	};

});