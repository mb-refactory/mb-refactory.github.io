
initializePodcastDetails();

const episodeLoaded = 5;
const podcastDetailsContent = document.querySelector('.podcast-details-content');
const subscriptionDateElement = document.querySelector(".subscription-date");
const subscribedOnElement = document.querySelector(".subscribed-on");
const subscribeBtn = document.querySelector('.subscribe-btn');
const subscribeBtnContainter = document.querySelector('.subscribe-btn-container');
const unsubscribeBtn = document.querySelector(".unsubscribe-btn");
const episodeSearchInput = document.querySelector('.episode-search-input');
const loadMoreBtn = document.querySelector('.load-more-btn');
translate(unsubscribeBtn, 'unsubscribe');
translate(subscribeBtn, 'subscribe');
translate(loadMoreBtn, 'loadMore');

const podcastID = getPodcastDetailsFromSessionStorage().id;

podcastIndexEpisodesByIdAPI(podcastID, episodeLoaded)
    .then(data => {
        showEpisodes(data);
        toggleSubscriptionElements();
        podcastDetailsContent.classList.remove('d-none');
    });

function showEpisodes(data) {
    const episodesContainer = document.querySelector('.episodes-container');
    episodesContainer.innerHTML = '';
    // Ordina cronologicamente
    data.items.sort((a, b) => b.datePublished - a.datePublished);
    data.items.forEach(episode => {

        const card = document.createElement('div');
        card.className = 'card mb-3 mt-3 fade-in bg-light border-0';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';

        const episodeTitleElement = document.createElement('h3');
        let episodeTitle = episode.title;
        episodeTitleElement.className = 'card-title mt-3 mx-3 text-center fw-bold';
        episodeTitleElement.textContent = episodeTitle;
        card.appendChild(episodeTitleElement);

        let viewDescriptionBtn = document.createElement('button');
        viewDescriptionBtn.className = 'btn btn-light mb-2 btn-lg fw-semibold border-0 shadow-lg';
        viewDescriptionBtn.setAttribute('type', 'button');
        translate(viewDescriptionBtn, 'readDescription');
        viewDescriptionBtn.style = 'width: 90%';

        let closeBtn = document.querySelector('.close');
        translate(closeBtn, 'close');

        let description = episode.description.replace(/<[^>]*>/g, '');
        viewDescriptionBtn.addEventListener('click', function () {
            showModal(episodeTitle, description);
        });
        cardBody.appendChild(viewDescriptionBtn);

        const link = document.createElement('a');
        link.href = 'episode-details.html';
        link.addEventListener('click', function () {
            sessionStorage.setItem('selectedEpisode', JSON.stringify(episode));
        });

        const viewEpisodeBtn = document.createElement('button');
        viewEpisodeBtn.type = 'button';
        viewEpisodeBtn.className = 'btn btn-primary py-3  mb-2 btn-lg fw-bold shadow-lg';
        viewEpisodeBtn.style = 'width: 90%';
        translate(viewEpisodeBtn, 'viewEpDetails');
        link.appendChild(viewEpisodeBtn);
        cardBody.appendChild(link);
        card.appendChild(cardBody);
        episodesContainer.appendChild(card);
    });

}

function showSubscriptionDate() {
    const subscriptionInfoElement = document.querySelector(".subscription-info");
    subscriptionInfoElement.classList.remove('d-none');
    const subscriptionDate = getSubscriptionDateById(podcastID);
    subscriptionDateElement.textContent = formatDate(subscriptionDate);
    translate(subscribedOnElement, 'subscribedOn');
}

function addPodcastToSubscriptionList(podcastId) {
    let subscribedPodcasts = getSubscribedPodcasts();
    if (!isSubscribed(podcastID)) {
        const currentDate = new Date();
        subscribedPodcasts.push({ id: podcastId, subscriptionDate: currentDate });
        localStorage.setItem('subscribedPodcasts', JSON.stringify(subscribedPodcasts));
        console.log('Podcast with ID: ' + podcastId + ' added to the subscribed list');
    }
}

function removeSubscribedPodcast(podcastId) {
    let subscribedPodcasts = getSubscribedPodcasts();
    const index = subscribedPodcasts.findIndex(podcast => podcast.id === podcastId);
    subscribedPodcasts.splice(index, 1);
    localStorage.setItem('subscribedPodcasts', JSON.stringify(subscribedPodcasts));
}

function isSubscribed(toPodcastWithID) {
    const subscribedPodcastsIDs = getSubscribedPodcastsIDs();
    return subscribedPodcastsIDs.includes(toPodcastWithID);
}

function toggleSubscriptionElements() {
    translate(subscribeBtn, 'subscribe');
    if (isSubscribed(podcastID)) {
        showSubscriptionDate();
        subscribeBtn.classList.add('d-none');
        unsubscribeBtn.classList.remove('d-none');
        updateSubscribedBackground();
        document.querySelector('.bi-star-fill').classList.remove('d-none');
    }
    if (!isSubscribed(podcastID)) {
        unsubscribeBtn.classList.add('d-none');
    }
}

subscribeBtn.addEventListener('click', () => {
    if (!isSubscribed(podcastID)) {
        addPodcastToSubscriptionList(podcastID);
        translate(subscribeBtn, 'subscribedMsg');
        subscribeBtn.classList.add('hidden-with-fade-out');
        document.body.classList.add('bg-change-transition');
        subscribeBtnContainter.classList.add('soft-transition');
        let elementHeight = subscribeBtnContainter.clientHeight;
        subscribeBtnContainter.style.marginTop = "-" + elementHeight + "px";
        setTimeout(() => {
            toggleSubscriptionElements();
            subscribeBtnContainter.classList.remove('soft-transition');
            subscribeBtnContainter.style.marginTop = "0px";
        }, 3000);
    }
});

unsubscribeBtn.addEventListener('click', () => {
    if (isSubscribed(podcastID)) {
        removeSubscribedPodcast(podcastID);
        translate(unsubscribeBtn, 'unsubscribedMsg');
        setTimeout(() => {
            window.history.go(-1);
        }, 2000);
    }
}
);

loadMoreBtn.addEventListener('click', () => {
    const scrollPosition = window.scrollY;
    let currentEpisodeCount = document.querySelectorAll('.card').length;
    const limit = currentEpisodeCount + 5;
    podcastIndexEpisodesByIdAPI(podcastID, limit)
        .then(data => {
            showEpisodes(data);
            if (document.querySelectorAll('.card').length < limit) {
                // No more episodes to load
                loadMoreBtn.classList.add('d-none');
            }
        });
    window.scrollTo(0, scrollPosition);
});

episodeSearchInput.addEventListener('input', () => {
    const searchValue = episodeSearchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');
    let visibleCardsCount = 0;

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        if (title.includes(searchValue)) {
            card.classList.remove('d-none');
            visibleCardsCount++;
        } else {
            card.classList.add('d-none');
        }
    });
    const episodesContainer = document.querySelector('.episodes-container');
    episodesContainer.classList.toggle('mt-5', visibleCardsCount === 0);
    loadMoreBtn.classList.toggle('d-none', searchValue != '');
});














