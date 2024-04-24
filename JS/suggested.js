const suggestionsForYou = document.querySelector('h1');
translate(suggestionsForYou, 'suggestionsForYou')

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
    podcastIndexTrendingAPI(12, topCategories).then((data) => {
      updateGrid(data.feeds, "suggested");
  });
});
