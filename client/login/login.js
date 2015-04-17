var oldUserId = undefined;

Meteor.autorun(function() {
  var newUserId = Meteor.userId();
  if (oldUserId === null && newUserId) {
    console.log('The user logged in');
  } else if (newUserId === null && oldUserId) {
    console.log('The user logged out');
  } 
  oldUserId = Meteor.userId();
});