
let yourPodcastsBtn = document.querySelector('.your-podcasts-btn');
translate(yourPodcastsBtn, 'yourPodcasts');

let suggestedBtn = document.querySelector('.suggested-btn');
translate(suggestedBtn, 'suggested');

let searchBtn = document.querySelector('.search-btn');
translate(searchBtn, 'search');

function initializeSubscribedPodcasts() {
    if (!localStorage.getItem('subscribedPodcasts')) {
        localStorage.setItem('subscribedPodcasts', JSON.stringify([]));
    }
}

initializeSubscribedPodcasts();

// PWA Installation
let installBtn = document.querySelector('.install-btn');
translate(installBtn, 'install');
const installIcon = document.createElement('i');
installIcon.className = 'bi bi-file-earmark-arrow-down-fill text-white px-2';

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    installBtn.classList.remove('d-none');
    installBtn.appendChild(installIcon)
});

installBtn.addEventListener('click', async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
    installPrompt = null;
    installBtn.classList.add('d-none');
}


window.addEventListener('appinstalled', () => {
    disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
    installPrompt = null;
    installBtn.classList.add('d-none');
}


