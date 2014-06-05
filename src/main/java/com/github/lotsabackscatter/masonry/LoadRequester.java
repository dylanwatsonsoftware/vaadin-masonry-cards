package com.github.lotsabackscatter.masonry;

/**
 * Provides the ability to load more cards into masonry on scroll.
 *
 * @author watsond
 */
public interface LoadRequester {

    /**
     * Fired whenever masonry would like to load more items.<br>
     * Generally, this is on scrolling to the bottom.
     */
    void loadMore();
}