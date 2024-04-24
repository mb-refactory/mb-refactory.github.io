
initializePodcastDetails();

const subscriptionDateElement = document.querySelector(".subscription-date");
const subscribedOnElement = document.querySelector(".subscribed-on");
const unsubscribeBtn = document.querySelector(".unsubscribe-btn");

const subscribedPodcastsIDs = getSubscribedPodcastsIDs();
const podcastID = getPodcastDetailsFromSessionStorage().id;
const subscriptionDate = getSubscriptionDateById(podcastID);
subscriptionDateElement.textContent = formatDate(subscriptionDate);
translate(subscribedOnElement, 'subscribedOn');
translate(unsubscribeBtn, 'unsubscribe')

console.log('Gathering information on podcast episodes with ID: ' + podcastID);
podcastIndexEpisodesByIdAPI(podcastID, 20)
    .then(data => {
        showEpisodes(data);
    });

function showEpisodes(data) {
    const details = document.querySelector('.details');
    const subscribtionDateElement = document.querySelector('.subscription-date');
    // Ordina cronologicamente
    data.items.sort((a, b) => a.datePublished - b.datePublished);
    data.items.forEach(episode => {

        const card = document.createElement('div');
        card.className = 'card mb-3 mt-3 fade-in bg-light';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';

        const episodeTitleElement = document.createElement('h3');
        let episodeTitle = episode.title;
        episodeTitleElement.className = 'card-title mt-2 mx-5 text-center';
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
        viewEpisodeBtn.className = 'btn btn-primary py-3 mx-3 mb-2 btn-lg';
        viewEpisodeBtn.style = 'width: 90%';
        translate(viewEpisodeBtn, 'viewEpDetails');
        link.appendChild(viewEpisodeBtn);
        cardBody.appendChild(link);

        card.appendChild(cardBody);
        subscribtionDateElement.insertAdjacentElement('afterend', card);

    });

}

function removeSubscribedPodcast(podcastId) {
    let subscribedPodcasts = getSubscribedPodcasts();
    const index = subscribedPodcasts.findIndex(podcast => podcast.id === podcastId);
    subscribedPodcasts.splice(index, 1);
    localStorage.setItem('subscribedPodcasts', JSON.stringify(subscribedPodcasts));
}

unsubscribeBtn.addEventListener('click', () => {
    if (subscribedPodcastsIDs.includes(podcastID)) {
        removeSubscribedPodcast(podcastID);
        alert('You successfully unsubscribed from this podcast');
        location.href = ('your-podcasts.html');
    }
}
);















