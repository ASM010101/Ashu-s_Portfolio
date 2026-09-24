// Hand-drawn Sketch & Ink Line-Art Procedural Texture Generator
// Faithfully matching the exact art style of itomdev.com
// Zero external image files, 100% browser-native canvas rendering

import * as THREE from 'three';

// Utility for natural jittery hand-drawn line
function sketchLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  jitter = 1.8
) {
  const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * jitter;
  const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * jitter;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(midX, midY, x2, y2);
  ctx.stroke();
}

// 1. FRONT ENTRANCE FACADE TEXTURE (House, Brick Wall, Door with Tech Stickers, Tree, Mouse Swing, Cat, Window)
export function createHouseFacadeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Paper base
  ctx.fillStyle = '#f6f7f9';
  ctx.fillRect(0, 0, 1024, 1024);

  // Brick wall pattern with hand-drawn lines
  ctx.strokeStyle = '#2b303a';
  ctx.lineWidth = 1.8;
  const brickH = 34;
  const brickW = 80;
  for (let y = 80; y < 900; y += brickH) {
    sketchLine(ctx, 40, y, 984, y, 1.5);
    const row = Math.floor(y / brickH);
    const offset = (row % 2) * (brickW / 2);
    for (let x = offset; x < 984; x += brickW) {
      if (x > 370 && x < 650 && y > 340) continue; // Don't draw over door
      if (x > 670 && x < 870 && y > 380 && y < 640) continue; // Don't draw over window
      if (x < 320 && y > 240) continue; // Tree area
      sketchLine(ctx, x, y, x, y + brickH, 1.2);
    }
  }

  // TREE ON LEFT
  ctx.strokeStyle = '#1e2229';
  ctx.lineWidth = 3.5;
  // Trunk
  ctx.beginPath();
  ctx.moveTo(180, 920);
  ctx.bezierCurveTo(170, 700, 140, 520, 200, 340);
  ctx.bezierCurveTo(240, 520, 230, 700, 240, 920);
  ctx.stroke();
  // Branches
  sketchLine(ctx, 170, 520, 90, 420, 2.5);
  sketchLine(ctx, 220, 480, 310, 400, 2.5);
  sketchLine(ctx, 200, 380, 180, 240, 2.5);
  // Foliage puffs
  ctx.fillStyle = '#ebedf2';
  for (let i = 0; i < 9; i++) {
    const cx = 110 + (i % 3) * 75 + Math.random() * 20;
    const cy = 200 + Math.floor(i / 3) * 65;
    const r = 55 + (i % 2) * 20;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // MOUSE SWING HANGING FROM TREE
  ctx.strokeStyle = '#2b303a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(270, 420);
  ctx.bezierCurveTo(270, 560, 275, 600, 275, 670);
  ctx.stroke();
  // Mouse body
  ctx.fillStyle = '#f8f9fa';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(275, 720, 24, 38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Mouse center line & scroll wheel
  sketchLine(ctx, 275, 682, 275, 720, 0.5);
  ctx.strokeRect(271, 700, 8, 14);

  // SITTING CAT ON GROUND
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 2;
  // Cat body
  ctx.beginPath();
  ctx.ellipse(345, 800, 24, 34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Cat head
  ctx.beginPath();
  ctx.arc(345, 755, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Ears
  ctx.beginPath();
  ctx.moveTo(332, 745);
  ctx.lineTo(326, 730);
  ctx.lineTo(338, 740);
  ctx.moveTo(352, 740);
  ctx.lineTo(364, 730);
  ctx.lineTo(358, 745);
  ctx.stroke();
  // Eyes & whiskers
  ctx.fillStyle = '#1e2229';
  ctx.beginPath();
  ctx.arc(339, 754, 2, 0, Math.PI * 2);
  ctx.arc(351, 754, 2, 0, Math.PI * 2);
  ctx.fill();
  sketchLine(ctx, 332, 758, 318, 756, 0.5);
  sketchLine(ctx, 358, 758, 372, 756, 0.5);

  // WINDOW ON RIGHT WITH SUCCULENT PLANTER & RUBBER DUCK
  ctx.fillStyle = '#f3f5f8';
  ctx.lineWidth = 3;
  ctx.fillRect(680, 420, 180, 180);
  ctx.strokeRect(680, 420, 180, 180);
  // Window panes cross
  sketchLine(ctx, 770, 420, 770, 600, 1);
  sketchLine(ctx, 680, 510, 860, 510, 1);
  // Planter Box
  ctx.fillStyle = '#e8ecf1';
  ctx.fillRect(660, 610, 220, 45);
  ctx.strokeRect(660, 610, 220, 45);
  // Rubber duck
  ctx.fillStyle = '#f7d047';
  ctx.beginPath();
  ctx.arc(810, 595, 12, 0, Math.PI * 2); // head
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(800, 604, 18, 11, 0, 0, Math.PI * 2); // body
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#e85d04';
  ctx.beginPath();
  ctx.moveTo(822, 595);
  ctx.lineTo(832, 597);
  ctx.lineTo(822, 600);
  ctx.fill();
  ctx.stroke();

  // DOUBLE ENTRANCE DOORS
  ctx.fillStyle = '#fdfefe';
  ctx.lineWidth = 4;
  ctx.fillRect(400, 360, 224, 480);
  ctx.strokeRect(400, 360, 224, 480);
  // Center door seam
  ctx.lineWidth = 2.5;
  sketchLine(ctx, 512, 360, 512, 840, 0.8);
  // Left door inner panel
  ctx.strokeRect(415, 385, 85, 430);
  // Right door inner panel
  ctx.strokeRect(524, 385, 85, 430);
  // Door handles
  ctx.lineWidth = 3;
  sketchLine(ctx, 498, 620, 486, 620, 0.5);
  sketchLine(ctx, 526, 620, 538, 620, 0.5);

  // TECH STICKERS ON THE DOORS (The iconic ITom sticker look)
  // 1. Python sticker (yellow/blue)
  ctx.fillStyle = '#3776ab';
  ctx.fillRect(426, 420, 40, 24);
  ctx.fillStyle = '#ffd43b';
  ctx.fillRect(446, 432, 20, 12);
  ctx.font = 'bold 11px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Python', 430, 436);

  // 2. PyTorch (Flame sticker)
  ctx.fillStyle = '#ee4c2c';
  ctx.beginPath();
  ctx.arc(555, 430, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 9px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('PyTorch', 538, 456);

  // 3. LangChain (Green badge)
  ctx.fillStyle = '#1c3c3c';
  ctx.fillRect(426, 480, 58, 22);
  ctx.font = 'bold 9px sans-serif';
  ctx.fillStyle = '#2dd4bf';
  ctx.fillText('🦜 LangChain', 428, 495);

  // 4. TypeScript (Blue TS badge)
  ctx.fillStyle = '#3178c6';
  ctx.fillRect(535, 480, 28, 28);
  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('TS', 540, 501);

  // 5. React (Cyan atom badge)
  ctx.fillStyle = '#22272e';
  ctx.fillRect(535, 530, 56, 26);
  ctx.font = 'bold 11px sans-serif';
  ctx.fillStyle = '#61dafb';
  ctx.fillText('⚛ React', 539, 547);

  // 6. Hugging Face (Yellow emoji)
  ctx.fillStyle = '#ffd21e';
  ctx.beginPath();
  ctx.arc(445, 545, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#000000';
  ctx.fillText('🤗', 438, 550);

  // 7. Node.js (Green badge)
  ctx.fillStyle = '#339933';
  ctx.fillRect(426, 590, 48, 20);
  ctx.font = 'bold 10px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('node.js', 430, 604);

  // 8. Docker (Whale badge)
  ctx.fillStyle = '#2496ed';
  ctx.fillRect(535, 590, 52, 20);
  ctx.font = 'bold 10px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Docker', 540, 604);

  // 9. IEEE & ICICS Research stickers
  ctx.fillStyle = '#00629b';
  ctx.fillRect(426, 680, 62, 22);
  ctx.font = 'bold 10px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('IEEE 2024', 430, 695);

  ctx.fillStyle = '#e65100';
  ctx.fillRect(535, 680, 62, 22);
  ctx.font = 'bold 10px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('ICICS 2025', 538, 695);

  // 10. IIT Patna badge
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(435, 730, 150, 24);
  ctx.font = 'bold 10px monospace';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('IIT PATNA · M.TECH AI', 445, 746);

  // HANGING WOODEN SIGN: "PORTFOLIO // ASHISH MAURYA"
  // Chains
  ctx.strokeStyle = '#2b303a';
  ctx.lineWidth = 2.5;
  sketchLine(ctx, 440, 270, 440, 310, 0.5);
  sketchLine(ctx, 584, 270, 584, 310, 0.5);
  // Plank
  ctx.fillStyle = '#e9edf3';
  ctx.lineWidth = 3.5;
  ctx.fillRect(410, 270, 204, 55);
  ctx.strokeRect(410, 270, 204, 55);
  // Wood screws in corners
  ctx.lineWidth = 1.5;
  ctx.strokeRect(416, 276, 5, 5);
  ctx.strokeRect(603, 276, 5, 5);
  ctx.strokeRect(416, 314, 5, 5);
  ctx.strokeRect(603, 314, 5, 5);
  // Text
  ctx.font = 'bold 24px "Patrick Hand", "Comic Neue", cursive, sans-serif';
  ctx.fillStyle = '#1e232a';
  ctx.textAlign = 'center';
  ctx.fillText('PORTFOLIO', 512, 304);
  ctx.textAlign = 'left';

  // COBBLESTONE PATH AT BOTTOM
  ctx.lineWidth = 1.8;
  for (let y = 845; y < 1000; y += 32) {
    for (let x = 380; x < 640; x += 44) {
      ctx.beginPath();
      ctx.ellipse(x + (y % 2) * 18, y, 18, 10, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// 2. CORRIDOR WOODEN FLOOR TEXTURE (Hand-inked wood planks with wood grain)
export function createWoodFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f4f6f9';
  ctx.fillRect(0, 0, 1024, 1024);

  const plankW = 128;
  ctx.strokeStyle = '#20242c';

  for (let x = 0; x < 1024; x += plankW) {
    // Vertical plank edge
    ctx.lineWidth = 3.2;
    sketchLine(ctx, x, 0, x, 1024, 1.2);

    // Staggered horizontal plank joints
    ctx.lineWidth = 2.8;
    const jointY = ((x / plankW) % 3) * 340 + 120;
    sketchLine(ctx, x, jointY, x + plankW, jointY, 1);
    if (jointY + 500 < 1024) {
      sketchLine(ctx, x, jointY + 500, x + plankW, jointY + 500, 1);
    }

    // Wood grain lines
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(32, 36, 44, 0.45)';
    for (let g = 0; g < 4; g++) {
      const gx = x + 16 + g * 28;
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.bezierCurveTo(
        gx + (Math.random() - 0.5) * 20,
        300,
        gx + (Math.random() - 0.5) * 20,
        700,
        gx,
        1024
      );
      ctx.stroke();
    }

    // Wood knot circle
    if (Math.random() > 0.4) {
      const knotY = ((x * 7) % 700) + 150;
      ctx.beginPath();
      ctx.ellipse(x + 64, knotY, 12, 20, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 6);
  return texture;
}

// 3. CORRIDOR WOODEN SIGN TEXTURE (e.g. "THE GALLERY", "THE STUDIO", "ABOUT", "CONTACT")
export function createCorridorSignTexture(title: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d')!;

  // Wood plank background
  ctx.fillStyle = '#f1f4f8';
  ctx.fillRect(0, 0, 512, 160);

  // Outer border with ink jitter
  ctx.strokeStyle = '#1e232a';
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, 500, 148);

  // Screws in corners
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, 8, 8);
  ctx.strokeRect(488, 16, 8, 8);
  ctx.strokeRect(16, 136, 8, 8);
  ctx.strokeRect(488, 136, 8, 8);

  // Wood grain
  ctx.strokeStyle = 'rgba(30, 35, 42, 0.2)';
  ctx.lineWidth = 1.2;
  for (let i = 25; i < 150; i += 22) {
    sketchLine(ctx, 20, i, 492, i, 1.5);
  }

  // Bold hand-drawn block title
  ctx.font = 'bold 44px "Patrick Hand", "Permanent Marker", cursive, sans-serif';
  ctx.fillStyle = '#1e232a';
  ctx.textAlign = 'center';
  ctx.fillText(title.toUpperCase(), 256, 95);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 4. BLUEPRINT DOOR POSTER WITH MASKING TAPE TEXTURE
export function createBlueprintDoorTexture(label: string, category: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  // Door wood base
  ctx.fillStyle = '#fbfcfe';
  ctx.fillRect(0, 0, 512, 768);

  // Door frame border
  ctx.strokeStyle = '#1e232a';
  ctx.lineWidth = 5;
  ctx.strokeRect(8, 8, 496, 752);

  // Inner frame
  ctx.lineWidth = 2.5;
  ctx.strokeRect(32, 32, 448, 704);

  // Taped Blueprint Sheet 1 (Top)
  ctx.fillStyle = '#eef3fa';
  ctx.fillRect(70, 70, 372, 280);
  ctx.strokeStyle = '#2b303a';
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 70, 372, 280);

  // Technical blueprint sketch lines inside sheet 1
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 1.2;
  for (let x = 90; x < 420; x += 30) {
    ctx.strokeRect(x, 90, 24, 24);
  }
  // Title on blueprint
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillStyle = '#1e293b';
  ctx.fillText(label.toUpperCase(), 90, 160);
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillStyle = '#64748b';
  ctx.fillText(category.toUpperCase(), 90, 185);

  // Blue masking tape in 4 corners of Sheet 1
  ctx.fillStyle = 'rgba(59, 130, 246, 0.75)';
  // Top-left tape
  ctx.save();
  ctx.translate(65, 65);
  ctx.rotate(-0.4);
  ctx.fillRect(-10, -25, 20, 50);
  ctx.restore();
  // Top-right tape
  ctx.save();
  ctx.translate(440, 65);
  ctx.rotate(0.4);
  ctx.fillRect(-10, -25, 20, 50);
  ctx.restore();

  // Taped Blueprint Sheet 2 (Bottom)
  ctx.fillStyle = '#eef3fa';
  ctx.fillRect(70, 390, 372, 280);
  ctx.strokeStyle = '#2b303a';
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 390, 372, 280);

  // Bottom tape strips
  ctx.fillStyle = 'rgba(59, 130, 246, 0.75)';
  ctx.save();
  ctx.translate(65, 385);
  ctx.rotate(-0.4);
  ctx.fillRect(-10, -25, 20, 50);
  ctx.restore();
  ctx.save();
  ctx.translate(440, 385);
  ctx.rotate(0.4);
  ctx.fillRect(-10, -25, 20, 50);
  ctx.restore();

  // Door handle
  ctx.strokeStyle = '#1e232a';
  ctx.lineWidth = 4;
  sketchLine(ctx, 420, 370, 460, 370, 0.5);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 5. HAND-DRAWN SKETCH AVATAR (ASHISH MAURYA) WITH BIG BUBBLE LETTERS & DOODLES
export function createAvatarBillboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 1024, 768);

  // BIG BUBBLE INK LETTERS: "ASHISH"
  ctx.font = 'bold 96px "Permanent Marker", "Patrick Hand", cursive, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#1e232a';
  ctx.lineWidth = 7;
  ctx.textAlign = 'center';
  ctx.strokeText('ASHISH', 512, 190);
  ctx.fillText('ASHISH', 512, 190);

  // Subtitle in typewriter brackets
  ctx.font = 'bold 26px "JetBrains Mono", monospace';
  ctx.fillStyle = '#1e232a';
  ctx.fillText('< applied ai engineer />', 512, 235);

  // HAND-DRAWN CHARACTER AVATAR (Smiling engineer with glasses, waving)
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#1e232a';
  ctx.fillStyle = '#ffffff';

  // Head
  ctx.beginPath();
  ctx.arc(512, 330, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Hair
  ctx.fillStyle = '#22262e';
  ctx.beginPath();
  ctx.arc(512, 320, 50, Math.PI * 0.9, Math.PI * 2.1);
  ctx.fill();
  ctx.stroke();

  // Glasses
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.strokeRect(484, 320, 24, 18);
  ctx.strokeRect(516, 320, 24, 18);
  sketchLine(ctx, 508, 328, 516, 328, 0.2);

  // Smile
  ctx.beginPath();
  ctx.arc(512, 350, 14, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Torso / T-Shirt
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(464, 380);
  ctx.lineTo(560, 380);
  ctx.lineTo(550, 520);
  ctx.lineTo(474, 520);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Waving Right Arm
  ctx.beginPath();
  ctx.moveTo(560, 390);
  ctx.lineTo(610, 350);
  ctx.lineTo(625, 310); // hand waving
  ctx.stroke();
  // Left Arm in pocket
  ctx.beginPath();
  ctx.moveTo(464, 390);
  ctx.lineTo(440, 450);
  ctx.lineTo(468, 510);
  ctx.stroke();

  // Legs & Shoes
  sketchLine(ctx, 490, 520, 485, 680, 1.5);
  sketchLine(ctx, 534, 520, 539, 680, 1.5);
  // Shoes
  ctx.strokeRect(470, 680, 25, 12);
  ctx.strokeRect(530, 680, 25, 12);

  // FLOATING SKETCH DOODLES AROUND AVATAR (like itomdev)
  // 1. Paper airplane
  ctx.beginPath();
  ctx.moveTo(680, 180);
  ctx.lineTo(740, 150);
  ctx.lineTo(705, 205);
  ctx.closePath();
  ctx.stroke();
  sketchLine(ctx, 740, 150, 695, 195, 0.5);

  // 2. Coffee Mug
  ctx.strokeRect(660, 270, 22, 26);
  ctx.beginPath();
  ctx.arc(682, 283, 7, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();

  // 3. Pencil
  ctx.strokeRect(320, 440, 40, 8);
  ctx.beginPath();
  ctx.moveTo(320, 440);
  ctx.lineTo(306, 444);
  ctx.lineTo(320, 448);
  ctx.closePath();
  ctx.stroke();

  // 4. Crumpled paper balls
  ctx.beginPath();
  ctx.arc(330, 280, 16, 0, Math.PI * 2);
  ctx.stroke();
  sketchLine(ctx, 320, 272, 340, 288, 1);
  sketchLine(ctx, 335, 268, 324, 292, 1);

  // 5. Sparkles / Asterisks
  const sparkles = [
    [310, 200],
    [720, 240],
    [340, 360],
    [690, 370],
    [410, 490],
    [630, 480],
  ];
  sparkles.forEach(([sx, sy]) => {
    sketchLine(ctx, sx - 8, sy, sx + 8, sy, 0.5);
    sketchLine(ctx, sx, sy - 8, sx, sy + 8, 0.5);
  });

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 6. HAND-DRAWN FLUFFY CLOUDS (for the Sky Walker About Room)
export function createCloudTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 256);

  ctx.fillStyle = '#f9fafb';
  ctx.strokeStyle = '#22262e';
  ctx.lineWidth = 3.5;

  // Cloud lobes
  ctx.beginPath();
  ctx.arc(140, 150, 60, Math.PI * 0.7, Math.PI * 1.8);
  ctx.arc(230, 100, 75, Math.PI * 1.0, Math.PI * 2.0);
  ctx.arc(330, 110, 65, Math.PI * 1.1, Math.PI * 2.1);
  ctx.arc(400, 160, 55, Math.PI * 1.3, Math.PI * 0.3);
  ctx.lineTo(120, 180);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Subtle interior pencil hatch
  ctx.strokeStyle = 'rgba(34, 38, 46, 0.18)';
  ctx.lineWidth = 1.2;
  for (let i = 160; i < 380; i += 18) {
    sketchLine(ctx, i, 130, i + 20, 165, 0.8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 7. OCEAN DOCK WAVES (for the Contact Pier Scene)
export function createOceanWavesTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f4f6fa';
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.strokeStyle = '#242a34';
  ctx.lineWidth = 1.8;

  // Rhythmic hand-drawn wave ripples
  for (let y = 30; y < 1024; y += 38) {
    for (let x = 0; x < 1024; x += 110) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + 35, y - 14, x + 75, y + 14, x + 110, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}
