/**
 * ColorExtract - Export Manager
 * Handles PNG Palette generation, CSS variables, JSON, Tailwind, TXT, and SVG exports.
 */

class PaletteExporter {
  constructor() {}

  /**
   * Generates a high-resolution, beautifully branded PNG palette image
   * @param {Array} colors - array of extracted color objects
   * @param {string} imageName - original file name
   * @param {HTMLImageElement|null} originalImage - image element for thumbnail
   * @returns {Promise<Blob>}
   */
  async generatePngPalette(colors, imageName = "palette", originalImage = null) {
    return new Promise((resolve) => {
      const isArabic = window.i18n ? window.i18n.isRtl() : false;
      const count = colors.length;
      
      // Determine canvas dimensions based on color count
      const cols = count <= 5 ? count : count <= 10 ? 5 : count <= 20 ? 5 : 6;
      const rows = Math.ceil(count / cols);

      const cardWidth = 220;
      const cardHeight = 240;
      const padding = 60;
      const gap = 24;
      const headerHeight = 130;
      const footerHeight = 70;

      const canvasWidth = Math.max(1200, padding * 2 + cols * cardWidth + (cols - 1) * gap);
      const canvasHeight = padding * 2 + headerHeight + rows * cardHeight + (rows - 1) * gap + footerHeight;

      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');

      // High quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Background (Dark elegant SaaS card style)
      ctx.fillStyle = "#0c1322";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Subtle gradient accent glow on background
      const bgGrad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
      bgGrad.addColorStop(0, "rgba(99, 102, 241, 0.08)");
      bgGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.04)");
      bgGrad.addColorStop(1, "rgba(59, 130, 246, 0.08)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Subtle border line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, canvasWidth - 2, canvasHeight - 2);

      // 2. Header Area
      const headerY = padding;

      // ColorExtract Logo Badge
      // Draw modern palette icon
      ctx.fillStyle = "#6366f1";
      this._drawRoundedRect(ctx, padding, headerY, 44, 44, 12);
      ctx.fill();

      // Icon dots
      const dotColors = ["#ffffff", "#f43f5e", "#10b981", "#f59e0b"];
      const dotPositions = [
        [padding + 16, headerY + 16],
        [padding + 28, headerY + 16],
        [padding + 16, headerY + 28],
        [padding + 28, headerY + 28]
      ];
      dotColors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(dotPositions[i][0], dotPositions[i][1], 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Brand Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px 'Plus Jakarta Sans', Inter, -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("ColorExtract", padding + 56, headerY + 28);

      // Brand Subtitle
      ctx.fillStyle = "#94a3b8";
      ctx.font = "14px 'Plus Jakarta Sans', Inter, -apple-system, sans-serif";
      ctx.fillText("Automated Visual Color Palette • colorextract.app", padding + 56, headerY + 48);

      // Image Info on Right Side
      ctx.textAlign = "right";
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 16px 'Plus Jakarta Sans', Inter, -apple-system, sans-serif";
      const displayFileName = imageName.length > 32 ? imageName.substring(0, 29) + "..." : imageName;
      ctx.fillText(displayFileName, canvasWidth - padding, headerY + 26);

      ctx.fillStyle = "#64748b";
      ctx.font = "13px 'Plus Jakarta Sans', Inter, -apple-system, sans-serif";
      const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      ctx.fillText(`${count} Colors Detected • ${dateStr}`, canvasWidth - padding, headerY + 46);

      // Divider Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, headerY + 70);
      ctx.lineTo(canvasWidth - padding, headerY + 70);
      ctx.stroke();

      // 3. Grid of Color Swatches
      const gridStartY = headerY + 95;
      const actualGridWidth = cols * cardWidth + (cols - 1) * gap;
      const gridOffsetX = padding + (canvasWidth - padding * 2 - actualGridWidth) / 2;

      colors.forEach((c, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const x = gridOffsetX + col * (cardWidth + gap);
        const y = gridStartY + row * (cardHeight + gap);

        // Card Container background
        ctx.fillStyle = "#162032";
        this._drawRoundedRect(ctx, x, y, cardWidth, cardHeight, 16);
        ctx.fill();

        // Card subtle outline
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Swatch Pill / Box
        const swatchH = 110;
        ctx.save();
        this._drawRoundedRect(ctx, x + 8, y + 8, cardWidth - 16, swatchH, 12);
        ctx.clip();
        ctx.fillStyle = c.hex;
        ctx.fillRect(x + 8, y + 8, cardWidth - 16, swatchH);

        // Top right percentage badge inside swatch
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        this._drawRoundedRect(ctx, x + cardWidth - 68, y + 14, 52, 22, 6);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${c.percentage}%`, x + cardWidth - 42, y + 29);
        ctx.restore();

        // Color Details under swatch
        const textStartY = y + swatchH + 30;

        // HEX Code (Bold)
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px 'SF Mono', Consolas, monospace";
        ctx.fillText(c.hex, x + 16, textStartY);

        // Color Name Tag
        ctx.fillStyle = "#94a3b8";
        ctx.font = "12px 'Plus Jakarta Sans', Inter, sans-serif";
        ctx.fillText(c.name || "Color", x + 16, textStartY + 20);

        // RGB
        ctx.fillStyle = "#64748b";
        ctx.font = "12px 'SF Mono', Consolas, monospace";
        ctx.fillText(`RGB: ${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}`, x + 16, textStartY + 42);

        // HSL
        ctx.fillText(`HSL: ${c.hsl.h}°, ${c.hsl.s}%, ${c.hsl.l}%`, x + 16, textStartY + 62);
      });

      // 4. Footer Area
      const footerY = canvasHeight - padding + 15;
      ctx.textAlign = "center";
      ctx.fillStyle = "#475569";
      ctx.font = "13px 'Plus Jakarta Sans', Inter, sans-serif";
      ctx.fillText("ColorExtract — Extract Colors From Any Image • Designed for Web & Creative Professionals", canvasWidth / 2, footerY);

      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  }

  /**
   * Helper: Draw rounded rectangle path
   */
  _drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  /**
   * Generate CSS Variables
   */
  generateCssVariables(colors) {
    let css = `/* ColorExtract Palette Variables */\n:root {\n`;
    colors.forEach((c, idx) => {
      const varName = `--color-${idx + 1}`;
      css += `  ${varName}: ${c.hex}; /* ${c.name} - ${c.percentage}% */\n`;
      css += `  ${varName}-rgb: ${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b};\n`;
      css += `  ${varName}-hsl: ${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%;\n`;
    });
    css += `}\n`;
    return css;
  }

  /**
   * Generate JSON Output
   */
  generateJson(colors, imageName = "image") {
    const data = {
      source: "ColorExtract",
      image: imageName,
      extractedAt: new Date().toISOString(),
      totalColors: colors.length,
      palette: colors.map((c, idx) => ({
        index: idx + 1,
        hex: c.hex,
        rgb: {
          r: c.rgb.r,
          g: c.rgb.g,
          b: c.rgb.b,
          formatted: `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`
        },
        hsl: {
          h: c.hsl.h,
          s: c.hsl.s,
          l: c.hsl.l,
          formatted: `hsl(${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%)`
        },
        percentage: c.percentage,
        name: c.name,
        brightness: c.brightness
      }))
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * Generate Tailwind Config snippet
   */
  generateTailwind(colors) {
    let output = `// tailwind.config.js snippet\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        palette: {\n`;
    colors.forEach((c, idx) => {
      const key = (idx + 1) * 100;
      output += `          '${key}': '${c.hex}', // ${c.name} (${c.percentage}%)\n`;
    });
    output += `        }\n      }\n    }\n  }\n};\n`;
    return output;
  }

  /**
   * Generate Plain Text (TXT)
   */
  generateTxt(colors, imageName = "image") {
    let txt = `ColorExtract - Palette for "${imageName}"\n`;
    txt += `Extracted on: ${new Date().toLocaleString()}\n`;
    txt += `Total Colors: ${colors.length}\n`;
    txt += `---------------------------------------------------------\n`;
    txt += `No.  HEX      RGB               HSL                Usage%  Name\n`;
    txt += `---------------------------------------------------------\n`;

    colors.forEach((c, idx) => {
      const num = String(idx + 1).padEnd(4, ' ');
      const hex = c.hex.padEnd(9, ' ');
      const rgb = `${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}`.padEnd(18, ' ');
      const hsl = `${c.hsl.h}°, ${c.hsl.s}%, ${c.hsl.l}%`.padEnd(19, ' ');
      const pct = `${c.percentage}%`.padEnd(8, ' ');
      txt += `${num} ${hex} ${rgb} ${hsl} ${pct} ${c.name}\n`;
    });

    return txt;
  }

  /**
   * Generate SVG vector palette
   */
  generateSvg(colors) {
    const cardW = 120;
    const cardH = 140;
    const gap = 16;
    const pad = 30;
    const totalW = pad * 2 + colors.length * cardW + (colors.length - 1) * gap;
    const totalH = pad * 2 + cardH;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" width="${totalW}" height="${totalH}">\n`;
    svg += `  <style>\n`;
    svg += `    .hex { font-family: monospace; font-size: 13px; font-weight: bold; fill: #0f172a; }\n`;
    svg += `    .sub { font-family: sans-serif; font-size: 10px; fill: #64748b; }\n`;
    svg += `  </style>\n`;
    svg += `  <rect width="100%" height="100%" fill="#ffffff" rx="12"/>\n`;

    colors.forEach((c, idx) => {
      const x = pad + idx * (cardW + gap);
      const y = pad;
      svg += `  <g transform="translate(${x}, ${y})">\n`;
      svg += `    <rect width="${cardW}" height="90" fill="${c.hex}" rx="8"/>\n`;
      svg += `    <text x="0" y="112" class="hex">${c.hex}</text>\n`;
      svg += `    <text x="0" y="128" class="sub">${c.percentage}% • ${c.name}</text>\n`;
      svg += `  </g>\n`;
    });

    svg += `</svg>`;
    return svg;
  }

  /**
   * Helper: Trigger file download in browser
   */
  downloadFile(content, fileName, mimeType) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /**
   * Helper: Copy text to clipboard
   */
  async copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older environments
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}

// Global instance
window.paletteExporter = new PaletteExporter();
