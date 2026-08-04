// Roman Numeral Converter (Zero as N / Nulla)
function toRoman(num) {
  if (num === 0) return 'N';
  let prefix = '';
  let val = num;
  if (val < 0) {
    prefix = '-';
    val = Math.abs(val);
  }
  
  const lookup = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];

  let roman = '';
  for (const item of lookup) {
    while (val >= item.value) {
      roman += item.symbol;
      val -= item.value;
    }
  }
  return prefix + roman;
}

// Mulberry32 PRNG for deterministic letter generation
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Alphabet pool (Balanced letters including vowels for natural word density)
const LETTER_POOL = [
  'A','E','I','O','U','İ','Ö','Ü', // Vowels
  'A','E','I','O','U',             // Extra frequency vowels
  'B','C','Ç','D','F','G','Ğ','H',  // Consonants
  'J','K','L','M','N','P','R','S',
  'Ş','T','V','Y','Z','W','X'
];

// Language Dictionaries with Normalized Internal Categories
const DICTIONARIES = {
  TR: [
    { word: "GÜNEŞ", category: "NATURE" },
    { word: "YILDIZ", category: "COSMOS" },
    { word: "DENİZ", category: "NATURE" },
    { word: "SEVGİ", category: "EMOTION" },
    { word: "HAYAT", category: "EMOTION" },
    { word: "KİTAP", category: "GENERAL" },
    { word: "BİLGİ", category: "SCIENCE" },
    { word: "DÜNYA", category: "COSMOS" },
    { word: "İNSAN", category: "GENERAL" },
    { word: "ROBOT", category: "SCIENCE" },
    { word: "KEDİ", category: "NATURE" },
    { word: "GÖKYÜZÜ", category: "NATURE" },
    { word: "ORMAN", category: "NATURE" },
    { word: "ÇİÇEK", category: "NATURE" },
    { word: "UMUT", category: "EMOTION" },
    { word: "RÜYA", category: "EMOTION" },
    { word: "HUZUR", category: "EMOTION" },
    { word: "SANAT", category: "GENERAL" },
    { word: "MÜZİK", category: "GENERAL" },
    { word: "BARIŞ", category: "EMOTION" },
    { word: "GALAKSİ", category: "COSMOS" },
    { word: "UZAY", category: "COSMOS" },
    { word: "AŞK", category: "EMOTION" },
    { word: "DOST", category: "EMOTION" },
    { word: "AKIL", category: "SCIENCE" },
    { word: "ZEKA", category: "SCIENCE" },
    { word: "VERİ", category: "SCIENCE" },
    { word: "KOD", category: "SCIENCE" },
    { word: "MANTIK", category: "SCIENCE" },
    { word: "DAĞ", category: "NATURE" },
    { word: "SU", category: "NATURE" },
    { word: "NEHİR", category: "NATURE" },
    { word: "AĞAÇ", category: "NATURE" },
    { word: "BULUT", category: "NATURE" },
    { word: "SÖZ", category: "GENERAL" },
    { word: "ANLAM", category: "GENERAL" },
    { word: "ZAMAN", category: "GENERAL" },
    { word: "GECE", category: "GENERAL" },
    { word: "DÜŞ", category: "EMOTION" },
    { word: "MASAL", category: "GENERAL" },
    { word: "ŞİİR", category: "GENERAL" }
  ],
  EN: [
    { word: "SUN", category: "NATURE" },
    { word: "STAR", category: "COSMOS" },
    { word: "OCEAN", category: "NATURE" },
    { word: "LOVE", category: "EMOTION" },
    { word: "LIFE", category: "EMOTION" },
    { word: "BOOK", category: "GENERAL" },
    { word: "DATA", category: "SCIENCE" },
    { word: "WORLD", category: "COSMOS" },
    { word: "HUMAN", category: "GENERAL" },
    { word: "ROBOT", category: "SCIENCE" },
    { word: "CAT", category: "NATURE" },
    { word: "SKY", category: "NATURE" },
    { word: "FOREST", category: "NATURE" },
    { word: "FLOWER", category: "NATURE" },
    { word: "HOPE", category: "EMOTION" },
    { word: "DREAM", category: "EMOTION" },
    { word: "PEACE", category: "EMOTION" },
    { word: "ART", category: "GENERAL" },
    { word: "MUSIC", category: "GENERAL" },
    { word: "GALAXY", category: "COSMOS" },
    { word: "SPACE", category: "COSMOS" },
    { word: "HERO", category: "GENERAL" },
    { word: "STORY", category: "GENERAL" },
    { word: "MATRIX", category: "SCIENCE" },
    { word: "AURORA", category: "NATURE" },
    { word: "COSMOS", category: "COSMOS" },
    { word: "ENERGY", category: "SCIENCE" },
    { word: "ASTRO", category: "COSMOS" },
    { word: "SPECTRUM", category: "SCIENCE" },
    { word: "MIND", category: "SCIENCE" },
    { word: "LOGIC", category: "SCIENCE" },
    { word: "CLOUD", category: "NATURE" },
    { word: "NIGHT", category: "GENERAL" },
    { word: "MAGIC", category: "GENERAL" },
    { word: "LIGHT", category: "NATURE" },
    { word: "CODE", category: "SCIENCE" },
    { word: "TIME", category: "GENERAL" }
  ],
  ES: [
    { word: "SOL", category: "NATURE" },
    { word: "ESTRELLA", category: "COSMOS" },
    { word: "MAR", category: "NATURE" },
    { word: "AMOR", category: "EMOTION" },
    { word: "VIDA", category: "EMOTION" },
    { word: "LIBRO", category: "GENERAL" },
    { word: "MUNDO", category: "COSMOS" },
    { word: "HUMANO", category: "GENERAL" },
    { word: "ROBOT", category: "SCIENCE" },
    { word: "GATO", category: "NATURE" },
    { word: "CIELO", category: "NATURE" },
    { word: "BOSQUE", category: "NATURE" },
    { word: "FLOR", category: "NATURE" },
    { word: "ESPERANZA", category: "EMOTION" },
    { word: "SUENO", category: "EMOTION" },
    { word: "PAZ", category: "EMOTION" },
    { word: "ARTE", category: "GENERAL" },
    { word: "MUSICA", category: "GENERAL" },
    { word: "GALAXIA", category: "COSMOS" },
    { word: "ESPACIO", category: "COSMOS" },
    { word: "HEROE", category: "GENERAL" },
    { word: "HISTORIA", category: "GENERAL" },
    { word: "MAGIA", category: "GENERAL" },
    { word: "LUZ", category: "NATURE" },
    { word: "MENTE", category: "SCIENCE" },
    { word: "LOGICA", category: "SCIENCE" },
    { word: "NUBE", category: "NATURE" },
    { word: "NOCHE", category: "GENERAL" },
    { word: "ALMA", category: "EMOTION" },
    { word: "SABIDURIA", category: "SCIENCE" },
    { word: "ENERGIA", category: "SCIENCE" },
    { word: "TIEMPO", category: "GENERAL" },
    { word: "CODIGO", category: "SCIENCE" },
    { word: "DATO", category: "SCIENCE" }
  ],
  DE: [
    { word: "SONNE", category: "NATURE" },
    { word: "STERN", category: "COSMOS" },
    { word: "MEER", category: "NATURE" },
    { word: "LIEBE", category: "EMOTION" },
    { word: "LEBEN", category: "EMOTION" },
    { word: "BUCH", category: "GENERAL" },
    { word: "WELT", category: "COSMOS" },
    { word: "MENSCH", category: "GENERAL" },
    { word: "ROBOTER", category: "SCIENCE" },
    { word: "KATZE", category: "NATURE" },
    { word: "HIMMEL", category: "NATURE" },
    { word: "WALD", category: "NATURE" },
    { word: "BLUME", category: "NATURE" },
    { word: "HOFFNUNG", category: "EMOTION" },
    { word: "TRAUM", category: "EMOTION" },
    { word: "FRIEDEN", category: "EMOTION" },
    { word: "KUNST", category: "GENERAL" },
    { word: "MUSIK", category: "GENERAL" },
    { word: "GALAXIE", category: "COSMOS" },
    { word: "RAUM", category: "COSMOS" },
    { word: "HELD", category: "GENERAL" },
    { word: "GESCHICHTE", category: "GENERAL" },
    { word: "MAGIE", category: "GENERAL" },
    { word: "LICHT", category: "NATURE" },
    { word: "GEIST", category: "SCIENCE" },
    { word: "LOGIK", category: "SCIENCE" },
    { word: "WOLKE", category: "NATURE" },
    { word: "NACHT", category: "GENERAL" },
    { word: "KOSMOS", category: "COSMOS" },
    { word: "ENERGIE", category: "SCIENCE" },
    { word: "ZEIT", category: "GENERAL" },
    { word: "CODE", category: "SCIENCE" },
    { word: "DATEN", category: "SCIENCE" }
  ]
};

