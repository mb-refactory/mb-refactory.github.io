
let yourPodcastsBtn = document.querySelector('.your-podcasts-btn');
translate(yourPodcastsBtn, 'yourPodcasts').then(() => {
    AddBsIcon(yourPodcastsBtn, 'bi-archive-fill');
});

let suggestedBtn = document.querySelector('.suggested-btn');
translate(suggestedBtn, 'suggested').then(() => {
    AddBsIcon(suggestedBtn, 'bi-lightbulb-fill');
});

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
const installIcon = document.createElement('i');
installIcon.className = 'bi bi-file-earmark-arrow-down-fill text-white px-2';
translate(installBtn, 'install').then(() => {
    installBtn.appendChild(installIcon);
});

// Detect Chrome 
let userAgentString = navigator.userAgent;
let chromeAgent = userAgentString.indexOf('Chrome') > -1;
// Detect Safari 
let safariAgent = userAgentString.indexOf('Safari') > -1;
if ((chromeAgent) && (safariAgent)) safariAgent = false;

if (chromeAgent) {
    installFromChrome();
}

if (safariAgent) {
    installFromSafari();
}

function installFromChrome() {
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        installPrompt = event;
        installBtn.classList.remove('d-none');
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
}

function installFromSafari() {
    const iOSIsInstalled = window.navigator.standalone === true;

    if (!iOSIsInstalled) {
        installBtn.classList.remove('d-none');
        installBtn.addEventListener('click', () => {
            showModal();
            const modalTitle = document.querySelector('.modal-title');
            translate(modalTitle, 'instructions');
            const modalBody = document.querySelector('.modal-body');
            modalBody.textContent = '';
            const ol = document.createElement('ol');
            ol.className = 'text-start';
            const li1 = document.createElement('li');
            li1.className = 'action-1';
            const li2 = document.createElement('li');
            li2.className = 'action-2';
            const li3 = document.createElement('li');
            li3.className = 'action-3';
            ol.appendChild(li1);
            ol.appendChild(li2);
            ol.appendChild(li3);
            translate(li1, 'instruction-1');
            translate(li2, 'instruction-2');
            translate(li3, 'instruction-3');
            modalBody.appendChild(ol);
            const closeBtn = document.querySelector('.got-it');
            translate(closeBtn, 'gotIt');
        });
    }
}
