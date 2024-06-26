const yourPodcastsMsg = document.querySelector('.your-podcasts');
translate(yourPodcastsMsg, 'subscribedPodcasts');

const subscribedIDs = getSubscribedPodcastsIDs();

if (subscribedIDs.length === 0){
  suggestToSubscribe();
}

showLoadingSpinner()
fetchSubscribedPodcastsByIds(subscribedIDs).then((subscribedPodcasts) => {
  updateGrid(subscribedPodcasts);
});
