# canvid.js

**canvid** is a tiny dependency free library for playback of relatively short videos on canvas elements. 

* **Why not just use HTML5 video?**  
  Because you can't embed and autoplay HTML5 videos on iOS! Yeah, that sucks.

* **Why is this better than using an animated GIF?**  
  Videos look kind of gross when converted to animated GIFs because of the colors sampling. Also the file size of video GIFs can get pretty huge. GIF is just not made for videos. JPG does a much better job of compressing video frames. Also, animated GIFs don't give you any playback controls. You can't pause a GIF or delay it's playback. With canvid you can do that.

* **Why only "relatively short" videos?**  
  As you see further down, the container format for canvid is a big image sprite of all the frames of each clip. Sadly, iOS limits the maximum image size (bigger image get sampled down), so that puts a limit on the maximum frames you can store.

* **Why is there no audio?**  
  canvid doesn't support audio for the same reason animated GIF doesn't support audio either: because that's not what it was built for. 

## Installation

**npm**

```
$ npm install --save canvid
```

**git clone**

```
$ git clone git@github.com:gka/canvid.git
```

## Usage

You can use canvid.js with AMD, CommonJS and browser globals.

```js
var canvidControl = canvid({
    selector : '.video',
    videos: {
        clip1: { src: 'clip1.jpg', frames: 38, cols: 6 },
        clip2: { src: 'clip2.jpg', frames: 43, cols: 6, loops: 3 }
    },
    width: 500,
    height: 400,
    loaded: function() {
        canvidControl.play('clip1');
        // reverse playback
        // canvidControl.play('clip1', true);
    }
});
```

## Options

* **videos** required  
  Video/Sprite objects (videoKey : videoOptions).

  * **src** required  
    Path of the sprite image.
  
  * **frames** required  
    Number of frames. 
 
  * **cols** required  
    Number of columns.  

  * **loops** optional  
    Number of loops.


* **selector** optional  
  The selector of the element where the video gets displayed.  
  `default: '.canvid-wrapper'`

* **width** optional  
  Width of the element where the video gets displayed.  
  `default: 800`

* **height** optional  
  Height of the element where the video gets displayed.  
  `default: 450`

* **loaded** optional  
  Function that gets called when all videos are loaded.

* **srcGif** optional  
  Path of the fallback gif, if canvas is not supported.  


## Methods

The canvid function returns an object to control the video:

```js
var canvidControl = canvid(canvidOptions);
```

**play**  
Plays video of the passed videoKey. Set the second parameter to `true`, if you want to play the video reversely.

```js
canvidControl.play(videoKey [,isReverse]);
```

**pause**  
Pause current video.

```js
canvidControl.pause();
```

**resume**  
Resume current video.

```js
canvidControl.resume();
```


## How to convert your video to a JPG sprite

First, convert you video into single frames using [ffmpeg](https://www.ffmpeg.org/):

```
ffmpeg -i myvideo.mp4 -vf scale=375:-1 -r 5 frames/%04d.png
```

Then, use ImageMagicks [montage](http://www.imagemagick.org/script/montage.php) to stich all the frames into one big image:

```
montage -border 0 -geometry 375x -tile 6x -quality 60% frames/*.png myvideo.jpg
```

## Contributors

* [Gregor Aisch](http://driven-by-data.net)
* [Moritz Klack](http://moritzklack.com)
