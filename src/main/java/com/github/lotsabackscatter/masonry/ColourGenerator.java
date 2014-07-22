package com.github.lotsabackscatter.masonry;

/**
 * Generates random colours
 * 
 * @author watsond
 */
public class ColourGenerator {

    /**
     * @return a {@link String} representing a random pastel colour
     */
    public static String getColour() {
        return Math.random() * 6 < 5 ? "white" : "rgb("
                + getRandomPastelChannel() + "," + getRandomPastelChannel()
                + "," + getRandomPastelChannel() + ")";
    }

    private static double getRandomPastelChannel() {
        return Math.floor((256 - 229) * Math.random()) + 230;
    }
}