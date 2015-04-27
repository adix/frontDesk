//subscribing to all hotels Collections
//Need to change it to the only currently selected hotel?
Meteor.subscribe('hotels');
//Meteor.subscribe('userData');

Template.preCheckin.helpers({
	//
	loc : function() {
		//return session variable as loc
		return Session.get('location');		
	},	
	eta	: function(){
		return Session.get('eta');
		console.log(Session.get('eta'));		
	},
	//change fetch only users current hotel
	hotels: function(){
		//console.log("In the function");
		//console.log(Hotels.find().fetch()); 
		return Hotels.find();
	}
})

//How to write small modular functions to do everything that you have to do.
Template.preCheckin.events({	
	'click .share-location': function(){		
		var hotels = Hotels.find().fetch();
		
		//Currently gets address of first hotel. Need to change it to fetch current hotel from current user profile.
		var hotelLat = hotels[0].address.lat;
		var hotelLng = hotels[0].address.lng;

		console.log("Share Location clicked");		
		console.log("Fetching location from mdg:geolocation");
		
		//Need to fix multiple clicks to get location and find distance
		var location = Geolocation.latLng() || { lat: 0, lng: 0 };
		var error = Geolocation.error;

		
		//Session.set("location",location);

		/*Reactive method implementation try
		
		Tracker.autorun(function () {	
			var location = new ReactiveVar(0);
			location.set(Geolocation.latLng());		
			Session.set("loc",location);
			console.log(location);
		});
		

		//var location = Session.get("loc");
		*/

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
   			Session.set('eta',results.data.rows[0].elements[0])
		});



		//Setting eta of user in pre-checkin service in the hotel database.			
		
		Meteor.call("updateUserEta",Session.get("eta"));
				
		//Set location to session variable
		Session.set("location",location)
		Session.set("location-error",error)
	}	
})

