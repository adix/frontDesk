Template.hotelSelect.helpers({
	currentEmail: Meteor.users.find({"services.facebook.name":"Nilay Panchal"})
}
);