(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'halagosCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const frases = [
    "Eres especial", "Belleza única", "La más linda", "Perfecta en todo",
    "Hermosos ojos", "Eres arte", "Mi vida", "Dulzura pura", "Tu sonrisa brilla",
    "Reina hermosa", "La más preciosa", "Mi sol", "Maravillosa", "Brillas fuerte",
    "Eres mágica", "La más tierna", "Mi universo", "Una joya", "Te adoro"
  ];

  const colores = [
    'rgba(255,192,203,0.9)',  // rosado claro
    'rgba(173,216,230,0.9)',  // celeste claro
    'rgba(221,160,221,0.9)'   // lila (plum)
  ];

  const NUM = 30;
  const palabras = [];

  class Halago {
    constructor() {
      this.text = frases[Math.floor(Math.random() * frases.length)];
      this.color = colores[Math.floor(Math.random() * colores.length)];
      this.size = 16 + Math.random() * 10;
      this.speed = 20 + Math.random() * 30;
      this.amp = 20 + Math.random() * 30;
      this.freq = 0.002 + Math.random() * 0.003;
      this.phase = Math.random() * Math.PI * 2;
      this.reset();
    }

    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * -h;
    }

    update(dt) {
      this.y += this.speed * dt;
      this.x += this.amp * Math.sin(this.freq * this.y + this.phase) * dt;
      if (this.y > h + 50) this.reset();
    }

    draw(ctx) {
      ctx.font = `${this.size}px 'Pacifico', sans-serif`; // Aquí va la fuente
      ctx.fillStyle = this.color;
      ctx.textAlign = 'center';
      ctx.fillText(this.text, this.x, this.y);
    }
  }

  for (let i = 0; i < NUM; i++) {
    palabras.push(new Halago());
  }

  let last = performance.now();
  function loop(now) {
    const dt = (now - last) / 1000;
    last = now;

    ctx.clearRect(0, 0, w, h);
    for (const p of palabras) {
      p.update(dt);
      p.draw(ctx);
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();

