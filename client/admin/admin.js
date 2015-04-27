Meteor.subscribe('hotels');
Meteor.subscribe('userData');

Template.admin.helpers({
	hotels: function(){
		//console.log("In the function");
		//console.log(Hotels.find().fetch());
		//console.log(Meteor.user()); 
		console.log(Hotels.find({_id: new Meteor.Collection.ObjectID(Meteor.user().profile.currentHotel.hotel_id)},{ServiceHistory:1}).fetch());
		return Hotels.find({_id: new Meteor.Collection.ObjectID(Meteor.user().profile.currentHotel.hotel_id)});
		//return Hotels.findOne({ _id: Meteor.user().profile.currentHotel.hotel_id});
	}
})