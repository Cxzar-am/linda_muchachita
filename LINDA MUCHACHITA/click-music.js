const audio = new Audio('Music/click-music.mp3');
let isPlaying = false;
audio.volume = 0.3;

const btn = document.getElementById('musicBtn');

btn.addEventListener('click', async () => {
  try {
    if (isPlaying) {
      audio.pause();
      btn.textContent = '🔇';
    } else {
      await audio.play();
      btn.textContent = '🔊';
    }
    isPlaying = !isPlaying;
  } catch (e) {
    console.error("Error al reproducir la música:", e);
  }
});
