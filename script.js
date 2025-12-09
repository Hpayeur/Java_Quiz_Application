const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.6);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What Is JavaScript?",
    answers: [
      { text: " interpreted programming language", correct: true },
      { text: "Cascading Style Sheets", correct: false },
      { text: " The Standard Language", correct: false },
      { text: "Platform-Independent", correct: false },
    ],
  },
  {
    question: "What Company created JavaScript?",
    answers: [
      { text: "Google", correct: false },
      { text: "Microsoft", correct: false },
      { text: "Steam", correct: false },
      { text: "Netscape", correct: true },
    ],
  },
  {
    question: "How Many years has JavaScript been around?",
    answers: [
      { text: "15 Years", correct: false },
      { text: "50 Years", correct: false },
      { text: "30 Years", correct: true },
      { text: "100 Years", correct: false },
    ],
  },
  {
    question: "Who Created JavaScript?",
    answers: [
      { text: "Brendan Eich", correct: true },
      { text: "Jeff Bezos", correct: false },
      { text: "Kim Kardashian", correct: false },
      { text: "Larry Page", correct: false },
    ],
  },
  {
    question: "Is Software Development fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "Yes!!", correct: true },
      { text: "Not at All", correct: false },
      { text: "I don't Know", correct: false },
    ],
  },
  {
    question: "Is Software Development fun?",
    answers: [
      { text: "$330,000 to $556,000", correct: false },
      { text: "$322,000 to $373,000", correct: false },
      { text: "$56,000 to $183,000", correct: false },
      { text: "$103,000 to $132,000", correct: true },
    ],
  },
];