// Combine all words across all languages for deterministic system injection into matrix
const ALL_LANG_WORDS = [];
const wordSet = new Set();
Object.keys(DICTIONARIES).forEach(lang => {
  DICTIONARIES[lang].forEach(item => {
    if (!wordSet.has(item.word)) {
      wordSet.add(item.word);
      ALL_LANG_WORDS.push(item);
    }
  });
});

const COLS_PER_ROW = 200;

// System Intentionally Injects Words from ALL languages into Deterministic Coordinates
function getSeededWordLetterAt(col, row, COLS = 200) {
  const uRow = Math.abs(row);
  if (uRow % 2 === 0) {
    const rowSeed = uRow * 2654435761 + 987654321;
    const rowPrng = mulberry32(rowSeed);
    
    // Pick word deterministically from combined multilingual dictionary
    const wordObj = ALL_LANG_WORDS[Math.floor(rowPrng() * ALL_LANG_WORDS.length)];
    const word = wordObj.word;
    const maxStartCol = COLS - word.length - 2;
    if (maxStartCol > 0) {
      const startCol = Math.floor(rowPrng() * maxStartCol) + 1;
      const uCol = ((col % COLS) + COLS) % COLS;
      if (uCol >= startCol && uCol < startCol + word.length) {
        return word[uCol - startCol];
      }
    }
  }
  return null;
}

