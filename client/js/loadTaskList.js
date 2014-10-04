/*globals define, window*/

define([
	"text!../html/taskList.html"
], function (
	taskListHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(taskListHtml)).enhanceWithin();

		state.$ui.find("select.taskFilterCategory").change(function () {
			lib.populateList(lib, state, "category", lib.$(this).val());
		});
	};

});