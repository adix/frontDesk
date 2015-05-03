
//Just making user data available, Meteor.user() is already available on the clinet using {{currentUser}}
Meteor.subscribe('userData');

Meteor.subscribe('hotels');

Template.hotelSelect.helpers({
	allHotels: function(){
		console.log("In the function");
		console.log(Hotels.find().fetch());
		return Hotels.find();		
	}
});

Template.hotelSelect.events({
    'submit .hotelSelectForm': function( event ){   // also tried just 'submit', both work for me!
        Meteor.users.update({ _id: Meteor.userId() }, 
        	{$set: {"profile.currentHotel":
        				{hotel_id: event.target.listOfHotels.value,
        				stateDate: event.target.startdate.value,
        			    endDate: event.target.enddate.value,
                        checkin: ''}
        		   }
        	});
        event.preventDefault();
        event.stopPropagation();
        Router.go('/currentlyAt');
        return false;
      }
});