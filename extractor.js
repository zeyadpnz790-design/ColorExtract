/**
 * ColorExtract - Advanced Image Color Extraction Engine
 * Uses HTML5 Canvas, Median Cut Quantization, CIE-Lab Delta-E Clustering,
 * and Dynamic Adaptive Color Extraction for "All Colors" mode.
 */

class ColorExtractor {
  constructor() {
    this.colorNames = [
      { name: "Black", r: 0, g: 0, b: 0 },
      { name: "Charcoal", r: 40, g: 40, b: 45 },
      { name: "Onyx", r: 25, g: 25, b: 28 },
      { name: "Gunmetal", r: 42, g: 52, b: 57 },
      { name: "Jet", r: 52, g: 52, b: 52 },
      { name: "White", r: 255, g: 255, b: 255 },
      { name: "Snow", r: 250, g: 250, b: 255 },
      { name: "Ivory", r: 255, g: 255, b: 240 },
      { name: "Eggshell", r: 240, g: 234, b: 214 },
      { name: "Alabaster", r: 242, g: 240, b: 235 },
      { name: "Silver", r: 192, g: 192, b: 192 },
      { name: "Light Gray", r: 211, g: 211, b: 211 },
      { name: "Slate Gray", r: 112, g: 128, b: 144 },
      { name: "Dim Gray", r: 105, g: 105, b: 105 },
      { name: "Ash Gray", r: 178, g: 190, b: 181 },
      { name: "Crimson", r: 220, g: 20, b: 60 },
      { name: "Scarlet", r: 255, g: 36, b: 0 },
      { name: "Ruby Red", r: 155, g: 17, b: 30 },
      { name: "Burgundy", r: 128, g: 0, b: 32 },
      { name: "Maroon", r: 128, g: 0, b: 0 },
      { name: "Wine", r: 114, g: 47, b: 55 },
      { name: "Rose", r: 255, g: 0, b: 127 },
      { name: "Coral Red", r: 255, g: 64, b: 64 },
      { name: "Salmon", r: 250, g: 128, b: 114 },
      { name: "Terracotta", r: 204, g: 78, b: 92 },
      { name: "Flamingo Pink", r: 252, g: 142, b: 172 },
      { name: "Blush", r: 222, g: 93, b: 131 },
      { name: "Hot Pink", r: 255, g: 105, b: 180 },
      { name: "Magenta", r: 255, g: 0, b: 255 },
      { name: "Fuchsia", r: 255, g: 0, b: 255 },
      { name: "Mauve", r: 224, g: 176, b: 255 },
      { name: "Orange", r: 255, g: 128, b: 0 },
      { name: "Tangerine", r: 242, g: 133, b: 0 },
      { name: "Amber", r: 255, g: 191, b: 0 },
      { name: "Burnt Orange", r: 204, g: 85, b: 0 },
      { name: "Rust", r: 183, g: 65, b: 14 },
      { name: "Peach", r: 255, g: 218, b: 185 },
      { name: "Apricot", r: 251, g: 206, b: 177 },
      { name: "Gold", r: 255, g: 215, b: 0 },
      { name: "Yellow", r: 255, g: 255, b: 0 },
      { name: "Lemon", r: 253, g: 233, b: 16 },
      { name: "Mustard", r: 255, g: 219, b: 88 },
      { name: "Cream", r: 255, g: 253, b: 208 },
      { name: "Beige", r: 245, g: 245, b: 220 },
      { name: "Sand", r: 194, g: 178, b: 128 },
      { name: "Khaki", r: 195, g: 176, b: 145 },
      { name: "Caramel", r: 175, g: 111, b: 9 },
      { name: "Tan", r: 210, g: 180, b: 140 },
      { name: "Copper", r: 184, g: 115, b: 51 },
      { name: "Bronze", r: 205, g: 127, b: 50 },
      { name: "Sienna", r: 160, g: 82, b: 45 },
      { name: "Sepia", r: 112, g: 66, b: 20 },
      { name: "Chocolate", r: 123, g: 63, b: 0 },
      { name: "Chestnut", r: 149, g: 69, b: 53 },
      { name: "Espresso", r: 75, g: 54, b: 33 },
      { name: "Lime Green", r: 50, g: 205, b: 50 },
      { name: "Olive", r: 128, g: 128, b: 0 },
      { name: "Emerald", r: 80, g: 200, b: 120 },
      { name: "Mint", r: 152, g: 255, b: 152 },
      { name: "Sage", r: 158, g: 170, b: 139 },
      { name: "Forest Green", r: 34, g: 139, b: 34 },
      { name: "Pine Green", r: 1, g: 121, b: 111 },
      { name: "Sea Green", r: 46, g: 139, b: 87 },
      { name: "Jade", r: 0, g: 168, b: 107 },
      { name: "Moss Green", r: 138, g: 154, b: 91 },
      { name: "Army Green", r: 75, g: 83, b: 32 },
      { name: "Teal", r: 0, g: 128, b: 128 },
      { name: "Cyan", r: 0, g: 255, b: 255 },
      { name: "Aqua", r: 0, g: 255, b: 255 },
      { name: "Turquoise", r: 64, g: 224, b: 208 },
      { name: "Sky Blue", r: 135, g: 206, b: 235 },
      { name: "Cerulean", r: 0, g: 123, b: 167 },
      { name: "Steel Blue", r: 70, g: 130, b: 180 },
      { name: "Ocean Blue", r: 0, g: 105, b: 148 },
      { name: "Cornflower Blue", r: 100, g: 149, b: 237 },
      { name: "Royal Blue", r: 65, g: 105, b: 225 },
      { name: "Navy Blue", r: 0, g: 0, b: 128 },
      { name: "Midnight Blue", r: 25, g: 25, b: 112 },
      { name: "Cobalt", r: 0, g: 71, b: 171 },
      { name: "Indigo", r: 75, g: 0, b: 130 },
      { name: "Deep Purple", r: 90, g: 0, b: 120 },
      { name: "Violet", r: 127, g: 0, b: 255 },
      { name: "Lavender", r: 230, g: 230, b: 250 },
      { name: "Plum", r: 142, g: 69, b: 133 },
      { name: "Lilac", r: 200, g: 162, b: 200 },
      { name: "Amethyst", r: 153, g: 102, b: 204 }
    ];
  }

