/*globals define, window*/

define([
	"text!../html/taskPage.html"
], function (
	taskPageHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(taskPageHtml)).enhanceWithin();

		if (state.list) {
			lib.loadTaskList(lib, lib.$.extend(true, {}, state, {
				$ui: state.$ui.find(".content")
			}));
		} else {
			lib.loadTaskEntry(lib, lib.$.extend(true, {}, state, {
				$ui: state.$ui.find(".content")
			}));
		}

		lib.pageShowHandler(lib, state);
	};

});