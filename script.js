const endDate = new Date("2025-09-25T11:00:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let prev = {};

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    document.querySelector(".countdown").style.display = "none";
    canvas.style.display = "block";
    launchFireworks();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  animateChange(daysEl, days, 'days');
  animateChange(hoursEl, hours, 'hours');
  animateChange(minutesEl, minutes, 'minutes');
  animateChange(secondsEl, seconds, 'seconds');
}

function animateChange(el, value, key) {
  if (prev[key] !== value) {
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = String(value).padStart(2, '0');
      el.style.opacity = 1;
    }, 150);
    prev[key] = value;
  }
}

function launchFireworks() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];

  function createParticle() {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const radius = Math.random() * 3 + 2;
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    const speed = Math.random() * 3 + 2;
    const angle = Math.random() * Math.PI - Math.PI / 2;
    particles.push({ x, y, radius, color, speed, angle });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.radius *= 0.96;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      if (p.radius < 0.5) particles.splice(i, 1);
    });
  }

  function animate() {
    createParticle();
    drawParticles();
    requestAnimationFrame(animate);
  }

  animate();
}

setInterval(updateCountdown, 1000);
updateCountdown();
