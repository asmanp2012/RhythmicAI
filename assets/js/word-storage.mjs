import wordListData from '../data/word-list.json' with { type: 'json' };

const STORAGE_KEY = 'rhythmic_ai_user_words';

export class WordStorage {
  ready = false;
  dict = new Map();

  allWordData = [];
  analyzeData = {
    allWord: 0,
    auto: 0,
    noAuto: 0,
    accept: 0,
    noAccept: 0,
    userWords: 0
  };

  constructor() {
    this.load();
    this.loadUserWord();
    this.ready = true;
    console.log('✅ wordList loaded and indexed:', this.analyzeData.allWord);
  }

  load() {
    this.allWordData = wordListData;
    this.dict.clear();
    for (const item of this.allWordData) {
      this.dict.set(item.word, item);
      this.analyze(item);
    }
  }

  loadUserWord()
  {
    let userWords = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      userWords = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Error reading userWords:", e);
      userWords = [];
    }
    
    for (const item of userWords) {
      const existing = this.dict.get(item.word);

      if (!existing) {
        this.dict.set(item.word, item);
        this.analyze(item, true);
        continue;
      };

      const isSame = existing.s?.join() === item.s?.join();
      
      if (isSame && item.v) {
        for (const val of item.v) {
          if (!existing.v.includes(val)) {
            existing.v.push(val);
          }
        }
      }
      else
      {
        this.dict.set(item.word, item);
      }
    }
  }

  analyze(item, itLocal=false)
  {
    this.analyzeData.allWord++;
    
    if(itLocal)
    {
      this.analyzeData.userWords++;
    }

    if (item.auto === true) {
      this.analyzeData.auto++;
    } else {
      this.analyzeData.noAuto++;
    }

    if (item.v && item.v.length > 0) {
      this.analyzeData.accept++;
    }
    else
    {
      this.analyzeData.noAccept++;
    }
  }

  get(word) {
    return this.dict.get(word) || null;
  }

  has(word) {
    return this.dict.has(word);
  }

  exportAll() {
    return Array.from(this.dict.values());
  }
}