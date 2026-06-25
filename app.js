/* Italian Communication Practice v5 — based on Maureen's speaking app, no typing */
let currentChapter = 0;
let currentItem = 0;
let showAnswer = false;
let autoMode = false;
let selectedItalianVoice = null;
let selectedEnglishVoice = null;
let activeTimers = [];
let rateMode = Number(localStorage.getItem("italianPracticeRate") || "0.84");
let pauseMode = Number(localStorage.getItem("italianPracticePause") || "8000");
let scores = JSON.parse(localStorage.getItem("italianPracticeScoresV5") || "{}");

const ITALIAN_VOICE_KEY = "italianPracticeVoiceURI";
const $ = (id) => document.getElementById(id);

function clearTimers() {
  activeTimers.forEach((timerId) => clearTimeout(timerId));
  activeTimers = [];
}

function later(callback, delay) {
  const timerId = setTimeout(callback, delay);
  activeTimers.push(timerId);
  return timerId;
}

function hasSpeech() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function scoreItalianVoice(voice) {
  const name = (voice.name || "").toLowerCase();
  const lang = (voice.lang || "").toLowerCase();
  let score = 0;
  if (lang === "it-it") score += 100;
  else if (lang.startsWith("it")) score += 70;
  if (name.includes("premium")) score += 30;
  if (name.includes("enhanced")) score += 25;
  if (name.includes("neural")) score += 25;
  if (name.includes("natural")) score += 25;
  if (name.includes("siri")) score += 20;
  if (name.includes("google")) score += 15;
  if (name.includes("microsoft")) score += 15;
  if (name.includes("apple")) score += 10;
  if (name.includes("compact")) score -= 20;
  if (name.includes("default")) score -= 5;
  return score;
}

function getVoices() {
  if (!hasSpeech()) return [];
  return window.speechSynthesis.getVoices();
}

function getItalianVoices() {
  return getVoices().filter((voice) => voice.lang && voice.lang.toLowerCase().startsWith("it"));
}

function loadVoices() {
  if (!hasSpeech()) return;
  const voices = getVoices();
  const italianVoices = getItalianVoices();
  const savedURI = localStorage.getItem(ITALIAN_VOICE_KEY);
  selectedItalianVoice =
    italianVoices.find((voice) => voice.voiceURI === savedURI) ||
    [...italianVoices].sort((a, b) => scoreItalianVoice(b) - scoreItalianVoice(a))[0] ||
    null;
  selectedEnglishVoice =
    voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("en-us")) ||
    voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("en")) ||
    null;
  populateItalianVoiceSelect();
}

function populateItalianVoiceSelect() {
  const select = $("italianVoiceSelect");
  if (!select) return;
  const italianVoices = getItalianVoices();
  select.innerHTML = "";
  if (italianVoices.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No Italian voices found";
    select.appendChild(option);
    return;
  }
  [...italianVoices]
    .sort((a, b) => scoreItalianVoice(b) - scoreItalianVoice(a))
    .forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.voiceURI;
      option.textContent = `${voice.name} — ${voice.lang}`;
      select.appendChild(option);
    });
  if (selectedItalianVoice) select.value = selectedItalianVoice.voiceURI;
}

if (hasSpeech()) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
  setTimeout(loadVoices, 250);
  setTimeout(loadVoices, 1000);
}

