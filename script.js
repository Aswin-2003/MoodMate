const form = document.getElementById('mood-form');
const emojiInput = document.getElementById('emoji');
const noteInput = document.getElementById('note');
const moodList = document.getElementById('mood-list');

// Load saved moods from localStorage on page load
window.onload = () => {
  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.forEach(addMoodToList);
};

// Save new mood entry
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const mood = {
    emoji: emojiInput.value,
    note: noteInput.value,
    date: new Date().toLocaleString()
  };

  addMoodToList(mood);

  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.push(mood);
  localStorage.setItem('moods', JSON.stringify(moods));

  noteInput.value = '';
});

// Add mood to list
function addMoodToList(mood) {
  const li = document.createElement('li');
  li.textContent = `${mood.date} — ${mood.emoji} ${mood.note}`;
  li.classList.add('mood-item');
  li.setAttribute('data-mood', mood.emoji);
  moodList.prepend(li); // latest on top
}

// Filter moods by emoji type
function filterMood(type) {
  const items = document.querySelectorAll('.mood-item');
  items.forEach(item => {
    const itemMood = item.getAttribute('data-mood');
    if (type === 'all' || itemMood === type) {
      item.style.display = 'list-item';
    } else {
      item.style.display = 'none';
    }
  });
}
