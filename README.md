# Guepard 
**Flash** to **HTML5** converter.   

## Conversion process
- Parsing resources (from **SWF** or **FLA** files)
- Creation atlases
- Export resources to **XML** (for animations and structure), **JPG** and **PNG** (for graphics and atlases)
- Parsing **action script 3** code
- Analysing code and fixing unknown types
- Export **java script** code
- Generate **HTML** page

## Usage
- Install **Adobe AIR**
- Install application from **/air/utilite.air**
- Download and extract **Guepard SDK** from **/sdk**
- Start application and create new project
- Set all fields in all tabs as you need
- Set **SDK Path** in **Settings** tab
- Build project

## Demos
Shapes
[html5](https://antonovsergey2211.github.io/guepard/demo/shapes/build/)


## Known issues
- **WebGL** not works - only **Canvas** render
- There are many limitations in **as3** to **js** conversion
