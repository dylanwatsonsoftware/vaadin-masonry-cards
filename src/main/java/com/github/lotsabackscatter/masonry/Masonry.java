package com.github.lotsabackscatter.masonry;

import com.vaadin.annotations.JavaScript;
import com.vaadin.annotations.StyleSheet;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.JavaScriptFunction;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * A Vaadin Component representing a Masonry Card Layout.
 *
 * @author watsond
 */
@JavaScript({"vaadin://addons/masonry/js/thirdparty/jquery.min.js",
        "vaadin://addons/masonry/js/thirdparty/jquery.visible.js",
        "vaadin://addons/masonry/js/thirdparty/masonry.pkgd.min.js",
        "vaadin://addons/masonry/js/animation.js",
        "vaadin://addons/masonry/js/masonry_connector.js"})
@StyleSheet({"vaadin://addons/masonry/css/animate.css", "vaadin://addons/masonry/css/styles.css"})
public class Masonry extends AbstractJavaScriptComponent {

    private static final long serialVersionUID = 1L;
    private Map<UUID, MasonryClickListener> listeners = new HashMap<UUID, MasonryClickListener>();

    public Masonry() {
        addFunction("onClick", new JavaScriptFunction() {

            private static final long serialVersionUID = 1L;

            /**
             * {@inheritDoc}
             */
            @Override
            public void call(JSONArray arguments) throws JSONException {
                UUID id = UUID.fromString(arguments.getString(0));

                final MasonryClickListener clickListener = listeners.get(id);
                if (clickListener != null) {
                    clickListener.onClick();
                }
            }
        });
    }

    public void addCard(String name, String description, String href, String cssCardColour, MasonryClickListener clickListener) {
        UUID id = UUID.randomUUID();

        if (clickListener != null) {
            listeners.put(id, clickListener);
        }

        callFunction("addCard", id.toString(), name, description, href, cssCardColour);
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
