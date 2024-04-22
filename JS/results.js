let searchTerms = sessionStorage.getItem('searched');
showLoadingSpinner()
podcastIndexSearchAPI(searchTerms, 12).then((data) => {
  updateGrid(data.feeds, 'suggested');
});
