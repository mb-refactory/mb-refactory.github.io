
initializePodcastDetails();

let podcastID = getPodcastDetailsFromSessionStorage().id;
let subscribedPodcastsIDs = getSubscribedPodcastsIDs();
let subscribedOn = document.querySelector(".subscription-date");
let subscriptionDate = getSubscriptionDateById(podcastID);
subscribedOn.textContent = subscriptionDate;
const unsubscribeBtn = document.querySelector(".unsubscribe-btn");

console.log('Gathering information on podcast episodes with ID: ' + podcastID);
podcastIndexEpisodesByIdAPI(podcastID, 20)
    .then(data => {
        console.log(data);
        showEpisodes(data);
    });

function showEpisodes(data) {
    const details = document.querySelector('.details');
    const subscribtionDate = document.querySelector('.subscription-date');
    // Ordina cronologicamente
    data.items.sort((a, b) => a.datePublished - b.datePublished);
    data.items.forEach(episode => {

        console.log(episode.datePublished);
        const card = document.createElement('div');
        card.className = 'card mb-3 mt-3 fade-in';

        const row = document.createElement('div');
        row.className = 'row';

        const cardBodyCol = document.createElement('div');
        cardBodyCol.className = 'col-md-9';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const episodeTitle = document.createElement('h4');
        episodeTitle.className = 'card-title';
        episodeTitle.textContent = episode.title;

        const episodeDescription = document.createElement('p');
        episodeDescription.className = 'card-text';
        episodeDescription.textContent = episode.description.replace(/<[^>]*>/g, '');

        cardBody.appendChild(episodeTitle);
        cardBody.appendChild(episodeDescription);
        cardBodyCol.appendChild(cardBody);
        row.appendChild(cardBodyCol);

        const btnCol = document.createElement('div');
        btnCol.className = 'col-md-3 mt-2 text-end';

        const link = document.createElement('a');
        link.href = 'episode-details.html';
        link.addEventListener('click', function () {
            sessionStorage.setItem('selectedEpisode', JSON.stringify(episode));
        });

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-primary py-2 m-3 btn-lg';
        btn.textContent = 'View details';

        link.appendChild(btn);
        btnCol.appendChild(link);
        row.appendChild(btnCol);

        card.appendChild(row);
        details.appendChild(card);

        subscribtionDate.insertAdjacentElement('afterend', card);

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















