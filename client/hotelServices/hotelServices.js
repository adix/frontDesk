Meteor.subscribe('hotels');

Template.hotelServices.helpers({
	hotels: function(){
		console.log("In the function");
		console.log(Hotels.find().fetch());
		return Hotels.find();		
	}
});
