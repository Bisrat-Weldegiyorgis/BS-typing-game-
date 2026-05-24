const passages = [

  "Typing is an essential skill in the modern world. It helps people work faster and communicate clearly.",

  "Technology has changed the way people learn and work. Computers are now part of everyday life.",

  "Practice improves typing speed and accuracy over time. Consistency is more important than speed at the beginning.",

  "Reading every day improves vocabulary and understanding. It also strengthens focus and imagination.",

  "The internet allows instant access to information from anywhere in the world. It connects millions of people.",

  "Healthy food gives your body energy. Fruits and vegetables are important for nutrition.",

  "Typing games help improve keyboard speed and accuracy. They make learning fun and interactive."
];

const textEl =
  document.getElementById("text");

const inputEl =
  document.getElementById("input");

const scoreEl =
  document.getElementById("score");

const accuracyEl =
  document.getElementById("accuracy");

const wpmEl =
  document.getElementById("wpm");

const progressBar =
  document.getElementById("progress-bar");

let currentPassage = "";

let startTime = null;

let totalTyped = 0;

let totalCorrect = 0;

let score = 0;

/* RANDOM PASSAGE */

function randomPassage() {

  return passages[
    Math.floor(
      Math.random() * passages.length
    )
  ];
}

/* SHOW PASSAGE */

function showPassage() {

  currentPassage = randomPassage();

  textEl.innerHTML = "";

  currentPassage
    .split("")
    .forEach(char => {

      const span =
        document.createElement("span");

      span.innerText = char;

      textEl.appendChild(span);
    });

  inputEl.value = "";

  updateProgress();
}

/* PROGRESS BAR */

function updateProgress() {

  const progress =
    (
      inputEl.value.length /
      currentPassage.length
    ) * 100;

  progressBar.style.width =
    progress + "%";
}

/* TYPING SYSTEM */

inputEl.addEventListener("input", () => {

  if (!startTime) {

    startTime = new Date();
  }

  const typedChars =
    inputEl.value.split("");

  const spans =
    textEl.querySelectorAll("span");

  let correctChars = 0;

  let completed = true;

  spans.forEach((span, index) => {

    const char = typedChars[index];

    span.classList.remove(
      "correct",
      "incorrect",
      "current"
    );

    /* CURRENT LETTER */

    if (char == null) {

      completed = false;

      if (
        index === typedChars.length
      ) {

        span.classList.add("current");
      }

    }

    /* CORRECT LETTER */

    else if (
      char === span.innerText
    ) {

      span.classList.add("correct");

      correctChars++;
    }

    /* WRONG LETTER */

    else {

      span.classList.add("incorrect");

      completed = false;
    }
  });

  totalTyped =
    typedChars.length;

  totalCorrect =
    correctChars;

  /* WPM */

  const elapsedMinutes =
    (
      new Date() - startTime
    ) / 60000;

  const wpm = Math.round(

    (totalCorrect / 5) /

    elapsedMinutes

  ) || 0;

  /* ACCURACY */

  const accuracy = Math.round(

    (totalCorrect / totalTyped) * 100

  ) || 100;

  /* SCORE */

  score =
    totalCorrect * 10;

  /* UPDATE UI */

  scoreEl.innerText =
    score;

  accuracyEl.innerText =
    accuracy + "%";

  wpmEl.innerText =
    wpm + " WPM";

  updateProgress();

  /* NEXT PARAGRAPH */

  if (
    inputEl.value === currentPassage
  ) {

    startTime = new Date();

    showPassage();
  }
});

// =======================
// 🎵 BACKGROUND MUSIC (ADD ON ONLY)
// =======================

const bgMusic = new Audio("music.mp3"); // change filename if needed
bgMusic.loop = true;
bgMusic.volume = 0.5;

let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    bgMusic.play().catch(() => {});
    musicStarted = true;
  }
}

// start music on first interaction
document.addEventListener("keydown", startMusic);
document.addEventListener("click", startMusic);


// =======================
// 🔄 RESTART GAME FUNCTION (ADD ON ONLY)
// =======================

function restartGame() {
  inputEl.value = "";

  scoreEl.innerText = "0";
  accuracyEl.innerText = "100%";
  wpmEl.innerText = "0 WPM";

  progressBar.style.width = "0%";

  startTime = null;
  totalTyped = 0;
  totalCorrect = 0;
  score = 0;

  bgMusic.currentTime = 0;

  showPassage();
}


// Optional shortcut: CTRL + R to restart game (NOT browser reload)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "r") {
    e.preventDefault();
    restartGame();
  }
});

/* START GAME */

showPassage();