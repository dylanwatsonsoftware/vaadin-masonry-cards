Vaadin Masonry Image Cards
=======================

[![Build Status](https://travis-ci.org/lotsabackscatter/vaadin-masonry-cards.svg?branch=master)](https://travis-ci.org/lotsabackscatter/vaadin-masonry-cards)
[![Stories in Ready](https://badge.waffle.io/lotsabackscatter/vaadin-masonry-cards.png)](http://waffle.io/lotsabackscatter/vaadin-masonry-cards)
[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.github.lotsabackscatter/vaadin-masonry-cards/badge.png)](https://maven-badges.herokuapp.com/maven-central/com.github.lotsabackscatter/vaadin-masonry-cards/badge.png)

A [Vaadin 7][1] component for displaying Image Cards in a Masonry Layout.

Thanks to Andrew Trice's [Cards UI][2] for the initial inspiration!


![Masonry Cards Example Image][4]

Download
--------

Download the latest release via Maven Central:
```xml
<dependency>
    <groupId>com.github.lotsabackscatter</groupId>
    <artifactId>vaadin-masonry-cards</artifactId>
    <version>1.2</version>
</dependency>
```

Or Download the latest SNAPSHOT via the Sonatype Maven Repository:
```xml
<repositories>
    <repository>
        <id>oss-sonatype</id>
        <name>oss-sonatype</name>
        <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>

...

<dependency>
  <groupId>com.github.lotsabackscatter</groupId>
  <artifactId>vaadin-masonry-cards</artifactId>
  <version>1.3-SNAPSHOT</version>
</dependency>
```

Usage
--------

Simply create a layout and add the Masonry component to it!
```java
VerticalLayout layout = new VerticalLayout();
MasonryCards masonry = new MasonryCards();
layout.addComponent(masonry);
```
Then, just create the images and add them to your masonry wall!
```java
masonry.addCard(id, "Title", "Description", "image.jpg", "white", new ClickListener() {
  @Override
  public void onClick() {
      Notification.show("Clicked!");
  }
});
```

For maximum effect, try using it in conjunction with the [Vaadin Blueimp Gallery][3]!
```java
MasonryCards masonry = new MasonryCards();
Gallery gallery = new Gallery();

layout.addComponent(gallery);
layout.addComponent(masonry);

masonry.addCard(id, image.title, "Description", image.href, "#FCC800", new ClickListener() {
    @Override
    public void onClick() {
        gallery.showGallery(image);
    }
});
```


Developed By
--------

* Dylan Watson - <lotsabackscatter@gmail.com>

License
--------

    Copyright 2014 Dylan Watson.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.


 [1]: https://vaadin.com/home
 [2]: https://github.com/triceam/cards-ui
 [3]: https://github.com/lotsabackscatter/vaadin-blueimp-gallery
 [4]: https://raw.githubusercontent.com/lotsabackscatter/vaadin-masonry-cards/master/etc/example.png "Masonry Cards Example"