  /**
   * Helper: RGB to HEX string (#RRGGBB)
   */
  rgbToHex(r, g, b) {
    const toHex = c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  /**
   * Helper: HEX to RGB object
   */
  hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  /**
   * Helper: RGB to HSL { h: [0-360], s: [0-100], l: [0-100] }
   */
  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  /**
   * Perceived brightness: 0 to 255
   */
  getBrightness(r, g, b) {
    return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }

  /**
   * Determine whether text on this background should be dark or white
   */
  getContrastTextColor(r, g, b) {
    // Relative luminance
    const lum = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return lum > 0.52 ? "#0f172a" : "#ffffff";
  }

  /**
   * RGB to CIE-XYZ (D65 standard illuminant)
   */
  rgbToXyz(r, g, b) {
    let sR = r / 255;
    let sG = g / 255;
    let sB = b / 255;

    sR = sR > 0.04045 ? Math.pow((sR + 0.055) / 1.055, 2.4) : sR / 12.92;
    sG = sG > 0.04045 ? Math.pow((sG + 0.055) / 1.055, 2.4) : sG / 12.92;
    sB = sB > 0.04045 ? Math.pow((sB + 0.055) / 1.055, 2.4) : sB / 12.92;

    sR *= 100;
    sG *= 100;
    sB *= 100;

    const x = sR * 0.4124564 + sG * 0.3575761 + sB * 0.1804375;
    const y = sR * 0.2126729 + sG * 0.7151522 + sB * 0.0721750;
    const z = sR * 0.0193339 + sG * 0.1191920 + sB * 0.9503041;
    return { x, y, z };
  }

  /**
   * XYZ to CIE-Lab
   */
  xyzToLab(x, y, z) {
    // Reference white point D65
    const refX = 95.047;
    const refY = 100.000;
    const refZ = 108.883;

    let varX = x / refX;
    let varY = y / refY;
    let varZ = z / refZ;

    const f = val => val > 0.008856 ? Math.cbrt(val) : (7.787 * val) + (16 / 116);

    varX = f(varX);
    varY = f(varY);
    varZ = f(varZ);

    return {
      L: (116 * varY) - 16,
      a: 500 * (varX - varY),
      b: 200 * (varY - varZ)
    };
  }

  /**
   * RGB to CIE-Lab direct
   */
  rgbToLab(r, g, b) {
    const xyz = this.rgbToXyz(r, g, b);
    return this.xyzToLab(xyz.x, xyz.y, xyz.z);
  }

  /**
   * CIE76 Color Difference (Delta E) in Lab space
   * Delta E < 2.3 = just noticeable difference
   * Delta E < 10 = very visually similar shade
   * Delta E > 20 = clearly distinct color
   */
  deltaE(lab1, lab2) {
    const dL = lab1.L - lab2.L;
    const da = lab1.a - lab2.a;
    const db = lab1.b - lab2.b;
    return Math.sqrt(dL * dL + da * da + db * db);
  }

  /**
   * Find closest recognized human-readable color name
   */
  getClosestColorName(r, g, b) {
    let minDistance = Infinity;
    let bestName = "Accent Color";

    for (const item of this.colorNames) {
      // Euclidean distance in RGB with human eye weights
      const dr = (r - item.r) * 0.3;
      const dg = (g - item.g) * 0.59;
      const db = (b - item.b) * 0.11;
      const dist = dr * dr + dg * dg + db * db;
      if (dist < minDistance) {
        minDistance = dist;
        bestName = item.name;
      }
    }
    return bestName;
  }

  /**
   * Extract image pixels onto an efficient downscaled canvas
   * @param {HTMLImageElement} image
   * @returns {Promise<{pixels: Array<{r,g,b}>, totalPixels: number}>}
   */
  async getPixelsFromImage(image) {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // Maintain aspect ratio, max dimension 250px for ultra-fast, smooth calculation
        const maxDim = 250;
        let w = image.naturalWidth || image.width;
        let h = image.naturalHeight || image.height;

        if (!w || !h) {
          reject(new Error("Invalid image dimensions"));
          return;
        }

        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(image, 0, 0, w, h);

        const imgData = ctx.getImageData(0, 0, w, h).data;
        const pixels = [];

        for (let i = 0; i < imgData.length; i += 4) {
          const a = imgData[i + 3];
          // Skip transparent or near-transparent pixels
          if (a < 128) continue;

          pixels.push({
            r: imgData[i],
            g: imgData[i + 1],
            b: imgData[i + 2]
          });
        }

        if (pixels.length === 0) {
          reject(new Error("Image contains only transparent pixels."));
          return;
        }

        resolve({ pixels, totalPixels: pixels.length });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Median Cut Quantization for fixed count palettes (3, 5, 8, 10, 20)
   */
  medianCut(pixels, targetCount) {
    if (pixels.length <= targetCount) {
      return pixels.map(p => ({
        r: p.r,
        g: p.g,
        b: p.b,
        count: 1
      }));
    }

    // Helper: Find channel with largest range in box
    const getWidestRangeChannel = (box) => {
      let minR = 255, maxR = 0;
      let minG = 255, maxG = 0;
      let minB = 255, maxB = 0;

      for (let i = 0; i < box.length; i++) {
        const p = box[i];
        if (p.r < minR) minR = p.r;
        if (p.r > maxR) maxR = p.r;
        if (p.g < minG) minG = p.g;
        if (p.g > maxG) maxG = p.g;
        if (p.b < minB) minB = p.b;
        if (p.b > maxB) maxB = p.b;
      }

      const rangeR = maxR - minR;
      const rangeG = maxG - minG;
      const rangeB = maxB - minB;

      if (rangeR >= rangeG && rangeR >= rangeB) return 'r';
      if (rangeG >= rangeR && rangeG >= rangeB) return 'g';
      return 'b';
    };

    // Split queue
    let boxes = [pixels];

    while (boxes.length < targetCount) {
      // Find the box with largest variance or largest pixel count
      let largestBoxIndex = -1;
      let largestBoxScore = -1;

      for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].length <= 1) continue;
        const box = boxes[i];
        const channel = getWidestRangeChannel(box);
        
        let minVal = 255, maxVal = 0;
        for (const p of box) {
          const val = p[channel];
          if (val < minVal) minVal = val;
          if (val > maxVal) maxVal = val;
        }
        // Score combines channel spread and population
        const score = (maxVal - minVal) * Math.sqrt(box.length);
        if (score > largestBoxScore) {
          largestBoxScore = score;
          largestBoxIndex = i;
        }
      }

      if (largestBoxIndex === -1) break; // Cannot split further

      const boxToSplit = boxes.splice(largestBoxIndex, 1)[0];
      const channel = getWidestRangeChannel(boxToSplit);

      // Sort by the chosen channel
      boxToSplit.sort((a, b) => a[channel] - b[channel]);

      const medianIdx = Math.floor(boxToSplit.length / 2);
      boxes.push(boxToSplit.slice(0, medianIdx));
      boxes.push(boxToSplit.slice(medianIdx));
    }

