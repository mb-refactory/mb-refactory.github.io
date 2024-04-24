document.addEventListener('DOMContentLoaded', function () {
  initializeEpisodeDetails();
  initializeBtns();
});

function initializeBtns() {
  const player = document.querySelector('audio');
  const playBtn = document.querySelector('.play-btn');
  translate(playBtn, 'play');
  playBtn.addEventListener('click', () => {
    player.play();
  });
  const pauseBtn = document.querySelector('.pause-btn');
  translate(pauseBtn, 'pause');
  pauseBtn.addEventListener('click', () => {
    player.pause();
    pauseBtn.classList.add('active');
  });
  const stopBtn = document.querySelector('.stop-btn');
  translate(stopBtn, 'stop');
  stopBtn.addEventListener('click', () => {
    player.pause();
    player.currentTime = 0;
  });
  const volUpBtn = document.querySelector('.volume-up-btn');
  volUpBtn.addEventListener('click', () => {
    if (player.volume < 1) {
      player.volume += 0.1;
    }
  });
  const volDownBtn = document.querySelector('.volume-down-btn');
  volDownBtn.addEventListener('click', () => {
    if (player.volume > 0) {
      player.volume -= 0.1;
    }
  });
}

function initializeEpisodeDetails(){

  const episodeDetails = JSON.parse(sessionStorage.getItem('selectedEpisode'));
  const cover = document.querySelector('.img-fluid');
  const title = document.querySelector('.episode-title');
  const description = document.querySelector('p');
  const publishDateElement = document.querySelector('.publish-date');
  const player = document.querySelector('audio');

  cover.src = episodeDetails.image;
  title.textContent = episodeDetails.title;
  description.textContent = episodeDetails.description.replace(/<[^>]*>/g, '');
  let episodeDate = episodeDetails.datePublishedPretty.split(' ').slice(0, 3).join(' ');
  publishDateElement.textContent = formatDate(episodeDate);
  let listenURL = episodeDetails.enclosureUrl;
  player.src = listenURL;
  
} 