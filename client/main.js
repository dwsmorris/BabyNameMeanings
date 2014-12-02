/*globals require, window, $, Connection*/

require({
	paths: {
		underscore: "thirdParty/underscore-1.6.0",
		jquery: "thirdParty/jquery-2.0.3",
		jquerymobileconfig: "js/setup",
		jquerymobile: "thirdParty/jquery.mobile-1.4.3"
	},
	map: {
		"*": {
			text: "thirdParty/text",
			css: "thirdParty/require-css/css"
			/*i18n: "thirdParty/i18n",
			image: "thirdParty/image"*/
		}
	},
	shim: {
		jquerymobileconfig: {
			deps: ["jquery"]
		},
		jquerymobile: {
			deps: ["jquerymobileconfig"],
			exports: 'jquery'
		}
	},
	//priority: ['jquery', "jquerymobileconfig", 'jquerymobile'],
	urlArgs: "bust=" + (new Date()).getTime()
}, [
	"jquery",
	"underscore",
	"./js/lib",
	"./thirdParty/mustache",
	"./thirdParty/async",
	"jquerymobile",
	"jquerymobileconfig",
	"./thirdParty/cordova-2.5.0.js",
	"css!thirdParty/jquery.mobile-1.4.3.css",
	"css!styles/styles.css"
], function (
	$,
	_,
	customLib,
	mustache,
	async
) {
	/**
 * The prefix that is used to form the URL all AJAX requests go to.  When
 * developing on the desktop this should be http://127.0.0.1:80 or wherever
 * the server component is configured at.  Any other time, like when it's built
 * as a PhoneGap app, it should be a server address.  The logic in the
 * mobileinit handler determines this.
 *
 * Also, when developing on the desktop, you'll need to set your browser to
 * allow AJAX requests from a local file (or, alternatively, you'll need to put
 * the client app on a web server).  In Chrome, Opera and Safari that appears
 * to be allowed by default.  In IE I'm not sure how to do it.  In Firefox,
 * you need to open about:config and set security.fileuri.strict_origin_policy
 * to false.
 */
	// don't forget to trigger JQM manually
	if ($.mobile.autoInitializePage == false) {
		$.mobile.initializePage();
	}

	// Prevents all anchor click handling
	//$.mobile.linkBindingEnabled = false;

	// Disabling this will prevent jQuery Mobile from handling hash changes
	//$.mobile.hashListeningEnabled = false;

	var lib = $.extend(true, {}, customLib, {
		$: $,
		_: _,
		mustache: mustache,
		async: async
	});

	var projectName = "babyNameMeanings";
	
	var state = {
		$ui: $("#homePage"),
		$page: $("#homePage"),
		content: "frontPage",
		list: true,
		project: projectName,
		ajaxURLPrefix: "http://server.eu01.aws.af.cm/" + projectName + ".", // remote
		//ajaxURLPrefix: "http://127.0.0.1:1438/" + projectName + ".", // local
		updateID: null, // The ID of the item being updated, or null when doing an add.
		networkAvailable: true // Flag: is network connectivity available?
	};

	/**
	 * Startup code #2.  The call to get server data has to be done here rather
	 * than in the mobileinit handler because the UI needs to be built or the
	 * calls to show and hide the screen mask will break.  The ready event
	 * is triggered after the UI is built, whereas mobileinit happens before,
	 * so we have to do the call here.
	 */

	// If we're running inside PhoneGap then we can determine if we have
	// connectivity up-front without trying the fetches.
	//if (navigator && navigator.connection &&
	//  navigator.connection.type === Connection.NONE
	//) {
	//	lib.showConnectivityMessage(lib, state);
	//	lib.loadFrame(lib, lib.$.extend(true, {}, state, {
	//		networkavailable: false
	//	}));
	//} else {
		lib.downloadServerData(lib, state);
	//}

});