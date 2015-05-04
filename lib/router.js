
Router.configure({
  layoutTemplate: 'layout',
  adminTemplate: 'layout-admin',
  notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    this.render("login");
  } else {
    this.next();
  }
});

Accounts.onLogin(function(user){
  Router.go('hotelSelect');
});

//check if logged in and reroute.
Router.map(function(){
	this.route('login',
		{path:'/',
			onBeforeAction: function (pause) {
	            if (Meteor.userId()) {
	             if(Meteor.user().profile.currentHotel.hotel_id)	{
	             	if(Meteor.user().profile.currentHotel.checkin == "true") {
	             		this.render('hotelServices');
	             	}
	             	else {
	             		this.render('currentlyAt');
	             	}
	             } else {
	             	this.render('hotelSelect');
	             } 
	        	}
	        	this.next();      	
	        	
	        }
        });
	this.route('hotelSelect',
		{path:'/hotelSelect',
			onBeforeAction: function (pause) {				
				if(Meteor.user().profile.currentHotel.hotel_id)	{
	             	if(Meteor.user().profile.currentHotel.checkin == "true") {
	             		this.render('hotelServices');
	             	}
	             	else {
	             		this.render('currentlyAt');
	             	}
	           }
	           this.next();
			}
		});
	this.route('currentlyAt',
		{path:'/currentlyAt',
			onBeforeAction: function (pause) {
				if(Meteor.user().profile.currentHotel.checkin == "true") {
	             		this.render('hotelServices');
	            }
	            this.next();
			}
		});
	this.route('reqHistory',{path:'/reqHistory'});
	this.route('preCheckin',{path:'/preCheckin'});
	this.route('hotelServices',{path:'/hotelServices'});
	this.route('roomNumber',{path:'/roomNumber'});
	this.route('admin',{path:'/admin',layoutTemplate: 'layout-admin' });
})