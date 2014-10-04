/*globals define, window*/

define(function () {

	/**
	 * Select an item for viewing/editing from a list.
	 *
	 * @param inType The type of entity selected.
	 * @param inID   The ID of the entity.
	 */
	return function (lib, state, inID) {
		// Record the item being viewed/edited.
		state.updateID = inID;

		lib.loadMain(lib, lib.$.extend(true, {}, state, {
			$ui: state.$page,
			list: false
		}));

		/*
		// Populate data.
		var itemData = JSON.parse(window.localStorage.getItem(inType + "_" + inID));
		for (fld in itemData) {
			if (fld != "_id" && fld != "__v") {
				$("#" + inType + "EntryForm [name=" + fld + "]").val(itemData[fld]);
			}
		}

		// Enable that delete button too!
		//$("#" + inType + "DeleteButton").button("enable");
		*/
	};

});