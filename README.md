# Guepard 
**Flash** to **HTML5** converter.   

## Conversion process
- Parsing resources (from **SWF** or **FLA** files)
- Creation atlases
- Export resources from **SWF** to **XML** for animations and structure, and **JPG** / **PNG** for graphics and atlases
- Parsing **AS3** code
- Analysing code and fixing unknown types
- Export **JS** code
- Generation **HTML** page

## Usage (windows, mac, linux)
- Install **Adobe AIR**
- Install [converter.air](https://github.com/AntonovSergey2211/guepard/blob/master/air/converter.air) AIR application
- Download and extract **Guepard SDK** from **/sdk** to your folder
- Start application and create new project
- Set all fields in all tabs as you need
- Set **SDK Path** to your folder in **Settings** tab
- Build project

## Build (windows)
- Download and unpack or clone **this repository**
- Download and install [java](https://www.java.com/en/download/)
- Download and install [.net framework](https://www.microsoft.com/en-us/download/search.aspx?q=.net%20framework)
- Download and install [FlashDevelop](http://www.flashdevelop.org/)
- Run **FlashDevelop**
- In opened **RunMan** select and install:
	- **Flex SDK + AIR SDK**
	- **Adobe AIR**
- You can run **RunMan** after by menu: **Tools -> Install Software**
- After install all components restart **FlashDevelop**
- Create project: **Menu -> Project -> Action Script 3 -> AIR AS3 Projector**
	- Name: **converter**
	- Location: **guepard repository location**
- Set main class: **Project Tab -> src/com/guepard/app/Converter.as -> Context Menu -> Set Document Class**
- In the same tab 
	- **lib/bloodyCrypto/bloody_crypto.swc -> Context Menu -> Add to library**
	- **lib/design/design.swc -> Context Menu -> Add to library**
	- **lib/zip/fzip.swc -> Context Menu -> Add to library**
- Run project!

## Demos

**Demos from Adobe Animation / Adobe Flash Proffesional:**

Shapes
[flash](https://superman2211.github.io/guepard/demo/shapes/shapes.swf)
[html5](https://superman2211.github.io/guepard/demo/shapes/build/)

Images
[flash](https://superman2211.github.io/guepard/demo/images/images.swf)
[html5](https://superman2211.github.io/guepard/demo/images/build/)

Texts
[flash](https://superman2211.github.io/guepard/demo/texts/texts.swf)
[html5](https://superman2211.github.io/guepard/demo/texts/build/)

Animation
[flash](https://superman2211.github.io/guepard/demo/animation/animation.swf)
[html5](https://superman2211.github.io/guepard/demo/animation/build/)

Mask
[flash](https://superman2211.github.io/guepard/demo/mask/mask.swf)
[html5](https://superman2211.github.io/guepard/demo/mask/build/)

Fla 
[flash](https://superman2211.github.io/guepard/demo/fla/fla.swf)
[html5](https://superman2211.github.io/guepard/demo/fla/build/)

**Demos from Flash Develop / Flex / IntelliJ Idea:**

Game 
[flash](https://superman2211.github.io/guepard/demo/game/bin/match3.swf)
[html5](https://superman2211.github.io/guepard/demo/game/build/)

Draw 
[flash](https://superman2211.github.io/guepard/demo/draw/out/production/draw/Main.swf)
[html5](https://superman2211.github.io/guepard/demo/draw/build)

XML / XMLList 
[flash](https://superman2211.github.io/guepard/demo/xml/out/production/xml/Main.swf)
[html5](https://superman2211.github.io/guepard/demo/xml/build)

Extreme AS3 Code 
[flash](https://superman2211.github.io/guepard/demo/extreme/out/production/extreme/Main.swf) 
[html5](https://superman2211.github.io/guepard/demo/extreme/build) 
[as3](https://github.com/AntonovSergey2211/guepard/blob/master/demo/extreme/src/Main.as) 
[js](https://github.com/AntonovSergey2211/guepard/blob/master/demo/extreme/build/js/Main.js) 

**Third Party**

Box2D
[flash](https://superman2211.github.io/guepard/demo/box2d/out/production/box2d/Main.swf)
[html5](https://superman2211.github.io/guepard/demo/box2d/build)

## Known issues
- Now **WebGL** not works - only **Canvas** render.
- There are many limitations of code conversion from **AS3** to **JS**.
