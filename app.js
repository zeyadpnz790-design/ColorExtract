/**
 * ColorExtract - Main Application Logic
 * Orchestrates upload, extraction, UI rendering, sorting, gradients,
 * UI mockup preview, exporting, theme switching, and localization.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    imageFile: null,
    imageElement: null,
    fileName: "",
    fileSize: "",
    dimensions: "",
    colorCount: "5", // '3', '5', '8', '10', '20', or 'all'
    extractedColors: [],
    sortedColors: [],
    currentSort: "dominant",
    gradientAngle: 135,
    gradientType: "linear",
    theme: "dark",
    uiPreviewOffset: 0
  };

  // DOM Elements
  const elements = {
    // Theme & Lang
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIcon: document.getElementById('theme-icon'),
    langToggleBtn: document.getElementById('lang-toggle-btn'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileNav: document.getElementById('mobile-nav'),

    // Hero & Upload
    heroSection: document.getElementById('hero-section'),
    heroUploadBtn: document.getElementById('hero-upload-btn'),
    dropzone: document.getElementById('dropzone'),
    fileInput: document.getElementById('file-input'),
    sampleButtons: document.querySelectorAll('.sample-btn'),

    // Image Preview & Options
    previewSection: document.getElementById('preview-section'),
    previewImg: document.getElementById('preview-img'),
    previewFileName: document.getElementById('preview-filename'),
    previewDimensions: document.getElementById('preview-dimensions'),
    previewSize: document.getElementById('preview-size'),
    btnReplaceImage: document.getElementById('btn-replace-image'),
    btnRemoveImage: document.getElementById('btn-remove-image'),
    countOptions: document.querySelectorAll('.count-option-btn'),
    allColorsNote: document.getElementById('all-colors-note'),
    btnExtractColors: document.getElementById('btn-extract-colors'),
    extractSpinner: document.getElementById('extract-spinner'),
    extractBtnText: document.getElementById('extract-btn-text'),

    // Palette Section
    paletteSection: document.getElementById('palette-section'),
    colorsCountBadge: document.getElementById('colors-count-badge'),
    sortSelect: document.getElementById('sort-select'),
    paletteGrid: document.getElementById('palette-grid'),
    btnDownloadPalette: document.getElementById('btn-download-palette'),
    btnOpenExportModal: document.getElementById('btn-open-export-modal'),

    // Gradient Section
    gradientSection: document.getElementById('gradient-section'),
    gradientBox: document.getElementById('gradient-box'),
    gradientAngleSlider: document.getElementById('gradient-angle-slider'),
    gradientAngleValue: document.getElementById('gradient-angle-value'),
    gradientTypeButtons: document.querySelectorAll('.gradient-type-btn'),
    btnCopyGradientCss: document.getElementById('btn-copy-gradient-css'),
    gradientCodeDisplay: document.getElementById('gradient-code-display'),

    // UI Mockup Preview
    previewMockupSection: document.getElementById('preview-mockup-section'),
    btnShuffleMockup: document.getElementById('btn-shuffle-mockup'),
    mockupContainer: document.getElementById('mockup-container'),
    mockupBadge: document.getElementById('mockup-badge'),
    mockupHeading: document.getElementById('mockup-heading'),
    mockupPrimaryBtn: document.getElementById('mockup-primary-btn'),
    mockupSecondaryBtn: document.getElementById('mockup-secondary-btn'),
    mockupCard: document.getElementById('mockup-card'),
    mockupMetricBar: document.getElementById('mockup-metric-bar'),

    // Export Modal
    exportModal: document.getElementById('export-modal'),
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    exportTabs: document.querySelectorAll('.export-tab-btn'),
    exportCodeContent: document.getElementById('export-code-content'),
    btnCopyExportCode: document.getElementById('btn-copy-export-code'),
    btnDownloadExportFile: document.getElementById('btn-download-export-file'),

    // Toast Alert
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message'),
    toastIcon: document.getElementById('toast-icon')
  };

  let activeExportTab = 'css';
  let toastTimeout = null;

  // Initialize App
  init();

  function init() {
    initTheme();
    initI18n();
    bindEvents();
  }

  // --- THEME MANAGEMENT ---
  function initTheme() {
    const savedTheme = localStorage.getItem('colorextract_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    state.theme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(state.theme);
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('colorextract_theme', theme);

    if (elements.themeIcon) {
      if (theme === 'dark') {
        // Moon icon / show sun to switch to light
        elements.themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      } else {
        // Sun icon / show moon to switch to dark
        elements.themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      }
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  // --- I18N MANAGEMENT ---
  function initI18n() {
    window.i18n.applyToDOM();
    updateLangButtonText();

    window.i18n.onLanguageChange(() => {
      updateLangButtonText();
      if (state.sortedColors.length > 0) {
        renderPaletteGrid(state.sortedColors);
        updateColorsCountBadge();
        updateMockupPreview();
        updateExportView();
      }
    });
  }

  function updateLangButtonText() {
    if (elements.langToggleBtn) {
      const isAr = window.i18n.isRtl();
      // If currently Arabic, button shows English, and vice versa
      elements.langToggleBtn.querySelector('.lang-label').textContent = isAr ? 'English' : 'العربية';
    }
  }

  // --- EVENT BINDINGS ---
  function bindEvents() {
    // Theme Toggle
    elements.themeToggleBtn.addEventListener('click', toggleTheme);

    // Language Toggle
    elements.langToggleBtn.addEventListener('click', () => {
      window.i18n.toggleLang();
    });

    // Mobile Menu Toggle
    if (elements.mobileMenuBtn && elements.mobileNav) {
      elements.mobileMenuBtn.addEventListener('click', () => {
        elements.mobileNav.classList.toggle('open');
      });

      // Close mobile menu on clicking any link
      elements.mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          elements.mobileNav.classList.remove('open');
        });
      });
    }

    // Hero Upload Button
    elements.heroUploadBtn.addEventListener('click', () => {
      elements.fileInput.click();
    });

    // Dropzone Click
    elements.dropzone.addEventListener('click', () => {
      elements.fileInput.click();
    });

    // File Input Change
    elements.fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelect(e.target.files[0]);
      }
    });

    // Drag & Drop
    ['dragenter', 'dragover'].forEach(eventName => {
      elements.dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        elements.dropzone.classList.add('drag-active');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      elements.dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        elements.dropzone.classList.remove('drag-active');
      });
    });

    elements.dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    // Preset Sample Images
    elements.sampleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sampleType = btn.getAttribute('data-sample');
        loadSampleImage(sampleType);
      });
    });

    // Replace Image Button
    elements.btnReplaceImage.addEventListener('click', () => {
      elements.fileInput.click();
    });

    // Remove Image Button
    elements.btnRemoveImage.addEventListener('click', resetAppToEmptyState);

    // Color Count Options
    elements.countOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.countOptions.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.colorCount = btn.getAttribute('data-count');

        // Show/hide all colors note
        if (state.colorCount === 'all') {
          elements.allColorsNote.classList.remove('hidden');
        } else {
          elements.allColorsNote.classList.add('hidden');
        }

        // If an image is already loaded, automatically re-extract!
        if (state.imageElement) {
          performColorExtraction();
        }
      });
    });

    // Extract Colors Button
    elements.btnExtractColors.addEventListener('click', performColorExtraction);

    // Sorting Dropdown
    elements.sortSelect.addEventListener('change', (e) => {
      state.currentSort = e.target.value;
      if (state.extractedColors.length > 0) {
        state.sortedColors = window.colorExtractor.sortColors(state.extractedColors, state.currentSort);
        renderPaletteGrid(state.sortedColors);
      }
    });

    // Download Palette Button
    elements.btnDownloadPalette.addEventListener('click', handleDownloadPalettePng);

    // Open Export Modal
    elements.btnOpenExportModal.addEventListener('click', openExportModal);

    // Modal Close
    elements.modalCloseBtn.addEventListener('click', closeExportModal);
    elements.modalBackdrop.addEventListener('click', closeExportModal);

    // Modal Export Tabs
    elements.exportTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        elements.exportTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeExportTab = tab.getAttribute('data-tab');
        updateExportView();
      });
    });

    // Copy Export Code
    elements.btnCopyExportCode.addEventListener('click', handleCopyExportCode);

    // Download Export File
    elements.btnDownloadExportFile.addEventListener('click', handleDownloadExportFile);

    // Gradient Angle Slider
    elements.gradientAngleSlider.addEventListener('input', (e) => {
      state.gradientAngle = parseInt(e.target.value, 10);
      elements.gradientAngleValue.textContent = `${state.gradientAngle}°`;
      updateGradientPreview();
    });

    // Gradient Type Buttons
    elements.gradientTypeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.gradientTypeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.gradientType = btn.getAttribute('data-type');
        
        // Show/hide angle slider if radial or conic
        if (state.gradientType === 'radial') {
          elements.gradientAngleSlider.parentElement.style.opacity = '0.3';
          elements.gradientAngleSlider.disabled = true;
        } else {
          elements.gradientAngleSlider.parentElement.style.opacity = '1';
          elements.gradientAngleSlider.disabled = false;
        }
        updateGradientPreview();
      });
    });

    // Copy Gradient CSS
    elements.btnCopyGradientCss.addEventListener('click', handleCopyGradientCss);

    // Shuffle Mockup Colors
    elements.btnShuffleMockup.addEventListener('click', () => {
      state.uiPreviewOffset = (state.uiPreviewOffset + 1) % Math.max(1, state.sortedColors.length);
      updateMockupPreview();
      showToast(window.i18n.t('shuffleColors'), 'info');
    });

    // Keyboard support: Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.exportModal.classList.contains('active')) {
        closeExportModal();
      }
    });
  }

  // --- FILE HANDLING & VALIDATION ---
  function handleFileSelect(file) {
    // 1. Validate File Format
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showToast(window.i18n.t('errInvalidFormat'), 'error');
      return;
    }

    // 2. Validate File Size (Max 25MB)
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast(window.i18n.t('errTooLarge'), 'error');
      return;
    }

    state.imageFile = file;
    state.fileName = file.name;
    state.fileSize = formatFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        state.imageElement = img;
        state.dimensions = `${img.naturalWidth} × ${img.naturalHeight} px`;
        displayImagePreview(img.src);
        performColorExtraction();
      };
      img.onerror = () => {
        showToast(window.i18n.t('errCorrupt'), 'error');
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      showToast(window.i18n.t('errCorrupt'), 'error');
    };
    reader.readAsDataURL(file);
  }

  function loadSampleImage(sampleType) {
    const dataUrl = window.sampleGenerator.getSample(sampleType);
    const sampleNames = {
      sunset: window.i18n.t('sampleSunset') + ".jpg",
      cyberpunk: window.i18n.t('sampleCyberpunk') + ".jpg",
      nature: window.i18n.t('sampleNature') + ".jpg",
      minimal: window.i18n.t('sampleMinimal') + ".jpg"
    };

    state.fileName = sampleNames[sampleType] || `${sampleType}.jpg`;
    state.fileSize = "180 KB";

    const img = new Image();
    img.onload = () => {
      state.imageElement = img;
      state.dimensions = `${img.naturalWidth} × ${img.naturalHeight} px`;
      displayImagePreview(img.src);
      performColorExtraction();
    };
    img.src = dataUrl;
  }

  function displayImagePreview(src) {
    elements.previewImg.src = src;
    elements.previewFileName.textContent = state.fileName;
    elements.previewDimensions.textContent = state.dimensions;
    elements.previewSize.textContent = state.fileSize;

    elements.dropzone.classList.add('hidden');
    elements.previewSection.classList.remove('hidden');
  }

  function resetAppToEmptyState() {
    state.imageFile = null;
    state.imageElement = null;
    state.extractedColors = [];
    state.sortedColors = [];
    elements.fileInput.value = "";

    elements.previewSection.classList.add('hidden');
    elements.paletteSection.classList.add('hidden');
    elements.gradientSection.classList.add('hidden');
    elements.previewMockupSection.classList.add('hidden');
    elements.dropzone.classList.remove('hidden');
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // --- COLOR EXTRACTION ---
  async function performColorExtraction() {
    if (!state.imageElement) return;

    // Show loading state
    elements.btnExtractColors.disabled = true;
    elements.extractSpinner.classList.remove('hidden');
    elements.extractBtnText.textContent = window.i18n.t('btnExtracting');

    try {
      // Small tick for smooth UI repaint
      await new Promise(r => setTimeout(r, 60));

      const colors = await window.colorExtractor.extract(state.imageElement, state.colorCount);
      state.extractedColors = colors;
      state.sortedColors = window.colorExtractor.sortColors(colors, state.currentSort);

      // Render all modules
      renderPaletteGrid(state.sortedColors);
      updateColorsCountBadge();
      updateGradientPreview();
      updateMockupPreview();

      // Reveal sections
      elements.paletteSection.classList.remove('hidden');
      elements.gradientSection.classList.remove('hidden');
      elements.previewMockupSection.classList.remove('hidden');

    } catch (err) {
      console.error(err);
      showToast(window.i18n.t('errExtraction'), 'error');
    } finally {
      elements.btnExtractColors.disabled = false;
      elements.extractSpinner.classList.add('hidden');
      elements.extractBtnText.textContent = window.i18n.t('btnExtract');
    }
  }

  function updateColorsCountBadge() {
    const count = state.sortedColors.length;
    elements.colorsCountBadge.textContent = `${count} ${window.i18n.t('colorsFound')}`;
  }

  // --- PALETTE GRID RENDERING ---
  function renderPaletteGrid(colors) {
    elements.paletteGrid.innerHTML = '';

    colors.forEach((color, idx) => {
      const card = document.createElement('div');
      card.className = 'color-card';
      card.style.animationDelay = `${idx * 0.03}s`;

      card.innerHTML = `
        <div class="color-swatch-box" style="background-color: ${color.hex}">
          <div class="swatch-copy-hint">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>${window.i18n.t('clickToCopy')}</span>
          </div>
          <div class="swatch-percentage-pill">${color.percentage}%</div>
        </div>
        <div class="color-details">
          <div class="color-header">
            <span class="color-hex">${color.hex}</span>
            <span class="color-name-tag">${color.name}</span>
          </div>
          <div class="color-metrics">
            <div class="metric-row">
              <span class="metric-label">RGB:</span>
              <span class="metric-value font-mono">${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">HSL:</span>
              <span class="metric-value font-mono">${color.hsl.h}°, ${color.hsl.s}%, ${color.hsl.l}%</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">${window.i18n.t('cardUsage')}:</span>
              <div class="metric-usage-bar-wrap">
                <div class="metric-usage-bar" style="width: ${Math.min(100, color.percentage)}%; background-color: ${color.hex}"></div>
              </div>
              <span class="metric-value font-mono">${color.percentage}%</span>
            </div>
          </div>
          <div class="color-actions">
            <button type="button" class="btn-copy-format" data-copy="${color.hex}" title="${window.i18n.t('copyHex')}">
              HEX
            </button>
            <button type="button" class="btn-copy-format" data-copy="rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})" title="${window.i18n.t('copyRgb')}">
              RGB
            </button>
            <button type="button" class="btn-copy-format" data-copy="hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)" title="${window.i18n.t('copyHsl')}">
              HSL
            </button>
          </div>
        </div>
      `;

      // Click card to copy HEX
      card.addEventListener('click', (e) => {
        // If clicked on specific action button, handled by that button
        if (e.target.closest('.btn-copy-format')) return;
        copyTextWithToast(color.hex);
        card.classList.add('copy-pulse');
        setTimeout(() => card.classList.remove('copy-pulse'), 400);
      });

      // Individual copy buttons
      card.querySelectorAll('.btn-copy-format').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = btn.getAttribute('data-copy');
          copyTextWithToast(val);
        });
      });

      elements.paletteGrid.appendChild(card);
    });
  }

  // --- GRADIENT SECTION ---
  function updateGradientPreview() {
    if (state.sortedColors.length === 0) return;

    // Use top 2 to 4 dominant colors
    const sliceCount = Math.min(4, Math.max(2, state.sortedColors.length));
    const gradientColors = state.sortedColors.slice(0, sliceCount).map(c => c.hex);

    let cssGrad = "";
    if (state.gradientType === 'linear') {
      cssGrad = `linear-gradient(${state.gradientAngle}deg, ${gradientColors.join(', ')})`;
    } else if (state.gradientType === 'radial') {
      cssGrad = `radial-gradient(circle at center, ${gradientColors.join(', ')})`;
    } else if (state.gradientType === 'conic') {
      cssGrad = `conic-gradient(from ${state.gradientAngle}deg at 50% 50%, ${gradientColors.join(', ')}, ${gradientColors[0]})`;
    }

    elements.gradientBox.style.background = cssGrad;
    elements.gradientCodeDisplay.textContent = `background: ${cssGrad};`;
  }

  function handleCopyGradientCss() {
    const css = elements.gradientCodeDisplay.textContent;
    copyTextWithToast(css, window.i18n.t('gradientCopied'));
  }

  // --- UI MOCKUP PREVIEW ---
  function updateMockupPreview() {
    if (state.sortedColors.length === 0) return;

    const colors = state.sortedColors;
    const len = colors.length;
    const offset = state.uiPreviewOffset;

    // Intelligently pick colors for UI roles
    const primary = colors[offset % len];
    const secondary = colors[(offset + 1) % len];
    const tertiary = colors[(offset + 2) % len];
    const quaternary = colors[(offset + 3) % len];

    // Background card
    elements.mockupContainer.style.borderColor = primary.hex + '33';

    // Badge
    elements.mockupBadge.style.backgroundColor = primary.hex + '20';
    elements.mockupBadge.style.color = primary.hex;
    elements.mockupBadge.style.borderColor = primary.hex + '40';

    // Primary Button
    elements.mockupPrimaryBtn.style.backgroundColor = primary.hex;
    elements.mockupPrimaryBtn.style.color = primary.contrastText;
    elements.mockupPrimaryBtn.style.boxShadow = `0 4px 14px ${primary.hex}50`;

    // Secondary Button
    elements.mockupSecondaryBtn.style.borderColor = secondary.hex;
    elements.mockupSecondaryBtn.style.color = secondary.hex;

    // Stat / Feature Card
    elements.mockupCard.style.borderColor = tertiary.hex + '40';
    elements.mockupCard.style.backgroundColor = state.theme === 'dark' ? '#0f172a' : '#f8fafc';
    
    // Metric Progress Bar
    elements.mockupMetricBar.style.backgroundColor = quaternary.hex;
  }

  // --- PALETTE DOWNLOAD (PNG) ---
  async function handleDownloadPalettePng() {
    if (state.sortedColors.length === 0) return;

    elements.btnDownloadPalette.disabled = true;
    const originalText = elements.btnDownloadPalette.innerHTML;
    elements.btnDownloadPalette.innerHTML = `<span class="spinner-small"></span> Generating...`;

    try {
      const blob = await window.paletteExporter.generatePngPalette(
        state.sortedColors,
        state.fileName || "palette",
        state.imageElement
      );

      const cleanName = (state.fileName || "palette").replace(/\.[^/.]+$/, "");
      window.paletteExporter.downloadFile(blob, `ColorExtract-${cleanName}-palette.png`, 'image/png');
      showToast(window.i18n.t('copied'), 'success');
    } catch (err) {
      console.error(err);
      showToast("Download failed", 'error');
    } finally {
      elements.btnDownloadPalette.disabled = false;
      elements.btnDownloadPalette.innerHTML = originalText;
    }
  }

  // --- EXPORT MODAL ---
  function openExportModal() {
    if (state.sortedColors.length === 0) return;
    updateExportView();
    elements.exportModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeExportModal() {
    elements.exportModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateExportView() {
    const colors = state.sortedColors;
    const cleanName = (state.fileName || "palette").replace(/\.[^/.]+$/, "");
    let output = "";

    switch (activeExportTab) {
      case 'css':
        output = window.paletteExporter.generateCssVariables(colors);
        break;
      case 'json':
        output = window.paletteExporter.generateJson(colors, cleanName);
        break;
      case 'tailwind':
        output = window.paletteExporter.generateTailwind(colors);
        break;
      case 'txt':
        output = window.paletteExporter.generateTxt(colors, cleanName);
        break;
      case 'svg':
        output = window.paletteExporter.generateSvg(colors);
        break;
      default:
        output = window.paletteExporter.generateCssVariables(colors);
    }

    elements.exportCodeContent.textContent = output;
  }

  async function handleCopyExportCode() {
    const text = elements.exportCodeContent.textContent;
    await window.paletteExporter.copyToClipboard(text);
    showToast(window.i18n.t('copied'), 'success');
  }

  function handleDownloadExportFile() {
    const colors = state.sortedColors;
    const cleanName = (state.fileName || "palette").replace(/\.[^/.]+$/, "");

    switch (activeExportTab) {
      case 'css':
        window.paletteExporter.downloadFile(
          window.paletteExporter.generateCssVariables(colors),
          `${cleanName}-variables.css`,
          'text/css'
        );
        break;
      case 'json':
        window.paletteExporter.downloadFile(
          window.paletteExporter.generateJson(colors, cleanName),
          `${cleanName}-palette.json`,
          'application/json'
        );
        break;
      case 'tailwind':
        window.paletteExporter.downloadFile(
          window.paletteExporter.generateTailwind(colors),
          `tailwind.colors.js`,
          'application/javascript'
        );
        break;
      case 'txt':
        window.paletteExporter.downloadFile(
          window.paletteExporter.generateTxt(colors, cleanName),
          `${cleanName}-palette.txt`,
          'text/plain'
        );
        break;
      case 'svg':
        window.paletteExporter.downloadFile(
          window.paletteExporter.generateSvg(colors),
          `${cleanName}-palette.svg`,
          'image/svg+xml'
        );
        break;
      default:
        window.paletteExporter.downloadFile(
          elements.exportCodeContent.textContent,
          `${cleanName}-export.txt`,
          'text/plain'
        );
    }
    showToast(window.i18n.t('copied'), 'success');
  }

  // --- TOAST NOTIFICATIONS ---
  async function copyTextWithToast(text, customMessage = null) {
    await window.paletteExporter.copyToClipboard(text);
    showToast(customMessage || `${window.i18n.t('copied')} (${text})`, 'success');
  }

  function showToast(message, type = 'success') {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    elements.toastMessage.textContent = message;
    elements.toast.className = `toast toast-${type} show`;

    if (type === 'error') {
      elements.toastIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else {
      elements.toastIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    }

    toastTimeout = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2400);
  }
});