    // Compute centroid and pixel count for each box
    const results = boxes.map(box => {
      let sumR = 0, sumG = 0, sumB = 0;
      for (const p of box) {
        sumR += p.r;
        sumG += p.g;
        sumB += p.b;
      }
      const count = box.length;
      return {
        r: Math.round(sumR / count),
        g: Math.round(sumG / count),
        b: Math.round(sumB / count),
        count: count
      };
    });

    return results;
  }

  /**
   * "All Colors" Extraction:
   * Dynamically analyzes the entire image, groups visually similar colors using
   * perceptual Lab Delta-E clustering, eliminates trivial noise, and preserves
   * all distinct meaningful shades without hardcoded limits.
   */
  extractAllMeaningfulColors(pixels, totalPixels) {
    // Step 1: Quantize pixels into 5-bit color buckets (32x32x32 = 32768 possible buckets)
    // to group minor sub-pixel variations while keeping rich tones intact
    const buckets = new Map();

    for (let i = 0; i < pixels.length; i++) {
      const p = pixels[i];
      // 5 bits per channel (shift right 3)
      const qR = p.r >> 3;
      const qG = p.g >> 3;
      const qB = p.b >> 3;
      const key = (qR << 10) | (qG << 5) | qB;

      let bucket = buckets.get(key);
      if (!bucket) {
        bucket = { sumR: 0, sumG: 0, sumB: 0, count: 0 };
        buckets.set(key, bucket);
      }
      bucket.sumR += p.r;
      bucket.sumG += p.g;
      bucket.sumB += p.b;
      bucket.count++;
    }

    // Step 2: Filter out trivial noise
    // Keep buckets that have at least 0.05% of valid pixels or min 4 occurrences
    const minThreshold = Math.max(4, Math.floor(totalPixels * 0.0005));
    const candidates = [];

    buckets.forEach(bucket => {
      if (bucket.count >= minThreshold) {
        const r = Math.round(bucket.sumR / bucket.count);
        const g = Math.round(bucket.sumG / bucket.count);
        const b = Math.round(bucket.sumB / bucket.count);
        const lab = this.rgbToLab(r, g, b);
        candidates.push({ r, g, b, lab, count: bucket.count });
      }
    });

    // Step 3: Sort candidates by frequency descending (most dominant first)
    candidates.sort((a, b) => b.count - a.count);

    // Step 4: Perceptual agglomerative clustering using CIE-Lab Delta E
    // In human vision, Delta E < 13.5 groups very close shades of the same color
    // while preserving distinct colors (e.g. sky blue vs deep blue vs navy).
    const clusters = [];
    const MERGE_DELTA_E = 13.5;

    for (const candidate of candidates) {
      let matchedCluster = null;
      let minDelta = Infinity;

      for (const cluster of clusters) {
        const dE = this.deltaE(candidate.lab, cluster.lab);
        if (dE < MERGE_DELTA_E && dE < minDelta) {
          minDelta = dE;
          matchedCluster = cluster;
        }
      }

      if (matchedCluster) {
        // Merge into existing cluster: update weighted average
        const totalCount = matchedCluster.count + candidate.count;
        matchedCluster.r = Math.round((matchedCluster.r * matchedCluster.count + candidate.r * candidate.count) / totalCount);
        matchedCluster.g = Math.round((matchedCluster.g * matchedCluster.count + candidate.g * candidate.count) / totalCount);
        matchedCluster.b = Math.round((matchedCluster.b * matchedCluster.count + candidate.b * candidate.count) / totalCount);
        matchedCluster.count = totalCount;
        matchedCluster.lab = this.rgbToLab(matchedCluster.r, matchedCluster.g, matchedCluster.b);
      } else {
        // Create new distinct meaningful color cluster
        clusters.push({
          r: candidate.r,
          g: candidate.g,
          b: candidate.b,
          lab: candidate.lab,
          count: candidate.count
        });
      }
    }

    // Step 5: Clean up any secondary overlaps that may have formed after centroid updates
    const finalColors = [];
    clusters.sort((a, b) => b.count - a.count);

    for (const cl of clusters) {
      let isDuplicate = false;
      for (const fc of finalColors) {
        if (this.deltaE(cl.lab, fc.lab) < 10.0) {
          // Merge into the already kept higher-frequency color
          fc.count += cl.count;
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        finalColors.push(cl);
      }
    }

    return finalColors;
  }

  /**
   * Main Public API: Extract colors from an image
   * @param {HTMLImageElement} image
   * @param {number|string} countOption - 3, 5, 8, 10, 20 or "all"
   * @returns {Promise<Array<ColorObject>>}
   */
  async extract(image, countOption = 5) {
    const { pixels, totalPixels } = await this.getPixelsFromImage(image);

    let rawPalette = [];

    if (countOption === 'all' || countOption === 'All' || countOption === -1) {
      // Dynamic adaptive "All Colors" algorithm
      rawPalette = this.extractAllMeaningfulColors(pixels, totalPixels);
    } else {
      // Fixed count extraction with Median Cut
      const targetCount = parseInt(countOption, 10) || 5;
      rawPalette = this.medianCut(pixels, targetCount);
    }

    // Calculate sum of counts in returned palette to normalize percentages
    const paletteTotalCount = rawPalette.reduce((acc, curr) => acc + curr.count, 0) || totalPixels;

    // Build rich color data objects
    const processedColors = rawPalette.map((item, idx) => {
      const hex = this.rgbToHex(item.r, item.g, item.b);
      const rgb = { r: item.r, g: item.g, b: item.b };
      const hsl = this.rgbToHsl(item.r, item.g, item.b);
      const brightness = this.getBrightness(item.r, item.g, item.b);
      const contrastText = this.getContrastTextColor(item.r, item.g, item.b);
      const percentage = Math.max(0.1, Number(((item.count / paletteTotalCount) * 100).toFixed(1)));
      const name = this.getClosestColorName(item.r, item.g, item.b);

      return {
        id: `color-${idx}-${hex.replace('#', '')}`,
        hex,
        rgb,
        hsl,
        brightness,
        contrastText,
        percentage,
        count: item.count,
        name
      };
    });

    // Default sorting: Dominant (highest percentage first)
    return this.sortColors(processedColors, 'dominant');
  }

  /**
   * Sort color list by criteria
   * @param {Array} colors
   * @param {'dominant'|'brightness'|'hue'|'saturation'} criteria
   * @param {boolean} ascending
   */
  sortColors(colors, criteria = 'dominant', ascending = false) {
    const list = [...colors];

    switch (criteria) {
      case 'dominant':
        list.sort((a, b) => b.percentage - a.percentage);
        break;
      case 'brightness':
        list.sort((a, b) => b.brightness - a.brightness);
        break;
      case 'hue':
        list.sort((a, b) => a.hsl.h - b.hsl.h);
        break;
      case 'saturation':
        list.sort((a, b) => b.hsl.s - a.hsl.s);
        break;
      default:
        list.sort((a, b) => b.percentage - a.percentage);
    }

    if (ascending) {
      list.reverse();
    }

    return list;
  }
}

// Global instance
window.colorExtractor = new ColorExtractor();
