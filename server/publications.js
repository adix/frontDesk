Meteor.publish('hotels', function() {
  	return Hotels.find();
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {'services': 1});
});