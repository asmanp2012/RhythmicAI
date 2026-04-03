import {} from '../assets/js/custom.mjs';
import { baseWord, BASE_WORD_SHAPES, wordStorage, getSyllableShape } from '../assets/js/check-poem.mjs';

let currentPage1 = 1;
const itemsPerPage = 50;

function getVerifierBadges(verifiers) {
  const verifierCount = verifiers.length;

  if (verifierCount > 0) {
    const verifiersJson = JSON.stringify(verifiers).replace(/"/g, '&quot;');
    return `<div
      class="flex items-center gap-1"
      verifiers="${verifiersJson}"
    >
      <span class="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs font-bold">${verifierCount}</span>
      <div class="flex">
        ${verifiers.slice(0, 3).map(v => {
          const initial = v.charAt(0).toUpperCase();
          return `<span class="inline-flex -me-2 items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs border-2 border-white" title="${v}">${initial}</span>`;
        }).join('')}
        ${verifierCount > 3 ? `<span class="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600 rounded-full text-xs border-2 border-white">+${verifierCount-3}</span>` : ''}
      </div>
    </div>`;
  }

  return '<span class="text-gray-400 text-xs">—</span>';
}

function printWords() {
  const inputText = document.querySelector('#filterInput');
  const weightInput = document.querySelector('#weightFilterInput');
  const filterValue = inputText ? inputText.value.toLowerCase() : '';
  const weightFilterValue = weightInput ? weightInput.value.toUpperCase() : '';

  if (!wordStorage.analyzeData.allWord || wordStorage.analyzeData.allWord === 0) {
    document.querySelector('#wordListBody').innerHTML =
      '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">داده‌ای برای نمایش وجود ندارد</td></tr>';
    return;
  }

  const filteredKeys = wordStorage.allWordData.filter((item) => {
    const matchesWord = item.word.includes(filterValue);
    let matchesWeight = true;

    if (weightInput && weightInput.value !== '') {
      const shape = getSyllableShape(item.s);
      matchesWeight = shape == weightFilterValue;
    }

    return matchesWord && matchesWeight;
  });

  const totalPages = Math.ceil(filteredKeys.length / itemsPerPage);

  if (currentPage1 > totalPages) currentPage1 = 1;
  if (currentPage1 < 1) currentPage1 = 1;

  const startIndex = (currentPage1 - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedKeys = filteredKeys.slice(startIndex, endIndex);
  

  const htmlList = paginatedKeys
    .map((item, index) => {
      const displayIndex = startIndex + index + 1;

      let statusIcon = '⚠️ ';
      if (item.v.length > 0) {
        statusIcon = '✅ ';
      }
      if (item.auto)
      {
        statusIcon += '🤖 ';
      }

      let syllables = item.s.map(s => `<span class="syllable-badge">${s}</span>`).join('');

      const verifiers = item.v ?? [];
      const verifierHtml = getVerifierBadges(verifiers);

      return `<tr class="hover:bg-gray-50 transition">
        <td class="px-4 py-3 text-gray-600">${displayIndex}</td>
        <td class="px-4 py-3 font-medium">${item.word}</td>
        <td class="px-4 py-3 font-mono">${syllables}</td>
        <td class="px-4 py-3">${statusIcon}</td>
        <td class="px-4 py-3">${verifierHtml}</td>
        <td
          class="px-4 py-3"
        >
          <input
            name="word"
            value="${item.word}"
            type="checkbox"
            class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
        </td>
      </tr>`;
    }).join('');

  document.querySelector('#wordListBody').innerHTML = htmlList;
  document.querySelector('#requiredCount').textContent = filteredKeys.length;
  document.querySelectorAll("[verifiers]").forEach((el) => {
    el.addEventListener('click', (ev) => {
      const data = el.getAttribute('verifiers');
      openModal(data);
    });
  })



  renderPaginationControls('paginationControls1', currentPage1, totalPages, () => {
    currentPage1--;
    printWords();
  }, () => {
    currentPage1++;
    printWords();
  });
}


printWords();

function renderPaginationControls(containerId, currentPage, totalPages, onPrev, onNext) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let html = `
    <div class="flex justify-center items-center mt-4 px-2 gap-2">
      <button
        next-page
        ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}
        class="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
      <span class="text-sm text-gray-700">Page <span class="font-bold">${currentPage}</span> of <span class="font-bold">${totalPages || 1}</span>
      </span>
      <button
        prev-page
        ${currentPage === 1 ? 'disabled' : ''}
        class="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
    </div>
  `;
  container.innerHTML = html;
  container.querySelector('[next-page]').addEventListener('click', () => {
    onNext();
  });

  container.querySelector('[prev-page]').addEventListener('click', () => {
    onPrev();
  });
}

function addBaseWordToSelect() {
  const selectElement = document.getElementById('weightUnitSelect');
  const weightInput = document.querySelector('#weightFilterInput');

  selectElement.innerHTML = '<option value="">انتخاب وزن...</option>';

  for (const key in baseWord) {
    const option = document.createElement('option');
    option.value = key;
    const shape = BASE_WORD_SHAPES[key] || '';
    option.textContent = key + ' = ' + shape;

    if (weightInput && weightInput.value.toUpperCase() == shape) {
      option.selected = true;
    }
    selectElement.appendChild(option);
  }
}

function choseWeight() {
  const selectElement = document.getElementById('weightUnitSelect');
  const weightInput = document.querySelector('#weightFilterInput');
  const chose = selectElement.value;
  weightInput.value = BASE_WORD_SHAPES[chose] || '';
  printWords();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  const filterInput = document.getElementById('filterInput');
  const weightInput = document.getElementById('weightFilterInput');
  const weightSelect = document.getElementById('weightUnitSelect');

  if (filterInput) {
    filterInput.addEventListener('input', function() {
      printWords();      
    });
  }

  if (weightInput) {
    weightInput.addEventListener('input', function() {
      printWords();
      addBaseWordToSelect();
    });
  }

  if (weightSelect) {
    weightSelect.addEventListener('change', choseWeight);
  }

  printWords();
  addBaseWordToSelect();
});

function openModal(verifiersJson) {
  const modal = document.querySelector('[modal]');
  const list = document.getElementById('verifierList');
  
  // پارس کردن JSON به آرایه
  const verifiers = JSON.parse(verifiersJson);
  
  // ساخت لیست HTML
  list.innerHTML = verifiers.map(v => `
    <li class="flex items-center p-2 hover:bg-gray-50 rounded">
      <span class="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-sm font-bold ml-3">
        ${v.charAt(0).toUpperCase()}
      </span>
      <span class="text-gray-700">${v}</span>
    </li>
  `).join('');
  
  // نمایش مودال
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  const modal = document.querySelector('[modal]');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

document.querySelectorAll('[verifier-modal-close], [modal]').forEach((el) => {
  const force = el.hasAttribute('verifier-modal-close');
  el.addEventListener('click', function(e) {
    if (e.target == el || force) {
      closeModal();
    }
  });
});



function showChoseWord() {
  const inputList = document.querySelectorAll('input[name="word"]:checked');
  const result = [...inputList].map((item) => item.value).join('\n');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(result)
      .then(() => {
        alert('✅ کلمات انتخاب‌شده در کلیپ‌بورد کپی شدند.\n\n' + result);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('📋 کلمات انتخاب‌شده:\n\n' + result);
      });
  } else {
    alert('📋 کلمات انتخاب‌شده:\n\n' + result);
  }
}

document.querySelectorAll('[collect-selected-data]').forEach((el) => {
  el.addEventListener('click', function(e) {
    showChoseWord();
  });
});