/*globals define, window*/

define([
	"text!../html/infoDialog.html"
], function (
	infoDialogHtml
) {

	return function (lib, state, title, content, onClose) {
		state.$ui.append(lib.mustache.to_html(infoDialogHtml, {
			title: title,
			content: content
		}));

		var $infoDialog = state.$ui.find(".infoDialog");
		$infoDialog.popup().enhanceWithin().popup("open");

		$infoDialog.find("a.ok").click(function () {
			$infoDialog.popup("close");
			onClose(lib, state);
		});
	};

});