// Generate deterministic letter for spatial coordinate (col, row)
function getLetterAtCoordinate(col, row, COLS = 200) {
  const seededChar = getSeededWordLetterAt(col, row, COLS);
  if (seededChar) return seededChar;

  const uCol = col < 0 ? 1000000000 + col : col;
  const uRow = row < 0 ? 1000000000 + row : row;
  const seed = (uRow * COLS + uCol) * 1000003 + 123456789;
  const prng = mulberry32(seed);
  const index = Math.floor(prng() * LETTER_POOL.length);
  return LETTER_POOL[index];
}

// Linear index to 2D coordinate
function indexToCoord(globalIndex, COLS = 200) {
  const row = Math.floor(globalIndex / COLS);
  const col = globalIndex % COLS;
  return { col, row };
}

// 2D coordinate to linear index
function coordToIndex(col, row, COLS = 200) {
  return row * COLS + col;
}

class InfiniteLetterEngine {
  constructor() {
    this.injections = [];
    this.frontierIndex = 50000;
  }

  getLetter(col, row) {
    const globalIdx = coordToIndex(col, row, COLS_PER_ROW);

    for (let i = 0; i < this.injections.length; i++) {
      const inj = this.injections[i];
      if (
        globalIdx >= inj.startGlobalIndex &&
        globalIdx < inj.startGlobalIndex + inj.query.length
      ) {
        const offset = globalIdx - inj.startGlobalIndex;
        return inj.query[offset];
      }
    }

    return getLetterAtCoordinate(col, row, COLS_PER_ROW);
  }

  injectAtFrontier(query, currentVisibleRow) {
    const targetRow = Math.max(
      currentVisibleRow + 2,
      Math.floor(this.frontierIndex / COLS_PER_ROW) + 1
    );
    const startGlobalIndex = targetRow * COLS_PER_ROW + 10;

    this.injections.push({
      query,
      startGlobalIndex,
    });

    this.frontierIndex = Math.max(
      this.frontierIndex,
      startGlobalIndex + query.length + 100
    );

    const coord = indexToCoord(startGlobalIndex, COLS_PER_ROW);

    return {
      id: 'inj_' + Date.now(),
      query,
      globalIndex: startGlobalIndex,
      row: coord.row,
      col: coord.col,
      isInjected: true,
    };
  }

  searchSequence(query, maxScanLength = 300000) {
    const cleanQuery = query.toUpperCase();
    if (!cleanQuery) return [];

    const matches = [];

    // Search existing injections first
    for (let i = 0; i < this.injections.length; i++) {
      const inj = this.injections[i];
      if (inj.query.includes(cleanQuery)) {
        const subOffset = inj.query.indexOf(cleanQuery);
        const matchIdx = inj.startGlobalIndex + subOffset;
        const coord = indexToCoord(matchIdx, COLS_PER_ROW);
        matches.push({
          id: 'match_inj_' + matchIdx,
          query: cleanQuery,
          globalIndex: matchIdx,
          row: coord.row,
          col: coord.col,
          isInjected: true,
        });
      }
    }

    let currentMatchBuffer = '';
    for (let i = 0; i < maxScanLength; i++) {
      const coord = indexToCoord(i, COLS_PER_ROW);
      const letter = this.getLetter(coord.col, coord.row);
      currentMatchBuffer += letter;

      if (currentMatchBuffer.length > cleanQuery.length) {
        currentMatchBuffer = currentMatchBuffer.slice(1);
      }

      if (currentMatchBuffer === cleanQuery) {
        const globalIndex = i - cleanQuery.length + 1;
        const matchCoord = indexToCoord(globalIndex, COLS_PER_ROW);
        matches.push({
          id: 'match_' + globalIndex,
          query: cleanQuery,
          globalIndex,
          row: matchCoord.row,
          col: matchCoord.col,
        });

        if (matches.length >= 50) break;
      }
    }

    return matches;
  }
}

