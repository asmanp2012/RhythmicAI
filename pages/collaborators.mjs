import { wordStorage } from '../assets/js/custom.mjs';

function renderWordCards(words, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (words.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center text-gray-500 py-8">No words found</div>';
    return;
  }
  
  let html = '';
  words.forEach(item => {
    const syllablesText = item.syllables.join(' • ');
    
    html += `
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:bg-blue-50 transition poem-card">
        <div class="font-bold text-xl mb-2">${item.word}</div>
        <div class="text-xs text-gray-500 font-mono bg-white bg-opacity-50 p-1 rounded">
          ${syllablesText}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  const countEl = document.getElementById('word-count');
  if (countEl) countEl.innerText = `${words.length} کلمه`;
}

const contributorId = document.querySelector('body').getAttribute("data-collaborate-id");
let words = [];
wordStorage.allWordData.forEach(item => {
  if (item.v && item.v.includes(contributorId)) {
    words.push({
      word: item.word,
      syllables: item.s || []
    });
  }
});

renderWordCards(words, 'words-container');