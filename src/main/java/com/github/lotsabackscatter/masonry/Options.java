package com.github.lotsabackscatter.masonry;

import com.google.gson.Gson;

public class Options {
    private static final Gson gson = new Gson();
    public Integer columnWidth;
    public Integer gutter;
    public boolean isFitWidth = false;
    public boolean isInitLayout = false;
    public boolean isOriginLeft = true;
}