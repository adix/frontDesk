Meteor.methods({
    'getETA' : function (userLat,userLng,hotelLat,hotelLng) {
        //this.unblock() causes subsequent methods to run in different fibers. Dont know what the use of this is exactly.
        this.unblock();
        return  Meteor.http.call("GET", "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+userLat+","+userLng+"&destinations="+hotelLat+","+hotelLng);        
    },    
    'addUserLocation' : function(userLat, userLng) {
    	//console.log("In assUserLocation");
    	//console.log(userLat);
    	//console.log(userLng);    	

    }  
});