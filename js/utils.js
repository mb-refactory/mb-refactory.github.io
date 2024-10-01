function updateGrid(data) {
  const grid = document.querySelector('.container-grid');
  const row = document.createElement('div');

  row.classList.add('row');

  data.forEach((podcast) => {
    const podcastInfo = data.every(podcastItem => podcastItem.feed) ? podcast.feed : podcast;

    const col = document.createElement('div');
    col.className = 'col-lg-6 col-md-12 fade-in';

    const link = document.createElement('a');
    link.href = 'podcast-details.html';
    link.addEventListener('click', function () {
      sessionStorage.setItem('selectedPodcast', JSON.stringify(podcastInfo));
    });

    link.classList.add('text-decoration-none');

    const card = document.createElement('div');
    card.className = 'card podcast-card mb-4 rounded-3 bg-primary-subtle border-0 shadow-lg';

    const cardRow = document.createElement('div');
    cardRow.className = 'row g-0 bg-primary rounded-3 shadow-sm';

    const descriptionRow = document.createElement('div');
    descriptionRow.className = 'row g-0 m-3';

    const imgCol = document.createElement('div');
    imgCol.className = 'col-4 d-flex bg-secondary-subtle rounded-3';

    const img = document.createElement('img');
    let source = podcastInfo.artwork;
    if (source === '') {
      // sets the fallback cover
      source = 'media/favicon/android-chrome-512x512.png';
      img.classList.add('img-fluid', 'p-3', 'bg-light', 'rounded-3');
    }
    img.src = source;
    img.classList.add('img-fluid', 'rounded-3', 'bg-light', 'object-fit-cover', 'h-100');
    img.alt = 'cover';

    const cardBodyCol = document.createElement('div');
    cardBodyCol.className = 'col-8 text-start rounded-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body rounded-3';

    const title = document.createElement('h2');
    title.className = 'card-title display-5 fw-bold m-1 text-white';
    let podcastTitle = podcastInfo.title;
    if (podcastTitle.length > 50) {
      podcastTitle = podcastTitle.substring(0, 50) + '...';
    }
    title.textContent = podcastTitle;

    const description = document.createElement('p');
    description.className = 'card-text fs-4 fw-bold';
    let podcastDescription = podcastInfo.description.replace(/<[^>]*>/g, '');
    if (podcastDescription.length > 160) {
      podcastDescription = podcastDescription.substring(0, 160) + '...';
    }
    description.textContent = podcastDescription;

    imgCol.appendChild(img);
    cardBody.appendChild(title);
    cardBodyCol.appendChild(cardBody);
    cardRow.appendChild(imgCol);
    cardRow.appendChild(cardBodyCol);
    card.appendChild(cardRow);
    descriptionRow.appendChild(description);
    card.appendChild(descriptionRow);
    link.appendChild(card);
    col.appendChild(link);
    row.appendChild(col);

    card.addEventListener('click', function () {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.2s';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200); 
    });

    card.addEventListener('touchend', function () {
      this.style.transform = 'scale(1)';
    });

  });
  document.querySelector('.loader').remove();
  grid.appendChild(row);
}

function initializePodcastDetails() {
  document.addEventListener('DOMContentLoaded', function () {
    const podcastDetails = getPodcastDetailsFromSessionStorage();
    const cover = document.querySelector('.img-fluid');
    let coverSource = podcastDetails.artwork;
    if (coverSource === '') {
      // sets the fallback cover
      coverSource = 'media/favicon/android-chrome-512x512.png';
      cover.classList.add('p-3', 'bg-light', 'rounded-3');
    }
    cover.src = coverSource;
    const title = document.querySelector('h1');
    title.textContent = podcastDetails.title;
    const description = document.querySelector('p');
    description.textContent = podcastDetails.description.replace(
      /<[^>]*>/g,
      ''
    );
    let input = document.querySelector('input');
    getTranslation(getLanguage(), 'searchEpisodePlaceHolder').then((translated) => {
      input.placeholder = translated;
    });
  });
}

function getLanguage() {
  // return 'it-IT';
  const systemLanguage = navigator.language;
  if (systemLanguage === 'en-GB') {
    return 'en-US';
  }
  return systemLanguage;
}

async function getTranslation(language, key) {
  try {
    const response = await fetch('js/translations.json');
    const data = await response.json();
    return data[language][key];
  } catch (error) {
    console.error('Error while fetching the json file', error);
  }
}

async function translate(target, key) {
  try {
    const language = getLanguage();
    const translatedContent = await getTranslation(language, key);
    target.textContent = translatedContent;
  } catch (error) {
    console.error('Error while fetching the json file', error);
  }
}

function AddBsIcon(target, iconName) {
  const icon = document.createElement('i');
  icon.classList.add('bi', iconName);
  icon.style.paddingRight = '0.2em';
  target.insertBefore(icon, target.firstChild);
}

