// Smooth fade transition and scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);

    if (targetElement) {
      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.scrollTo({
          top: targetElement.offsetTop - 60,
          behavior: 'smooth',
        });

        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');

        setTimeout(() => {
          document.body.classList.remove('fade-in');
        }, 600);
      }, 600);
    }
  });
});

// Playlist array — update paths and titles as needed
const playlist = [
  {
    src: "C:\\Users\\kevin\\OneDrive\\Escritorio\\Portafolio Final\\Cautivo.mp4",
    title: "Cautivo – Klavel"
  },
  {
    src: "C:\\Users\\kevin\\OneDrive\\Escritorio\\Portafolio Final\\Fallen Down.mp4",
    title: "Fallen Down (Reprise) - Toby Fox"
  }
];

let currentTrack = 0;

const audio = document.getElementById('audio');
const fileNameDisplay = document.getElementById('file-name');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const bars = document.querySelectorAll('.bar');

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  audio.setAttribute("data-title", track.title);
  fileNameDisplay.textContent = `Now Playing: ${track.title}`;
  audio.play();
}

// Next button handler
nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
});

// Previous button handler
prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
});

// Automatically play next track when current one ends
audio.addEventListener('ended', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
});

// Animate bars on play
audio.addEventListener('play', () => {
  bars.forEach(bar => {
    bar.style.animationPlayState = 'running';
  });
});

// Pause animation on pause or ended
audio.addEventListener('pause', () => {
  bars.forEach(bar => {
    bar.style.animationPlayState = 'paused';
  });
});
audio.addEventListener('ended', () => {
  bars.forEach(bar => {
    bar.style.animationPlayState = 'paused';
  });
});

// Load first track on page load
document.addEventListener('DOMContentLoaded', () => {
  loadTrack(currentTrack);
});
