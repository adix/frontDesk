Hotels = new Mongo.Collection('hotels');

Meteor.subscribe('hotels');

Template.hotelServices.helpers({
	services: function(){
		console.log("In the function");
		console.log(Hotels.find().fetch());
		return Hotels.find();		
	}
});
