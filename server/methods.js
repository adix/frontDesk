Meteor.methods({
    'getETA' : function () {
        //this.unblock() causes subsequent methods to run in different fibers
        //this.unblock();
        //console.log(temp);
        return  Meteor.http.call("GET", "https://maps.googleapis.com/maps/api/distancematrix/json?origins=41.43206,-81.38992&destinations=40.4450877,-79.9809263");        
    }
});