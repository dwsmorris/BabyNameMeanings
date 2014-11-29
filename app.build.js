({
	appDir: "client",
	baseUrl: "./",
	dir: "client-build",
	paths: {
		underscore: "thirdParty/underscore-1.6.0"
	},
	map: {
		"*": {
			text: "thirdParty/text",
			css: "thirdParty/require-css/css-builder"
		}
	},
	modules: [{
		name: "main"
	}]
})