/*globals define, window*/

define([
	"text!../html/listItem.html"	
], function (
	listItemHtml
) {


	/**
	 * Populates the list view for an entity type and optionally filters the list.
	 *
	 * @param inType        The type of entity to populate.
	 * @param inFilterField The field of the entity to filter by, or null if no
	 *                      filtering should be applied (show all).
	 * @param inFilterValue The value of the filter field to match, or null if no
	 *                      filtering should be applied (show all).
	 */
	return function (lib, state, inFilterField, inFilterValue) {
		var inType = state.content;

		// Get reference to listview's UL element and remove existing children.
		var ul = lib.$("#" + inType + "ListUL");
		//ul.children().remove();

		// Get items of the appropriate type from localStorage.
		var items = lib.getAllFromLocalStorage(lib, state, inType);

		// Iterate over those items and create a LI for each and append to the UL,
		// applying filtering, if specified.
		var len = items.length;

		/*
		var data = lib._.chain(items).map(function (item) {
			// Apply filtering, if specified.
			if (inFilterField && inFilterValue &&
			  item[inFilterField] !== inFilterValue
			) {
				return undefined;
			}
			// Item not filtered out, so create the LI now.
			var liText = "";
			if (inType === "contact") {
				liText = item.lastName + ", " + item.firstName;
			} else {
				liText = item.title;
			}

			return {
				id: item._id,
				text: liText
			};
		}).compact().value();
		*/

		var data = lib._.chain(state.internalData).map(function (nameMeaningPair) {
			return {
				text: nameMeaningPair[state.content === "contact" ? 0 : 1]
			};
		}).uniq().sortBy("text").value();

		ul.html(lib.mustache.to_html(listItemHtml, {
			items: data
		}));

		// Have to refresh the listview to tell JQM to do it's thing.
		ul.listview("refresh");

		ul.find("li").click(function () {
			lib.viewEditItem(lib, state, lib.$(this).attr("class").split(" ")[0]);
		});
	};

});