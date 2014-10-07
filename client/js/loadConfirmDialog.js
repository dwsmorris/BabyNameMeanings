/*globals define, window*/

define([
	"text!../html/confirmDialog.html"
], function (
	confirmDialogHtml
) {

	return function (lib, state, content, onConfirm) {
		state.$ui.append(lib.mustache.to_html(confirmDialogHtml, {
			content: content
		}));

		var $confirmDialog = state.$ui.find(".confirmDialog");
		$confirmDialog.popup().enhanceWithin().popup("open");

		$confirmDialog.find("a.yes").click(function () {
			$confirmDialog.popup("close");
			onConfirm(lib, state);
		});

		$confirmDialog.find("a.no").click(function () {
			$confirmDialog.popup("close");
		});
	};

});