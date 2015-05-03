//subscribing to all hotels Collections
//Need to change it to the only currently selected hotel?
Meteor.subscribe('hotels');
//Meteor.subscribe('userData');

Template.tabs.rendered = function() {
  Session.set("activeTab",'tab2');
};

Template.tabs.activeTabIs = function(tab) {
 	return Session.get("activeTab") === tab;
}

Template.tabs.events({
	'click .tabs li' : function (event, template) {
		Session.set("activeTab", $(event.currentTarget).attr("activetab"));
  }
});

Template.preCheckin.helpers({
	//
	loc : function() {
		//return session variable as loc
		Session.set('location',Geolocation.latLng() || { lat: 0, lng: 0 });
		//return Geolocation.latLng() || { lat: 0, lng: 0 }
		return Session.get('location');
	},
	hotelAddress : function() {
		return Session.get('hotelAddress');
	},		
	//change fetch only users current hotel
	hotels: function(){
		//console.log("In the function");
		//console.log(Hotels.find().fetch()); 
		return Hotels.find();
	}
})

Template.tabBody2.helpers({
	eta	: function(){
		return Session.get('eta');
		console.log(Session.get('eta'));		
	},
})

//How to write small modular functions to do everything that you have to do.
Template.preCheckin.events({	
	'click .enable-location': function(){					

		//Currently gets address of first hotel. Need to change it to fetch current hotel from current user profile.
		Session.set('hotels',Hotels.find().fetch());
		var hotels = Session.get('hotels');
		var hotelLat = hotels[0].address.lat;
		var hotelLng = hotels[0].address.lng;

		Session.set('hotelAddress',hotels[0].address);

		console.log("Share Location clicked");		
		console.log("Fetching location from mdg:geolocation");
		
		var location = Session.get('location');
		//var error = Geolocation.error

		//var location = Session.get("loc");

		var userLat = location.lat;
		var userLng = location.lng;		

		console.log(userLat);
		console.log(userLng);

		//Setting current location of user in user database.
		Meteor.users.update({ _id: Meteor.userId()}, 
        	{$set: 
        		{
        			"profile.address.lat":userLat,
        			"profile.address.lng":userLng       				
        		}
        	});

		console.log(Meteor.user().profile.currentHotel.hotel_id);		

		//Call to mehtod to get eta
		Meteor.call("getETA", userLat, userLng, hotelLat, hotelLng, function(error, results) {
   			console.log(results.data.rows[0].elements[0]); //results.data should be a JSON object
   			//Cant return as async call but can set it directly in the database
  			//return results.data.rows[0].elements[0];
   			//setting session variable
   			Session.set('eta',results.data.rows[0].elements[0]);
   			//Setting eta of user in pre-checkin service in the hotel database.			
   			//Meteor.call("updateUserEta",Session.get("eta"));
		});

		console.log(Session.get('eta'));
	},
	'click .share-location': function(){
		Meteor.call("updateUserEta",Session.get("eta"));
		Meteor.call("setCheckinUser");		
		Router.go('/hotelServices');
	}
})

