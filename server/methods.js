Meteor.methods({
    'getETA' : function (lat,lng) {
        //this.unblock() causes subsequent methods to run in different fibers. Dont know what the use of this is exactly.
        this.unblock();
        return  Meteor.http.call("GET", "https://maps.googleapis.com/maps/api/distancematrix/json?origins=41.43206,-81.38992&destinations="+lat+","+lng);        
    }
});