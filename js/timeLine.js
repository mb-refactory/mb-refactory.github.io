const audio = document.querySelector('audio');
const timeline = document.querySelector('.timeline');
const currentTimeElement = document.querySelector('.current-time');
const remainingTimeElement = document.querySelector('.remaining-time');

function changeTimelinePosition() {
    const percentagePosition = (100 * audio.currentTime) / audio.duration;
    timeline.style.backgroundSize = `${percentagePosition}% 100%`;
    timeline.value = percentagePosition;
}

function updateTimeMarks() {
    const currentTime = audio.currentTime;
    console.log(currentTime);
    const duration = audio.duration;
    console.log(duration);
    const remainingTime = duration - currentTime;
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    currentTimeElement.textContent = formatTime(currentTime);
    remainingTimeElement.textContent = formatTime(remainingTime);
}

function updateCurrentTime() {
    const currentTime = audio.currentTime;
    currentTimeElement.textContent = formatTime(currentTime);
}

function updateRemainingTime() {
    const duration = audio.duration;
    remainingTimeElement.textContent = formatTime(duration);
    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const remainingTime = duration - currentTime;        
        remainingTimeElement.textContent = '-' + formatTime(remainingTime);
      });
}


function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

function changeSeek() {
    const time = (timeline.value * audio.duration) / 100;
    audio.currentTime = time;
}

timeline.addEventListener('change', changeSeek);
audio.addEventListener('timeupdate', updateCurrentTime);
audio.addEventListener('loadedmetadata', updateRemainingTime);
audio.ontimeupdate = changeTimelinePosition;
timeline.addEventListener('input', () => {
    changeSeek();
    updateCurrentTime();
});

  