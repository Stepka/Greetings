/**
 * Created by Emily on 26.01.2016.
 */

var HomeView = function(store) {

    this.greetingCardModel = new GreetingCardModel();
    this.greetingCardModel.background = BacksEnum.background_1;

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div id="homeScreen"/>');

        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchend', '#headerText', function(event) {
                event.stopPropagation();
                event.preventDefault();
                self.onClickOutside(event);
                document.getElementById('changeHeaderLabel').setAttribute('style', 'display:none;');
                document.getElementById('changeHeaderInput').setAttribute('style', 'display:inline;');
                document.getElementById('changeHeaderInput').focus();
                //document.getElementById('changeHeaderInput').select();
            });
            $('body').on('touchend', '#greetingText', function(event) {
                event.stopPropagation();
                event.preventDefault();
                self.onClickOutside(event);
                document.getElementById('changeGreetingTextLabel').setAttribute('style', 'display:none;');
                document.getElementById('changeGreetingTextInput').setAttribute('style', 'display:inline;');
                document.getElementById('changeGreetingTextInput').focus();
                //document.getElementById('changeGreetingTextInput').select();
            });
            $('body').on('touchend', '#playButton', function(event) {
                alert("Проиграть");
            });
            $('body').on('touchend', '#readyButton', function(event) {
                alert("Готово");
            });
            $('body').on('touchend', '#changeBack', function(event) {
                $('#homeScreen').trigger('changeBack');
            });
            $('body').on('touchend', '#photoBevel', function(event) {
                //$('#openUploadDialog').trigger('click');
                event.preventDefault();
                self.mobileBrowseImage();

            });
            $('body').on('touchend', '#photoCanvas', function(event) {
                //$('#openUploadDialog').trigger('click');
                event.preventDefault();
                self.mobileBrowseImage();

            });
            $('body').on('touchend', function(event) {
                self.onClickOutside(event);
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mouseup', '#headerText', function(event) {
                //alert("Меняем заголовок");
                event.stopPropagation();
                event.preventDefault();
                self.onClickOutside(event);
                document.getElementById('changeHeaderLabel').setAttribute('style', 'display:none;');
                document.getElementById('changeHeaderInput').setAttribute('style', 'display:inline;');
                document.getElementById('changeHeaderInput').focus();
                document.getElementById('changeHeaderInput').select();
            });
            $('body').on('mouseup', '#greetingText', function(event) {
                event.stopPropagation();
                event.preventDefault();
                self.onClickOutside(event);
                document.getElementById('changeGreetingTextLabel').setAttribute('style', 'display:none;');
                document.getElementById('changeGreetingTextInput').setAttribute('style', 'display:inline;');
                document.getElementById('changeGreetingTextInput').focus();
                document.getElementById('changeGreetingTextInput').select();
            });
            $('body').on('mouseup', '#playButton', function(event) {
                alert("Проиграть");
            });
            $('body').on('mouseup', '#readyButton', function(event) {
                alert("Готово");
            });
            $('body').on('mouseup', '#changeBack', function(event) {
                $('#homeScreen').trigger('changeBack');
            });
            $('body').on('mouseup', '#photoBevel', function(event) {
                self.desktopBrowseImage();
            });
            $('body').on('mouseup', '#photoCanvas', function(event) {
                self.desktopBrowseImage();
            });
            $('body').on('mouseup', function(event) {
                self.onClickOutside(event);
            });
        }
    };



    this.updateScreen = function() {
        $('body').css('background-image', this.greetingCardModel.background);
        return this;
    };



    this.render = function() {
        this.updateScreen();
        this.el.html(HomeView.template());

        return this;
    };



    this.desktopBrowseImage = function() {

        var self = this;
        $('#openUploadDialog').change(function() {
            if (this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    self.drawPhoto(e.target.result);
                }

                reader.readAsDataURL(this.files[0]);
            }
            else {
            }
        });

        $('#openUploadDialog').trigger('click');
    }



    this.mobileBrowseImage = function() {

        var self = this;
        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }
        var options =   {   quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 2,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        };

        navigator.camera.getPicture(
            function(imageData) {

                //document.getElementById('getPhotoLabel').setAttribute('style', 'display:none;');
                //document.getElementById('photoMain').setAttribute('style', 'display:inline;');
                //
                //document.getElementById('photoMain').setAttribute('src', "data:image/jpeg;base64," + imageData);

                self.drawPhoto("data:image/jpeg;base64," + imageData);
            },
            function() {
                app.showAlert('Error taking picture', 'Error');
            },
            options);

        return false;
    }



    this.drawPhoto = function(source) {
        var canvas=document.getElementById("photoCanvas");
        canvas.width = document.getElementById('photoBevel').offsetWidth;
        canvas.height = document.getElementById('photoBevel').offsetHeight;
        var ctx=canvas.getContext("2d");
        alert("ctx = " + ctx);


        document.getElementById('getPhotoLabel').setAttribute('style', 'display:none;');
        document.getElementById('photoBevel').setAttribute('style', 'display:none;');
        //document.getElementById('photoMain').setAttribute('style', 'display:inline;');
        document.getElementById('photoCanvas').setAttribute('style', 'display:inline;');

        var img = new Image();
        img.src = source;

        img.onload = function () {

            var maskImg = new Image();
            maskImg.src = "img/PhotoBevel.png";

            maskImg.onload = function () {


                var bevelImage = new Image();
                bevelImage.src = "img/EmptyPhotoBevel.png";

                bevelImage.onload = function () {

                    var scale = img.width / img.height;

                    canvas.width = img.width;
                    canvas.height = img.height;

                    // save the context state
                    ctx.save();

                    /// draw the shape we want to use for clipping
                    ctx.drawImage( maskImg, 0, 0, canvas.width, canvas.width / scale);

                    /// change composite mode to use that shape
                    ctx.globalCompositeOperation = 'source-in';

                    /// draw the image to be clipped
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.width / scale);


                    /// change composite mode to use that shape
                    ctx.globalCompositeOperation = 'source-over';

                    /// draw the shape we want to use for clipping
                    ctx.drawImage( bevelImage, 0, 0, canvas.width, canvas.width / scale);

                    // restore the context to it's original state
                    ctx.restore();

                }

            }
        }

        return this;
    };



    this.getPhoto = function () {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
    }

    this.onClickOutside = function(event) {

        document.getElementById('changeHeaderLabel').setAttribute('style', 'display:inline;');
        document.getElementById('changeHeaderInput').setAttribute('style', 'display:none;');
        document.getElementById('changeHeaderLabel').innerHTML = document.getElementById('changeHeaderInput').value ;

        document.getElementById('changeGreetingTextLabel').setAttribute('style', 'display:inline;');
        document.getElementById('changeGreetingTextInput').setAttribute('style', 'display:none;');
        document.getElementById('changeGreetingTextLabel').innerHTML = document.getElementById('changeGreetingTextInput').value ;
    }

    this.initialize();
};

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());