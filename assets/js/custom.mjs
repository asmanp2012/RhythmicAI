import { wordStorage } from './check-poem.mjs'

export { wordStorage } from './check-poem.mjs';

function loadWords() {
  if (wordStorage) {
    const elTotal = document.getElementById('totalWords');
    const elNeed  = document.querySelector('.count-word-need');
    const elAccept = document.querySelector('.count-word-accept');
    const elNotAccept = document.querySelector('.count-word-not-accept');
    const elDontNeed = document.querySelector('.count-word-dont-need');
    const elUserWords = document.querySelector('.count-word-user');

    // Access properties from analyzeData, not the root of the class
    const stats = wordStorage.analyzeData;

    if(elTotal != null){elTotal.textContent = stats.allWord;}
    if(elNeed != null){elNeed.innerHTML = stats.noAuto;}
    if(elAccept != null) { elAccept.innerHTML = stats.accept;}
    if(elNotAccept != null){ elNotAccept.innerHTML = stats.noAccept;}
    if(elDontNeed != null) {elDontNeed.innerHTML = stats.auto;}
    if(elUserWords != null) {elUserWords.innerHTML = stats.userWords;}
  } else {
    // If not ready yet, wait 1s and try again
    setTimeout(loadWords, 1000);
  }
}

loadWords();


function toggleNavbar() {
  const navbar = document.getElementById('navbarNav');
  navbar.classList.toggle('hidden');
  navbar.classList.toggle('flex');
  navbar.classList.toggle('flex-col');
  const toggler = document.querySelector('[navbar-toggler]')
  if (navbar.classList.contains('flex')) {
    toggler.innerHTML = '✕';
  } else {
    toggler.innerHTML = '☰';
  }
}

document.querySelectorAll('[navbar-toggler]').forEach((el) => { 
  el.addEventListener('click', () => { toggleNavbar() });
});

