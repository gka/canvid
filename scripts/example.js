(function(window, document) {

    var playBtn = document.querySelector('#play');
    var pauseBtn = document.querySelector('#pause');
    var reverseBtn = document.querySelector('#reverse');

    var isPlaying = false;

    var playVid = function(isReverse) {
        var isReverse = this.id !== 'play';

        canvidControl.play('canvidExample', isReverse);
        pauseBtn.innerHTML = 'Pause';
        isPlaying = true;
    };

    var pauseVid = function() {
        if (isPlaying) {
            canvidControl.pause();
            pauseBtn.innerHTML = 'Resume';
        } else {
            canvidControl.resume();
            pauseBtn.innerHTML = 'Pause';
        }

        isPlaying = !isPlaying;
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
            isPlaying = true;

            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'inline-block';
            reverseBtn.style.display = 'inline-block';
        }
    });

    playBtn.addEventListener('click', playVid);
    pauseBtn.addEventListener('click', pauseVid);
    reverseBtn.addEventListener('click', playVid);

}(window, document));