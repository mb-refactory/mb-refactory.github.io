
initializePodcastDetails();

const subscribeBtn = document.querySelector('.subscribe-btn');
let podcastID = getPodcastDetailsFromSessionStorage().id;
let subscribedPodcastsIDs = getSubscribedPodcastsIDs();


function addPodcastToSubscriptionList(podcastId) {
    let subscribedPodcasts = getSubscribedPodcasts();
    if (!subscribedPodcasts.includes(podcastId)) {
        const currentDate = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        subscribedPodcasts.push({ id: podcastId, subscriptionDate: formattedDate });
        localStorage.setItem('subscribedPodcasts', JSON.stringify(subscribedPodcasts));
        console.log('Podcast with ID: ' + podcastId + ' added to the subscribed list');
        console.log('Subscribed on: ' + formattedDate);
    }
}

function checkSubscription() {
    if (subscribedPodcastsIDs.includes(podcastID)) {
        subscribeBtn.classList.replace('btn-primary', 'btn-success');
        subscribeBtn.textContent = 'Already Subscribed: view episodes';
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
        subscribeBtn.textContent = 'You subscribed to this podcast!';
        setTimeout(() => {
            location.href = 'podcast-details-subscribed.html';
        }, 2000);
    }
});

checkSubscription();
