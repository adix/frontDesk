//subscribing to all hotels Collections
//Need to change it to the only currently selected hotel?
Meteor.subscribe('hotels');

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
		var hotelLng = hotels[0].address.lng

		//Call to mehtod to get eta
		Meteor.call("getETA", hotelLat, hotelLng, function(error, results) {
   			console.log(results.data.rows[0].elements[0]); //results.data should be a JSON object
   			//Cant return as async call but can set it directly in the database
  			//return results.data.rows[0].elements[0];
   			//setting session variable
   			Session.set('eta',results.data.rows[0].elements[0])
		});

		//console.log("Share Location clicked");		
		//get location using mdg:location package
		var location = Geolocation.latLng() || { lat: 0, lng: 0 };
		var error = Geolocation.error;
		//console.log(location.lat);
		//console.log(location.lng);
		//console.log(error);
		//Set location to session variable
		Session.set("location",location)
		Session.set("location-error",error)
	}
})

