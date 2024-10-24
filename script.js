const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
  },
];

const questionElement = document.querySelector(".question");
const answerElements = document.querySelectorAll("input[name='answer']");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const timerElement = document.getElementById("timer");
const quizContainer = document.getElementById("quiz");

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let timeLeft = 5;
let timerId;

function loadQuiz() {
  deselectAnswers();

  const currentQuizQuestion = quizQuestions[currentQuestion];

  questionElement.innerText = currentQuizQuestion.question;
  a_text.innerText = currentQuizQuestion.options[0];
  b_text.innerText = currentQuizQuestion.options[1];
  c_text.innerText = currentQuizQuestion.options[2];
  d_text.innerText = currentQuizQuestion.options[3];

  timeLeft = 5;
  clearInterval(timerId);
  timerId = setInterval(updateTimer, 1000);
}

function getSelected() {
  let answer = undefined;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answer = answerElement.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answerElements.forEach((answerElement) => {
    answerElement.checked = false;
  });

  document.activeElement.blur();
}

function showResults() {
  clearInterval(timerId);
  quizContainer.innerHTML = `
        <div class="recycling container">
            <h2>
            You've completed the Quiz </br>
            You got only ${score} out of ${quizQuestions.length}</h2>
            <div class="button">
                <button onclick="location.reload()">Replay Quiz</button>
                <button id="viewResults">Quit Quiz</button>
            <div>
        </div>
    `;

  const viewResultsButton = document.getElementById("viewResults");
  viewResultsButton.addEventListener("click", showUserAnswers);
}

function showUserAnswers() {
  let resultsHTML = `
    <div class="result">
        <h2>
            Сіздің жауаптарыңыз
        </h2>
        <ul>
        `;

  quizQuestions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const correctAnswer = quizQuestions[index].correctAnswer;

    resultsHTML += `
            <li>
            <h3>${question.question}</h3>
            <p>Сіздің жауабыңыз: <span style="color: ${
              userAnswer !== correctAnswer ? "red" : "green"
            }">
                ${question.options[userAnswer]}</span></p>
            <p>Дұрыс жауап: ${question.options[correctAnswer]}</p>
            </li>
        
      `;
  });

  quizContainer.innerHTML =
    resultsHTML +
    `
    </ul>
    </div>
    <button onclick="location.reload()">Қайта бастау</button>
    `;
}

function updateTimer() {
  timeLeft--;

  if (timeLeft <= 0) {
    clearInterval(timerId);
    alert("Уақытыңыз бітті! Келесі сұраққа өтіңіз.");
  }
}

function nextQuestion() {
  const answer = getSelected();

  if (answer) {
    const answerIndex = ["a", "b", "c", "d"].indexOf(answer);
    userAnswers.push(answerIndex);
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
      loadQuiz();
    } else {
      showResults();
    }

    submitButton.blur();
  } else {
    alert("Жауапты таңдаңыз!");
    submitButton.blur();
  }
}

submitButton.addEventListener("click", nextQuestion);

loadQuiz();
