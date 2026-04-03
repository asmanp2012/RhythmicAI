import { WordStorage } from './word-storage.mjs'

export const wordStorage = new WordStorage();

const baseWord = {
  "فع": ['فع'],
  "فعل": ['ف', 'عل'],
  "فع‌لن": ['فع', 'لن'],
  "فعلن": ['ف', 'ع', 'لن'],
  "مفعول": ['مف', 'عو', 'ل'],
  "فعولن": ['ف', 'عو', 'لن'],
  "فاعلن": ['فا', 'ع', 'لن'],
  "مفعولن": ['مف', 'عو', 'لن'],
  "مفاعل": ['م', 'فا', 'ع', 'ل'],
  "مفاعیل": ['م', 'فا', 'عی', 'ل'],
  "مستفعل": ['مس', 'تف', 'ع', 'ل'],
  "فعلات": ['ف', 'ع', 'لا', 'ت'],
  "فاعلات": ['فا', 'ع', 'لا', 'ت'],
  "فعلاتن": ['ف', 'ع', 'لا', 'تن'],
  "مفاعلن": ['م', 'فا', 'ع', 'لن'],
  "مفتعلن": ['مف', 'ت', 'ع', 'لن'],
  "مفاعیلن": ['م', 'فا', 'عی', 'لن'],
  "فاعلاتن": ['فا', 'ع', 'لا', 'تن'],
  "مستفعلن": ['مس', 'تف', 'ع', 'لن']
}

