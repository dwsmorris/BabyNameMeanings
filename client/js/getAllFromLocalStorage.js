/*define, window*/

define(function () {

	/**
	 * Get all entities of a given type from localStorage and return them
	 * as objects.
	 *
	 * @param inType The type of entity to get (appointment
	 */
	return function (lib, state, inType) {
		var items = [];

		// First, get the data of the appropriate type from localStorage.
		var lst = state.localStorage;
		for (var itemKey in lst) {
			if (itemKey.indexOf(inType) === 0) {
				var sObj = lst[itemKey];
				items.push(sObj);
			}
		}

		// Second, sort the resultant array, since the order we get it from
		// localStorage is indeterminate.
		items.sort(function (a, b) {
			switch (inType) {
				case "contact":
					return a.lastName > b.lastName;
				case "appointment": case "note": case "task":
					return a.title > b.title;
			}
		});

		return items;
	};

});