// Procedural Paper Grain & Drafting Texture Generator
// Creates realistic fibrous paper textures in-memory via HTML Canvas with zero external network dependencies

export function generatePaperTexture(width = 1024, height = 1024): string {
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Base warm eggshell / drafting slate paper tone
  ctx.fillStyle = '#0a0d14';
  ctx.fillRect(0, 0, width, height);

  // Subtle paper fiber noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 18;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise + 2));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise + 5));
  }
  ctx.putImageData(imgData, 0, 0);

  // Subtle millimeter drafting grid
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
  ctx.lineWidth = 1;
  const step = 32;
  for (let x = 0; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Major blueprint grid lines every 128px
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.07)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < width; x += step * 4) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += step * 4) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  return canvas.toDataURL('image/png');
}
