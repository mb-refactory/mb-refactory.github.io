
let yourPodcastsBtn = document.querySelector('.your-podcasts-btn');
translate(yourPodcastsBtn, 'yourPodcasts');

let suggestedBtn = document.querySelector('.suggested-btn');
translate(suggestedBtn, 'suggested');

let searchBtn = document.querySelector('.search-btn');
translate(searchBtn, 'search');

function initializeSubscribedPodcasts() {
    if (!localStorage.getItem('subscribedPodcasts')) {
        localStorage.setItem('subscribedPodcasts', JSON.stringify([]));
    }
}

initializeSubscribedPodcasts();



