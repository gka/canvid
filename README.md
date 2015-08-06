# canvid.js

```js
var canvid = $('#my-video-div').canvid({
    videos: {
        clip1: { src: 'clip1.jpg' },
        clip2: { src: 'clip2.jpg' }
    },
    width: 500,
    height: 400,
    loaded: function() {
        canvid.play('clip1');
    }
});
```


