/*globals define, window*/

define(function () {

	return function (lib, state) {
		lib.loadHeaderSection(lib, lib.$.extend(true, {}, state, {
			$ui: state.$ui.find(".headerSection")
		}));

		var loadContent = (function (page) {
			switch(page) {
				case "frontPage": return lib.loadFrontPage; 
				case "appointment": return lib.loadAppointmentPage; 
				case "note": return lib.loadNotePage; 
				case "contact": return lib.loadContactPage; 
				case "task": return lib.loadTaskPage; 
			}
		})(state.content);

		loadContent(lib, lib.$.extend(true, {}, state, {
			$ui: state.$ui.find(".contentSection")
		}));

		if (state.updateID !== null) {
			// populate view item fields
			var itemData = state.localStorage[state.content + "_" + state.updateID];
			for (var fld in itemData) {
				if (fld !== "_id" && fld !== "__v") {
					lib.$("#" + state.content + "EntryForm [name=" + fld + "]").val(itemData[fld]);
				}
			}
		}

		lib.loadFooterSection(lib, lib.$.extend(true, {}, state, {
			$ui: state.$ui.find(".footerSection")
		}));
	};

});