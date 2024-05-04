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
    pauseBtn.classList.remove('active');
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
    playBtn.classList.remove('active');
    pauseBtn.classList.remove('active');
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

  let playbackRates = [1, 1.5, 2];
  let currentRateIndex = 0;
  const speedBtn = document.querySelector('.speed-btn');
  speedBtn.addEventListener('click', function () {
    currentRateIndex = (currentRateIndex + 1) % playbackRates.length;
    if (player) {
      player.playbackRate = playbackRates[currentRateIndex];
    }
    document.querySelector('.speed-btn').innerText = `${playbackRates[currentRateIndex]}x`;
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
  const resumeBtn = document.querySelector('.resume-btn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const downloadBtn = document.querySelector('.download');
  translate(resumeBtn, 'resume');
  translate(cancelBtn, 'cancel');

  podcastTitleElement.textContent = podcastTitle;
  episodeTitle.textContent = episodeDetails.title;
  description.textContent = episodeDetails.description.replace(/<[^>]*>/g, '');
  let episodeDate = episodeDetails.datePublishedPretty.split(' ').slice(0, 3).join(' ');
  publishDateElement.textContent = formatDate(episodeDate);
  let listenURL = episodeDetails.enclosureUrl;
  player.src = listenURL;
  downloadBtn.addEventListener('click', () => {
    window.location.href = listenURL;
  });
  player.addEventListener('timeupdate', saveCurrentTime);
  startMediaSessionAPI(podcastTitle, episodeDetails, player);
  showResumeModal(player, episodeDetails);
}

function saveCurrentTime() {
  const player = document.querySelector('audio');
  const episodeDetails = JSON.parse(sessionStorage.getItem('selectedEpisode'));
  localStorage.setItem('currentPlaybackTime_' + episodeDetails.id, player.currentTime);
}

function showResumeModal(player, episodeDetails) {
  const savedPlaybackTime = parseFloat(localStorage.getItem('currentPlaybackTime_' + episodeDetails.id));
  const resumeBtn = document.querySelector('.resume-btn');
  if (savedPlaybackTime) {
    getTranslation(getLanguage(), 'resumeMsg').then((resumeMsg) => {
      showModal(resumeMsg, '');
    });
    resumeBtn.addEventListener('click', function () {
      player.currentTime = savedPlaybackTime;
      player.play();
    });
    localStorage.removeItem('currentPlaybackTime_' + episodeDetails.id);
  }
}


