// Flip cards - apenas um aberto por vez
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => { if(c !== card) c.classList.remove("flip"); });
    card.classList.toggle("flip");
  });
});

// Animação de fundo
const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#00aaff";
    ctx.fill();
    particles.forEach(other => {
      const dx = p.x - other.x, dy = p.y - other.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = "rgba(0,170,255,0.2)";
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(draw);
}
draw();

