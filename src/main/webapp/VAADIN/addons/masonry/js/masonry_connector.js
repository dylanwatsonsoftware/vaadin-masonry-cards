window.com_github_lotsabackscatter_masonry_Masonry = function() {
    var that = this;
    var thisElement = $(this.getElement());
    var animated = [];

    var $container = $('<div class="content"></div>');
    $container.appendTo(thisElement);

    this.addCard = function(id, title, description, href, colour) {
        if(!colour) colour = '#FFF';
        var card = $('<div class="card" style="background-color: ' + colour + '"></div>');
        card.appendTo($container);

        var cardimage = $('<div class="card-image" style="cursor: pointer; background-image:url(\'' + href + '\')"></div>');
        card.click(function() {
            that.onClick(id);
        });
        cardimage.appendTo(card);

        $('<div class="banner"></div>').appendTo(cardimage);
        var summary = $('<h3>' + title + '</h3>');
        summary.appendTo(cardimage);

        var desc = $('<p>' +  description +'</p>');
        desc.appendTo(card);

        that.reMasonry();
    };

    this.reMasonry = function () {
        $(document).ready(function () {
            try {
                new Masonry('.content');
                doScrollAnimation(null);
                setupScrolling();
            } catch (e) {
                console.log('Could not find the masonry component. Trying again.')
                setTimeout(that.reMasonry, 100);
            }
        });
    };

    $(document).ready(function () {
        that.reMasonry();
    });

    this.onStateChange = this.reMasonry;

    /***** Animation Setup *****/
    function addAnimation(el, animation) {
        if(!animation){
            return;
        }

        el.addClass("animated " + animation);
        el.attr("visibility", "visible");
        el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            el.removeClass("animated " + animation);
        });
    }

    function setupScrolling() {
        var lastScrollTop = 0;
        // TODO Will get events for any scroll pane. Probably overkill :S
        $('.v-scrollable').scroll(function(event){
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
        });
    }

    function doScrollAnimation(animation) {
        $(".card").each(function (i, oel) {
            var el = $(oel);
            if (el.visible(true)) {
                if(!animated.contains(oel)) {
                    animated.push(oel);
                    addAnimation(el, animation);
                }
            } else {
                animated.removeAll(oel);
            }
        });
    }

};