const DB_SYLLABLES = {
  'یک': '-',
  'دو': '-',
  'سه': '-',
  // ا
  'اب': '-',
  'اپ': '-',
  'اث': '-',
  'اج': '-',
  'اح': '-',
  'اخ': '-',
  'اد': '-',
  'اذ': '-',
  'ار': '-',
  'از': '-',
  'اژ': '-',
  'اس': '-',
  'اش': '-',
  'اص': '-',
  'اض': '-',
  'اط': '-',
  'اظ': '-',
  'اع': '-',
  'اغ': '-',
  'اف': '-',
  'اق': '-',
  'اک': '-',
  'ال': '-',
  'ام': '-',
  'ان': '-',
  'او': '-',
  'اه': '-',
  'ای': '-',
  // ب
  'با': '-',
  'بب': '-',
  'بپ': '-',
  'بت': '-',
  'بج': '-',
  'بچ': '-',
  'بح': '-',
  'بخ': '-',
  'بد': '-',
  'بذ': '-',
  'بر': '-',
  'بز': '-',
  'بژ': '-',
  'بس': '-',
  'بش': '-',
  'بص': '-',
  'بض': '-',
  'بط': '-',
  'بع': '-',
  'بغ': '-',
  'بف': '-',
  'بک': '-',
  'بگ': '-',
  'بل': '-',
  'بم': '-',
  'بن': '-',
  'بو': '-',
  'بی': '-',
  'به': '-',
  // پ
  'پا': '-',
  'پپ': '-',
  'پت': '-',
  'پچ': '-',
  'پخ': '-',
  'پد': '-',
  'پذ': '-',
  'پر': '-',
  'پز': '-',
  'پژ': '-',
  'پس': '-',
  'پش': '-',
  'پغ': '-',
  'پف': '-',
  'پک': '-',
  'پگ': '-',
  'پل': '-',
  'پم': '-',
  'پن': '-',
  'پو': '-',
  'په': '-',
  'پی': '-',
  // ت
  'تا': '-',
  'تب': '-',
  'تپ': '-',
  'تت': '-',
  'ته': '-',
  'تح': '-',
  'تخ': '-',
  'تج': '-',
  'تف': '-',
  'تس': '-',
  'تش': '-',
  'تل': '-',
  'تم': '-',
  'تک': '-',
  'تگ': '-',
  'تن': '-',
  'تر': '-',
  'تز': '-',
  'تو': '-',
  'تص': '-',
  'تد': '-',
  'تی': '-',
  // ث
  'ثا': '-',
  'ثب': '-',
  'ثت': '-',
  'ثخ': '-',
  'ثن': '-',
  // ج
  'جا': '-',
  'جب': '-',
  'جت': '-',
  'جج': '-',
  'جخ': '-',
  'جر': '-',
  'جز': '-',
  'جس': '-',
  'جش': '-',
  'جل': '-',
  'جم': '-',
  'جن': '-',
  'جو': '-',
  'جی': '-',
  // چ
  'چا': '-',
  'چب': '-',
  'چت': '-',
  'چخ': '-',
  'چر': '-',
  'چس': '-',
  'چش': '-',
  'چل': '-',
  'چم': '-',
  'چن': '-',
  'چو': '-',
  'چی': '-',
  'جه': '-',
  // ح
  'حا': '-',
  'حب': '-',
  'حت': '-',
  'حج': '-',
  'حر': '-',
  'حس': '-',
  'حش': '-',
  'حل': '-',
  'حم': '-',
  'حن': '-',
  'حو': '-',
  'حی': '-',
  // خ
  'خا': '-',
  'خج': '-',
  'خد': '-',
  'خر': '-',
  'خش': '-',
  'خط': '-',
  'خل': '-',
  'خم': '-',
  'خن': '-',
  'خو': '-',
  'خس': '-',
  'خی': '-',
  // د
  'دا': '-',
  'دب': '-',
  'دت': '-',
  'دج': '-',
  'در': '-',
  'دس': '-',
  'دش': '-',
  'دل': '-',
  'دم': '-',
  'دن': '-',
  'دو': '-',
  'دی': '-',
  // ذ
  'ذو': '-',
  'ذی': '-',
  // ر
  'را': '-',
  'رب': '-',
  'رپ': '-',
  'رت': '-',
  'رج': '-',
  'رح': '-',
  'رخ': '-',
  'رد': '-',
  'رذ': '-',
  'رر': '-',
  'رز': '-',
  'رژ': '-',
  'رس': '-',
  'رش': '-',
  'رع': '-',
  'رغ': '-',
  'رف': '-',
  'رک': '-',
  'رگ': '-',
  'رل': '-',
  'رم': '-',
  'رو': '-',
  'ری': '-',
  // ز
  'زا': '-',
  'زب': '-',
  'زت': '-',
  'زج': '-',
  'زر': '-',
  'زس': '-',
  'زش': '-',
  'زل': '-',
  'زم': '-',
  'زن': '-',
  'زو': '-',
  'زی': '-',
  // ژ
  'ژا': '-',
  'ژب': '-',
  'ژت': '-',
  'ژر': '-',
  'ژس': '-',
  // س
  'سا': '-',
  'سب': '-',
  'ست': '-',
  'سج': '-',
  'سر': '-',
  'سز': '-',
  'سش': '-',
  'سل': '-',
  'سم': '-',
  'سن': '-',
  'سو': '-',
  'سه': '-',
  'سی': '-',
  // ش
  'شا': '-',
  'شب': '-',
  'شت': '-',
  'شج': '-',
  'شر': '-',
  'شس': '-',
  'شع': '-',
  'شل': '-',
  'شم': '-',
  'شن': '-',
  'شو': '-',
  'شی': '-',
  // ص
  'صا': '-',
  'صب': '-',
  'صت': '-',
  'صن': '-',
  'صو': '-',
  'صی': '-',
  // ض
  'ضا': '-',
  'ضب': '-',
  'دت': '-',
  'ضر': '-',
  'دس': '-',
  'دش': '-',
  // ط
  'طا': '-',
  'طب': '-',
  'تت': '-',
  'طر': '-',
  'تس': '-',
  // ظ
  'ظا': '-',
  'ظب': '-',
  'ظت': '-',
  'ظن': '-',
  'ظم': '-',
  // ع
  'عا': '-',
  'عب': '-',
  'عت': '-',
  'عج': '-',
  'عر': '-',
  'عز': '-',
  'عس': '-',
  'عش': '-',
  'عل': '-',
  'عم': '-',
  'عن': '-',
  'عو': '-',
  'عی': '-',
  // غ
  'غا': '-',
  'غب': '-',
  'غت': '-',
  'غر': '-',
  'غس': '-',
  'غم': '-',
  'غش': '-',
  // ف
  'فا': '-',
  'فب': '-',
  'فت': '-',
  'فج': '-',
  'فر': '-',
  'فز': '-',
  'فس': '-',
  'فش': '-',
  'فل': '-',
  'فم': '-',
  'فن': '-',
  'فو': '-',
  'فی': '-',
  // ق
  'قا': '-',
  'قب': '-',
  'قت': '-',
  'قج': '-',
  'قر': '-',
  'قز': '-',
  'قس': '-',
  'قش': '-',
  'قل': '-',
  'قم': '-',
  'قن': '-',
  'قو': '-',
  'قی': '-',
  // ک
  'کا': '-',
  'کب': '-',
  'کت': '-',
  'کج': '-',
  'کر': '-',
  'کز': '-',
  'کس': '-',
  'کش': '-',
  'کل': '-',
  'کم': '-',
  'کن': '-',
  'کو': '-',
  'کی': '-',
  // گ
  'گا': '-',
  'گب': '-',
  'گت': '-',
  'گج': '-',
  'گر': '-',
  'گس': '-',
  'گش': '-',
  'گل': '-',
  'گم': '-',
  'گن': '-',
  'گو': '-',
  'گی': '-',
  // ل
  'لا': '-',
  'لب': '-',
  'لت': '-',
  'لج': '-',
  'لر': '-',
  'لز': '-',
  'لس': '-',
  'لش': '-',
  'لک': '-',
  'لم': '-',
  'لن': '-',
  'لو': '-',
  'لی': '-',
  // م
  'ما': '-',
  'مب': '-',
  'مت': '-',
  'مج': '-',
  'مح': '-',
  'مخ': '-',
  'مر': '-',
  'مز': '-',
  'مس': '-',
  'مش': '-',
  'مق': '-',
  'مل': '-',
  'مم': '-',
  'من': '-',
  'مو': '-',
  'می': '-',
  // ن
  'نا': '-',
  'نب': '-',
  'نت': '-',
  'نج': '-',
  'نر': '-',
  'نز': '-',
  'نس': '-',
  'نش': '-',
  'نل': '-',
  'نم': '-',
  'نن': '-',
  'نو': '-',
  'نی': '-',
  'نه': '-',
  // ه
  'ها': '-',
  'هب': '-',
  'هت': '-',
  'هج': '-',
  'هر': '-',
  'هز': '-',
  'هس': '-',
  'هش': '-',
  'هل': '-',
  'هم': '-',
  'هن': '-',
  'هو': '-',
  'هی': '-',
};

