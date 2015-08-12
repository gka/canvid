(function(window, document) {

    var playBtn = document.querySelector('#play');
    var play60Btn = document.querySelector('#play60');
    var pauseBtn = document.querySelector('#pause');
    var reverseBtn = document.querySelector('#reverse');
    
    var canvidCtrl = document.querySelectorAll('.canvid-ctrl');

    var playVid = function() {

        var fps = this.getAttribute('data-fps'),
            isReverse = this.id === 'reverse';

        canvidControl.play('canvidExample', isReverse, fps);
        pauseBtn.innerHTML = 'Pause';
    };

    var pauseVid = function() {
        if (canvidControl.isPlaying()) {
            canvidControl.pause();
            pauseBtn.innerHTML = 'Resume';
        } else {
            canvidControl.resume();
            pauseBtn.innerHTML = 'Pause';
        }
    };

    var canvidControl = canvid({
        selector: '#canvid-example',
        videos: {
            canvidExample: {
                src: 'images/canvid-example.jpg',
                frames: 102,
                cols: 6
            }
        },
        width: 500,
        height: 375,
        loaded: function() {
            canvidControl.play('canvidExample');

            [].forEach.call(canvidCtrl, function(ctrl, index){
                ctrl.style.display = 'inline-block';
            });
        }
    });

    playBtn.addEventListener('click', playVid);
    play60Btn.addEventListener('click', playVid);
    pauseBtn.addEventListener('click', pauseVid);
    reverseBtn.addEventListener('click', playVid);

}(window, document));