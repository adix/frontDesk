//var ObjectID, require; 
//require = __meteor_bootstrap__.require; 
//ObjectID = require("mongodb").ObjectID;

Meteor.methods({
    'getETA' : function (userLat,userLng,hotelLat,hotelLng) {
        //this.unblock() causes subsequent methods to run in different fibers. Dont know what the use of this is exactly.
        this.unblock();
        return  Meteor.http.call("GET", "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+userLat+","+userLng+"&destinations="+hotelLat+","+hotelLng);        
    },
    'updateUserEta' : function(eta){
        console.log("IN the serverererere");
        console.log(Meteor.user().profile.currentHotel.hotel_id);
        //var id; id = new ObjectID(Meteor.user().profile.currentHotel.hotel_id); 
        //console.log(id);
        return Hotels.update({ _id: new Meteor.Collection.ObjectID(Meteor.user().profile.currentHotel.hotel_id)},
            {$addToSet:{ServiceHistory:{user_id:Meteor.userId(),service_performed:{name: "PreCheckin",eta:{distance: eta.distance.text,duration: eta.duration.text},createdAt:Date()}}}}
        );
    },
    //{ SomeUpdate: function(upd) { 
    //   var id; id = new ObjectID(upd['_id']); 
    //   return SomeDB.update({ _id: id }, { $set: { field: value } }, function(res) { return console.log(res); }); } }
});