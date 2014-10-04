/*globals define*/

define([
	"text!../html/frame.html!strip"	
], function (
	frameHtml
) {

	return function (lib, state) {
		lib.$("#homePage").html(frameHtml).enhanceWithin();
		lib.loadMain(lib, state);
	};

});