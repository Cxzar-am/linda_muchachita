const palabrasBonitas = [
  "Radiante", "Hermosa", "Divina", "Preciosa", "Linda",
  "Encantadora", "Perfecta", "Única", "Mi Sol", "Eres Arte"
];

const colores = ["#ff69b4", "#dda0dd", "#87cefa"]; // Rosado, lila, celeste

document.addEventListener("click", (e) => {
  for (let i = 0; i < 10; i++) {
    const palabra = document.createElement("span");
    palabra.className = "sparkle-word";
    palabra.textContent = palabrasBonitas[Math.floor(Math.random() * palabrasBonitas.length)];
    
    palabra.style.left = `${e.clientX + (Math.random() * 100 - 50)}px`;
    palabra.style.top = `${e.clientY + (Math.random() * 100 - 50)}px`;
    palabra.style.color = colores[Math.floor(Math.random() * colores.length)];
    palabra.style.fontFamily = "'Lovely', cursive";

    document.body.appendChild(palabra);

    setTimeout(() => {
      palabra.remove();
    }, 1000); // Borrar después de la animación
  }
});
