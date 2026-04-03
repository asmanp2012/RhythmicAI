import wordListData from '../data/word-list.json' with { type: 'json' };

export class WordStorage {
  ready = false;
  dict = new Map();

  analyzeData = {
    allWord: 0,
    auto: 0,
    noAuto: 0,
    accept: 0,
    noAccept: 0,
  };

  constructor() {
    this.load();
  }

  load() {
    this.allWordData = wordListData;
    for (const item of this.allWordData) {
      this.analyzeData.allWord++;
      
      this.dict.set(item.word, item);

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
    this.ready = true;
    console.log('✅ wordList loaded and indexed:', this.analyzeData.allWord);
      
  }

  get(word) {
    return this.dict.get(word) || null;
  }

  has(word) {
    return this.dict.has(word);
  }
}