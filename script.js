
const answerOptions = document.querySelectorAll('.answer-option');

answerOptions.forEach(answerOption => {
  answerOption.addEventListener('click', () => {
    // Remove any existing selected answer option
    answerOptions.forEach(option => option.classList.remove('selected'));
    // Add selected class to the clicked answer option
    answerOption.classList.add('selected');
  });
});

let score = 0;
function checkAnswer() {
    const selectedAnswer = document.querySelector('.answer-button.selected');
    if (!selectedAnswer) {
      return;
    }
  
    const correctAnswer = document.querySelector('.answer-button[data-is-correct="true"]');
    if (selectedAnswer === correctAnswer) {
      score += 100;
    }
  
    goToNextQuestion();
  }
  
function goToNextQuestion() {
  const currentQuestion = document.querySelector('.question-container.active');
  const nextQuestion = currentQuestion.nextElementSibling;
  if (!nextQuestion) {
    // All questions have been answered, redirect to the score page
    window.location.href = `score.html?score=${score}`;
    return;
  }

  currentQuestion.classList.remove('active');
  nextQuestion.classList.add('active');
}

const answerButtons = document.querySelectorAll("#q1_a1, #q1_a2, #q1_a3, #q1_a4");


answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    answerButtons.forEach((button) => button.classList.remove("selected"));
    button.classList.add("selected");
    answerButtons.forEach((button) => button.disabled = true);
  });
});

const dropdown = document.querySelector(".dropdown");

dropdown.addEventListener("click", function () {
  this.querySelector(".dropdown-content").classList.toggle("show");
});

function goToPage() {
  window.location.href =  `question2.html?score=${score}`;
}

function goToPage1() {
  window.location.href = "question1.html";
}

const blockDiv = document.createElement("div");

blockDiv.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.8);
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const heading = document.createElement("h1");

heading.style.cssText = `
  font-size: 56px;
  font-weight: lighter;
  color: #000;
  text-align: center;
`;

document.body.appendChild(blockDiv);
blockDiv.appendChild(heading);

const hideButton = document.querySelector(".hide-button");
const timerElement = document.getElementById("timer");

let isTimerHidden = false;

hideButton.addEventListener("click", function () {
  isTimerHidden = !isTimerHidden;
  timerElement.style.display = isTimerHidden ? "none" : "block";
  hideButton.innerText = isTimerHidden ? "SHOW" : "HIDE";
});

const EXAM_DURATION = 1;

const END_TIME = new Date();
END_TIME.setMinutes(END_TIME.getMinutes() + EXAM_DURATION);

let timerInterval = setInterval(() => {
  const REMAINING_TIME = Math.round((END_TIME - new Date()) / 1000);

  if (REMAINING_TIME <= 0) {
    clearInterval(timerInterval);
    timerElement.innerHTML = "00:00";
    blockDiv.style.display = "flex";
    heading.textContent = "Your time is up";
    const seeResultsLink = document.createElement("a");
    seeResultsLink.style.cssText = `
      display: block;
      font-size: 24px;
      color: #000;
      text-align: center;
      margin-top: 30px;
    `;
    seeResultsLink.textContent = "See Results";
    seeResultsLink.href = "results.html";
    blockDiv.appendChild(seeResultsLink);
    document.querySelector("html").style.opacity = 0.4;
  } else {
    const TIMER_ELEMENT = document.getElementById("timer");
    const MINUTES = Math.floor(REMAINING_TIME / 60);
    const SECONDS = REMAINING_TIME % 60;
    TIMER_ELEMENT.innerHTML = `${MINUTES}:${SECONDS < 10 ? "0" : ""}${SECONDS}`;
  }
}, 1000);
