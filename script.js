const questions = [
    {
        question: "Kiedy był chrzest Polski?",
        answers: ["966", "972", "999"],
        correctAnswers: [1],
    },
    {
        question: "Kiedy odbyła się Bitwa pod Grunwaldem?",
        answers: ["1410", "1320", "1420"],
        correctAnswers: [1],
    },
    {
        question: "Kiedy odbyła się koronacja Bolesław Chrobrego?",
        answers: ["1020", "1015", "1025"],
        correctAnswers: [3],
    },
    {
        question: "Kiedy zmarł Bolesław Chrobrego?",
        answers: ["1030", "1026", "1025"],
        correctAnswers: [3],
    },
    {
        question: "Kiedy odbyła się Bitwa pod Kłuszynem?",
        answers: ["1620", "1615", "1610"],
        correctAnswers: [3],
    },
    {
        question: "Kto był pierwszym królem Polski?",
        answers: ["Bolesław Chrobry", "Mieszko I", "Bolesław Krzywousty"],
        correctAnswers: [1],
    },
];

let currentQuestionIndex = 0;
let totalPoints = 10;

const questionElement = document.getElementById("question");
const answerElements = document.querySelectorAll(".answer");
const answersInputs = document.querySelectorAll(".points");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const resultElement = document.getElementById("result");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    answerElements.forEach((element, index) => {
        const answerText = element.querySelector(".answer-text");
        const answerInput = element.querySelector(".points");

        answerText.textContent = currentQuestion.answers[index];
        answerInput.value = 0;
        answerInput.max = totalPoints;
    });

    resultElement.textContent = "";
}

function calculatePoints() {
    const currentQuestion = questions[currentQuestionIndex];
    let pointsUsed = 0;
    let pointsScored = 0;

    answersInputs.forEach((input, index) => {
        const value = parseInt(input.value) || 0;
        pointsUsed += value;
        if (currentQuestion.correctAnswers.includes(index + 1)) {
            pointsScored += value;
        }
    });

    if (pointsUsed > totalPoints) {
        resultElement.textContent = "Rozdysponowano zbyt dużo punktów!";
        return false;
    }

    if (pointsUsed < totalPoints) {
        resultElement.textContent = "Musisz rozdysponować dokładnie wszystkie punkty!";
        return false;
    }

    totalPoints = pointsScored;
    return true;
}

submitButton.addEventListener("click", () => {
    if (!calculatePoints()) return;

    if (totalPoints === 0) {
        questionElement.textContent = "Koniec gry!";
        submitButton.disabled = true;
        resultElement.textContent = "Przegrałeś, uzyskałeś 0 punktów.";
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionElement.textContent = "Koniec gry!";
        submitButton.disabled = true;
        resultElement.textContent = `Zdobyłeś ${totalPoints} punktów. Gratulacje!`;
    }

    scoreElement.textContent = `Twoje punkty: ${totalPoints}`;
});


loadQuestion();