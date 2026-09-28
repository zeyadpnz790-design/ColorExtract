/**
 * ColorExtract - Preset Sample Images Generator
 * Generates rich, authentic procedural graphic canvases as test images
 * so users can immediately test the extraction algorithms with 1 click.
 */

class SampleImageGenerator {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Generates a sample image data URL
   * @param {'sunset'|'cyberpunk'|'nature'|'minimal'} type
   * @returns {string} data URL
   */
  getSample(type) {
    if (this.cache.has(type)) {
      return this.cache.get(type);
    }

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 440;
    const ctx = canvas.getContext('2d');

    switch (type) {
      case 'sunset':
        this._renderSunset(ctx, 640, 440);
        break;
      case 'cyberpunk':
        this._renderCyberpunk(ctx, 640, 440);
        break;
      case 'nature':
        this._renderNature(ctx, 640, 440);
        break;
      case 'minimal':
        this._renderMinimal(ctx, 640, 440);
        break;
      default:
        this._renderSunset(ctx, 640, 440);
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    this.cache.set(type, dataUrl);
    return dataUrl;
  }

  _renderSunset(ctx, w, h) {
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    sky.addColorStop(0, '#2b0938');
    sky.addColorStop(0.3, '#7928ca');
    sky.addColorStop(0.6, '#ff4b4b');
    sky.addColorStop(0.85, '#ff9f1c');
    sky.addColorStop(1, '#ffe49e');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Glowing Sun
    ctx.save();
    const sunGrad = ctx.createRadialGradient(w * 0.5, h * 0.52, 10, w * 0.5, h * 0.52, 140);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.2, '#fff176');
    sunGrad.addColorStop(0.6, 'rgba(255, 112, 67, 0.8)');
    sunGrad.addColorStop(1, 'rgba(255, 61, 0, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.52, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Ocean Water
    const sea = ctx.createLinearGradient(0, h * 0.65, 0, h);
    sea.addColorStop(0, '#102a43');
    sea.addColorStop(0.4, '#0b1d3a');
    sea.addColorStop(1, '#050c1a');
    ctx.fillStyle = sea;
    ctx.fillRect(0, h * 0.65, w, h * 0.35);

    // Water Sun Reflection
    ctx.fillStyle = 'rgba(255, 183, 77, 0.45)';
    for (let y = h * 0.66; y < h; y += 8) {
      const spread = (y - h * 0.65) * 1.8;
      ctx.fillRect(w * 0.5 - spread / 2, y, spread, 3);
    }

    // Distant Island / Mountain Silhouette
    ctx.fillStyle = '#1c0f24';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.65);
    ctx.lineTo(w * 0.25, h * 0.56);
    ctx.lineTo(w * 0.45, h * 0.62);
    ctx.lineTo(w * 0.65, h * 0.54);
    ctx.lineTo(w * 0.88, h * 0.63);
    ctx.lineTo(w, h * 0.65);
    ctx.lineTo(w, h * 0.7);
    ctx.lineTo(0, h * 0.7);
    ctx.closePath();
    ctx.fill();
  }

