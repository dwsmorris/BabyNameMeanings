/*globals define, window*/

define([
	"text!../html/menu.html"
], function (
	menuHtml
) {

	return function (lib, state) {
		state.$ui.append(menuHtml);
		var $menu=state.$ui.find(".menu").popup({ positionTo: $(".menuButton") }).enhanceWithin().popup("open");

		$(".list").click(function () {
			state.updateID = null;
			$menu.popup("close");
			lib.loadMain(lib, lib.$.extend(true, {}, state, {
				$ui: state.$page,
				list: true
			}));
		});

		$(".new").click(function () {
			state.updateID = null;
			$menu.popup("close");
			lib.loadMain(lib, lib.$.extend(true, {}, state, {
				$ui: state.$page,
				list: false
			}));
		});
	};

});