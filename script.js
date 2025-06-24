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

  const mood = {
    emoji: emojiInput.value,
    note: noteInput.value,
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

// Add a mood item to the list
function addMoodToList(mood) {
  const li = document.createElement('li');
  li.className = 'mood-item';
  li.setAttribute('data-mood', mood.note.toLowerCase());  // Filter-ready attribute
  li.textContent = `${mood.date} — ${mood.emoji} ${mood.note}`;
  moodList.prepend(li); // latest on top
}

// Filter moods (optional feature, to add later)
function filterMood(mood) {
  const items = document.querySelectorAll(".mood-item");

  items.forEach(item => {
    const itemMood = item.getAttribute("data-mood");
    if (mood === "all" || itemMood === mood) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