const letterEngine = new InfiniteLetterEngine();

// Row String Cache for Fast Area Scanning (Keyed by Language & Row)
const rowWordsCache = new Map();

function getRowString(r) {
  let str = '';
  for (let c = 0; c < COLS_PER_ROW; c++) {
    str += letterEngine.getLetter(c, r);
  }
  return str;
}

// Scans ONLY words belonging to current language dictionary
function getMeaningfulWordsInRow(r, lang) {
  const cacheKey = `${lang}_${r}`;
  if (rowWordsCache.has(cacheKey)) {
    return rowWordsCache.get(cacheKey);
  }

  const str = getRowString(r);
  const found = [];
  const currentDict = DICTIONARIES[lang] || DICTIONARIES.TR;

  for (let i = 0; i < currentDict.length; i++) {
    const item = currentDict[i];
    const w = item.word;
    let pos = str.indexOf(w);
    while (pos !== -1) {
      found.push({
        word: w,
        category: item.category,
        startCol: pos,
        endCol: pos + w.length,
        row: r
      });
      pos = str.indexOf(w, pos + 1);
    }
  }

  rowWordsCache.set(cacheKey, found);
  return found;
}

// Languages & Translations Data (TR, EN, ES, DE)
const LANGUAGES = ['TR', 'EN', 'ES', 'DE'];
let currentLang = 'TR';

const TRANSLATIONS = {
  TR: {
    title: "Sonsuz Harf Matrisi",
    placeholder: "KELİME...",
    searchBtn: "Arama Yap",
    clearBtn: "Temizle",
    wordsBtn: "KELİMELER",
    markers: "İŞARETLER",
    prevMatch: "Önceki eşleşme",
    nextMatch: "Sonraki eşleşme",
    resetPos: "Konumu Sıfırla",
    themeToggle: "Tema Değiştir",
    panelTitle: "KEŞFEDİLEN KELİMELER",
    randomWordBtn: "RASTGELE KELİME KEŞFET",
    noDiscoveredWords: "Henüz bu kategoride keşfedilmiş Türkçe kelime yok. Matriste gezinerek yeni kelimeler keşfedin!",
    categoryLabels: {
      ALL: 'HEPSİ',
      NATURE: 'DOĞA',
      COSMOS: 'EVREN',
      EMOTION: 'DUYGU',
      SCIENCE: 'BİLİM',
      GENERAL: 'GENEL'
    }
  },
  EN: {
    title: "Infinite Letter Matrix",
    placeholder: "WORD...",
    searchBtn: "Search",
    clearBtn: "Clear",
    wordsBtn: "WORDS",
    markers: "MARKERS",
    prevMatch: "Previous match",
    nextMatch: "Next match",
    resetPos: "Reset position",
    themeToggle: "Toggle theme",
    panelTitle: "DISCOVERED WORDS",
    randomWordBtn: "DISCOVER RANDOM WORD",
    noDiscoveredWords: "No discovered English words in this category yet. Scroll through the matrix to discover new words!",
    categoryLabels: {
      ALL: 'ALL',
      NATURE: 'NATURE',
      COSMOS: 'COSMOS',
      EMOTION: 'EMOTION',
      SCIENCE: 'SCIENCE',
      GENERAL: 'GENERAL'
    }
  },
  ES: {
    title: "Matriz Infinita de Letras",
    placeholder: "PALABRA...",
    searchBtn: "Buscar",
    clearBtn: "Limpiar",
    wordsBtn: "PALABRAS",
    markers: "MARCAS",
    prevMatch: "Coincidencia anterior",
    nextMatch: "Siguiente coincidencia",
    resetPos: "Restablecer posición",
    themeToggle: "Cambiar tema",
    panelTitle: "PALABRAS DESCUBIERTAS",
    randomWordBtn: "DESCUBRIR PALABRA ALEATORIA",
    noDiscoveredWords: "¡No hay palabras en español descubiertas en esta categoría. Desplázate por la matriz para descubrir nuevas palabras!",
    categoryLabels: {
      ALL: 'TODOS',
      NATURE: 'NATURALEZA',
      COSMOS: 'COSMOS',
      EMOTION: 'EMOCIÓN',
      SCIENCE: 'CIENCIA',
      GENERAL: 'GENERAL'
    }
  },
  DE: {
    title: "Unendliche Buchstabenmatrix",
    placeholder: "WORT...",
    searchBtn: "Suchen",
    clearBtn: "Löschen",
    wordsBtn: "WÖRTER",
    markers: "MARKER",
    prevMatch: "Vorheriger Treffer",
    nextMatch: "Nächster Treffer",
    resetPos: "Position zurücksetzen",
    themeToggle: "Design wechseln",
    panelTitle: "ENTDECKTE WÖRTER",
    randomWordBtn: "ZUFÄLLIGES WORT ENTDECKEN",
    noDiscoveredWords: "Noch keine entdeckten deutschen Wörter in dieser Kategorie. Scrolle durch die Matrix, um neue Wörter zu entdecken!",
    categoryLabels: {
      ALL: 'ALLE',
      NATURE: 'NATUR',
      COSMOS: 'KOSMOS',
      EMOTION: 'GEFÜHL',
      SCIENCE: 'WISSENSCHAFT',
      GENERAL: 'ALLGEMEIN'
    }
  }
};

