(() => {
  const canvas = document.getElementById('emojiCanvas');
  const ctx    = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const EMOJIS = ["🥰", "💖", "😍", "😘", "💕", "🌸", "💘", "✨", "😻"];
  const NUM = 25;
  const particles = [];

  class Emoji {
    constructor() {
      this.reset();
    }

    reset() {
      this.x     = Math.random() * w;
      this.y     = Math.random() * -h;
      this.size  = 24 + Math.random() * 16;
      this.speed = 20 + Math.random() * 60;
      this.amp   = 20 + Math.random() * 20;
      this.freq  = 0.002 + Math.random() * 0.003;
      this.phase = Math.random() * Math.PI * 2;
      this.char  = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    }

    update(dt) {
      this.y += this.speed * dt;
      this.x += this.amp * Math.sin(this.freq * this.y + this.phase) * dt;
      if (this.y > h + this.size) this.reset();
    }

    draw(ctx) {
      ctx.font = `${this.size}px serif`;
      ctx.textAlign = "center";
      ctx.fillText(this.char, this.x, this.y);
    }
  }

  for (let i = 0; i < NUM; i++) {
    particles.push(new Emoji());
  }

  let last = performance.now();
  function loop(now) {
    const dt = (now - last) / 1000;
    last = now;

    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.update(dt);
      p.draw(ctx);
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();