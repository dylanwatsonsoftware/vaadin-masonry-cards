package com.github.lotsabackscatter.masonry;

import static com.google.common.base.Objects.firstNonNull;
import static com.google.common.base.Preconditions.checkNotNull;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;

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
        "vaadin://addons/masonry/js/prototypes.js",
        "vaadin://addons/masonry/js/masonry_connector.js" })
@StyleSheet({ "vaadin://addons/masonry/css/animate.css",
        "vaadin://addons/masonry/css/hover.css",
        "vaadin://addons/masonry/css/styles.css" })
public class MasonryCards extends AbstractJavaScriptComponent {

    private static final long serialVersionUID = 1L;

    /**
     * Listeners mapped by id, fired when an image is clicked.
     */
    private final Map<String, ClickListener> listeners = new HashMap<String, ClickListener>();

    /**
     * Listeners mapped by id, fired when an edit button is clicked.
     */
    private final Map<String, ClickListener> editClicklisteners = new HashMap<String, ClickListener>();

    /**
     * Listeners mapped by id, fired when a reply button is clicked.
     */
    private final Map<String, ClickListener> replyClicklisteners = new HashMap<String, ClickListener>();

    /**
     * The {@link LoadRequester} called when more cards are required.
     */
    private LoadRequester loadRequester = null;

    /**
     * Constructor of the class.
     */
    public MasonryCards() {
        addFunction("onClick", new ClickResponder(listeners));
        addFunction("onEditClick", new ClickResponder(editClicklisteners));
        addFunction("onReplyClick", new ClickResponder(replyClicklisteners));
        addFunction("loadMore", new LoadMoreResponder());
    }

    /**
     * Adds a card to the Masonry component.
     * 
     * @param id
     *            the unique id of the card
     * @param name
     *            the name of the card
     * @param description
     *            the description of the card
     * @param url
     *            the url of the image
     * @param cardColour
     *            the css colour of the card
     * @param clickListener
     *            the listener, fired when the image is clicked
     */
    public void addCard(@Nonnull String id, @Nonnull String name,
            @Nonnull String description, @CheckForNull String url,
            @CheckForNull String cardColour,
            @CheckForNull ClickListener clickListener) {
        addCard(id, name, description, url, cardColour, clickListener,
                Collections.<Comment> emptyList());
    }

    /**
     * Adds a card to the Masonry component.
     * 
     * @param id
     *            the unique id of the card
     * @param name
     *            the name of the card
     * @param description
     *            the description of the card
     * @param url
     *            the url of the image
     * @param cardColour
     *            the css colour of the card
     * @param clickListener
     *            the listener, fired when the image is clicked
     * @param comments
     *            the comments of the card
     */
    public void addCard(@Nonnull String id, @Nonnull String name,
            @Nonnull String description, @CheckForNull String url,
            @CheckForNull String cardColour,
            @CheckForNull ClickListener clickListener,
            @CheckForNull List<Comment> comments) {
        addCard(id, name, description, url, cardColour, clickListener, null,
                null, comments);
    }

    /**
     * Adds a card to the Masonry component.
     * 
     * @param id
     *            the unique id of the card
     * @param name
     *            the name of the card
     * @param description
     *            the description of the card
     * @param url
     *            the url of the image
     * @param cardColour
     *            the css colour of the card
     * @param clickListener
     *            the listener, fired when the image is clicked
     * @param editClickListener
     *            the listener, fired when the edit button is clicked
     * @param replyClickListener
     *            the listener, fired when the reply button is clicked
     * @param comments
     *            the comments of the card
     */
    public void addCard(@Nonnull String id, @Nonnull String name,
            @Nonnull String description, @CheckForNull String url,
            @CheckForNull String cardColour,
            @CheckForNull ClickListener clickListener,
            @CheckForNull ClickListener editClickListener,
            @CheckForNull ClickListener replyClickListener,
            @CheckForNull List<Comment> comments) {
        checkNotNull(id);
        checkNotNull(name);
        checkNotNull(description);

        if (clickListener != null) {
            listeners.put(id, clickListener);
        }

        if (editClickListener != null) {
            editClicklisteners.put(id, editClickListener);
        }

        if (replyClickListener != null) {
            replyClicklisteners.put(id, replyClickListener);
        }

        List<Map<String, String>> commentsList = new ArrayList<Map<String, String>>();
        if (comments != null) {
            for (Comment comment : comments) {
                commentsList.add(comment.toMap());
            }
        }

        firstNonNull(cardColour, "white");

        callFunction("addCard", id, name, description, url, cardColour,
                commentsList);
    }

