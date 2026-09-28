# ColorExtract 🎨 — Image Color Extraction Web Application

**ColorExtract** is a modern, fast, professional, client-side web application that extracts meaningful color palettes from any uploaded image (JPG, JPEG, PNG, WEBP).

Built with pure vanilla HTML5, CSS3, and modern JavaScript, it runs **100% in the user's browser** with **zero server uploads**, ensuring maximum speed and complete privacy.

---

## ✨ Key Features

### 1. Dual Language & Full RTL Support (English & Arabic)
- Complete interface localization in **English** and **العربية (Arabic)**.
- Automatic layout direction switching:
  - **LTR** for English
  - **RTL** for Arabic with native typography (`Cairo` font), adjusted margins, alignments, and icons.
- Saved language preference in `localStorage`.

### 2. High-Performance Client-Side Color Extraction
- **Median Cut Quantization**: For fixed palettes (3, 5, 8, 10, 20 colors).
- **Adaptive "All Colors" Mode**:
  - Dynamically detects all meaningful, distinct colors in the image.
  - Groups visually similar shades using perceptual **CIE-Lab Delta-E ($\Delta E$)** color distance clustering.
  - Eliminates micro-noise and duplicates while preserving the complete meaningful visual spectrum.
- Calculates exact pixel frequencies / usage percentages for every color.
- Matches colors to human-readable names (e.g., *Sapphire Blue*, *Emerald*, *Warm Amber*, *Onyx*).

### 3. Palette Display & One-Click Copy
- Responsive grid of color cards with hover animations.
- Displays **HEX**, **RGB**, **HSL**, and **Usage %**.
- Click anywhere on the card to copy the **HEX** code with instant feedback toast: `Copied!` / `تم النسخ!`.
- Dedicated buttons to copy HEX, RGB, or HSL values.

### 4. Interactive Sorting
- **Dominant** (الأكثر ظهورًا)
- **Brightness** (السطوع)
- **Hue** (درجة اللون)
- **Saturation** (التشبع)

### 5. Color Gradient Generator
- Automatically generates smooth CSS gradients using top dominant colors.
- Supports **Linear**, **Radial**, and **Conic** gradients.
- Interactive **Angle slider ($0^\circ - 360^\circ$)**.
- One-click **Copy CSS** (`background: linear-gradient(...)`).

### 6. Interactive UI Preview (Color Mockup)
- Shows how the extracted palette looks in a real SaaS interface (Hero badge, title, paragraph, primary button, secondary button, metric card, borders).
- **"Shuffle Palette Roles"** button to explore different color mappings with 1 click.

### 7. High-Resolution Palette Download (PNG)
- Generates a branded, clean, high-resolution PNG palette card:
  - Color swatches with rounded corners
  - HEX, RGB, HSL, and Usage %
  - File name, date, and ColorExtract branding badge.

### 8. Comprehensive Export Formats
- **PNG Palette**
- **CSS Variables** (`:root { --color-1: #...; }`)
- **JSON** (structured array with RGB, HSL, HEX, percentages)
- **Tailwind CSS** configuration snippet
- **Plain Text (TXT)**
- **SVG Vector** palette file

### 9. Dark Mode & Light Mode
- Professional dark & light themes.
- Theme preference saved to `localStorage`.
- **Extracted colors themselves are never altered** by the theme.

### 10. Privacy-First Architecture
- 100% Client-side processing using HTML5 Canvas.
- Images never leave the user's computer.

---

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Or serve it via any static HTTP server (e.g., Live Server, Nginx, Apache, or Python `http.server`).

---

## 📁 File Structure

```
├── index.html          # Main application page
├── css/
│   └── styles.css      # SaaS design system, Dark/Light modes, RTL styles
├── js/
│   ├── i18n.js         # English and Arabic translation engine
│   ├── extractor.js    # Canvas pixel analyzer, Median Cut, CIE-Lab Delta-E
│   ├── exporter.js     # Canvas PNG generator, CSS, JSON, Tailwind, SVG exporter
│   ├── samples.js      # Procedural test images (Sunset, Cyberpunk, Nature, Minimal)
│   └── app.js          # App controller, event handlers, and state management
└── README.md           # Documentation
```
