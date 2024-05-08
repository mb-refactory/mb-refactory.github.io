const suggestionsForYou = document.querySelector('.suggested-msg');
translate(suggestionsForYou, 'suggestionsForYou');

const subscribedIDs = getSubscribedPodcastsIDs();
const categories = [];
let topCategories = [];

  showLoadingSpinner()
  fetchSubscribedPodcastsByIds(subscribedIDs).then((subscribedPodcasts) => {
    subscribedPodcasts.forEach((podcast) => {
      const category = Object.keys(podcast.feed.categories)[0];
      categories.push(category);
    });

    topCategories = findMostFrequentValues(categories);
    console.log("Top categories: " + topCategories);
    podcastIndexTrendingAPI(20, topCategories).then((data) => {
      const allSuggestedPodcasts = data.feeds;
      const unsubscribedSuggestedPodcasts = allSuggestedPodcasts.filter((podcast) => !subscribedIDs.includes(podcast.id));
      updateGrid(unsubscribedSuggestedPodcasts, "suggested");
  });
});