  _renderCyberpunk(ctx, w, h) {
    // Dark neon backdrop
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#0a0a14');
    bg.addColorStop(0.5, '#120d29');
    bg.addColorStop(1, '#050814');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Grid perspective
    ctx.strokeStyle = 'rgba(0, 245, 212, 0.2)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x <= w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, h * 0.6);
      ctx.lineTo(w * 0.5 + (x - w * 0.5) * 2.2, h);
      ctx.stroke();
    }
    for (let y = h * 0.6; y <= h; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Neon Skyscrapers
    const buildings = [
      { x: 30, w: 70, h: 260, color: '#ff007f' },
      { x: 120, w: 90, h: 320, color: '#7b2cbf' },
      { x: 230, w: 110, h: 370, color: '#00f5d4' },
      { x: 360, w: 85, h: 290, color: '#fee440' },
      { x: 460, w: 100, h: 340, color: '#ff007f' },
      { x: 575, w: 60, h: 250, color: '#00bbf9' }
    ];

    buildings.forEach(b => {
      // Silhouette
      ctx.fillStyle = '#0f1123';
      ctx.fillRect(b.x, h * 0.6 - b.h * 0.6, b.w, b.h * 0.6 + 50);

      // Neon outline
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(b.x, h * 0.6 - b.h * 0.6, b.w, b.h * 0.6 + 50);

      // Windows
      ctx.fillStyle = b.color;
      for (let wx = b.x + 10; wx < b.x + b.w - 10; wx += 14) {
        for (let wy = h * 0.6 - b.h * 0.6 + 15; wy < h * 0.6 + 20; wy += 22) {
          if (Math.sin(wx * wy) > -0.3) {
            ctx.fillRect(wx, wy, 6, 9);
          }
        }
      }
    });

    // Glowing Neon Moon
    ctx.save();
    const moonGrad = ctx.createRadialGradient(w * 0.8, h * 0.22, 10, w * 0.8, h * 0.22, 90);
    moonGrad.addColorStop(0, '#fee440');
    moonGrad.addColorStop(0.4, '#ff007f');
    moonGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.22, 90, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  _renderNature(ctx, w, h) {
    // Lush botanical forest gradient
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#022c22');
    bg.addColorStop(0.4, '#064e3b');
    bg.addColorStop(0.8, '#065f46');
    bg.addColorStop(1, '#022c22');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Fern / Leaf shapes
    const leaves = [
      { x: w * 0.2, y: h * 0.75, r: 180, angle: -0.6, color: '#10b981' },
      { x: w * 0.45, y: h * 0.85, r: 240, angle: -0.2, color: '#059669' },
      { x: w * 0.75, y: h * 0.7, r: 210, angle: 0.5, color: '#34d399' },
      { x: w * 0.35, y: h * 0.45, r: 150, angle: 0.1, color: '#6ee7b7' },
      { x: w * 0.6, y: h * 0.35, r: 130, angle: -0.4, color: '#a7f3d0' }
    ];

    leaves.forEach(leaf => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.angle);

      ctx.fillStyle = leaf.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.r * 0.4, leaf.r * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Leaf veins
      ctx.strokeStyle = '#022c22';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -leaf.r * 0.85);
      ctx.lineTo(0, leaf.r * 0.85);
      ctx.stroke();

      ctx.restore();
    });

    // Sun dappled light circles
    ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
    const spots = [
      [120, 100, 60],
      [480, 140, 80],
      [280, 220, 95],
      [560, 320, 70]
    ];
    spots.forEach(([x, y, r]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  _renderMinimal(ctx, w, h) {
    // Warm Terracotta / Mediterranean architectural shapes
    ctx.fillStyle = '#fffbeb';
    ctx.fillRect(0, 0, w, h);

    // Warm Clay Arch
    ctx.fillStyle = '#c2410c';
    ctx.beginPath();
    ctx.moveTo(w * 0.15, h);
    ctx.lineTo(w * 0.15, h * 0.35);
    ctx.arc(w * 0.38, h * 0.35, w * 0.23, Math.PI, 0);
    ctx.lineTo(w * 0.61, h);
    ctx.closePath();
    ctx.fill();

    // Terracotta inner shade
    ctx.fillStyle = '#9a3412';
    ctx.beginPath();
    ctx.moveTo(w * 0.25, h);
    ctx.lineTo(w * 0.25, h * 0.42);
    ctx.arc(w * 0.38, h * 0.42, w * 0.13, Math.PI, 0);
    ctx.lineTo(w * 0.51, h);
    ctx.closePath();
    ctx.fill();

    // Baked mustard sun disc
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(w * 0.78, h * 0.3, 75, 0, Math.PI * 2);
    ctx.fill();

    // Sage botanical stem
    ctx.strokeStyle = '#4d7c0f';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.72, h);
    ctx.quadraticCurveTo(w * 0.7, h * 0.65, w * 0.75, h * 0.45);
    ctx.stroke();

    // Olive leaves
    ctx.fillStyle = '#65a30d';
    for (let i = 0; i < 5; i++) {
      const y = h * (0.85 - i * 0.08);
      const side = i % 2 === 0 ? 1 : -1;
      ctx.beginPath();
      ctx.ellipse(w * 0.73 + side * 22, y, 18, 9, side * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// Global instance
window.sampleGenerator = new SampleImageGenerator();
