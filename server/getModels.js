/*globals define*/

define(function () {
	
	// Define database schemas for all entities.
	return function (lib, state) {
		var schemas = {
			appointment: lib.mongoose.Schema({
				category: "string", title: "string", description: "string",
				location: "string", date: "date", allDay: "boolean",
				startTimeHour: "number", startTimeMinute: "number",
				startTimeMeridiem: "string", endTimeHour: "number",
				endTimeMinute: "number", endTimeMeridiem: "string"
			}),
			contact: lib.mongoose.Schema({
				category: "string", firstName: "string", lastName: "string",
				address1: "string", address1Type: "string",
				address2: "string", address2Type: "string",
				phone1: "string", phone1Type: "string",
				phone2: "string", phone2Type: "string",
				eMail: "string"
			}),
			note: lib.mongoose.Schema({
				category: "string", title: "string", text: "string",
				geoLatLong: "string"
			}),
			task: lib.mongoose.Schema({
				category: "string", title: "string", text: "string",
				completed: "boolean", priority: "number", dueDate: "date"
			})
		};
		
		// Define database models for all entities.
		return {
			"babyNameMeanings.appointment": lib.mongoose.model("babyNameMeanings.appointment", schemas.appointment),
			"babyNameMeanings.contact": lib.mongoose.model("babyNameMeanings.contact", schemas.contact),
			"babyNameMeanings.note": lib.mongoose.model("babyNameMeanings.note", schemas.note),
			"babyNameMeanings.task": lib.mongoose.model("babyNameMeanings.task", schemas.task)
		};
	};

});