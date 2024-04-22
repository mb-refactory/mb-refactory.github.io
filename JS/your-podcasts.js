
const subscribedIDs = getSubscribedPodcastsIDs();

if (subscribedIDs.length === 0){
  suggestToSubscribe();
}

showLoadingSpinner()
fetchSubscribedPodcastsByIds(subscribedIDs).then((subscribedPodcasts) => {
  updateGrid(subscribedPodcasts, "your-podcasts");
  console.log(subscribedPodcasts);
});
