Meteor.subscribe('hotels');

Template.profile.helpers({
	completedRequests : function(){
		//console.log("In the function");
		console.log(Hotels.find({_id: new Meteor.Collection.ObjectID(Meteor.user().profile.currentHotel.hotel_id)},{ServiceHistory: {$elemMatch :{user_id: Meteor.userId()}}}).fetch());
		return Hotels.find({_id: new Meteor.Collection.ObjectID(Meteor.user().profile.currentHotel.hotel_id)},{ServiceHistory: {$elemMatch :{user_id: Meteor.userId()}}});
	}
});