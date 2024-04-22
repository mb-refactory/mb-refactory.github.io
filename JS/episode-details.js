document.addEventListener("DOMContentLoaded", function () {
  const episodeDetails = JSON.parse(sessionStorage.getItem("selectedEpisode"));
  console.log(episodeDetails);
  console.log("Cover URL:" + episodeDetails.feedImage);
  const cover = document.querySelector(".img-fluid");
  cover.src = episodeDetails.feedImage;
  const title = document.querySelector("h1");
  title.textContent = episodeDetails.title;
  const description = document.querySelector("p");
  description.textContent = episodeDetails.description.replace(/<[^>]*>/g, "");
  const publishDate = document.querySelector(".publish-date");
  publishDate.textContent = episodeDetails.datePublishedPretty;
  const player = document.querySelector("audio");
  const listenURL = episodeDetails.enclosureUrl;
  player.src = listenURL;
  initializeBtns();
});

function initializeBtns() {
  const player = document.querySelector("audio");
  const playBtn = document.querySelector(".play-btn");
  playBtn.addEventListener("click", () => {
    player.play();
  });
  const pauseBtn = document.querySelector(".pause-btn");
  pauseBtn.addEventListener("click", () => {
    player.pause();
    pauseBtn.classList.add('active');
  });
  const stopBtn = document.querySelector(".stop-btn");
  stopBtn.addEventListener("click", () => {
    player.pause();
    player.currentTime = 0;
  });
  const volUpBtn = document.querySelector(".volume-up-btn");
  volUpBtn.addEventListener("click", () => {
    if (player.volume < 1) {
      player.volume += 0.1;
    }
  });
  const volDownBtn = document.querySelector(".volume-down-btn");
  volDownBtn.addEventListener("click", () => {
    if (player.volume > 0) {
        player.volume -= 0.1;
      }
  });
}