// Application State
const CELL_WIDTH = 14;
const CELL_HEIGHT = 20;

let theme = 'dark';
let panX = 0;
let panY = 0;
let targetPan = null;

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

let searchQuery = '';
let matches = [];
let activeMatchIndex = 0;
let searchTimer = null;

let centerRow = 0;
let centerCol = 0;

let selectedCategory = 'ALL';
let wordPanelOpen = false;
let highlightMeaningfulWords = true;

// DOM Elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { alpha: false });

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-btn');

const wordsToggleBtn = document.getElementById('words-toggle-btn');
const highlightToggleBtn = document.getElementById('highlight-toggle-btn');
const nearbyWordCountSpan = document.getElementById('nearby-word-count');

const langToggleBtn = document.getElementById('lang-toggle-btn');
const langLabel = document.getElementById('lang-label');

const wordPanel = document.getElementById('word-panel');
const closeWordPanelBtn = document.getElementById('close-word-panel-btn');
const randomWordBtn = document.getElementById('random-word-btn');
const wordCategoryTags = document.getElementById('word-category-tags');
const wordList = document.getElementById('word-list');

const navSection = document.getElementById('nav-section');
const matchCounter = document.getElementById('match-counter');
const prevMatchBtn = document.getElementById('prev-match-btn');
const nextMatchBtn = document.getElementById('next-match-btn');

const coordColSpan = document.getElementById('coord-col');
const coordRowSpan = document.getElementById('coord-row');

