﻿/*globals define, window*/

define([
	"text!../html/headerSection.html!strip",
	"text!../html/aboutButton.html!strip",
	"text!../html/menuButton.html!strip"
], function (
	headerSectionHtml,
	aboutButtonHtml,
	menuButtonHtml
) {

	return function (lib, state) {
		state.$ui.html(lib.mustache.to_html(headerSectionHtml, {
			homeButtonEnabled: state.content === "frontPage" ? "disabled" : "",
			title: state.content === "appointment" ? "Appointments" :
				state.content === "contact" ? "Contacts" :
				state.content === "note" ? "Notes" :
				state.content === "task" ? "Tasks" : "Welcome!",
			url: "#menu"
		}, {
			rightButton: state.content === "frontPage" ? aboutButtonHtml : menuButtonHtml
		})).enhanceWithin();

		state.$ui.find(".cssHomeButton").click(function () {
			lib.loadMain(lib, lib.$.extend(true, {}, state, {
				$ui: state.$page,
				content: "frontPage"
			}));
		});

		state.$ui.find(".menuButton").click(function () {
			lib.loadMenu(lib, lib.$.extend(true, {}, state, {
				$ui: state.$ui.find(".menuButton")
			}));
		});
	};

});