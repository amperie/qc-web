const canvas = document.querySelector(".signal-field");
const context = canvas?.getContext("2d", { alpha: true });
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let frame = 0;
let width = 0;
let height = 0;
let animationFrame = 0;

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = Math.max(1, Math.floor(width * ratio));
  canvas.height = Math.max(1, Math.floor(height * ratio));
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function paintGlow(x, y, radius, color, alpha) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`);
  gradient.addColorStop(0.45, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.28})`);
  gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
  context.fillStyle = gradient;
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

function draw() {
  frame += reducedMotion ? 0 : 0.006;
  context.clearRect(0, 0, width, height);

  const amberX = width * (0.2 + Math.sin(frame * 0.7) * 0.055);
  const amberY = height * (0.36 + Math.cos(frame * 0.55) * 0.045);
  const mossX = width * (0.48 + Math.cos(frame * 0.42) * 0.08);
  const mossY = height * (0.58 + Math.sin(frame * 0.6) * 0.055);
  const slateX = width * (0.09 + Math.sin(frame * 0.36) * 0.035);
  const slateY = height * (0.68 + Math.cos(frame * 0.5) * 0.04);

  paintGlow(amberX, amberY, Math.min(width, height) * 0.44, [255, 165, 31], 0.34);
  paintGlow(mossX, mossY, Math.min(width, height) * 0.52, [55, 78, 74], 0.34);
  paintGlow(slateX, slateY, Math.min(width, height) * 0.4, [130, 145, 143], 0.2);

  context.globalAlpha = 0.42;
  context.strokeStyle = "rgba(255, 165, 31, 0.48)";
  context.lineWidth = 1.15;
  for (let i = 0; i < 12; i += 1) {
    const y = height * (0.22 + i * 0.055);
    context.beginPath();
    for (let x = -40; x <= width * 0.76; x += 20) {
      const wave = Math.sin(x * 0.018 + frame * 1.8 + i) * (10 + i * 0.55);
      const drift = Math.cos(frame + i) * 18;
      if (x === -40) context.moveTo(x, y + wave + drift);
      else context.lineTo(x, y + wave + drift);
    }
    context.stroke();
  }
  context.globalAlpha = 1;

  context.fillStyle = "rgba(255, 177, 51, 0.58)";
  for (let i = 0; i < 52; i += 1) {
    const x = width * (0.035 + ((i * 0.127 + frame * 0.052) % 0.66));
    const y = height * (0.16 + ((i * 0.071 + Math.sin(frame + i) * 0.014) % 0.58));
    const size = i % 7 === 0 ? 2.2 : 1.35;
    context.fillRect(x, y, size, size);
  }

  if (!reducedMotion) {
    animationFrame = requestAnimationFrame(draw);
  }
}

if (canvas && context) {
  resize();
  draw();
  window.addEventListener("resize", resize);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(animationFrame));
}
