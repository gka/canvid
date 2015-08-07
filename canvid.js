(function (factory){
  // CommonJS Module
  if (typeof module !== 'undefined' && module.exports){ 
    module.exports = factory(require('jquery'), require('queue-async'));
  // AMD module
  } else if ( typeof define === 'function' && define.amd ) { 
    define(['jquery', 'queue'], factory);
  // Browser globals
  } else {
    factory(jQuery, queue)
  }
})(function ($, queue) {

    console.log(queue)

    $.fn.canvid = function(_opts) {
        var el = $(this),
            images = {},
            firstPlay = true,
            control = {
                play: function() { console.log('cannot play before images are loaded'); }
            };

        _opts = $.extend(el.data(), _opts || {});

        if (hasCanvas()) {  
            // preload videos images
            var q = queue(4);

            for(var key in _opts.videos){
                var video = _opts.videos[key];
                q.defer(loadImage, key, video.src);
            }

            q.awaitAll(function(err) {
                if (err) return console.warn('error while loading video sources', err);
                
                var ctx = initCanvas(),
                    requestAnimationFrame = reqAnimFrame();

                control.play = function(key, reverse) {
                    if (control.pause) control.pause(); // pause current vid

                    var img = images[key],
                        opts = _opts.videos[key];

                    var curFrame = reverse ? opts.frames-1 : 0,
                        wait = 0,
                        playing = true,
                        loops = 0,
                        delay = 4;

                    requestAnimationFrame(frame);

                    control.resume = function() {
                        playing = true;
                        requestAnimationFrame(frame);  
                    };

                    control.pause = function() {
                        playing = false;
                        requestAnimationFrame(frame);   
                    };

                    if (firstPlay) {
                        firstPlay = false;
                        $(':not(canvas.canvid)', el).hide();
                    }

                    function frame() {
                        if (!wait) {
                            drawFrame(curFrame);
                            curFrame = (+curFrame + (reverse ? -1 : 1));
                            if (curFrame < 0) curFrame += +opts.frames;
                            if (curFrame >= opts.frames) curFrame -= opts.frames;
                            if (reverse ? curFrame == opts.frames-1 : !curFrame) loops++;
                            if (opts.loops && loops >= opts.loops) playing = false;
                        }
                        wait = (wait+1) % ((reverse ? 0.5 : 1) * delay);
                        if (playing && opts.frames > 1) requestAnimationFrame(frame);                    
                    }

                    function drawFrame(f) {
                        var fx = Math.floor(f % opts.cols) * _opts.width,
                            fy = Math.floor(f / opts.cols) * _opts.height;
                        ctx.clearRect(0, 0, _opts.width, _opts.height); // clear frame
                        ctx.drawImage(img, fx, fy, _opts.width, _opts.height, 0,0, _opts.width, _opts.height);     
                    }

                }; // end control.play

                if ($.isFunction(_opts.loaded)) _opts.loaded(control);

            }); // end awaitAll
           
        } else if (opts.srcGif) {
            el.append('<img src="'+opts['src-gif']+'" />');
        }

        function loadImage(key, url, callback) {
            var img = images[key] = new Image();
            img.onload = function() { callback(null); };
            img.src = url;
        }

        function initCanvas() {
            var canvas = $('<canvas />')
                .attr('width', _opts.width)
                .attr('class', 'canvid')
                .attr('height', _opts.height)
                .appendTo(el);
            return canvas.get(0).getContext('2d');
        }

        function reqAnimFrame() {
            return window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function(callback) { return setTimeout(callback, 1000 / 60); };
        }

        function hasCanvas() {
            // taken from Modernizr
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        }
        

        return control;
    };

});
