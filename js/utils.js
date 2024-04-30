function updateGrid(data) {
  const grid = document.querySelector('.container-grid');
  const row = document.createElement('div');

  row.classList.add('row');

  data.forEach((podcast) => {
    const podcastInfo = data.every(podcastItem => podcastItem.feed) ? podcast.feed : podcast;

    const col = document.createElement('div');
    col.classList.add('col-lg-6', 'col-md-12', 'fade-in');

    const link = document.createElement('a');
    link.href = 'podcast-details.html';
    link.addEventListener('click', function () {
      sessionStorage.setItem('selectedPodcast', JSON.stringify(podcastInfo));
    });

    link.classList.add('text-decoration-none');

    const card = document.createElement('div');
    card.classList.add('card', 'mb-3', 'rounded-3', 'bg-primary-subtle');

    const cardRow = document.createElement('div');
    cardRow.classList.add('row', 'g-0', 'bg-primary', 'rounded');

    const descriptionRow = document.createElement('div');
    descriptionRow.classList.add('row', 'g-0', 'm-3');

    const imgCol = document.createElement('div');
    imgCol.classList.add('col-4');

    const img = document.createElement('img');
    img.src = podcastInfo.artwork;
    img.classList.add('img-fluid', 'rounded-start', 'h-100', 'object-fit-cover');
    img.alt = 'cover';

    const cardBodyCol = document.createElement('div');
    cardBodyCol.classList.add('col-8', '.bg-light', 'text-start');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'rounded-end');

    const title = document.createElement('h2');
    title.classList.add('card-title', 'display-5', 'fw-bold', 'm-1', 'text-white');
    let podcastTitle = podcastInfo.title;
    if (podcastTitle.length > 40) {
      podcastTitle = podcastTitle.substring(0, 40) + '...';
    }
    title.textContent = podcastTitle;

    const description = document.createElement('p');
    description.classList.add('card-text', 'fs-4');
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
  });
  document.querySelector('.loader').remove();
  grid.appendChild(row);
}

function initializePodcastDetails() {
  document.addEventListener('DOMContentLoaded', function () {
    const podcastDetails = getPodcastDetailsFromSessionStorage();
    const cover = document.querySelector('.img-fluid');
    cover.src = podcastDetails.artwork;
    const title = document.querySelector('h1');
    title.textContent = podcastDetails.title;
    const description = document.querySelector('p');
    description.textContent = podcastDetails.description.replace(
      /<[^>]*>/g,
      ''
    );
  });
}

function getLanguage() {
  // return navigator.language;
  return 'it-IT';
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
  const loadingIndicator = document.createElement('span');
  loadingIndicator.classList = ('loader loading');
  document.querySelector('.container-grid').appendChild(loadingIndicator);
}

function suggestToSubscribe() {
  const suggestion = document.createElement('div');
  suggestion.classList = ('alert alert-warning text-center fw-bold fs-4');
  suggestion.style.marginBottom = '70vh';
  suggestion.style.marginTop = '30vh';
  suggestion.textContent = 'Subscribe to a Podcast to see it here';
  document.querySelector('.container-grid').appendChild(suggestion);
}

function updateSubscribedBackground() {
  document.body.classList.replace('bg-body-secondary', 'bg-subscribed');
}






