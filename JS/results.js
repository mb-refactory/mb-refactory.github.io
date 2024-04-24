
const resultsElement = document.querySelector('h1');
translate (resultsElement, 'results')

let searchTerms = sessionStorage.getItem('searched');
showLoadingSpinner()
podcastIndexSearchAPI(searchTerms, 12).then((data) => {
  updateGrid(data.feeds, 'suggested');
});
