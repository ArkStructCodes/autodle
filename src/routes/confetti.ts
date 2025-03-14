import confetti from "canvas-confetti";

// adapted from https://www.kirilv.com/canvas-confetti/#realistic
function fireConfetti(particleRatio: number, options: confetti.Options): void {
  confetti({
    origin: { y: 0.6 },
    ...options,
    particleCount: Math.floor(200 * particleRatio),
  });
}

export function celebrate(): void {
  fireConfetti(0.25, { spread: 30, startVelocity: 60 });
  fireConfetti(0.2, { spread: 60 });
  fireConfetti(0.35, { spread: 100, decay: 0.9, scalar: 0.8 });
  fireConfetti(0.1, { spread: 120, startVelocity: 30, decay: 0.9, scalar: 1.2 });
  fireConfetti(0.1, { spread: 120, startVelocity: 45 });
}
