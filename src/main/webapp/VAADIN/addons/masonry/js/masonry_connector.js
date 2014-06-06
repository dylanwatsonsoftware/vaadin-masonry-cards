window.com_github_lotsabackscatter_masonry_Masonry = function() {

    /***** Java callable functions *****/

    // this.onClick = function () {}; // Added by Vaadin
    // this.loadMore = function () {}; // Added by Vaadin (onLoadComplete is called after this)

    this.addCard = function(id, title, description, href, colour) {
        if(!colour) colour = '#FFF';
        var card = $('<div class="card" style="background-color: ' + colour + '"></div>');

        var cardimage = $('<div class="card-image" style="cursor: pointer;"></div>');
        card.click(function() {
            that.onClick(id);
        });

        var dummyImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        $('<img class="not-loaded" src="' + href + '" ' + 'data-original="' + href + '" width="100%" />').appendTo(cardimage);
        cardimage.appendTo(card);

        if (title) {
            var summary = $('<h3>' + title + '</h3>');
            summary.appendTo(cardimage);
        }

        if (description) {
            var desc = $('<p>' + description + '</p>');
            desc.appendTo(card);
        }

        card.appendTo('.content');

        that.reMasonry();
    };


    var msnry = null;
    this.layMeOut = function() {
        msnry = new Masonry('.content');
    };

    function deferMasonry() {
        setTimeout(that.layMeOut, 1000);
    }

    var failed = 0;
    this.reMasonry = function () {
        try {
            that.layMeOut();

            youImagesLoadedYet();

            // Handle scroll stuff
            doScrollAnimation("fadeInUp");

            if (!inited) {
                setupScrolling();
                inited = true;
                // Ensure that everything is kept in sync
                setInterval(that.reMasonry, 5000);
            }

            failed = 0;
        } catch (e) {
            failed += 1;
            console.log('Could not find the masonry component. Trying again.');

            if(failed < 10) {
                setTimeout(that.reMasonry, 1000);
            } else {
                console.log('Masonry Cards Failed.');
                console.log(e.stack);
            }
        }
    };

    this.onStateChange = function() { that.reMasonry; };


    this.onLoadComplete = function () {
        console.log('onLoadComplete Start')
        doScrollAnimation("fadeInUp");

        that.layMeOut();

        youImagesLoadedYet();
        setupScrolling();

        console.log('onLoadComplete Complete')
    };

    /***** Animation Setup *****/
    var addAnimation = function (el, animation) {
        if(!animation){
            return;
        }

        el.addClass("animated " + animation);
        el.attr("visibility", "visible");
        el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            el.removeClass("animated " + animation);
        });
    }

    /***** Functions *****/

    var lastScrollTop = 0;
    var handleScrollEvents = function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            // downscroll code
            doScrollAnimation("fadeInUp");
        } else {
           // upscroll code
            //doScrollAnimation("fadeInDown");
            doScrollAnimation(null);
        }
        lastScrollTop = st;

         if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
             $(this).off('scroll', handleScrollEvents);
             that.loadMore();
         }
    };

    var doScrollAnimation = function (animation) {
        $(".card").each(function (i, oel) {
            var el = $(oel);
            try {
                if (el.visible(true)) {
                    if(!animated.contains(oel)) {
                        animated.push(oel);
                        addAnimation(el, animation);
                    }
                } else {
                    animated.removeAll(oel);
                }
            } catch (e) {
               if(!animated.contains(oel)) {
                   animated.push(oel);
                   addAnimation(el, animation);
               } else {
                   animated.removeAll(oel);
               }
            }
        });
    }

    var youImagesLoadedYet = function () {
        var $container = $('.content');
        if($container.length == 0) {
            setTimeout(youImagesLoadedYet, 100);
            console.log('youImagesLoadedYet Not ready');
            return;
        }

//        $container.imagesLoaded(function () {

            $('.card-image img.not-loaded').lazyload({
                effect: 'fadeIn',
                threshold: 200,
                container: $(".content"),
                failure_limit: 10,
                load: function () {
                    // Disable trigger on this image
                    $(this).removeClass("not-loaded");
                    deferMasonry();
                    //$('.card-image img.not-loaded').trigger('scroll');
                }
            });
            deferMasonry();
            //$('.card-image img.not-loaded').trigger('scroll');
//        });
    };

    var createLoadingElement = function () {
        // create loading element
        var loadingElement = document.createElement('div');
        loadingElement.id = 'loading';
        loadingElement.className = 'loading';
        loadingElement.innerHTML = 'Loading...';

        // apply styles
        loadingElement.style.position = 'fixed';
        loadingElement.style.background = 'yellow';
        loadingElement.style.width = '130px';
        loadingElement.style.textAlign = 'center';
        loadingElement.style.zIndex = '10000';
        loadingElement.style.padding = '4px';
        loadingElement.style.border = 'grey solid 1px';
        loadingElement.style.display = 'none';

        // attach it to DOM
        $('body').append(loadingElement);

        // position element
        $("#loading").position({
            my: "center top",
            at: "center top",
            of: window
        });
    };

    var setupScrolling = function() {
        var content = $('.content');
        if(content.length != 0) {
            // .v-scrollable if content is not scrollable (set in the css)
            $('.content').off('scroll');
            $('.content').on('scroll', handleScrollEvents);
        } else {
            console.log('Could not complete scroll setup. Trying Again.');
            setTimeout(setupScrolling, 500);
        }
    };

    /********** Main Logic ***********/
    var that = this;
    var thisElement = $(this.getElement());
    var animated = [];
    var inited = false;

    var $container = $('<div class="content"></div>');
    $container.appendTo(thisElement);
    console.log("Content Created.")

    $(document).ready(function () {
        console.log("Starting Masonry")
        that.layMeOut();

        youImagesLoadedYet();

        doScrollAnimation("fadeInUp");

        setupScrolling();

        console.log("Finishing Masonry")
    });
};