const startBtn = document.getElementById('start-btn');
const infoModal = document.getElementById('info-list');
const quizContainer = document.getElementById('quiz-container');
const gameOverModal = document.getElementById('gameover');
const optionButtonList = document.querySelectorAll('button.answer-btn');
const questionList = [
    {

        question: "What's the longest river in the world?",

        answers: [
            { text: "The River Nile", correct: true },
            { text: "The River Una", correct: false },
            { text: "Yellow River", correct: false },
            { text: "Amazon river", correct: false },
        ],
    },
    {
        question: "How many US states are there?",
        answers: [
            { text: "40", correct: false },
            { text: "30", correct: false },
            { text: "50", correct: true },
            { text: "55", correct: false },
        ],
    },
    {
        question: "Where are the Great Pyramids of Giza located?",
        answers: [
            { text: "Tunisia", correct: false },
            { text: "Marocco", correct: false },
            { text: "Egypt", correct: true },
            { text: "Jordan", correct: false },
        ],
    },
    {
        question: "What is the largest country by area in the world?",
        answers: [
            { text: "Denmark", correct: false },
            { text: "Russia", correct: true },
            { text: "Sweden", correct: false },
            { text: "China", correct: false },
        ],
    },
    {
        question: "What is the capital city of Bosnia and Herzegovina?",
        answers: [
            { text: "Mostar", correct: false },
            { text: "Banja-Luka", correct: false },
            { text: "Sarajevo", correct: true },
            { text: "Tuzla", correct: false },
        ],
    },
    {
        question: "What is the longest above water mountain range in the world?",
        answers: [
            { text: "The Andes", correct: true },
            { text: "Himalaya", correct: false },
            { text: "Alps", correct: false },
            { text: "Alaska Range", correct: false },
        ],
    },
    {
        question: "What is the closest planet to Earth?",
        answers: [
            { text: "Venera", correct: false },
            { text: "Venus", correct: true },
            { text: "Moon", correct: false },
            { text: "Neptun", correct: false },
        ],
    },
    {
        question: "What type of leaf is on the Canadian flag?",
        answers: [
            { text: "A linden leaf", correct: false },
            { text: "A Poplar leaf", correct: false },
            { text: "A Maple leaf", correct: true },
            { text: "A Lilac leaf", correct: false },
        ],
    },
    {
        question: "What is the smallest country in the world by population?",
        answers: [
            { text: "Monacco", correct: false },
            { text: "The Vatican City", correct: true },
            { text: "Luxembourg", correct: false },
            { text: "Spain", correct: false },
        ],
    },
    {
        question: "Which country has the largest population?",
        answers: [
            { text: "Sweden", correct: false },
            { text: "Spain", correct: false },
            { text: "China", correct: true },
            { text: "India", correct: false },
        ],
    },
    {
        question: "Where is the Eiffel Tower located?",
        answers: [
            { text: "Malmö", correct: false },
            { text: "Paris", correct: true },
            { text: "Barcelona", correct: false },
            { text: "Venice", correct: false },
        ],
    },
    {
        question: "In which continent is Nigeria located?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Europe", correct: false },
            { text: "Australia", correct: false },
            { text: "Africa", correct: true },
        ],
    },
];

let quizQuestions = questionList;
let currentQuestionIndex = 0;
const maxQuestions = 5;
let currentQuestion = null;
let currentScore = 0;
let currentIncorrectScore = 0;
let answerBlocked = false;
let timer = null;
let maxSeconds = 25;
startBtn.addEventListener('click', startQuiz);
optionButtonList.forEach(button => {
    button.addEventListener('click', checkAnswer);
});
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;


    //While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        //And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;

}

function gameOver(){
    document.getElementById('correct-score-final').innerText = currentScore;
    document.getElementById('incorrect-score-final').innerText = currentIncorrectScore;
    quizContainer.classList.add('hidden');
    gameOverModal.classList.remove('hidden');
}

function getNextQuestion() {
    if (currentQuestionIndex < maxQuestions) {
        currentQuestion = quizQuestions[currentQuestionIndex];
        currentQuestionIndex = currentQuestionIndex + 1
    } else {
        gameOver()
    }
}
function displayQuestion(question) {
    document.getElementById('question').innerText = question.question;
    document.getElementById('option1').innerText = question.answers[0].text;
    document.getElementById('option2').innerText = question.answers[1].text;
    document.getElementById('option3').innerText = question.answers[2].text;
    document.getElementById('option4').innerText = question.answers[3].text;
}
function runTimer(){
    timer = setInterval(function(){
        if (maxSeconds > 0){
            maxSeconds = maxSeconds - 1;
            document.getElementById('timer').innerText = maxSeconds;
            document.getElementById('timer-final').innerText = maxSeconds;
        }else{
            gameOver();
        }
    }, 1000);
}
function startQuiz() {
    shuffle(quizQuestions);
    infoModal.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    getNextQuestion();
    displayQuestion(currentQuestion);
    runTimer();
}

function checkAnswer(event) {
    if (answerBlocked === false){
        answerBlocked = true;
        const clickedButton = event.target;
        const selectedAnswerIndex = parseInt(clickedButton.getAttribute('data-index'));
        const selectedAnswer = currentQuestion.answers[selectedAnswerIndex];
        if (selectedAnswer.correct === true) {
            currentScore = currentScore + 1;
            clickedButton.classList.add('green');
        } else {
            currentIncorrectScore = currentIncorrectScore + 1;
            clickedButton.classList.add('red');
        }
        document.getElementById('correct-score').innerText = currentScore;
        document.getElementById('incorrect-score').innerText = currentIncorrectScore;
        setTimeout(() => {
            clickedButton.classList.remove('green');
            clickedButton.classList.remove('red');
            getNextQuestion();
            displayQuestion(currentQuestion);
            answerBlocked = false;
        }, 2000);
    }
}