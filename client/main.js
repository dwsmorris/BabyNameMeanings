/*globals require, window, $, Connection*/

require({
	paths: {
		underscore: "thirdParty/underscore-1.6.0"
	},
	map: {
		"*": {
			text: "thirdParty/text",
			css: "thirdParty/require-css/css"
			/*i18n: "thirdParty/i18n",
			image: "thirdParty/image"*/
		}
	},
	urlArgs: "bust=" + (new Date()).getTime()
}, [
	"underscore",
	"./js/lib",
	"./thirdParty/mustache"
], function (
	_,
	customLib,
	mustache
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

	var lib = $.extend(true, {}, customLib, {
		$: $,
		_: _,
		mustache: mustache
	});
	
	var state = {
		$ui: $("#homePage"),
		$page: $("#homePage"),
		content: "frontPage",
		list: true,
		//ajaxURLPrefix: "http://server.eu01.aws.af.cm/babyNameMeanings.", // remote
		ajaxURLPrefix: "http://127.0.0.1:80/babyNameMeanings.", // local
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
	if (navigator && navigator.connection &&
	  navigator.connection.type === Connection.NONE
	) {
		lib.showConnectivityMessage(lib, state);
		lib.loadFrame(lib, lib.$.extend(true, {}, state, {
			networkavailable: false
		}));
	} else {
		lib.downloadServerData(lib, state);
	}

});