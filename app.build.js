({
	appDir: "client",
	baseUrl: "./",
	dir: "client-build",
	paths: {
		underscore: "thirdParty/underscore-1.6.0",
		jquery: "thirdParty/jquery-2.0.3",
		jquerymobileconfig: "js/setup",
		jquerymobile: "thirdParty/jquery.mobile-1.4.3"
	},
	map: {
		"*": {
			text: "thirdParty/text",
			css: "thirdParty/require-css/css-builder"
		}
	},
	shim: {
		jquerymobileconfig: {
			deps: ["jquery"]
		},
		jquerymobile: {
			deps: ["jquerymobileconfig"]/*,
			exports: 'jquery'*/
		}
	},
	modules: [{
		name: "main"
	}]
})
