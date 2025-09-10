// --- Navigation ---
const navButtons = document.querySelectorAll(".navbtn");
const sections = document.querySelectorAll(".section");
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.dataset.target;
    sections.forEach(sec => {
      sec.classList.toggle("hidden", sec.id !== target);
    });
  });
});

// --- Thought Board ---
const postBtn = document.getElementById("postBtn");
const postText = document.getElementById("postText");
const postsList = document.getElementById("postsList");
const statPosts = document.getElementById("statPosts");

let posts = JSON.parse(localStorage.getItem("posts")) || [];
function renderPosts() {
  postsList.innerHTML = "";
  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerText = p;
    postsList.prepend(div);
  });
  statPosts.innerText = posts.length;
}
renderPosts();

postBtn.addEventListener("click", () => {
  if (postText.value.trim() !== "") {
    posts.push(postText.value.trim());
    localStorage.setItem("posts", JSON.stringify(posts));
    postText.value = "";
    renderPosts();
  }
});

// --- Mood Tracker ---
const moods = [
  {emoji: "😄", key: "happy"},
  {emoji: "🥰", key: "lovely"},
  {emoji: "😛", key: "silly"},
  {emoji: "🙄", key: "whatever"},
  {emoji: "😄", key: "happy"},
  {emoji: "😐", key: "ok"},
  {emoji: "😢", key: "sad"},
  {emoji: "🥲", key: "crashing out"},
];
const moodOptions = document.getElementById("moodOptions");
let selectedMood = null;
moods.forEach(m => {
  const btn = document.createElement("button");
  btn.textContent = m.emoji;
  btn.addEventListener("click", () => {
    selectedMood = m.key;
    document.querySelectorAll("#moodOptions button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
  });
  moodOptions.appendChild(btn);
});

const saveMoodBtn = document.getElementById("saveMoodBtn");
const moodNote = document.getElementById("moodNote");
const moodCalendar = document.getElementById("moodCalendar");
const statMoods = document.getElementById("statMoods");

let moodHistory = JSON.parse(localStorage.getItem("moods")) || [];

function renderMoods() {
  moodCalendar.innerHTML = "";
  moodHistory.slice(-7).forEach(m => {
    const div = document.createElement("div");
    div.className = `day ${m.mood}`;
    div.title = m.note || "";
    div.innerText = m.emoji;
    moodCalendar.appendChild(div);
  });
  statMoods.innerText = moodHistory.length;
}
renderMoods();

saveMoodBtn.addEventListener("click", () => {
  if (!selectedMood) return;
  const m = moods.find(x => x.key === selectedMood);
  moodHistory.push({mood: selectedMood, emoji: m.emoji, note: moodNote.value});
  localStorage.setItem("moods", JSON.stringify(moodHistory));
  moodNote.value = "";
  selectedMood = null;
  renderMoods();
});

// --- Wellness Tasks ---
const defaultTasks = [
  "Drink water",
  "10 min walk",
  "Meditate",
  "Journal"
];
const taskList = document.getElementById("taskList");
const resetTasksBtn = document.getElementById("resetTasks");
const taskSummary = document.getElementById("taskSummary");
const statTasks = document.getElementById("statTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || defaultTasks.map(t => ({name: t, done:false}));

function renderTasks() {
  taskList.innerHTML = "";
  let doneCount = 0;
  tasks.forEach((t,i) => {
    const div = document.createElement("div");
    div.className = "task";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.done;
    cb.addEventListener("change", () => {
      tasks[i].done = cb.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });
    div.appendChild(cb);
    const label = document.createElement("label");
    label.innerText = t.name;
    div.appendChild(label);
    taskList.appendChild(div);
    if (t.done) doneCount++;
  });
  taskSummary.innerText = `${doneCount} / ${tasks.length} complete`;
  statTasks.innerText = doneCount;
}
renderTasks();

resetTasksBtn.addEventListener("click", () => {
  tasks = defaultTasks.map(t => ({name: t, done:false}));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
});

// --- Therapy booking ---
const bookBtns = document.querySelectorAll(".bookBtn");
const modalBack = document.getElementById("modalBack");
const modalTitle = document.getElementById("modalTitle");
const modalCancel = document.getElementById("modalCancel");
const modalConfirm = document.getElementById("modalConfirm");
const bookSlot = document.getElementById("bookSlot");
const bookName = document.getElementById("bookName");

bookBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modalTitle.innerText = "Book with " + btn.dataset.name;
    modalBack.style.display = "flex";
  });
});
modalCancel.addEventListener("click", () => {
  modalBack.style.display = "none";
});
modalConfirm.addEventListener("click", () => {
  alert("Booked " + modalTitle.innerText + " at " + bookSlot.value + " for " + (bookName.value||"Anonymous"));
  modalBack.style.display = "none";
});