const resetPosBtn = document.getElementById('reset-pos-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

// Resize Canvas
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  ctx.scale(dpr, dpr);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Update UI Text Language
function updateLanguageUI() {
  const t = TRANSLATIONS[currentLang];
  if (langLabel) langLabel.textContent = currentLang;

  const wordsBtnSpan = wordsToggleBtn.querySelector('span');
  if (wordsBtnSpan) wordsBtnSpan.textContent = t.wordsBtn;

  const highlightBtnSpan = highlightToggleBtn.querySelector('span');
  if (highlightBtnSpan) {
    const count = nearbyWordCountSpan ? nearbyWordCountSpan.textContent : 'N';
    highlightBtnSpan.innerHTML = `${t.markers}: <span id="nearby-word-count">${count}</span>`;
  }

  searchInput.placeholder = t.placeholder;

  const panelTitleSpan = wordPanel.querySelector('.word-panel-title span');
  if (panelTitleSpan) panelTitleSpan.textContent = t.panelTitle;

  const randomBtnSpan = randomWordBtn.querySelector('span');
  if (randomBtnSpan) randomBtnSpan.textContent = t.randomWordBtn;

  if (wordPanelOpen) {
    renderWordPanel();
  }
}

// Render Word Panel Content (ONLY DISCOVERED WORDS IN CURRENT LANGUAGE)
function renderWordPanel() {
  const t = TRANSLATIONS[currentLang];
  const catKeys = ['ALL', 'NATURE', 'COSMOS', 'EMOTION', 'SCIENCE', 'GENERAL'];

  // Render Category Filter Tags
  wordCategoryTags.innerHTML = '';
  catKeys.forEach(catKey => {
    const label = t.categoryLabels[catKey] || catKey;
    const tag = document.createElement('button');
    tag.type = 'button';
    tag.className = `tag-btn ${selectedCategory === catKey ? 'active' : ''}`;
    tag.textContent = label;
    tag.addEventListener('click', () => {
      selectedCategory = catKey;
      renderWordPanel();
    });
    wordCategoryTags.appendChild(tag);
  });

  // Get current language dictionary
  const currentDict = DICTIONARIES[currentLang] || DICTIONARIES.TR;

  // Filter dictionary items by category
  const targetWords = selectedCategory === 'ALL'
    ? currentDict
    : currentDict.filter(w => w.category === selectedCategory);

  // Filter ONLY DISCOVERED WORDS in current language
  const discoveredList = [];
  for (let i = 0; i < targetWords.length; i++) {
    const item = targetWords[i];
    const m = letterEngine.searchSequence(item.word, 100000);
    if (m.length > 0) {
      discoveredList.push({
        word: item.word,
        category: item.category,
        match: m[0]
      });
    }
  }

  wordList.innerHTML = '';

  // Display empty state if no discovered words in this category
  if (discoveredList.length === 0) {
    const emptyEl = document.createElement('div');
    emptyEl.style.padding = '20px 12px';
    emptyEl.style.textAlign = 'center';
    emptyEl.style.fontSize = '12px';
    emptyEl.style.opacity = '0.75';
    emptyEl.style.lineHeight = '1.6';
    emptyEl.textContent = t.noDiscoveredWords;
    wordList.appendChild(emptyEl);
    return;
  }

  // Render discovered word items
  discoveredList.forEach(item => {
    const wordEl = document.createElement('div');
    wordEl.className = 'word-item';
    const coordStr = `${toRoman(item.match.col)} : ${toRoman(item.match.row)}`;

    wordEl.innerHTML = `
      <span class="word-item-name">${item.word}</span>
      <span class="word-item-coord">${coordStr}</span>
    `;

    wordEl.addEventListener('click', () => {
      handleSearch(item.word);
      searchInput.value = item.word;
    });

    wordList.appendChild(wordEl);
  });
}

// Toggle Word Panel
function toggleWordPanel(show) {
  wordPanelOpen = show !== undefined ? show : !wordPanelOpen;
  wordPanel.style.display = wordPanelOpen ? 'flex' : 'none';
  if (wordPanelOpen) {
    renderWordPanel();
  }
}

wordsToggleBtn.addEventListener('click', () => toggleWordPanel());
closeWordPanelBtn.addEventListener('click', () => toggleWordPanel(false));

randomWordBtn.addEventListener('click', () => {
  const currentDict = DICTIONARIES[currentLang] || DICTIONARIES.TR;
  const randomIndex = Math.floor(Math.random() * currentDict.length);
  const randomWord = currentDict[randomIndex].word;
  searchInput.value = randomWord;
  handleSearch(randomWord);
});

// Toggle Language Button (Loops through TR -> EN -> ES -> DE -> TR)
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    const currentIndex = LANGUAGES.indexOf(currentLang);
    currentLang = LANGUAGES[(currentIndex + 1) % LANGUAGES.length];
    updateLanguageUI();
    updateUI();
  });
}

// Update UI Controls State (strictly Roman numerals for numbers)
function updateUI() {
  // Clear button visibility
  if (searchQuery) {
    clearBtn.style.display = 'inline-flex';
  } else {
    clearBtn.style.display = 'none';
  }

  // Match Navigation Visibility & Counter in Roman Numerals
  if (matches.length > 0) {
    navSection.style.display = 'flex';
    matchCounter.textContent = `${toRoman(activeMatchIndex + 1)} / ${toRoman(matches.length)}`;
  } else {
    navSection.style.display = 'none';
  }

  // Coordinates in Roman Numerals
  coordColSpan.textContent = toRoman(centerCol);
  coordRowSpan.textContent = toRoman(centerRow);

  // Theme icons
  if (theme === 'dark') {
    document.body.className = 'theme-dark';
    iconSun.style.display = 'inline';
    iconMoon.style.display = 'none';
  } else {
    document.body.className = 'theme-light';
    iconSun.style.display = 'none';
    iconMoon.style.display = 'inline';
  }
}

// Center camera on a specific match coordinate
function centerOnMatch(match) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const targetX = -match.col * CELL_WIDTH + width / 2 - CELL_WIDTH / 2;
  const targetY = -match.row * CELL_HEIGHT + height / 2 - CELL_HEIGHT / 2;

  targetPan = { x: targetX, y: targetY };
}

