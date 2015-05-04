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

//check if logged in and reroute.
Router.map(function(){
	this.route('login',
		{path:'/',
			onBeforeAction: function (pause) {
	            if (Meteor.userId()) {
	            // router.go changes the url as well, as upposed to this.render()
	         	   Router.go('hotelSelect');
	        	}
	        	//need to enter this to guarantee page loading.  Else page fails.
	        	this.next();
	        }
        });
	this.route('hotelSelect',
		{path:'/hotelSelect',
			onBeforeAction: function (pause) {				
				if(Meteor.user().profile.currentHotel.hotel_id){
					Router.go('currentlyAt');
				}
				this.next();
			}
		});
	this.route('currentlyAt',
		{path:'/currentlyAt',
			onBeforeAction: function (pause) {
				if(Meteor.user().profile.currentHotel.checkin == "true"){
					console.log("Checkin: " + Meteor.user().profile.currentHotel.checkin);
					Router.go('hotelServices');
				}
				this.next();
			}
		});
	this.route('reqHistory',{path:'/reqHistory'});
	this.route('preCheckin',{path:'/preCheckin'});
	this.route('hotelServices',{path:'/hotelServices'});
	this.route('roomNumber',{path:'/roomNumber'});
	this.route('profile',{path:'/profile'});
	this.route('admin',{path:'/admin',layoutTemplate: 'layout-admin' });
})