const getSyllableShape = (syllables) => 
  syllables.map(s => s.length === 1 ? 'U' : '-').join('');

const BASE_WORD_SHAPES = {}
Object.keys(baseWord).forEach((key) => {
  const shape = getSyllableShape(baseWord[key]);
  BASE_WORD_SHAPES[key] = shape;
});

const SORTED_BASE_KEYS = Object.keys(baseWord).sort(
  (a, b) => baseWord[b].join('').length - baseWord[a].join('').length
);


export function findCombinations(inputShape) {
  const result = [];
  let index = 0;
  while (index < inputShape.length) {
    let matched = false;
    for (const base of SORTED_BASE_KEYS) {
      const shape = BASE_WORD_SHAPES[base];
      if (inputShape.startsWith(shape, index)) {
        result.push(base);
        index += shape.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result.push(inputShape.substring(index));
      break;
    }
  }
  return result;
}

const isSmallVowel = (char) => ['و', 'ا', 'ه', 'ی'].includes(char);
const isMiddleVowel = (char) => ['ل', 'ر', 'ز'].includes(char);
function extractSyllablesV(words, syllables, i) {
  if (i === 0) return ['و'];
  const lastWord = words[i - 1];
  const lastChar = lastWord.slice(-1);
  const lastIdx = syllables.length - 1;
  const lastSyllable = syllables[lastIdx];

  if (!lastSyllable) return ['و'];

  if (lastSyllable.slice(-1) !== lastChar) {
    return [`${lastChar}و`];
  } else {
    if (lastSyllable.length === 1) {
      syllables[lastIdx] = lastSyllable + 'و';
      return [];
    }
    return [lastChar + 'و'];
  }
}

function extractFromWord(word) {
  const filtered = filterWordChar(filterWordSpecialChar(word));
  const result = [];
  let i = 0;

  while (i < filtered.length) {
    const chars2 = filtered.slice(i, i + 2);
    const char1 = filtered[i];
    const char2 = filtered[i + 1];
    const char3 = filtered[i + 2];

    if (filtered.length - i === 1 && char1 === 'ن' && result[result.length - 1] === 'با') break;
    if (filtered.length - i < 3) {
      result.push(filtered.slice(i));
      break;
    }

    if (chars2 === 'ءا') { result.push('ءا'); i += 2; continue; }
    if (filtered.length === 3 && isSmallVowel(char2)) { result.push(char1 + char2); i += 2; continue; }
    if (isSmallVowel(char1) && isSmallVowel(char2)) { result.push(char1 + char2); i += 2; continue; }
    if (isSmallVowel(char2) && isSmallVowel(char3)) {
      result.push(char1, char2 + char3);
      i += 3;
      continue;
    }

    if (DB_SYLLABLES[chars2]) {
      result.push(chars2);
      i += 2;
    } else {
      result.push(char1);
      i += 1;
    }
  }
  return { syllables: result, verify: false };
}

function filterWordChar(str) {
  return str.replaceAll('خوا', 'خا')
  .replaceAll('آ', 'ءا');
}

function filterWordSpecialChar(str) {
  return str
    .replaceAll('+', '')
    .replaceAll('،', '');
}

function createRange(start, end) {
  return Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );
}

export function processText(text) {
  const cleaned = text.replace(/\s+/g, ' ')
    .replace('، و', ' ،و')
    .replace(/[.'"\]\[؟?,\/#!$%\^&\*;:{}=\-_`~()«»]/g, '')
    .trim();

  const words = cleaned.split(' ');
  const allSyllables = [];
  let verifiedIndices = [];
  const wordMap = {};

  words.forEach((word, i) => {
    let currentSyllables = [];
    const plainWord = filterWordSpecialChar(word);
    const startIdx = allSyllables.length;

    if (word === '،و') {
      currentSyllables = ['و'];
    } else if (filterWordChar(plainWord) === 'و') {
      const vRes = extractSyllablesV(words, allSyllables, i);
      allSyllables.push(...vRes);
      return;
    } else {
      const stored = wordStorage.get(plainWord);
      if (stored) {
        currentSyllables = stored.s;
        verifiedIndices.push(...createRange(startIdx, startIdx + currentSyllables.length - 1));
      } else {
        const extracted = extractFromWord(word);
        currentSyllables = extracted.syllables;
        wordMap[word] = currentSyllables;
        if (extracted.verify) {
          verifiedIndices.push(...createRange(startIdx, startIdx + currentSyllables.length - 1));
        }
      }
    }
    allSyllables.push(...currentSyllables);
  });

  return {
    syllables: allSyllables,
    verifyIndex: verifiedIndices,
    exWordList: wordMap
  };
}
