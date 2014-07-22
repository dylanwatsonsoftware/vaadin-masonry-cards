window.com_github_lotsabackscatter_masonry_Masonry = function() {
    
    /***** Vaadin Added functions *****/

    this.getElement = this.getElement || function () { return $('body'); }; // Added by Vaadin
    this.onClick = this.onClick || function (id) {}; // Added by Vaadin
    this.loadMore = this.loadMore || function () {}; // Added by Vaadin (onLoadComplete is called after this)
    
    /***** Globaly Masonry Variables *****/
    
    var that = this;
    var thisElement = $(this.getElement());
    var animated = [];
    var inited = false;    

    /***** Java callable functions *****/
    
	this.log = this.log || function (msg) {};
	
    this.preloadBackgroundImage = function(clazz) {
        var img = $('<img />');
        img.toggleClass(clazz);
        var backgroundImage = img.css("background-image");
        if (backgroundImage != 'none') {
          img.src = backgroundImage;
        }
    };
    
    this.hasOverflow = function(element) {
    	return element.offsetHeight < element.scrollHeight ||
    		element.offsetWidth < element.scrollWidth;
    };
    
    this.addCard = function(id, title, description, href, colour) {
        if(!href) return;
        if(!colour) colour = '#FFF';
        var card = $('<div class="card glow" style="background-color: ' + colour + '"></div>');
        card.appendTo('.content');
        
        var cardimage = $('<div class="card-image" style="cursor: pointer;"></div>');
        cardimage.click(function() {
            that.onClick(id);
        });

        var dummyImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        $('<img class="not-loaded" src="' + href + '" ' + 'data-original="' + href + '" width="100%" />').appendTo(cardimage);
        cardimage.appendTo(card);

        var textDiv = $('<div style="width: 92%; height: 100%;" />');
        if (title) {
            var summary = $('<h3>' + title + '</h3>');
            summary.appendTo(textDiv);
        }

        var desc;
        if (description) {
            desc = $('<p class="hideOverflow">' + description + '</p>');
            desc.appendTo(textDiv);
        }
        
        textDiv.appendTo(card);

        if(desc && that.hasOverflow(desc[0])) {
	        var expandButton = $('<div class="expand-icon grow" style="cursor: pointer; position: absolute; bottom: 8px; right: 10px;">');
	        expandButton.appendTo(card);
	        
	        expandButton.click(function() {
	            expandButton.toggleClass("collapse-icon");
	            expandButton.toggleClass("expand-icon");
	            
	            if(desc) {
	                desc.toggleClass("hideOverflow");
	            }
	            
	            that.moveToFront(card);
	        });
        }
        
        that.reMasonry();
    };
    
    var lastZ = 0;
    this.moveToFront = function(element) {
    	element.animate({ 'z-index': ++lastZ }, 0);
    };

    this.layMeOut = function() {
        new Masonry('.content');
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
            //doScrollAnimation(null);

            if (!inited) {
                setupScrolling();
                inited = true;
                // Ensure that everything is kept in sync
                setInterval(that.reMasonry, 2000);
            }

            failed = 0;
        } catch (e) {
            failed += 1;
            that.log('Could not find the masonry component. Trying again.');

            if(failed < 10) {
                setTimeout(that.reMasonry, 1000);
            } else {
                that.log('Masonry Cards Failed.');
                that.log(e.stack);
            }
        }
    };

    this.onStateChange = function() { that.reMasonry; };


    this.onLoadComplete = function () {
        that.log('onLoadComplete Start')
        doScrollAnimation("fadeInUp");

        that.layMeOut();

        youImagesLoadedYet();
        setupScrolling();

        that.log('onLoadComplete Complete')
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
            doScrollAnimation(null);
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
                   //animated.removeAll(oel);
               }
            }
        });
    }

    var youImagesLoadedYet = function () {
        var $container = $('.content');
        if($container.length == 0) {
            setTimeout(youImagesLoadedYet, 100);
            that.log('Waiting for images.');
            return;
        }
		
        deferMasonry();
    };

    var setupScrolling = function() {
        var content = $('.content');
        if(content.length != 0) {
            // .v-scrollable if content is not scrollable (set in the css)
            $('.content').off('scroll');
            $('.content').on('scroll', handleScrollEvents);
        } else {
            that.log('Could not complete scroll setup. Trying Again.');
            setTimeout(setupScrolling, 500);
        }
    };

    /********** Main Logic ***********/

    var $container = $('<div class="content"></div>');
    $container.appendTo(thisElement);
    that.log("Content Created.")

    $(document).ready(function () {
        that.log("Starting Masonry")
        that.layMeOut();

        youImagesLoadedYet();

        doScrollAnimation(null);

        setupScrolling();
        
        that.preloadBackgroundImage("collapse-icon");

        that.log("Finishing Masonry")
    });
    
    return this;
};