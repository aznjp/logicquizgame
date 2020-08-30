//Questions Array used to fill in the question container div

var questions = [{
    question: "Which of the following is not a commonly used data type?",
    answers: ["Alerts", "Strings", "Booleans", "Numbers"],
    correctAnswer: "Booleans"

}, {
    question: "What can arrays in JavaScript can be used to store?",
    answers: ["Booleans", "Numbers and strings", "Other arrays", "All of the above"],
    correctAnswer: "All of the above"

}, {
    question: "How do you enclose the condition of an ' if ' statement?",
    answers: ["Quotes", "Square brackets", "Curly brackets", "Any of the above"],
    correctAnswer: "Curly brackets"

}, {
    question: "What is a very useful tool for debugging and printing content to the debugger?",
    answers: ["Console.log", "For loops", "CSS", "Terminal/Bash"],
    correctAnswer: "Console.log"

}, {
    question: "What does DOM stand for?",
    answers: ["Do Over Mulligan", "Document Object Model", "Data Object Model", "Document Option Model"],
    correctAnswer: "Document Object Model"
}];

// These DOM elements are placed here in the case they are needed at any point in the code for updates
var timerEl = document.getElementById("time");
var timeclockEl = document.getElementById("timeclock")

var startButton = document.getElementById('start-btn')
var questionContainerEl = document.getElementById('question-container')
var welcomePageEl = document.getElementById('welcome-page')
var endGameEl = document.getElementById('end-page')
var displayEl = document.getElementById('display')
var displayEl2 = document.getElementById('display2')



//Puts the first value of the question array position as 0
let questionCounter = 0;
//Adjusts the timer based on the actual number of questions in the array
let timeLeft = questions.length * 15;
var timerInterval;


/* These constants are used to link each individual answer to each individual button div 
they will eventualy be filled by the createQuestionElement function down below and links them to the positions in the array*/
const answer1 = document.getElementById("btn1");
const answer2 = document.getElementById("btn2");
const answer3 = document.getElementById("btn3");
const answer4 = document.getElementById("btn4");



function startGame() {
    // The start button elements and the inital paragraph that will introduce you to the game is put to display none
    startButton.classList.add('hide')
    welcomePageEl.classList.add('hide')

    // This container is revealed thus allowing for the quiz to start
    questionContainerEl.classList.remove('hide')

    //This will start the timer along with the other start DOM element changes (in intervals of 1sec = 1000ms)
    timerInterval = setInterval(countDown, 1000);

    /* Once these are all implemented it will start filling in the question-container div below welcomePage div 
    which will be revealed from earlier DOM code */
    createQuestionElement();
}

function createQuestionElement() {

    var currentQuestion = questions[questionCounter]
    question.textContent = currentQuestion.question;

    answer1.textContent = currentQuestion.answers[0]
    answer2.textContent = currentQuestion.answers[1]
    answer3.textContent = currentQuestion.answers[2]
    answer4.textContent = currentQuestion.answers[3]
}


function checkAnswer() {
    /* Variables were added to link both the correct answer from the array and the event (the click to each button box) 
    so that it will trigger the if-else statement down below thus indicating whether the answer was correct or not */
    var correctAnswer = questions[questionCounter].correctAnswer
    var currentAnswer = event.target.textContent

    // These were used to remove hide class thus showing both boxes quickly before they are hidden again
    displayEl.classList.remove('hide')
    displayEl2.classList.remove('hide')

    /* if the question was correct then the opposite revealed box is removed (i.e if it was wrong then the correct box is hidden and 
    the correct div is filled with new text-content and vice versa)*/
    if (currentAnswer === correctAnswer) {
        displayEl2.classList.add('hide')
        displayEl.textContent = "-----------Correct!-----------"
    } else {
        displayEl.classList.add('hide')
        displayEl2.textContent = "-----------Wrong!-----------"

        // The timeLeft let variable is then reduced by 15 seconds once it is considered wrong
        timeLeft -= 15;
    }

    //This adds the next position into the array as it is iterating through it and thus filling in new questions and answers into the question container
    questionCounter++;


    // Console.log was added to check how the timeLeft was removing time when they gave an incorrect answer
    console.log(timeLeft)

    // This console log is to check which index number the questionCounter is at during each iteration of the questions and answers
    console.log(questionCounter)

    /* This if-else statement was added to apply the endGame function in the occurence that 
    there are no more questions left in the array OR if the timeLeft variable is less than or equal to 0
    otherwise the function would be stuck at the last question*/
    if (questionCounter === questions.length || timeLeft <= 0) {
        endGame();
    } else {
        createQuestionElement();
    }

}

function endGame() {
    // To prevent any negative time values (i.e. negative score values) this was put into place to automatically make them into the value 0
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    // This will stop the clock (note there is a small delay for the clock function so the final score revealed may be 1 second off from the stopped clock)
    clearInterval(timerInterval);


    // Question container div is now hidden and the endGame div is reveal thus revealing the final score and revealing input field to place initials
    questionContainerEl.setAttribute("class", "hide")
    endGameEl.removeAttribute("class")

    //Hide the timer at the top right
    timeclockEl.setAttribute("class", "hide")
    scoreEl.textContent = "Your final score is " + timeLeft;
}

// Timer countdown from the timeLeft variable stated at the top and if it reaches a value of zero or below then the timer will execute the endGame function listed above
function countDown() {

    if (timeLeft > 0) {
        timerEl.textContent = timeLeft;
        //This is required to update the value into the timer in top right as they are counting down
        timeLeft--;
    } else {
        timerEl.textContent = timeLeft;
        endGame();
    }
}


//This is to add the click event listener to the start button at the beginning of the quiz thus triggering the start function
startButton.addEventListener('click', startGame)

/*This is to add the click event listener to the each of the individual slots we put into the index html file which will then trigger the function to check the answer 
and explain whether the answer was correct or not and if incorrect the time will be reduced by 1000 seconds*/
answer1.addEventListener("click", checkAnswer)
answer2.addEventListener("click", checkAnswer)
answer3.addEventListener("click", checkAnswer)
answer4.addEventListener("click", checkAnswer)