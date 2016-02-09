/**
 * Created by Emily on 26.01.2016.
 */
var EmployeeView = function() {

    this.initialize = function() {
        this.el = $('<div id="changeBackScreen"/>');



        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item

            $('body').on('touchend', '#backTile1', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('touchend', '#backTile2', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('touchend', '#backTile3', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('touchend', '#backTile4', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('touchend', '#backTile5', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('touchend', '#backTile6', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('touchend', '#backTile7', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('touchend', '#backTile8', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mouseup', '#backTile1', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('mouseup', '#backTile2', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('mouseup', '#backTile3', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('mouseup', '#backTile4', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('mouseup', '#backTile5', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('mouseup', '#backTile6', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('mouseup', '#backTile7', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
            $('body').on('mouseup', '#backTile8', function (event) {
                $('#changeBackScreen').trigger('select', [ $(this).css('background-image') ]);
            });
        }
    };

    this.initialize();

    this.render = function() {
        this.el.html(EmployeeView.template());
        return this;
    };

    this.setTiles = function() {
        $('#backTile1').css('background-image', BacksEnum.background_1);
        $('#backTile2').css('background-image', BacksEnum.background_2);
        $('#backTile3').css('background-image', BacksEnum.background_3);
        $('#backTile4').css('background-image', BacksEnum.background_4);
        $('#backTile5').css('background-image', BacksEnum.background_5);
        $('#backTile6').css('background-image', BacksEnum.background_6);
        $('#backTile7').css('background-image', BacksEnum.background_7);
        $('#backTile8').css('background-image', BacksEnum.background_8);
        return this;
    };

    setTimeout(this.setTiles, 100);

};

EmployeeView.template = Handlebars.compile($("#backs-tpl").html());