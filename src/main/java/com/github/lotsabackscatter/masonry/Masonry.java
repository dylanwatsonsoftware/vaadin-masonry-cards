package com.github.lotsabackscatter.masonry;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONException;

import com.vaadin.annotations.JavaScript;
import com.vaadin.annotations.StyleSheet;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.JavaScriptFunction;

/**
 * A Vaadin Component representing a Masonry Card Layout.
 * 
 * @author watsond
 */
@JavaScript({ "vaadin://addons/masonry/js/thirdparty/jquery.min.js",
        "vaadin://addons/masonry/js/thirdparty/masonry.pkgd.min.js",
        "vaadin://addons/masonry/js/thirdparty/jquery.visible.js",
        "vaadin://addons/masonry/js/thirdparty/imagesloaded.pkgd.min.js",
        "vaadin://addons/masonry/js/thirdparty/jquery.lazyload.js",
        "vaadin://addons/masonry/js/prototypes.js",
        "vaadin://addons/masonry/js/masonry_connector.js" })
@StyleSheet({ "vaadin://addons/masonry/css/animate.css",
        "vaadin://addons/masonry/css/hover.css",
        "vaadin://addons/masonry/css/styles.css" })
public class Masonry extends AbstractJavaScriptComponent {

    private static final long serialVersionUID = 1L;

    private final Map<UUID, ClickListener> listeners = new HashMap<UUID, ClickListener>();

    private LoadRequester loadMoreListener = null;

    public Masonry() {
        addFunction("onClick", new JavaScriptFunction() {

            private static final long serialVersionUID = 1L;

            /**
             * {@inheritDoc}
             */
            @Override
            public void call(JSONArray arguments) throws JSONException {
                UUID id = UUID.fromString(arguments.getString(0));

                final ClickListener clickListener = listeners.get(id);
                if (clickListener != null) {
                    clickListener.onClick();
                }
            }
        });

        addFunction("loadMore", new JavaScriptFunction() {

            private static final long serialVersionUID = 1L;

            /**
             * {@inheritDoc}
             */
            @Override
            public void call(JSONArray arguments) throws JSONException {
                if (loadMoreListener != null) {
                    loadMoreListener.loadMore();
                }

                callFunction("onLoadComplete");
            }
        });
    }

    public void setLoadRequester(LoadRequester loadRequester) {
        this.loadMoreListener = loadRequester;
    }

    public void addCard(String name, String description, String href,
            String cssCardColour, ClickListener clickListener) {
        UUID id = UUID.randomUUID();

        if (clickListener != null) {
            listeners.put(id, clickListener);
        }

        callFunction("addCard", id.toString(), name, description, href,
                cssCardColour);
    }

    public void relayout() {
        callFunction("reMasonry");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected MasonryState getState() {
        return (MasonryState) super.getState();
    }
}
