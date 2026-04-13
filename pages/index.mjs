import {} from '../assets/js/custom.mjs';
import { processText, findCombinations  } from '../assets/js/check-poem.mjs';

window.lastPoem = '';
function saveLast(event, inputEl) {
  window.lastPoem = inputEl.value;
}

const poemTextArea = document.querySelector('[poemArea]');
poemTextArea.addEventListener('focus', (event) => { saveLast(event, event.target); });
poemTextArea.addEventListener('change', (event) => { importPoem(event, event.target); });


function exportPoem() {
  const allDeathEl = document.querySelectorAll('.death');
  const totalLines = allDeathEl.length;
  const couplets = Math.floor(totalLines / 2);
  const hasExtraLine = totalLines % 2 !== 0;
  document.querySelector('.countLine').innerText = totalLines;
  document.querySelector('.countCouplet').innerText = hasExtraLine ? couplets + 1 : couplets;
  const allDeath = [...allDeathEl].map((el, i) => { 
    if(i%2 != 0) {
      return el.querySelector('input').value + '\n';
    }
    return el.querySelector('input').value;
  });
  const outputEl = document.querySelector('textarea');
  outputEl.value = allDeath.join('\n');
}

function checkValue(deathEl) {
  const value = deathEl.querySelector('input').value;
  const resultEl = deathEl.querySelector('.result');
  const syllableCountEl = deathEl.querySelector('.syllable-count');
  const extractSyllables = processText(value);
  const syllables = extractSyllables['syllables'];
  const verifySyllables = extractSyllables['verifyIndex'];
  resultEl.innerText = showSyllables(extractSyllables);
  syllableCountEl.innerText = `تعداد سیلاب‌ها: ${syllables.length}`;
  const shape = syllables.map(syllable => syllable.length === 1 ? 'U' : '-').join('');
  deathEl.querySelector('.syllable-display span').innerText = shape;
  deathEl.querySelector('.syllable-display e').innerText = findCombinations(shape);
  exportPoem();
}

function addLine() {
  const container = document.getElementById('input-container');
  const newDiv = document.createElement('div');
  newDiv.className = 'death border-b border-gray-300 pb-4 mb-4 flex flex-wrap';
  newDiv.innerHTML = `
    <div class="w-full md:w-8/12 md:pl-4">
      <div class="w-full mb-2">
        <input type="text" placeholder="مصرع جدید"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          enterkeyhint="done"
        >
      </div>
      <div class="flex flex-wrap">
        <div class="w-9/12 result text-right text-gray-800 font-mono"></div>
        <div class="w-3/12 syllable-count text-left text-sm text-gray-500"></div>
      </div>
    </div>
    <div class="w-full md:w-4/12 mt-3 md:mt-0 syllable-display text-left font-mono">
      <span class="block text-lg"></span>
      <e class="text-sm text-gray-600"></e>
    </div>
  `;
  container.appendChild(newDiv);
  const input = newDiv.querySelector('input');
  input.addEventListener('keydown', (ev) => {
    inputEnter(ev, input);
  })
  document.querySelectorAll('.death').forEach(el => checkValue(el));
}

function importPoem(event, inputEl) {
  const deathContainer = document.querySelector('#input-container');
  const poemText = inputEl.value;
  if(poemText.length < window.lastPoem.length) {
    deathContainer.innerHTML = ''; 
  }
  let lines = poemText.split('\n');
  lines = lines.filter((line) => line.trim() !== '');
  let allDeath = document.querySelectorAll('.death');
  if(lines.length > allDeath.length) {
    const linesNeedNumber = lines.length - allDeath.length;
    for (let index = 0; index < linesNeedNumber; index++) {
      addLine();
    }
  }
  allDeath = document.querySelectorAll('.death');
  [...allDeath].forEach((el, i) => { 
    if(lines[i] != null) {
      lines[i] = lines[i].replaceAll(String.fromCharCode(8204), " ");
      el.querySelector('input').value = lines[i];
      checkValue(el);
    }
  });
}

function inputEnter(event, inputEl) {
  if (event.key === 'Enter' || event.key === 'Tab') {
    const deathEl = inputEl.closest('.death');
    const currentEl = deathEl;
    if(deathEl.nextElementSibling == null) {
      addLine();
    } else {
      checkValue(deathEl);
    }
    if(event.key === 'Enter')
    {
    currentEl.nextElementSibling.querySelector('input').focus();
    }
  }
}


function showSyllables(extractSyllables) {
  return extractSyllables['syllables'].map((element, index) => {
    if(extractSyllables['verifyIndex'].findIndex((index2) => index2 === index) != -1) {
      return element += `√`;
    } else {
      return element;
    }
  }).join(' + ');
}

document.querySelector('[export-all-word]').addEventListener('click', () => {
  let allDeath = document.querySelectorAll('.death');
  let result = {};
  [...allDeath].forEach((deathEl) => { 
    const value = deathEl.querySelector('input').value;
    const res = processText(value)['exWordList'];
    result = {...result, ...res};
  });
  const formattedResult = Object.keys(result).map((index) => {
    const value = result[index];
    return `"${index}": [${value.map((item)=> `'${item}'`).join(', ')}]`;
  }).join(',\n  ');
  const finalOutput = `{ \n  ${formattedResult} \n}`;
  navigator.clipboard.writeText(finalOutput);
});

document.querySelector('[share-page]').addEventListener('click', () => {
  const outputEl = document.querySelector('textarea');
  const textContent = outputEl.value;
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set('Text', textContent);
  window.history.replaceState({}, '', currentURL);
  navigator.clipboard.writeText(window.location.href);
});

document.querySelector('[add-line]').addEventListener('click', () => {
  addLine();
});


const params = new URL(document.location.href).searchParams;
let text = params.get('Text');
if(text != '', text != null) {
  const inputEl = document.querySelector('textarea');
  inputEl.value = text;
  importPoem(null, inputEl);
}