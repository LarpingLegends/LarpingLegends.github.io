// Données des planètes
const planets = [
  {
    name: "Mercure",
    info: "Mercure est la planète la plus proche du Soleil. Elle est petite et très rocheuse.",
    question: "Quelle planète est la plus proche du Soleil?",
    answers: ["Mars", "Mercure", "Neptune", "Terre"],
    correct: "Mercure"
  },
  {
    name: "Vénus",
    info: "Vénus est très chaude à cause de son atmosphère épaisse qui garde la chaleur.",
    question: "Pourquoi Vénus est-elle très chaude?",
    answers: ["À cause de son atmosphère", "À cause de ses anneaux", "À cause de sa lune", "À cause de sa taille"],
    correct: "À cause de son atmosphère"
  },
  {
    name: "Terre",
    info: "La Terre est la seule planète connue qui possède de la vie et beaucoup d’eau liquide.",
    question: "Quelle planète possède de la vie connue?",
    answers: ["Saturne", "Terre", "Uranus", "Mercure"],
    correct: "Terre"
  },
  {
    name: "Mars",
    info: "Mars est appelée la planète rouge parce que son sol contient beaucoup d’oxyde de fer.",
    question: "Quel est le surnom de Mars?",
    answers: ["La planète bleue", "La planète rouge", "La géante gazeuse", "La planète glacée"],
    correct: "La planète rouge"
  },
  {
    name: "Jupiter",
    info: "Jupiter est la plus grande planète du système solaire. C’est une géante gazeuse.",
    question: "Quelle est la plus grande planète du système solaire?",
    answers: ["Jupiter", "Terre", "Mars", "Vénus"],
    correct: "Jupiter"
  },
  {
    name: "Saturne",
    info: "Saturne est connue pour ses grands anneaux composés de glace et de roches.",
    question: "Pourquoi Saturne est-elle célèbre?",
    answers: ["Ses volcans", "Ses anneaux", "Son eau liquide", "Sa vitesse"],
    correct: "Ses anneaux"
  },
  {
    name: "Uranus",
    info: "Uranus est une planète froide qui tourne presque sur le côté.",
    question: "Qu’est-ce qui est spécial chez Uranus?",
    answers: ["Elle tourne presque sur le côté", "Elle est la plus proche du Soleil", "Elle est rouge", "Elle n’a pas d’atmosphère"],
    correct: "Elle tourne presque sur le côté"
  },
  {
    name: "Neptune",
    info: "Neptune est très loin du Soleil et possède des vents extrêmement rapides.",
    question: "Quelle planète est très loin du Soleil et possède des vents rapides?",
    answers: ["Neptune", "Mercure", "Vénus", "Terre"],
    correct: "Neptune"
  }
];

let score = 0;
let currentPlanet = null;
let answeredPlanets = [];

const intro = document.getElementById("intro");
const travel = document.getElementById("travel");
const overview = document.getElementById("overview");
const quiz = document.getElementById("quiz");
const planetInfo = document.getElementById("planetInfo");
const scoreText = document.getElementById("score");
const overviewBtn = document.getElementById("overviewBtn");

// Commence l'animation de voyage
function startMission() {
  intro.classList.add("hidden");
  travel.classList.remove("hidden");

  let index = 0;
  planetInfo.innerHTML = `<h2>Décollage...</h2><p>La fusée quitte la Terre!</p>`;

  const interval = setInterval(function () {
    planetInfo.innerHTML = `<h2>${planets[index].name}</h2><p>${planets[index].info}</p>`;
    index++;

    if (index === planets.length) {
      clearInterval(interval);
      overviewBtn.classList.remove("hidden");
    }
  }, 1800);
}

// Affiche la page avec toutes les planètes
function showOverview() {
  travel.classList.add("hidden");
  quiz.classList.add("hidden");
  overview.classList.remove("hidden");
}

// Ouvre le quiz de la planète choisie
function openQuiz(planetName) {
  currentPlanet = planets.find(function (planet) {
    return planet.name === planetName;
  });

  overview.classList.add("hidden");
  quiz.classList.remove("hidden");

  document.getElementById("quizTitle").textContent = "Question sur " + currentPlanet.name;
  document.getElementById("question").textContent = currentPlanet.question;
  document.getElementById("feedback").textContent = "";

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  currentPlanet.answers.forEach(function (answer) {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.className = "answer-btn";
    btn.onclick = function () {
      checkAnswer(answer);
    };
    answersDiv.appendChild(btn);
  });
}

// Vérifie la réponse et ajoute un point seulement une fois par planète
function checkAnswer(answer) {
  const feedback = document.getElementById("feedback");

  if (answer === currentPlanet.correct) {
    if (!answeredPlanets.includes(currentPlanet.name)) {
      score++;
      answeredPlanets.push(currentPlanet.name);
      scoreText.textContent = score;
    }
    feedback.textContent = "✅ Bonne réponse!";
  } else {
    feedback.textContent = "❌ Mauvaise réponse. La bonne réponse est : " + currentPlanet.correct;
  }
}

// Événements
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startMission);

overviewBtn.addEventListener("click", showOverview);

document.getElementById("backBtn").addEventListener("click", showOverview);

const planetButtons = document.querySelectorAll(".planet");
planetButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    openQuiz(button.dataset.planet);
  });
});
