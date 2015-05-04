Meteor.subscribe('hotels');

Template.hotelServices.helpers({
	hotels: function(){
		console.log("In the function");
		console.log(Hotels.find().fetch());
		return Hotels.find();		
	}
});

Template.hotelServices.events({
	'click .checkout': function(){
		Meteor.call("clearCurrentHotel", function(error,results){
			if(results){
				Router.go('/hotelSelect');
			}
		});				
	},
	'click .profile': function(){
		Router.go('/profile');				
	}
})
