Hotels = new Mongo.Collection('hotels');

Meteor.publish('hotels', function() {
  	return Hotels.find();
});