
const endDate = new Date("2025-09-25T11:00:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const canvas = document.getElementById("fireworks");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    document.querySelector(".countdown").style.display = "none";
    canvas.style.display = "block";
    launchFireworks();
    return;
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const m = Math.floor((distance / (1000 * 60)) % 60);
  const s = Math.floor((distance / 1000) % 60);

  animateChange(daysEl, d);
  animateChange(hoursEl, h);
  animateChange(minutesEl, m);
  animateChange(secondsEl, s);
}

function animateChange(el, newVal) {
  if (el.textContent !== String(newVal).padStart(2, "0")) {
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = String(newVal).padStart(2, "0");
      el.style.opacity = 1;
    }, 150);
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

function launchFireworks() {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];

  function createParticle() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const radius = Math.random() * 3 + 2;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const speedX = (Math.random() - 0.5) * 4;
    const speedY = (Math.random() - 0.5) * 4;
    return { x, y, radius, color, speedX, speedY, alpha: 1 };
  }

  for (let i = 0; i < 100; i++) {
    particles.push(createParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= 0.01;
      if (p.alpha <= 0) {
        particles[i] = createParticle();
      }
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
