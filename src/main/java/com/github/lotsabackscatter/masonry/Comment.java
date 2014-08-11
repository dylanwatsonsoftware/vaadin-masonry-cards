/*
 * Developed by Thales Australia, 2014
 */
package com.github.lotsabackscatter.masonry;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.concurrent.Immutable;

/**
 * A comment on a Masonry card.
 * 
 * @author watsond
 */
@Immutable
public class Comment {

    @Nonnull
    private final String imageUrl;

    @Nonnull
    private final String html;

    /**
     * Constructor of the class.
     * 
     * @param imageUrl
     *            the url of the image
     * @param html
     *            the html representing the comment
     */
    public Comment(@Nonnull String imageUrl, @Nonnull String html) {
        this.imageUrl = checkNotNull(imageUrl);
        this.html = checkNotNull(html);
    }

    /**
     * @return the image url
     */
    @Nonnull
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * @return the comment html
     */
    @Nonnull
    public String getHtml() {
        return html;
    }

    /**
     * @return a map representing the comment
     */
    @Nonnull
    public Map<String, String> toMap() {
        final HashMap<String, String> map = new HashMap<String, String>();
        map.put("imageUrl", imageUrl);
        map.put("html", html);
        return map;
    }
}