function speak(text, lang = "it-IT", rate = rateMode, onend = null) {
  if (!hasSpeech()) {
    alert("Speech is not supported on this browser.");
    if (typeof onend === "function") onend();
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = 1;
  if (lang.toLowerCase().startsWith("it")) {
    if (!selectedItalianVoice) loadVoices();
    if (selectedItalianVoice) {
      utterance.voice = selectedItalianVoice;
      utterance.voiceURI = selectedItalianVoice.voiceURI;
    }
  }
  if (lang.toLowerCase().startsWith("en") && selectedEnglishVoice) {
    utterance.voice = selectedEnglishVoice;
    utterance.voiceURI = selectedEnglishVoice.voiceURI;
  }
  if (typeof onend === "function") {
    utterance.onend = onend;
    utterance.onerror = onend;
  }
  window.speechSynthesis.cancel();
  setTimeout(() => window.speechSynthesis.speak(utterance), 40);
}

function validateData() {
  if (!Array.isArray(chapters) || chapters.length === 0) throw new Error("No chapters found.");
  chapters.forEach((chapter, chapterIndex) => {
    if (!chapter.title || !Array.isArray(chapter.items)) throw new Error(`Invalid chapter ${chapterIndex}.`);
    chapter.items.forEach((item, itemIndex) => {
      if (!item.question || !item.answerItalian) throw new Error(`Invalid item at chapter ${chapterIndex + 1}, item ${itemIndex + 1}.`);
    });
  });
}

function currentCard() { return chapters[currentChapter].items[currentItem]; }
function cardKey() { return `${currentChapter}-${currentItem}`; }

function renderChapters() {
  const container = $("chapterButtons");
  container.innerHTML = "";
  chapters.forEach((chapter, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = chapter.title.replace("Chapter ", "Ch. ");
    button.className = index === currentChapter ? "chapter active" : "chapter";
    button.onclick = () => {
      stopAutoMode();
      currentChapter = index;
      currentItem = 0;
      showAnswer = false;
      render();
    };
    container.appendChild(button);
  });
}

function renderStats() {
  const values = Object.values(scores);
  const got = values.filter((v) => v === "got").length;
  const needs = values.filter((v) => v === "practice").length;
  $("stats").textContent = `Marked: ${got} got it · ${needs} need practice`;
}

function updateToggleLabels() {
  $("slowBtn").textContent = rateMode <= 0.78 ? "Speed: Very Slow" : rateMode <= 0.88 ? "Speed: Slow" : "Speed: Normal";
  $("pauseBtn").textContent = `Pause: ${Math.round(pauseMode / 1000)} sec`;
}

function render() {
  const chapter = chapters[currentChapter];
  const item = currentCard();
  renderChapters();
  $("chapterTitle").textContent = chapter.title;
  $("counter").textContent = `Card ${currentItem + 1} of ${chapter.items.length}`;
  $("focus").textContent = item.focus || "Speaking practice";
  $("instruction").textContent = item.instruction || "Answer out loud.";
  $("question").textContent = item.question;
  $("answerItalian").textContent = showAnswer ? item.answerItalian : "Answer out loud, then tap “Show Answer.”";
  $("answerEnglish").textContent = showAnswer ? item.answerEnglish || "" : "";
  $("hint").textContent = showAnswer && item.hint ? `Tip: ${item.hint}` : "";
  $("progress").style.width = `${((currentItem + 1) / chapter.items.length) * 100}%`;
  $("autoBtn").textContent = autoMode ? "Stop Commute Mode" : "Start Commute Mode";
  document.querySelector(".card").classList.toggle("answered-good", scores[cardKey()] === "got");
  document.querySelector(".card").classList.toggle("answered-practice", scores[cardKey()] === "practice");
  updateToggleLabels();
  renderStats();
}

function nextItem() {
  currentItem += 1;
  if (currentItem >= chapters[currentChapter].items.length) {
    currentItem = 0;
    currentChapter = (currentChapter + 1) % chapters.length;
  }
  showAnswer = false;
  render();
  if (autoMode) later(runCommuteSequence, 600);
}

function previousItem() {
  stopAutoMode();
  currentItem -= 1;
  if (currentItem < 0) {
    currentChapter = (currentChapter - 1 + chapters.length) % chapters.length;
    currentItem = chapters[currentChapter].items.length - 1;
  }
  showAnswer = false;
  render();
}

function stopAutoMode() {
  autoMode = false;
  clearTimers();
  if (hasSpeech()) window.speechSynthesis.cancel();
}

function estimateDelay(text, minimum = 2200) {
  return Math.max(minimum, text.length * 85);
}

function runCommuteSequence() {
  if (!autoMode) return;
  const item = currentCard();
  speak(item.question, "it-IT", rateMode);
  later(() => {
    if (!autoMode) return;
    showAnswer = true;
    render();
    speak(item.answerItalian, "it-IT", rateMode);
    later(() => {
      if (!autoMode) return;
      nextItem();
    }, estimateDelay(item.answerItalian, 2600));
  }, Math.max(pauseMode, estimateDelay(item.question, 3000)));
}

$("italianVoiceSelect").onchange = (event) => {
  const voiceURI = event.target.value;
  const voice = getItalianVoices().find((item) => item.voiceURI === voiceURI) || null;
  selectedItalianVoice = voice;
  if (voice) localStorage.setItem(ITALIAN_VOICE_KEY, voice.voiceURI);
};

$("testVoice").onclick = () => speak("Come ti chiami? Mi chiamo Maureen.", "it-IT", rateMode);
$("speakQuestion").onclick = () => speak(currentCard().question, "it-IT", rateMode);
$("speakAnswerItalian").onclick = () => { showAnswer = true; render(); speak(currentCard().answerItalian, "it-IT", rateMode); };
$("speakAnswerEnglish").onclick = () => { showAnswer = true; render(); speak(currentCard().answerEnglish || "", "en-US", 0.9); };
$("showAnswer").onclick = () => { showAnswer = !showAnswer; render(); };
$("next").onclick = () => { stopAutoMode(); nextItem(); };
$("prev").onclick = previousItem;
$("gotIt").onclick = () => { scores[cardKey()] = "got"; localStorage.setItem("italianPracticeScoresV5", JSON.stringify(scores)); nextItem(); };
$("needPractice").onclick = () => { scores[cardKey()] = "practice"; localStorage.setItem("italianPracticeScoresV5", JSON.stringify(scores)); nextItem(); };
$("slowBtn").onclick = () => {
  rateMode = rateMode <= 0.78 ? 0.94 : rateMode <= 0.88 ? 0.76 : 0.84;
  localStorage.setItem("italianPracticeRate", String(rateMode));
  render();
};
$("pauseBtn").onclick = () => {
  pauseMode = pauseMode === 8000 ? 10000 : pauseMode === 10000 ? 5000 : 8000;
  localStorage.setItem("italianPracticePause", String(pauseMode));
  render();
};
$("autoBtn").onclick = () => {
  if (autoMode) { stopAutoMode(); render(); return; }
  loadVoices();
  autoMode = true;
  showAnswer = false;
  render();
  runCommuteSequence();
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") { stopAutoMode(); nextItem(); }
  if (event.key === "ArrowLeft") previousItem();
  if (event.key === " ") { event.preventDefault(); showAnswer = !showAnswer; render(); }
});

if ("serviceWorker" in navigator && window.isSecureContext) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

validateData();
render();
