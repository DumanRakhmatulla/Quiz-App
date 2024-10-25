document.getElementById("startQuiz").addEventListener("click", function () {
  const quizQuestions = [
    {
      question: "In which year was Cristiano Ronaldo born?",
      options: ["1985", "1987", "1990", "1983"],
      correctAnswer: 0,
    },
    {
      question:
        "What was Cristiano Ronaldo's first professional football club?",
      options: [
        "Real Madrid",
        "Sporting Lisbon",
        "Manchester United",
        "Juventus",
      ],
      correctAnswer: 1,
    },
    {
      question: "How many times has Ronaldo won the Ballon d'Or?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
    },
    {
      question:
        "Which major tournament did Ronaldo win with the Portugal national team?",
      options: [
        "World Cup",
        "European Championship",
        "Confederations Cup",
        "Africa Cup of Nations",
      ],
      correctAnswer: 1,
    },
    {
      question: "With which club did Ronaldo win the 2016 Champions League?",
      options: ["Juventus", "Manchester United", "Barcelona", "Real Madrid"],
      correctAnswer: 3,
    },
  ];

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  const questionElement = document.querySelector(".question");
  const answerElements = document.querySelectorAll("input[name='answer']");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const submitButton = document.getElementById("submit");
  const quizContainer = document.getElementById("quiz");

  submitButton.style.backgroundColor = "rgba(0, 102, 204, 1)";

  let currentQuestion = 0;
  let score = 0;
  let userAnswers = [];
  let timeLeft = 15;
  let timerId;
  let blinkTimerId;

  function loadQuiz() {
    deselectAnswers();

    const currentQuizQuestion = quizQuestions[currentQuestion];

    questionElement.innerText = currentQuizQuestion.question;
    a_text.innerText = currentQuizQuestion.options[0];
    b_text.innerText = currentQuizQuestion.options[1];
    c_text.innerText = currentQuizQuestion.options[2];
    d_text.innerText = currentQuizQuestion.options[3];

    timeLeft = 15;
    document.getElementById("time").innerText = timeLeft;

    const timerElement = document.getElementById("timer");
    timerElement.style.color = "rgba(0, 85, 170, 1)";
    resetBorders();

    clearInterval(timerId);
    clearInterval(blinkTimerId);
    timerId = setInterval(updateTimer, 1000);
  }

  function resetBorders() {
    document.querySelectorAll("label").forEach((label) => {
      label.style.borderColor = "rgba(0, 85, 170, 0.6)";
    });
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
        <div class="recycling">
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
            Your answers
        </h2>
        <ul>
        `;

    quizQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const correctAnswer = quizQuestions[index].correctAnswer;

      resultsHTML += `
            <li>
            <h3>${question.question}</h3>
            <p>Your answer: <span style="color: ${
              userAnswer !== correctAnswer ? "red" : "green"
            }">
                ${question.options[userAnswer]}</span></p>
            <p>Correct answer: ${question.options[correctAnswer]}</p>
            </li>
        
      `;
    });

    quizContainer.innerHTML =
      resultsHTML +
      `
    </ul>
    </div>
    <button onclick="location.reload()">Replay Quiz</button>
    `;
  }

  function updateTimer() {
    timeLeft--;

    const timerElement = document.getElementById("timer");
    timerElement.innerHTML = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 5 && timeLeft > 0) {
      clearInterval(blinkTimerId);
      blinkTimerId = setInterval(() => {
        if (timerElement.style.color === "red") {
          timerElement.style.color = "rgba(0, 85, 170, 1)";
        } else {
          timerElement.style.color = "red";
        }
      }, 500);
    } else if (timeLeft <= 0) {
      clearInterval(timerId);
      clearInterval(blinkTimerId);
      timerElement.style.color = "red";
    } else {
      timerElement.style.color = "rgba(0, 85, 170, 1)";
    }
  }

  function nextQuestion() {
    const answer = getSelected();

    if (answer) {
      const answerIndex = ["a", "b", "c", "d"].indexOf(answer);
      userAnswers.push(answerIndex);
      submitButton.style.backgroundColor = "rgba(0, 102, 204, 1)";
      resetBorders();

      currentQuestion++;

      if (currentQuestion < quizQuestions.length) {
        loadQuiz();
      } else {
        showResults();
      }

      submitButton.blur();
    } else {
      submitButton.style.backgroundColor = "red";
      document.querySelectorAll("label").forEach((label) => {
        label.style.borderColor = "red";
      });
      setTimeout(() => {
        submitButton.style.backgroundColor = "rgba(0, 102, 204, 1)";
        resetBorders();
      }, 1000);
    }
  }

  submitButton.addEventListener("click", nextQuestion);

  loadQuiz();
});