function showModal(title, content) {
  let modalElement = document.querySelector('.modal');
  modalElement.querySelector('.modal-title').innerText = title;
  let modalBody = modalElement.querySelector('.modal-body');
  if (content === '') {
    modalBody.style.display = 'none';
  }
  modalElement.querySelector('.modal-body').innerHTML = content;
  let modal = new bootstrap.Modal(modalElement);
  modal.show();
}

function getSubscribedPodcasts() {
  let subscribedPodcasts = JSON.parse(localStorage.getItem('subscribedPodcasts')) || [];
  return subscribedPodcasts;
}

function getSubscribedPodcastsIDs() {
  let subscribedPodcasts = getSubscribedPodcasts();
  let subscribedPodcastIDs = subscribedPodcasts.map(podcast => podcast.id);
  return subscribedPodcastIDs;
}

function getSubscriptionDateById(podcastId) {
  let subscribedPodcasts = getSubscribedPodcasts();
  let subscribedPodcast = subscribedPodcasts.find(podcast => podcast.id === podcastId);
  return subscribedPodcast ? subscribedPodcast.subscriptionDate : null;
}

function formatDate(date) {
  let dateObject = new Date(date);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString(getLanguage(), options);
  return formattedDate;
}

function getPodcastDetailsFromSessionStorage() {
  return JSON.parse(sessionStorage.getItem('selectedPodcast'));
}

// Dato un array restituisce solo i 3 valori che compaiono più frequentemente
function findMostFrequentValues(arr) {
  const frequencyMap = {};
  arr.forEach((num) => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  });
  return Object.keys(frequencyMap)
    .sort((a, b) => frequencyMap[b] - frequencyMap[a])
    .slice(0, 3)
    .map(Number);
}

async function fetchSubscribedPodcastsByIds(subscribedIdList) {
  let podcastInfoArray = [];
  for (const id of subscribedIdList) {
    try {
      const data = await podcastIndexPodcastByIdAPI(id);
      podcastInfoArray.push(data);
    } catch (error) {
      console.error(`Errore nel recuperare il podcast con ID ${id}:`, error);
    }
  }
  return podcastInfoArray;
}

function showLoadingSpinner() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.classList = ('loader');
  for (let i = 0; i < 5; i++) {
    const div = document.createElement('div');
    loadingIndicator.appendChild(div);
  }
  document.querySelector('.container-grid').appendChild(loadingIndicator);
}

function suggestToSubscribe() {
  const grid = document.querySelector('.container-grid');
  const suggestion = document.createElement('div');
  suggestion.classList = ('alert alert-primary text-center fw-bold fs-4 rounded-3 border-0');
  translate(suggestion, "subscribeToSeeItHereMsg");
  grid.appendChild(suggestion);
}

function updateSubscribedBackground() {
  document.body.classList.replace('bg-body-secondary', 'bg-subscribed');
}

function searchAgain() {
  const grid = document.querySelector('.container-grid');
  grid.classList.add('text-center');
  const noResultsMessage = document.createElement('p');
  noResultsMessage.className = 'fw-bold fs-5 text-center fst-italic';
  translate(noResultsMessage, 'noResultsMsg');
  const searchAgainBtn = document.createElement('button');
  const searchAgainLink = document.createElement('a');
  searchAgainBtn.className = 'col-12 col-md-6 btn btn-lg btn-warning fw-bold p-3';
  searchAgainLink.setAttribute('href', 'search.html');
  translate(searchAgainBtn, 'searchAgain');
  grid.appendChild(noResultsMessage);
  searchAgainLink.appendChild(searchAgainBtn);
  grid.appendChild(searchAgainLink);
  let loader = document.querySelector('.loader');
  loader.remove();
}


function startMediaSessionAPI(podcastTitle, episodeDetails, player) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: episodeDetails.title,
    artist: podcastTitle,
    artwork: [
      { src: episodeDetails.image }
    ]
  });
  navigator.mediaSession.setActionHandler('play', async () => {
    await player.play();
  });
  navigator.mediaSession.setActionHandler('pause', () => {
    player.pause();
  });
  navigator.mediaSession.setActionHandler('stop', () => {
    player.currentTime = 0;
  });
  const defaultSkipTime = 10; /* Time to skip in seconds by default */
  navigator.mediaSession.setActionHandler('seekbackward', (details) => {
    const skipTime = details.seekOffset || defaultSkipTime;
    player.currentTime = Math.max(player.currentTime - skipTime, 0);
  });
  navigator.mediaSession.setActionHandler('seekforward', (details) => {
    const skipTime = details.seekOffset || defaultSkipTime;
    player.currentTime = Math.min(player.currentTime + skipTime, player.duration);
  });

  player.addEventListener('ratechange', () => {
    updatePositionState(player);
  });
}

function updatePositionState(player) {
  if ('setPositionState' in navigator.mediaSession) {
    navigator.mediaSession.setPositionState({
      duration: player.duration,
      playbackRate: player.playbackRate,
      position: player.currentTime,
    });
  }
}



