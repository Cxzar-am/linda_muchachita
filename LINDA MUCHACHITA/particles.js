(() => {
  const canvas = document.getElementById('bg');
  const ctx    = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const NUM = 200;         // Ajusta densidad
  const particles = [];

  class Snow {
    constructor() {
      // parametrización individual
      this.size  = 1 + Math.random() * 3;
      this.speed = 20 + Math.random() * 60;
      this.amp   = 2 + Math.random() * 4;    // zig-zag más discreto
      this.freq  = 0.002 + Math.random() * 0.003;
      this.phase = Math.random() * Math.PI * 2;
      this.reset();
    }
    reset() {
      // 1) X aleatorio en todo el ancho
      this.x = Math.random() * w;
      // 2) Y aleatorio arriba de la pantalla
      this.y = Math.random() * -h;
    }
    update(dt) {
      // cae siempre hacia abajo
      this.y += this.speed * dt;
      // zig-zag leve en torno a su x inicial
      this.x += this.amp * Math.sin(this.freq * this.y + this.phase) * dt;
      // si sale por abajo, reiniciamos arriba
      if (this.y > h + this.size) this.reset();
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fill();
    }
  }

  // instancia partículas
  for (let i = 0; i < NUM; i++) {
    particles.push(new Snow());
  }

  // bucle principal
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
