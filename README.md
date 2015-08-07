# canvid.js

**canvid** is a tiny library for playback of relatively short videos on canvas elements. 

* **Why not just use HTML5 video?**  
  Because you can't embed and autoplay HTML5 videos on iOS! Yeah, that sucks.

* **Why is this better than using an animated GIF?**  
  Videos look kind of gross when converted to animated GIFs because of the colors sampling. Also the file size of video GIFs can get pretty huge. GIF is just not made for videos. JPG does a much better job of compressing video frames. Also, animated GIFs don't give you any playback controls. You can't pause a GIF or delay it's playback. With canvid you can do that.

* **Why only "relatively short" videos?**  
  As you see further down, the container format for canvid is a big image sprite of all the frames of each clip. Sadly, iOS limits the maximum image size (bigger image get sampled down), so that puts a limit on the maximum frames you can store.

## Usage

```js
var canvid = $('#my-video-div').canvid({
    videos: {
        clip1: { src: 'clip1.jpg', frames: 38, cols: 6, frameWidth: 400, frameHeight: 200 },
        clip2: { src: 'clip2.jpg', frames: 43, cols: 6 }
    },
    width: 500,
    height: 400,
    loaded: function() {
        canvid.play('clip1');
        // reverse playback
        // canvid.play('clip1', true);
    }
});
```
If your container has different dimensions than your frames, you need to define the `frameWidth` and `frameHeight` options of the clip. When you don't define a `frameWidth` or `frameHeight` for a clip, we use the `width` and `height` options.
 

## How to convert your video to JPG

First, convert you video into single frames using [ffmpeg](https://www.ffmpeg.org/):

```
ffmpeg -i myvideo.mp4 -vf scale=375:-1 -r 5 frames/%04d.png
```

Then, use ImageMagicks [montage](http://www.imagemagick.org/script/montage.php) to stich all the frames into one big image:

```
montage -border 0 -geometry 375x -tile 6x -quality 60% frames/*.png myvideo.jpg
```



