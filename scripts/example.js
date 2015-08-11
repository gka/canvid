(function(window, document){

  var playBtn = document.querySelector('#play');
  var pauseBtn = document.querySelector('#pause');

  var playVid = function(){
    canvidControl.resume();
  };
  var pauseVid = function(){
    canvidControl.pause();
  };

  var canvidControl = canvid({
      selector : '#canvid-example',
      videos: {
          canvidExample: { src: 'images/canvid-example.jpg', frames: 102, cols: 6 }
      },
      width: 500,
      height: 400,
      loaded: function() {
          canvidControl.play('canvidExample');
          playBtn.style.display = 'inline-block';
          pauseBtn.style.display = 'inline-block';
      }
  });

  playBtn.addEventListener('click', playVid);
  pauseBtn.addEventListener('click', pauseVid);

}(window, document));