
initializePodcastDetails();

const subscriptionDateElement = document.querySelector(".subscription-date");
const subscribedOnElement = document.querySelector(".subscribed-on");
const unsubscribeBtn = document.querySelector(".unsubscribe-btn");
const subscribeBtn = document.querySelector('.subscribe-btn');
translate(unsubscribeBtn, 'unsubscribe');
translate(subscribeBtn, 'subscribe');

const podcastID = getPodcastDetailsFromSessionStorage().id;

podcastIndexEpisodesByIdAPI(podcastID, 20)
    .then(data => {
        showEpisodes(data);
        toggleSubscriptionElements();
    });

function showEpisodes(data) {
    const details = document.querySelector('.details');
    // Ordina cronologicamente
    data.items.sort((a, b) => a.datePublished - b.datePublished);
    data.items.forEach(episode => {

        const card = document.createElement('div');
        card.className = 'card mb-3 mt-3 fade-in bg-light';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';

        const episodeTitleElement = document.createElement('h3');
        let episodeTitle = episode.title;
        episodeTitleElement.className = 'card-title mt-3 mx-5 text-center fw-bold';
        episodeTitleElement.textContent = episodeTitle;
        card.appendChild(episodeTitleElement);

        let viewDescriptionBtn = document.createElement('button');
        viewDescriptionBtn.className = 'btn btn-outline-primary mb-2 btn-lg';
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
        viewEpisodeBtn.className = 'btn btn-primary py-3 mx-3 mb-2 btn-lg fw-bold';
        viewEpisodeBtn.style = 'width: 90%';
        translate(viewEpisodeBtn, 'viewEpDetails');
        link.appendChild(viewEpisodeBtn);
        cardBody.appendChild(link);
        card.appendChild(cardBody);
        // details.appendChild(card);
        subscribeBtn.insertAdjacentElement('afterend', card);

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
        setTimeout(() => {
            toggleSubscriptionElements();
        }, 2000);

    }
});

unsubscribeBtn.addEventListener('click', () => {
    if (isSubscribed(podcastID)) {
        removeSubscribedPodcast(podcastID);
        alert('You successfully unsubscribed from this podcast');
        window.history.go(-1);
    }
}
);















