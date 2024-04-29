document.addEventListener('DOMContentLoaded', function () {
  initializeEpisodeDetails();
  initializeBtns();
});

function initializeBtns() {
  const player = document.querySelector('audio');
  const playBtn = document.querySelector('.play-btn');
  playBtn.addEventListener('click', () => {
    player.play();
    playBtn.classList.add('active');
    pauseBtn.classList.remove('active')
  });
  const pauseBtn = document.querySelector('.pause-btn');
  pauseBtn.addEventListener('click', () => {
    player.pause();
    pauseBtn.classList.add('active');
    playBtn.classList.remove('active');
  });
  const stopBtn = document.querySelector('.stop-btn');
  stopBtn.addEventListener('click', () => {
    player.pause();
    player.currentTime = 0;
    playBtn.classList.remove('active')
    pauseBtn.classList.remove('active')
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
  const skipBwBtn = document.querySelector('.skip-fw-btn');
  skipBwBtn.addEventListener('click', () => {
    player.currentTime += 10;
  });
  const skipFwBtn = document.querySelector('.skip-bw-btn');
  skipFwBtn.addEventListener('click', () => {
    player.currentTime -= 10;
  });
}

function initializeEpisodeDetails() {
  const podcastTitleElement = document.querySelector('.podcast-title');
  const episodeDetails = JSON.parse(sessionStorage.getItem('selectedEpisode'));
  const episodeTitle = document.querySelector('.episode-title');
  const description = document.querySelector('.episode-description');
  const publishDateElement = document.querySelector('.publish-date');
  const player = document.querySelector('audio');
  const podcastTitle = getPodcastDetailsFromSessionStorage().title;

  podcastTitleElement.textContent = podcastTitle;
  episodeTitle.textContent = episodeDetails.title;
  description.textContent = episodeDetails.description.replace(/<[^>]*>/g, '');
  let episodeDate = episodeDetails.datePublishedPretty.split(' ').slice(0, 3).join(' ');
  publishDateElement.textContent = formatDate(episodeDate);
  let listenURL = episodeDetails.enclosureUrl;
  player.src = listenURL;

} 