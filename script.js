// const quizQuestions = [
//   {
//     question: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: 2,
//   },
//   {
//     question: "Which planet is known as the Red Planet?",
//     options: ["Earth", "Mars", "Jupiter", "Venus"],
//     correctAnswer: 1,
//   },
//   // Қосымша сұрақтарды осында қосуға болады
// ];

// const questionElement = document.querySelector(".question");
// const answerElements = document.querySelectorAll("input[name='answer']");
// const a_text = document.getElementById("a_text");
// const b_text = document.getElementById("b_text");
// const c_text = document.getElementById("c_text");
// const d_text = document.getElementById("d_text");
// const submitButton = document.getElementById("submit");
// const quizContainer = document.getElementById("quiz");

// let currentQuestion = 0;
// let score = 0;
// let timeLeft = 30; // Әр сұраққа 30 секунд беріледі
// let timerId;

// function loadQuiz() {
//   deselectAnswers();

//   const currentQuizQuestion = quizQuestions[currentQuestion];

//   questionElement.innerText = currentQuizQuestion.question;
//   a_text.innerText = currentQuizQuestion.options[0];
//   b_text.innerText = currentQuizQuestion.options[1];
//   c_text.innerText = currentQuizQuestion.options[2];
//   d_text.innerText = currentQuizQuestion.options[3];

//   timeLeft = 30; // Таймерді қайта іске қосамыз
//   clearInterval(timerId); // Таймерді тоқтату
//   timerId = setInterval(updateTimer, 1000); // Таймерді әр секунд сайын жаңарту
// }

// function getSelected() {
//   let answer = undefined;
//   answerElements.forEach((answerElement) => {
//     if (answerElement.checked) {
//       answer = answerElement.id;
//     }
//   });
//   return answer;
// }

// function deselectAnswers() {
//   answerElements.forEach((answerElement) => {
//     answerElement.checked = false;
//   });

//   document.activeElement.blur(); // Фокусты өшіру
// }

// function showResults() {
//   clearInterval(timerId); // Таймерді тоқтату
//   quizContainer.innerHTML = `
//       <h2>Сіз ${score}/${quizQuestions.length} сұраққа дұрыс жауап бердіңіз.</h2>
//       <button onclick="location.reload()">Қайта бастау</button>
//     `;
// }

// function updateTimer() {
//   const timerElement = document.getElementById("timer");
//   timeLeft--;
//   timerElement.innerText = `Қалған уақыт: ${timeLeft} сек`;

//   if (timeLeft === 0) {
//     nextQuestion(); // Таймер аяқталса, келесі сұраққа көшу
//   }
// }

// function nextQuestion() {
//   const answer = getSelected();

//   if (answer) {
//     const answerIndex = ["a", "b", "c", "d"].indexOf(answer);
//     if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
//       score++;
//     }

//     currentQuestion++;

//     if (currentQuestion < quizQuestions.length) {
//       loadQuiz();
//     } else {
//       showResults();
//     }
//   } else {
//     alert("Жауапты таңдаңыз!");
//   }
// }

// submitButton.addEventListener("click", nextQuestion);

// loadQuiz();
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
  // Қосымша сұрақтарды осында қосуға болады
];

const questionElement = document.querySelector(".question");
const answerElements = document.querySelectorAll("input[name='answer']");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const quizContainer = document.getElementById("quiz");

let currentQuestion = 0;
let score = 0;
let timeLeft = 10; // Әр сұраққа 30 секунд беріледі
let timerId;

function loadQuiz() {
  deselectAnswers();

  const currentQuizQuestion = quizQuestions[currentQuestion];

  questionElement.innerText = currentQuizQuestion.question;
  a_text.innerText = currentQuizQuestion.options[0];
  b_text.innerText = currentQuizQuestion.options[1];
  c_text.innerText = currentQuizQuestion.options[2];
  d_text.innerText = currentQuizQuestion.options[3];

  timeLeft = 10; // Таймерді қайта іске қосамыз
  clearInterval(timerId); // Таймерді тоқтату
  timerId = setInterval(updateTimer, 1000); // Таймерді әр секунд сайын жаңарту
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

  document.activeElement.blur(); // Фокусты өшіру
}

function showResults() {
  clearInterval(timerId); // Таймерді тоқтату
  quizContainer.innerHTML = `
      <h2>Сіз ${score}/${quizQuestions.length} сұраққа дұрыс жауап бердіңіз.</h2>
      <button onclick="location.reload()">Қайта бастау</button>
    `;
}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  timeLeft--;
  timerElement.innerText = `Қалған уақыт: ${timeLeft} сек`;

  if (timeLeft === 0) {
    clearInterval(timerId); // Таймерді тоқтату, егер 0 болса
    alert("Уақытыңыз бітті! Келесі сұраққа өтіңіз.");
    nextQuestion(); // Таймер аяқталса, келесі сұраққа көшу
  }
}

function nextQuestion() {
  const answer = getSelected();

  if (answer) {
    const answerIndex = ["a", "b", "c", "d"].indexOf(answer);
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
      loadQuiz();
    } else {
      showResults();
    }

    // Сабмит батырмасынан фокусты алып тастау
    submitButton.blur();
  } else {
    alert("Жауапты таңдаңыз!");
    submitButton.blur(); // Ескерту шыққанда да фокус өшіру
  }
}

submitButton.addEventListener("click", nextQuestion);

loadQuiz();
