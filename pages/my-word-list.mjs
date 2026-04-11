import { wordStorage, getSyllableShape } from '../assets/js/check-poem.mjs';

const STORAGE_KEY = 'rhythmic_ai_user_words';
const USER_KEY = 'rhythmic_ai_user';

const main = document.getElementById('mainContent');
const userInput = document.getElementById('username');
const wordInput = document.getElementById('wordInput');

/*
* local storage functions
*/
function getStoredWords() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

/*
* save words to local storage and re-render table
*/
function saveWords(words) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    renderTable();
}

function renderTable() {
    const words = getStoredWords();
    const tableBody = document.getElementById('localWordList');
    
    if (words.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-gray-400 text-sm">هنوز کلمه‌ای تعریف نکرده‌اید.</td></tr>`;
        return;
    }

    tableBody.innerHTML = words.map((item, index) => `
        <tr class="border-b hover:bg-gray-50">
            <td class="px-4 py-3 font-bold">${item.word}</td>
            <td class="px-4 py-3 text-sm font-mono">${item.s.join(' · ')}</td>
            <td class="px-4 py-3 text-sm text-gray-600">${item.parts.join(' + ')}</td>
            <td class="px-4 py-3">
                ${item.isExtended ? '<span class="text-purple-600 text-xs font-bold">کشیده</span>' : '<span class="text-gray-400 text-xs">معمولی</span>'}
            </td>
            <td class="px-4 py-3">
                <button onclick="deleteWord(${index})" class="text-red-500 hover:text-red-700 text-sm">حذف</button>
            </td>
        </tr>
    `).join('');
}

/*
* auto-fill syllables and parts when a known word is typed, and highlight the form if it's a match
*/
wordInput.addEventListener('keyup', () => {
    const filterValue = wordInput.value.trim();
    const filteredKeys = wordStorage.allWordData.filter((item) => {
        return item.word === filterValue;
    });
    if (filteredKeys.length === 1) {
        // const shape = getSyllableShape(filteredKeys[0].s);
        document.getElementById('syllablesInput').value = filteredKeys[0].s.join(' ');
        document.getElementById('partsInput').value = filteredKeys[0].parts?.join(' ') || '';
        document.getElementById('extendedInput').checked = filteredKeys[0].isExtended || false;
        main.classList.toggle('bg-rose-600/50', true);
    } else {
        document.getElementById('syllablesInput').value = '';
        document.getElementById('partsInput').value = '';
        document.getElementById('extendedInput').checked = false;
        main.classList.toggle('bg-rose-600/50', false);
    }
});

/*
* set local storage and add new word to list
*/
document.getElementById('wordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = userInput.value.trim();
    const word = wordInput.value.trim();
    const s = document.getElementById('syllablesInput').value.trim().split(/\s+/);
    const partsText = document.getElementById('partsInput').value.trim();
    const isExtended = document.getElementById('extendedInput').checked;
    
    localStorage.setItem(USER_KEY, user);

    const newEntry = {
        word,
        s,
        parts: partsText ? partsText.split(/\s+/) : [word],
        isExtended,
        v: [user],
        auto: false
    };

    const words = getStoredWords();
    words.unshift(newEntry);
    saveWords(words);
    
    e.target.reset();
});

/*
* delete word from list by index
*/
window.deleteWord = (index) => {
    if (confirm('آیا از حذف این کلمه مطمئن هستید؟')) {
        const words = getStoredWords();
        words.splice(index, 1);
        saveWords(words);
    }
};

window.exportJSON = () => {
    const words = getStoredWords();
    if (words.length === 0) return alert('لیست خالی است!');
    
    const customLineByLine = words
        .map(wordObj => JSON.stringify(wordObj))
        .join(',\n'); 

    const finalOutput = `[\n${customLineByLine}\n]`;

    const blob = new Blob([finalOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-custom-words.json';
    link.click();
};

/*
* initial render and load user from local storage
*/
renderTable();
localStorage.getItem(USER_KEY) && (userInput.value = localStorage.getItem(USER_KEY));