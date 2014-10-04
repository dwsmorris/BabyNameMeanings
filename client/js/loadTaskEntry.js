/*globals define, window*/

define([
	"text!../html/taskEntry.html"
], function (
	taskEntryHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(taskEntryHtml, {
			deleteDisabledStatus: state.updateID === null ? "disabled" : ""
		})).enhanceWithin();

		state.$ui.find("button.doSave").click(function () {
			lib.doSave(lib, lib.$.extend(true, {}, state, {
				$ui: state.$page
			}));
		});

		state.$ui.find("button.doDelete").click(function () {
			lib.doDelete(lib, lib.$.extend(true, {}, state, {
				$ui: state.$page
			}));
		});
	};

});