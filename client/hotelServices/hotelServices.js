Meteor.subscribe('hotels');

Template.serviceDisplay.helpers({
	hotels: function(){
		console.log("In the function");
		console.log(Hotels.find().fetch());
		return Hotels.find();		
	}
});