// Main Animation & Render Loop
function render() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Smooth pan interpolation
  if (targetPan) {
    panX += (targetPan.x - panX) * 0.12;
    panY += (targetPan.y - panY) * 0.12;

    if (
      Math.abs(targetPan.x - panX) < 0.5 &&
      Math.abs(targetPan.y - panY) < 0.5
    ) {
      panX = targetPan.x;
      panY = targetPan.y;
      targetPan = null;
    }
  }

  // Clear canvas background
  const bgColor = theme === 'dark' ? '#0a0a0a' : '#fafafa';
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  const highlightBg = theme === 'dark' ? '#ffffff' : '#000000';
  const highlightText = theme === 'dark' ? '#000000' : '#ffffff';

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Text formatting
  ctx.font = '700 13px "Courier New", Courier, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Calculate visible range with surrounding buffer for scan
  const minX = -panX - 100;
  const maxX = -panX + width + 100;
  const minY = -panY - 100;
  const maxY = -panY + height + 100;

  const startCol = Math.floor(minX / CELL_WIDTH);
  const endCol = Math.ceil(maxX / CELL_WIDTH);
  const startRow = Math.floor(minY / CELL_HEIGHT);
  const endRow = Math.ceil(maxY / CELL_HEIGHT);

  // Scan meaningful words ONLY in CURRENT LANGUAGE in visible area
  let nearbyWordsCount = 0;
  const markedCellsMap = new Map();
  const visibleWordsToOutline = [];

  if (highlightMeaningfulWords) {
    for (let r = startRow; r <= endRow; r++) {
      const wordsInRow = getMeaningfulWordsInRow(r, currentLang);
      if (wordsInRow.length > 0) {
        nearbyWordsCount += wordsInRow.length;
        for (let i = 0; i < wordsInRow.length; i++) {
          const wObj = wordsInRow[i];
          for (let c = wObj.startCol; c < wObj.endCol; c++) {
            markedCellsMap.set(`${r}_${c}`, wObj);
          }
          visibleWordsToOutline.push(wObj);
        }
      }
    }
  }

  // Update nearby word count in UI in Roman numerals
  const countSpan = document.getElementById('nearby-word-count');
  if (countSpan) {
    countSpan.textContent = toRoman(nearbyWordsCount);
  }

  // Update center coordinates in Roman numerals
  const newCenterCol = Math.floor((-panX + width / 2) / CELL_WIDTH);
  const newCenterRow = Math.floor((-panY + height / 2) / CELL_HEIGHT);
  if (newCenterCol !== centerCol || newCenterRow !== centerRow) {
    centerCol = newCenterCol;
    centerRow = newCenterRow;
    coordColSpan.textContent = toRoman(centerCol);
    coordRowSpan.textContent = toRoman(centerRow);
  }

  // Active match range
  const currentMatch = matches[activeMatchIndex];
  const matchStartIdx = currentMatch ? currentMatch.globalIndex : -1;
  const matchEndIdx = currentMatch
    ? currentMatch.globalIndex + currentMatch.query.length
    : -1;

  // Render visible cells
  for (let r = startRow; r <= endRow; r++) {
    const screenY = r * CELL_HEIGHT + panY + CELL_HEIGHT / 2;

    for (let c = startCol; c <= endCol; c++) {
      const screenX = c * CELL_WIDTH + panX + CELL_WIDTH / 2;

      const colMod = ((c % COLS_PER_ROW) + COLS_PER_ROW) % COLS_PER_ROW;
      const globalIdx = r * COLS_PER_ROW + colMod;

      const letter = letterEngine.getLetter(colMod, r);

      const isMatch =
        matchStartIdx !== -1 &&
        globalIdx >= matchStartIdx &&
        globalIdx < matchEndIdx;

      const autoWordMatch = markedCellsMap.get(`${r}_${colMod}`);

      if (isMatch) {
        ctx.fillStyle = highlightBg;
        ctx.fillRect(
          screenX - CELL_WIDTH / 2,
          screenY - CELL_HEIGHT / 2,
          CELL_WIDTH,
          CELL_HEIGHT
        );

        ctx.fillStyle = highlightText;
        ctx.fillText(letter, screenX, screenY);
      } else if (autoWordMatch) {
        // Auto-detected meaningful word marking (for current language)
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)';
        ctx.fillRect(
          screenX - CELL_WIDTH / 2,
          screenY - CELL_HEIGHT / 2,
          CELL_WIDTH,
          CELL_HEIGHT
        );

        ctx.fillStyle = textColor;
        ctx.fillText(letter, screenX, screenY);

        // Underline accent marker
        ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
        ctx.fillRect(
          screenX - CELL_WIDTH / 2,
          screenY + CELL_HEIGHT / 2 - 2,
          CELL_WIDTH,
          2
        );
      } else {
        ctx.fillStyle = textColor;
        ctx.fillText(letter, screenX, screenY);
      }
    }
  }

  // Draw crisp bounding outlines for visible marked words in current language
  if (highlightMeaningfulWords && visibleWordsToOutline.length > 0) {
    ctx.strokeStyle = theme === 'dark' ? '#ffffff' : '#000000';
    ctx.lineWidth = 1;

    for (let i = 0; i < visibleWordsToOutline.length; i++) {
      const wObj = visibleWordsToOutline[i];
      const r = wObj.row;
      const screenY = r * CELL_HEIGHT + panY;

      if (screenY < -CELL_HEIGHT || screenY > height + CELL_HEIGHT) continue;

      const startX = wObj.startCol * CELL_WIDTH + panX;
      const wordWidth = (wObj.endCol - wObj.startCol) * CELL_WIDTH;

      if (startX + wordWidth < -50 || startX > width + 50) continue;

      ctx.strokeRect(startX, screenY, wordWidth, CELL_HEIGHT);
    }
  }

  requestAnimationFrame(render);
}

