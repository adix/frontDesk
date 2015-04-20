//This needs to be called only after the client accespts location sharing.
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

