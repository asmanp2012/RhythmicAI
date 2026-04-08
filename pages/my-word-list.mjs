// مدیریت داده‌ها در LocalStorage
const STORAGE_KEY = 'rhythmic_ai_user_words';

function getStoredWords() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveWords(words) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    renderTable();
}

// رندر کردن جدول
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

// ثبت کلمه جدید
document.getElementById('wordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const word = document.getElementById('wordInput').value.trim();
    const s = document.getElementById('syllablesInput').value.trim().split(/\s+/);
    const partsText = document.getElementById('partsInput').value.trim();
    const isExtended = document.getElementById('extendedInput').checked;

    const newEntry = {
        word,
        s,
        parts: partsText ? partsText.split(/\s+/) : [word],
        isExtended,
        v: ["user-defined"], // به صورت پیش‌فرض تایید کاربر
        auto: false
    };

    const words = getStoredWords();
    words.unshift(newEntry); // اضافه کردن به ابتدای لیست
    saveWords(words);
    
    e.target.reset(); // پاک کردن فرم
});

// حذف کلمه
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

renderTable();