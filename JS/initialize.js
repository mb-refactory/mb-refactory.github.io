// Se è la prima visita rimanda al Login
if (!localStorage.getItem('visitedBefore')) {
    window.location.href = 'login.html';
    localStorage.setItem('visitedBefore', true);
}


function initializeSubscribedPodcasts() {
    if (!localStorage.getItem('subscribedPodcasts')) {
        localStorage.setItem('subscribedPodcasts', JSON.stringify([]));
    }
}

initializeSubscribedPodcasts();

