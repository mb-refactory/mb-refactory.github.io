
initializePodcastDetails();

const subscribeBtn = document.querySelector('.subscribe-btn');
translate(subscribeBtn, 'subscribe');
let podcastID = getPodcastDetailsFromSessionStorage().id;
let subscribedPodcastsIDs = getSubscribedPodcastsIDs();


function addPodcastToSubscriptionList(podcastId) {
    let subscribedPodcasts = getSubscribedPodcasts();
    if (!subscribedPodcasts.includes(podcastId)) {
        const currentDate = new Date();
        subscribedPodcasts.push({ id: podcastId, subscriptionDate: currentDate });
        localStorage.setItem('subscribedPodcasts', JSON.stringify(subscribedPodcasts));
        console.log('Podcast with ID: ' + podcastId + ' added to the subscribed list');
    }
}

function checkSubscription() {
    if (subscribedPodcastsIDs.includes(podcastID)) {
        subscribeBtn.classList.replace('btn-primary', 'btn-success');
        translate(subscribeBtn, 'subscribedAlready');
        subscribeBtn.addEventListener('click', () => {
            location.href = 'podcast-details-subscribed.html';
        });
    }
}

subscribeBtn.addEventListener('click', () => {
    if (!subscribedPodcastsIDs.includes(podcastID)) {
        addPodcastToSubscriptionList(podcastID);
        // alert('You successfully subscribed to this Podcast!');
        // location.href = 'podcast-details-subscribed.html';
        subscribeBtn.classList.replace('btn-primary', 'btn-success');
        translate(subscribeBtn, 'subscribedMsg')
        setTimeout(() => {
            location.href = 'podcast-details-subscribed.html';
        }, 1000);
    }
});

checkSubscription();
