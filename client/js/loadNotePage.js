/*globals define, window*/

define([
	"text!../html/notePage.html"
], function (
	notePageHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(notePageHtml)).enhanceWithin();

		if (state.list) {
			lib.loadNoteList(lib, lib.$.extend(true, {}, state, {
				$ui: state.$ui.find(".content")
			}));
		} else {
			lib.loadNoteEntry(lib, lib.$.extend(true, {}, state, {
				$ui: state.$ui.find(".content")
			}));
		}

		lib.pageShowHandler(lib, state);
	};

});