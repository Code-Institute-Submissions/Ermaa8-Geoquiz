// Selected DOM elements
const heading = document.querySelector("tite-container");
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit-btn");
const continueBtn = infoBox.querySelector(".buttons .restart-btn");
const quizBox = document.querySelector(".quiz-box");
const timeCount = document.querySelector(".timer .timer-sec");
const timeLineElement = document.querySelector("header .time-line");
const question = document.getElementById("question");
const answerOptions = document.querySelector(".answer-options");
const resultBox = document.querySelector(".result-box");
const restartBtn = resultBox.querySelector(".buttons .quit-btn");
const quitBtn = resultBox.querySelector(".buttons .quit-btn");
const pageFooter = document.querySelector(".page-footer");

// Variables for quiz state
let time = 10; //Initial time for each question
let timeInterval; // Interval for the timer countdown
let timerLine; // Interval for the timer line animation
let currentQuestionIndex = 0; // Index of the current question
let correctScore = 0; // Number of correctly answered questions
let incorrectScore = 0; // Number of incorrectly answered questions

// START BUTTON

//Event handler for the start button click
startBtn.onclick = () => {
    try {
        questions = shuffle(questions); //Shuffle the questions
        heading.classList.add("hide"); //Hide the heading element
        pageFooter.classList.add("hide");
        infoBox.classList.add("activeInfo"); //Show the information box
    } catch (error) {
        alert("Oops! Try again later!");
    }
};

//INFO BOX

//Event handler for the exit button click
exitBtn.onclick = () => {
    infoBox.classList.remove("activeInfo");
    heading.classList.remove("hide");
    pageFooter.classList.remove("hide");
};

//Event handler for the continue button click
continueBtn.onclick = () => {
    infoBox.classList.remove("activeInfo"); //Hide Info box
    quizBox.classList.add("activeQuiz"); //Show Quiz box
    showQuestions(); //Display Questions
    startTimer(); //Start Timer countdown
    startTimerLine(); //Start Timer Line
};

//QUIZ BOX

/**
 * Shuffles the order of elements in an array
 * Using the Fisher-Yates shuffle algorithm. 
 */
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

// Array passing the questions, answer options and setting the correct answer 
let questions = [
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
                {text: "Asia", correct: false },
                {text: "Europe", correct: false },
                {text: "Australia", correct: false },
                {text: "Africa", correct: true },
            ],
    },
];

/**
 * Displays the current question and its answer options to the user.
 * Updates the question number and displays the question text.
 * Shuffles answer options and displays them as buttons.
 * Sets event listeners for answer buttons to handle user selection.
 */
function showQuestions() {
    resetState(); // Remove the previous answer options

    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;

    question.innerHTML = questionNumber + "." + currentQuestion.question;
    document.getElementById("current-question").textContent = questionNumber; //Update the current question number in the span
    currentQuestion .answers.forEach((answer) => {
        let button =document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        answerOptions.appendChild(button);
        //Set a data attribute for the correct answer 
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

/**
 * Function to remove the previiously displayed answer options from the DOM.
 * It removes all child elements of the 'answerOptions' element until none remain
 */
function resetState() {
    while (answerOptions.firstChild) {
        answerOptions.removeChild(answerOptions.firstChild);
    }
}

/**
 * Starts the timer for each question.
 * Updates the timer display every second.
 * Increments the incorrect score if time runs out without an answer.
 * Moves to the tnext question or shows the Result box.
 */
function startTimer() {
    time = 10;
    timeCount.textContent = time; //Upadate the timer display initially
    clearInterval(timerInterval); //Clear any existing interval, prevent overlapping timers
    timerInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(timerInterval); //Stop the timer if time reaches 0
            incorrectScore = incorrectScore + 1; // Incrementing incorrect score if no answer is selected
            document.getElementById("incorrect-score").textContent = incorrectScore;

            if (currentQuestionIndex < question.length - 1) {
                currentQuestionIndex++;
                showQuestions();
                startTimer();
                startTimerLine();
            } else {
                showResult();
            }
        } else {
            time--; //Decrement the time if it's greater than 0
            timeCount.textContent = time; //Update the timer display
        }

    }, 1000); //Repeat every 1 second (1000 miliseconds)
}

/**
 * Initializes the timer line and updates its width until reaching 100% or when an answer is selected.
 * Stops the timer when the width reaches 100% or when an answer is selected
 */
function startTimerLine() {
    let time = 0;
    clearInterval(timerLine);
    timerLine = setInterval(timer, 100);
    //Increments the time by 1 on each interval, updated the width of the time line element
    function timer() {
        time +=1;
        timeLineElement.computedStyleMap.width = time + "%";

        if (time >= 100) {
            clearInterval(timerLine);
        }
    }
}

/**
 * Displays the current question and its answer options to the user.
 * Updates the question number and displays the question text.
 * Shuffles answer options and displays them as buttons.
 * Sets event listeners for answer buttons to handle user selection.
 */
function selectAnswer(e) {
    let selectBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";

    clearInterval(timerInterval); //Stop the timer when any answer buttons are clicked
    clearInterval(timerLine); //Stop the timer line when any answer buttons are clicked'

    // Add appropriate classes and uppdate scores based on correctness of the selected answer
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctScore++;
        document.getElementById("correct-score").textContent =correctScore;
    }else {
        selectedBtn.classList.add("incorrect");
        selectedBtn.classList.add("apply-shake"); //Add shake animation class to incorrect answer button
        incorrectScore++;
        document.getElementById("incorrect-score").textContent = incorrectScore:
    }
    //Disable all answer buttons and highlight the correct one
    Array.from(answerOptions.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    setTimeout(showNextQuestion, 1500); //Show next question after 1,5sec
}
/**
 * Display the next question or show the result if all questions have been answered.
 */
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        showQuestions();
        startTimer();
        startTimerLine();
    } else {
        // If there are no more questions remaining, show the result box
        showResult();
    }
}

// RESULT BOX

/**
 * Displays the result of the quiz to the user.
 * Removes the activeInfo class from infoBox and activeQuiz class from quizBox.
 * Adds the activeResult class to resultBox to display the result.
 * Determines the score message based on the number of correct answers.
 * Updates the final score element with the score message.
 */
function showResult() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add(activeResult);

let finalScoreElement = resultBox.querySelector(".final-score");
let scoreMessage;
// Determine the score message based on the number of correct answers
if (correctScore <= 4) {
    scoreMessage = '<span>You mushed<div>' + correctScore + 'out of' + questions.length + '</div><div>Ohh! You need more practice!</div><span>';
} else if (correctScore >= 6 && correctScore <= 8) {
    scoreMessage = '<span>You mushed<div>' + correctScore + 'out of' + questions.length + '</div><div>Good Job! <br> Just a little bit more now!</div><span>';
}else if (correctScore >= 6 && correctScore <= 12) {
    scoreMessage = '<span>You mushed<div>' + correctScore + 'out of' + questions.length + '</div><div>AWESOME! <br> You know geography well!</div><span>';
}
finalScoreElement.innerHTML = scoreMessage;
}

// Event listener for the Quit quiz button, reloads the window to restart the quiz upon click
quitBtn.onclick = () => {
    window.location.reload();
};

//Event listener for the Play again button
restartBtn.onclick = () => {
    // Remove the result box and show the quiz box
    resultBox.classList.remove("activeResult");
    quizBox.classList.add("activeQuiz");
    // Reset question index and scores
    currentQuestionIndex = 0;
    currentScore = 0;
    incorrectScore = 0;
    // Display the first question and start the timer and timer line
    showQuestions();
    startTimer();
    startTimerLine();
};