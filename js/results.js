
const resultsElement = document.querySelector('h1');
translate (resultsElement, 'results')

let searchTerms = sessionStorage.getItem('searched');
showLoadingSpinner()
podcastIndexSearchAPI(searchTerms, 12).then((data) => {
  if (data.feeds.length === 0){
    searchAgain();
    return
  }
  updateGrid(data.feeds, 'suggested');
});