// Execute Search
function handleSearch(query) {
  const cleanQuery = query.toUpperCase().replace(/[^A-Za-zĞÜŞİÖÇğüşiöçÁÉÍÓÚáéíóúÄÖÜäöüßÑñ]/g, '');
  if (!cleanQuery) return;

  if (searchTimer) {
    clearInterval(searchTimer);
    searchTimer = null;
  }

  searchQuery = cleanQuery;
  matches = [];
  activeMatchIndex = 0;

  const initialMatches = letterEngine.searchSequence(cleanQuery, 300000);

  if (initialMatches.length > 0) {
    matches = initialMatches;
    activeMatchIndex = 0;
    centerOnMatch(matches[0]);
    updateUI();
  } else {
    // Background search / injection timer for guaranteed discovery
    updateUI();
    let elapsed = 0;
    searchTimer = setInterval(() => {
      elapsed += 1;

      const bgMatches = letterEngine.searchSequence(cleanQuery, 500000);
      if (bgMatches.length > 0) {
        clearInterval(searchTimer);
        searchTimer = null;
        matches = bgMatches;
        activeMatchIndex = 0;
        centerOnMatch(matches[0]);
        updateUI();
        return;
      }

      if (elapsed >= 15) {
        clearInterval(searchTimer);
        searchTimer = null;
        const injectedMatch = letterEngine.injectAtFrontier(cleanQuery, centerRow);
        matches = [injectedMatch];
        activeMatchIndex = 0;
        centerOnMatch(injectedMatch);
        updateUI();
      }
    }, 1000);
  }
}

// Clear Search State
function handleClear() {
  if (searchTimer) {
    clearInterval(searchTimer);
    searchTimer = null;
  }
  searchQuery = '';
  searchInput.value = '';
  matches = [];
  activeMatchIndex = 0;
  updateUI();
}

// Search Form Submit
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSearch(searchInput.value);
});

// Input sanitize (Only letters from supported alphabets)
searchInput.addEventListener('input', (e) => {
  const cleaned = e.target.value.toUpperCase().replace(/[^A-Za-zĞÜŞİÖÇğüşiöçÁÉÍÓÚáéíóúÄÖÜäöüßÑñ]/g, '');
  searchInput.value = cleaned;
});

// Clear Button
clearBtn.addEventListener('click', handleClear);

// Navigation Buttons
prevMatchBtn.addEventListener('click', () => {
  if (matches.length === 0) return;
  activeMatchIndex = (activeMatchIndex - 1 + matches.length) % matches.length;
  centerOnMatch(matches[activeMatchIndex]);
  updateUI();
});

nextMatchBtn.addEventListener('click', () => {
  if (matches.length === 0) return;
  activeMatchIndex = (activeMatchIndex + 1) % matches.length;
  centerOnMatch(matches[activeMatchIndex]);
  updateUI();
});

// Reset Position Button
resetPosBtn.addEventListener('click', () => {
  handleClear();
  targetPan = { x: 0, y: 0 };
});

// Theme Toggle Button
themeToggleBtn.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  updateUI();
});

// Meaningful Words Highlight Toggle Button
if (highlightToggleBtn) {
  highlightToggleBtn.addEventListener('click', () => {
    highlightMeaningfulWords = !highlightMeaningfulWords;
    if (highlightMeaningfulWords) {
      highlightToggleBtn.classList.add('active-highlight');
    } else {
      highlightToggleBtn.classList.remove('active-highlight');
    }
  });
}

// Drag to Pan Handlers
canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.clientX - panX;
  dragStartY = e.clientY - panY;
  targetPan = null;
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  panX = e.clientX - dragStartX;
  panY = e.clientY - dragStartY;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  panX -= e.deltaX;
  panY -= e.deltaY;
  targetPan = null;
}, { passive: false });

// Touch support for mobile and tablets
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX - panX;
    touchStartY = e.touches[0].clientY - panY;
    targetPan = null;
  }
}, { passive: true });

canvas.addEventListener('touchmove', (e) => {
  if (e.touches.length === 1) {
    panX = e.touches[0].clientX - touchStartX;
    panY = e.touches[0].clientY - touchStartY;
  }
}, { passive: true });

// Initialize Language & UI
updateLanguageUI();
updateUI();

// Start Animation Loop
requestAnimationFrame(render);
