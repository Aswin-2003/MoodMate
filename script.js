const form = document.getElementById('mood-form');
const emojiInput = document.getElementById('emoji');
const noteInput = document.getElementById('note');
const moodList = document.getElementById('mood-list');

// Load saved moods from localStorage
window.onload = () => {
  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.forEach(addMoodToList);
};

// Save mood when form is submitted
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const emoji = emojiInput.value;
  const note = noteInput.value;
  const moodKeyword = getMoodKeyword(emoji);

  const mood = {
    emoji,
    note,
    moodKeyword,
    date: new Date().toLocaleString()
  };

  addMoodToList(mood);

  // Save to localStorage
  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.push(mood);
  localStorage.setItem('moods', JSON.stringify(moods));

  // Clear form
  noteInput.value = '';
});

// Convert emoji to mood keyword
function getMoodKeyword(emoji) {
  switch (emoji) {
    case '😊': return 'happy';
    case '😔': return 'sad';
    case '😠': return 'angry';
    case '😨': return 'anxious';
    case '😌': return 'calm';
    case '🥰': return 'loved';
    default: return 'unknown';
  }
}

// Add mood to list with filter tag
function addMoodToList(mood) {
  const li = document.createElement('li');
  li.className = 'mood-item';
  li.setAttribute('data-mood', mood.moodKeyword); // used for filtering
  li.textContent = `${mood.date} — ${mood.emoji} ${mood.note}`;
  moodList.prepend(li); // latest on top
}

// Filter moods
function filterMood(moodType) {
  const items = document.querySelectorAll('.mood-item');

  items.forEach(item => {
    const itemMood = item.getAttribute('data-mood');
    if (moodType === 'all' || itemMood === moodType) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
