(function(window, document) {

    var playBtn = document.querySelector('#play');
    var pauseBtn = document.querySelector('#pause');
    var reverseBtn = document.querySelector('#reverse');

    var playVid = function() {
        var isReverse = this.id === 'reverse';

        canvidControl.play('canvidExample', isReverse);
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

            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'inline-block';
            reverseBtn.style.display = 'inline-block';
        }
    });

    playBtn.addEventListener('click', playVid);
    pauseBtn.addEventListener('click', pauseVid);
    reverseBtn.addEventListener('click', playVid);

}(window, document));