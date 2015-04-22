//subscribing to all hotels Collections
//Need to change it to the only currently selected hotel?
Meteor.subscribe('hotels');

//This needs to be called only after the client accespts location sharing.
//Send the users and hotels coordinates.
Meteor.call("getETA", function(error, results) {
   	console.log(results.data.rows[0].elements[0]); //results.data should be a JSON object
   	// cant return as async call
  	//return results.data.rows[0].elements[0];
   	//setting session variable
   	Session.set('eta',results.data.rows[0].elements[0])
});
    
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
	//fetch only users current hotel
	hotels: function(){
		console.log("In the function");
		console.log(Hotels.find().fetch());
		return Hotels.find();		
	}
})

Template.preCheckin.events({	
	'click .share-location': function(){
		console.log("Share Location clicked");		
		//get location using mdg:location package
		var location = Geolocation.latLng() || { lat: 0, lng: 0 };
		var error = Geolocation.error;
		console.log(location.lat);
		console.log(location.lng);
		//console.log(error);
		//Set location to session variable
		Session.set("location",location)
		Session.set("location-error",error)
	}
})