    /**
     * Updates the card with the given id.
     * 
     * @param id
     *            the unique id of the card
     * @param name
     *            the name of the card
     * @param description
     *            the description of the card
     * @param url
     *            the url of the image
     * @param cardColour
     *            the css colour of the card
     * @param clickListener
     *            the listener, fired when the image is clicked
     * @param editClickListener
     *            the listener, fired when the edit button is clicked
     * @param replyClickListener
     *            the listener, fired when the reply button is clicked
     * @param comments
     *            the comments of the card
     */
    public void updateCard(@Nonnull String id, @Nonnull String name,
            @Nonnull String description, @CheckForNull String url,
            @CheckForNull String cardColour,
            @CheckForNull ClickListener clickListener,
            @CheckForNull ClickListener editClickListener,
            @CheckForNull ClickListener replyClickListener,
            @CheckForNull List<Comment> comments) {
        checkNotNull(id);
        checkNotNull(name);
        checkNotNull(description);

        if (clickListener != null) {
            listeners.put(id, clickListener);
        }

        if (editClickListener != null) {
            editClicklisteners.put(id, editClickListener);
        }

        if (replyClickListener != null) {
            replyClicklisteners.put(id, replyClickListener);
        }

        List<Map<String, String>> commentsList = new ArrayList<Map<String, String>>();
        if (comments != null) {
            for (Comment comment : comments) {
                commentsList.add(comment.toMap());
            }
        }

        firstNonNull(cardColour, "white");

        callFunction("updateCard", id, name, description, url, cardColour,
                commentsList);
    }

    /**
     * Forces a relayout of the Masonry component.
     */
    public void relayout() {
        callFunction("reMasonry");
    }

    /**
     * Sets the {@link LoadRequester}.
     * 
     * @param loadRequester
     *            called when Masonry component requests more cards.<br>
     *            I.e When the component is scrolled to the bottom.
     */
    public void setLoadRequester(@Nonnull LoadRequester loadRequester) {
        this.loadRequester = loadRequester;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected MasonryState getState() {
        return (MasonryState) super.getState();
    }

    /**
     * A function (callable by Javascript) that when called, loads more cards.
     */
    private final class LoadMoreResponder implements JavaScriptFunction {

        private static final long serialVersionUID = 1L;

        @Override
        public void call(JSONArray arguments) throws JSONException {
            if (loadRequester != null) {
                loadRequester.loadMore();
            }

            callFunction("onLoadComplete");
        }
    }

    /**
     * A function (callable by Javascript) that when called with a given id,
     * fires the corresponding {@link ClickListener}.
     */
    private final class ClickResponder implements JavaScriptFunction {

        private static final long serialVersionUID = 1L;

        @Nonnull
        private final Map<String, ClickListener> listeners;

        /**
         * Constructor of the class.
         * 
         * @param listeners
         */
        public ClickResponder(@Nonnull Map<String, ClickListener> listeners) {
            this.listeners = listeners;
        }

        /**
         * {@inheritDoc}
         */
        @Override
        public void call(JSONArray arguments) throws JSONException {
            String id = arguments.getString(0);

            click(id);
        }

        /**
         * Fires the {@link ClickListener} that corresponds to the given id.
         * 
         * @param id
         *            the id
         */
        private void click(String id) {
            final ClickListener clickListener = listeners.get(id);
            if (clickListener != null) {
                clickListener.onClick();
            }
        }
    }
}
