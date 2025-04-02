const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let questions = []; // To store fetched questions
let currentQuestionIndex = 0;
let score = 0;

// Fetch questions from external JSON file
async function fetchQuestions() {
    try {
        const response = await fetch("questions.json");
        questions = await response.json();
        loadQuestion(); // Start quiz after loading questions
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

function loadQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
        answersContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answersContainer.innerHTML = "";
}

function selectAnswer(selectedButton, correctAnswer) {
    const isCorrect = selectedButton.textContent === correctAnswer;

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    document.querySelectorAll(".answer-btn").forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz").classList.add("hide");
    resultContainer.classList.remove("hide");
    scoreText.textContent = `Your score: ${score} / ${questions.length}`;
}

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hide");
    document.getElementById("quiz").classList.remove("hide");
    loadQuestion();
});

// Start the quiz by fetching questions
fetchQuestions();
