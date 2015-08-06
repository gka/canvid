# canvid.js

```js
var canvid = $('#my-video-div').canvid({
    videos: {
        clip1: { src: 'clip1.jpg', frames: 38, cols: 6 },
        clip2: { src: 'clip2.jpg', frames: 43, cols: 6 }
    },
    width: 500,
    height: 400,
    loaded: function() {
        canvid.play('clip1');
    }
});
```

**How to convert your video to JPG**

First, convert you video into single frames using [ffmpeg](https://www.ffmpeg.org/):

```
ffmpeg -i myvideo.mp4 -vf scale=375:-1 -r 5 frames/%04d.png
```

Then, use ImageMagicks [montage](http://www.imagemagick.org/script/montage.php) to stich all the frames into one big image:

```
montage -border 0 -geometry 375x -tile 6x -quality 60% frames/*.png myvideo.jpg
```

**Reverse playback**

```js
canvid.play('clip1', true);
```


