// Selected DOM elements
const heading = document.querySelector("tite-cntainer");
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
letincorrectScore = 0; // Number of incorrectly answered questions

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

 /** */

