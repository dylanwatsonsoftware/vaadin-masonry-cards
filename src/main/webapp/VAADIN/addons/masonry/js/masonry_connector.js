window.com_github_lotsabackscatter_masonry_Masonry = function() {
    
    /***** Vaadin Added functions *****/

    this.getElement = this.getElement || function () { return $('body'); }; // Added by Vaadin
    this.onClick = this.onClick || function (id) {}; // Added by Vaadin
    this.onEditClick = this.onEditClick || function (id) {}; // Added by Vaadin
    this.onReplyClick = this.onReplyClick || function (id) {}; // Added by Vaadin
    this.loadMore = this.loadMore || function () {}; // Added by Vaadin (onLoadComplete is called after this)
    
    /***** Globaly Masonry Variables *****/
    
    var that = this;
    var thisElement = $(this.getElement());
    var animated = [];
    var inited = false;    

    /***** Java callable functions *****/
    
    this.log = this.log || function (msg) {};
    
    this.getId = function (id) {
    	id = id || '';
        return id.replace(' ', '');
    };
    
    
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
    
    this.updateCard = function(id, title, description, href, colour, comments) {
    	id = that.getId(id);
        var oldCard = $('.content #' + id);
        
        var newCard = that.createCard(id, colour);
        oldCard.replaceWith(newCard);
        
        that.populateCard(newCard, id, title, description, href, colour, comments, true);
        
        that.reMasonry();
    };
    
    this.addCard = function(id, title, description, href, colour, comments, expanded) {
    	id = that.getId(id);
        var card = that.createCard(id, colour);
        card.appendTo('.content');
        
        that.populateCard(card, id, title, description, href, colour, comments, false);
           
        that.reMasonry();
    };
    
    this.createCard = function(id, colour){
    	id = that.getId(id);
        if(!colour) colour = '#FFF';
        var card = $('<div id="' + id + '" class="card glow" style="background-color: ' + colour + '"></div>');
        return card;
    };
    
    this.populateCard = function(card, id, title, description, href, colour, comments, expanded) {
    	id = that.getId(id);
    	if(href) {
            var cardimage = $('<div class="card-image" style="cursor: pointer;"></div>');
            cardimage.click(function() {
                that.onClick(id);
            });

            $('<img src="' + href + '" width="100%" />').appendTo(cardimage);
            cardimage.appendTo(card);
        }

        var textDiv = $('<div style="width: 92%; height: 100%;" />');
        if (title) {
            var summary = $('<h3>' + title + '</h3>');
            summary.appendTo(textDiv);
            summary.addClass('showOverflow');
        }

        var desc;
        if (description) {
            desc = $('<p>' + description + '</p>');
            desc.addClass(expanded ? "showOverflow" : "hideOverflow");
            desc.appendTo(textDiv);
        }
        
        textDiv.appendTo(card);
        
        var icons = $('<div></div>');
        icons.addClass(expanded ? "icons-expanded" : "icons-collapsed");
        
        var hasDescriptionOverflow = desc && that.hasOverflow(desc[0]);
        var hasComments = comments && comments.length != 0;
        
        var editButton = $('<div class="edit-icon grow"></div>');
        editButton.appendTo(icons);
        editButton.click(function(){
            that.onEditClick(id, comments);
        });
        
        var replyButton = $('<div class="reply-icon grow"></div>');
        replyButton.appendTo(icons);
        replyButton.click(function(){
            that.onReplyClick(id, comments);
        });
        
        if(hasDescriptionOverflow || hasComments) {
            var expandButton = $('<div class="grow"></div>');
            expandButton.appendTo(icons);
            expandButton.addClass(expanded ? "collapse-icon" : "expand-icon");
            
            var commentsSummary = $('<div id="commentsSummary" class="replySummary"></div>');
            var commentsDiv = $('<div id="comments" style="width: 100%;"></div>');
            if(expanded) {
                commentsSummary.addClass('hide');
            }else {
                commentsDiv.addClass('hide');
            }
            
            if (hasComments) {
                commentsSummary.text( comments.length == 1 ? '1 reply' : comments.length + ' replies');
                commentsSummary.appendTo(card);
                commentsDiv.appendTo(card);
                for (i = 0; i < comments.length; i++) {
                    var comment = comments[i];
                    var hr = $('<hr />');
                    hr.appendTo(commentsDiv);
                    if(i != 0){
                        hr.css('margin-top: 10px;');
                    }
                    var replyDiv = $('<div class="reply"></div>');
                    replyDiv.appendTo(commentsDiv);
                    console.log(comment);
                    $('<div class="thumb" style="float: left; width: 32px; height: 32px; background-image: url(\'' + comment.imageUrl + '\'); background-size: cover;" width="100%"></div>').appendTo(replyDiv);
                    var pDiv = $('<div style="padding-left: 32px; padding-bottom: 5px; padding-right: 20px;"></div>');
                     var pEl = $('<p></p>');
                    pEl.html(comment.html);
                    pEl.appendTo(pDiv);
                    pDiv.appendTo(replyDiv);
                }
                $('<hr />').appendTo(commentsDiv);
            }

            var expander = function() {
                expandButton.toggleClass("collapse-icon");
                expandButton.toggleClass("expand-icon");
                icons.toggleClass("icons-expanded");
                icons.toggleClass("icons-collapsed");
                
                if(desc) {
                    desc.toggleClass("hideOverflow");
                    desc.toggleClass("showOverflow");
                }
                
                if(comments){
                    commentsDiv.toggleClass("hide");
                    commentsSummary.toggleClass("hide");
                }
                
                that.reMasonry();
            }
            
            expandButton.click(expander);
            commentsSummary.click(expander);
        }
        
        icons.appendTo(card);
        
        return card;
    };

    this.layMeOut = function() {
        var msnry = new Masonry('.content');
        //msnry.stamp( '#loadButton' );
    };

    function deferMasonry() {
        setTimeout(that.layMeOut, 1000);
    }

    var failed = 0;
    this.reMasonry = function () {
        try {
            console.log('reMasonrying');
            that.layMeOut();

            youImagesLoadedYet();

            // Handle scroll stuff
            //doScrollAnimation(null);

            if (!inited) {
                setupScrolling();
                inited = true;
                // Ensure that everything is kept in sync
                setInterval(that.reMasonry, 5000);
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
    
    /*var loadMoreButton = $('<button id="loadButton" style="position: relative; bottom: 0px;">Load More...</button>');
    loadMoreButton.click(function() {
        that.loadMore();
    });
    loadMoreButton.appendTo($container);*/
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