/**
 * Created by Emily on 26.01.2016.
 */

var HomeView = function(store) {

    this.greetingCardModel = new GreetingCardModel();
    this.greetingCardModel.background = BacksEnum.background_1;

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        var that = this;
    };

    this.render = function() {
        $('body').css('background-image', 'url(' + this.greetingCardModel.background + ')');
        this.el.html(HomeView.template());

        var deg = 66;

        //this.el.style.webkitTransform = 'rotate('+deg+'deg)';
        //this.el.style.mozTransform    = 'rotate('+deg+'deg)';
        //this.el.style.msTransform     = 'rotate('+deg+'deg)';
        //this.el.style.oTransform      = 'rotate('+deg+'deg)';
        //this.el.style.transform       = 'rotate('+deg+'deg)';

        return this;
    };

    this.initialize();
};

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());