//Publishing all hotels
Meteor.publish('hotels', function() {
  	return Hotels.find();
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {'services': 1});
});

//Meteor.publish("getETA", function (userLat, userLng, hotelLat, hotelLng){
//	return  Meteor.http.call("GET", "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+userLat+","+userLng+"&destinations="+hotelLat+","+hotelLng);
//});

