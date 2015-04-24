Router.configure({
  layoutTemplate: 'layout',
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
	            // render the login template but keep the url in the browser the same
	         	   this.render('hotelSelect');
	        }}
        });
	this.route('currentlyAt',{path:'/currentlyAt'});
	this.route('hotelSelect',{path:'/hotelSelect'});
	this.route('reqHistory',{path:'/reqHistory'});
	this.route('preCheckin',{path:'/preCheckin'});
	this.route('hotelServices',{path:'/hotelServices'});
	this.route('roomNumber',{path:'/roomNumber'});
})