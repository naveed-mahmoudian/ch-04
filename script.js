// Variables & DOM elements
var startContainer = document.querySelector('.start-container');
var startQuizBtn = document.querySelector('.start-btn');
var quizContainer = document.querySelector('.quiz-container');
var gameOverContainer = document.querySelector('.game-over-container');
var highScoreContainer = document.querySelector('.high-score-container');
var highScoreBtn = document.querySelector('.high-score-btn');
var timeLeftText = document.querySelector('.time-left-text');
// List of editable questions
var myQuestions = [
    {
        question: "JavaScript code can be placed in which HTML element?",
        answers: {
            1: "Within the JAVASCRIPT tag",
            2: "Within the JS tag",
            3: "Within the SCRIPT tag",
            4: "None of the above",
        },
        correctAnswer: 3,
        questionID: 1
    },
    {
        question: "How would you display 'Hello World' in an alert to the user?",
        answers: {
            1: "alertBox('Hello World');",
            2: "alert('Hello World');",
            3: "message('Hello World');",
            4: "msgBox('Hello World');",
        },
        correctAnswer: 2,
        questionID: 2
    },
    {
        question: "How would you CREATE a function in JavaScript?",
        answers: {
            1: "function myFunction()",
            2: "function = myFunction()",
            3: "function: myFunction()",
            4: "myFunction()",
        },
        correctAnswer: 1,
        questionID: 3
    },
    {
        question: "How would you CALL a function in JavaScript?",
        answers: {
            1: "function myFunction()",
            2: "function = myFunction()",
            3: "function: myFunction()",
            4: "myFunction()",
        },
        correctAnswer: 4,
        questionID: 4
    },
    {
        question: "How do you correctly structure a for loop?",
        answers: {
            1: "for (i = 0; i < 3)",
            2: "for (i < 3; i++)",
            3: "for (i = 0; i <= 3; i++)",
            4: "for (i = 0; i < 3; i = 3)",
        },
        correctAnswer: 3,
        questionID: 5
    },
    {
        question: "How do add a single line comment in JavaScript?",
        answers: {
            1: "// Comment here",
            2: "$(Comment Here)",
            3: "/* Comment here */",
            4: "`Comment here`",
        },
        correctAnswer: 1,
        questionID: 6
    },
    {
        question: "How do add a block comment in JavaScript?",
        answers: {
            1: "// Comment here",
            2: "$(Comment Here)",
            3: "/* Comment here */",
            4: "`Comment here`",
        },
        correctAnswer: 3,
        questionID: 7
    },
    {
        question: "Which of the following is the correct way to write a JavaScript array?",
        answers: {
            1: "var nums = 1, 2, 3;",
            2: "var nums = [1, 2, 3];",
            3: "var nums = [1: '1', 2: '2', 3: '3'];",
            4: "var nums = (1, 2, 3);",
        },
        correctAnswer: 2,
        questionID: 8
    },
    {
        question: "Which of the following is the correct way to add a JavaScript event listener for when a user clicks a button?",
        answers: {
            1: "button.eventListener('click', clickFunction);",
            2: "button.addEventListener('click', clickFunction);",
            3: "button.addEventListener('onClick');",
            4: "button.eventListener('onClick');",
        },
        correctAnswer: 2,
        questionID: 9
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: {
            1: "v myVariable;",
            2: "variable myVariable;",
            3: "myVariable = var;",
            4: "var myVariable;",
        },
        correctAnswer: 4,
        questionID: 10
    },
    {
        question: "How would you round 9.25 to the nearest integer in JavaScript?",
        answers: {
            1: "Math.round(9.25)",
            2: "Math.rnd(9.25)",
            3: "rnd(9.25)",
            4: "round(9.25)",
        },
        correctAnswer: 1,
        questionID: 11
    },
    {
        question: "What symbol would you use to compare type AND value?",
        answers: {
            1: "!=",
            2: "=",
            3: "==",
            4: "===",
        },
        correctAnswer: 4,
        questionID: 12
    },
];
var askedQuestions = [];
var questionsToAsk = [];
var randomQuestion;
var correctAnswers = 0;
var userScoreName = "";
var timeLeft;
var highScoreInfo = [];
// Audio elements
var correctAudio = new Audio('./sounds/correct-answer.mp3');
var wrongAudio = new Audio('./sounds/wrong-answer.mp3');

// Event listeners and initialization function
startQuizBtn.addEventListener('click', startQuiz);
highScoreBtn.addEventListener('click', showHighScores);
init();

// Grabs everything stored in local stroage and puts holds them in highScoreInfo[] for later use
function init() {
    var initStorage = JSON.parse(localStorage.getItem('highScoreStorage'));
    if (initStorage != null){
    for (i = 0; i < initStorage.length; i++) {
        highScoreInfo.push(initStorage[i]);
        }
    }
}

// Starts the quiz
function startQuiz() {
    startContainer.setAttribute('style', 'display: none');
    quizContainer.setAttribute('style', 'display: flex');

    askedQuestions = [];
    questionsToAsk = [];
    for (i = 0; i < myQuestions.length; i++) {
        questionsToAsk.push(myQuestions[i].questionID);
        }

    correctAnswers = 0;
    resetQuestion();
    getRandomQuestion();
    createQuestion();

    timeLeft = 75;
    timeLeftText.textContent = timeLeft;
    gameTimer = setInterval(timer, 1000);

    highScoreBtn.removeEventListener('click', showHighScores);
    highScoreTimeLeft = 0;
}

// Gets a random question from the editable list of available questions
function getRandomQuestion() {
    var randomIndex = Math.floor(Math.random() * myQuestions.length);
    randomQuestion = myQuestions[randomIndex];

    if (askedQuestions.includes(randomQuestion.questionID)){
        if (questionsToAsk.length === 0) {
            gameOver();
        } else {
            getRandomQuestion();
        }
    } else {
        askedQuestions.push(randomQuestion.questionID);
        questionToRemove = questionsToAsk.indexOf(randomQuestion.questionID);
        questionsToAsk.splice(questionToRemove, 1);
    }
}

// Takes the randomly selected question and displays to the user
function createQuestion() {
     var question = document.createElement('h2');
     question.innerText = randomQuestion.question;
     quizContainer.appendChild(question);

     var answerList = document.createElement('ol');
     quizContainer.appendChild(answerList);

     for (i = 1; i <= Object.values(randomQuestion.answers).length; i++) {
        if (Object.keys(randomQuestion.answers).find(correctAnswer => i === randomQuestion.correctAnswer)) {
            var answer = document.createElement('li');
            answer.innerHTML = "<button class='ans-btn' id='correct'>" + randomQuestion.answers[i] + "</button>";
            answerList.appendChild(answer);
            answer.addEventListener('click', checkAnswer);
        } else {
            var answer = document.createElement('li');
            answer.innerHTML = "<button class=ans-btn>" + randomQuestion.answers[i] + "</button>";
            answerList.appendChild(answer);
            answer.addEventListener('click', checkAnswer);
        }
     }
}

// Checks to see if the answer the user clicked on is correct or wrong
function checkAnswer(event) {
    var selectedAnswer = event.target;
    var correct = selectedAnswer.getAttribute('id');
    if (correct) {
        correctAnswers++;
        resetQuestion();
        getRandomQuestion();
        createQuestion();
        correctAudio.play();
    } else {
        timeLeft = timeLeft - 10;
        if (timeLeft <= 0) {
            timeLeft = 0;
        }
        resetQuestion();
        getRandomQuestion();
        createQuestion();
        wrongAudio.play();
    }
}

// Removes the just answered question from display
function resetQuestion() {
    if (quizContainer.childElementCount !== 0) {
    for (i = 0; i <= quizContainer.childElementCount; i++)
        quizContainer.lastElementChild.remove();
    }
}

// Handles displaying the game over screen and what to when you press the submit button
function gameOver() {
    clearInterval(gameTimer);
    quizContainer.setAttribute('style', 'display: none');
    gameOverContainer.setAttribute('style', 'display: flex');

    var gameOverHeader = document.createElement('h2');
    gameOverHeader.innerText = "GAME OVER";
    gameOverContainer.appendChild(gameOverHeader);

    var form = document.createElement('form');
    form.setAttribute('action', '#');
    gameOverContainer.appendChild(form);

    var nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'name');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('placeholder', 'Enter your name...');
    form.appendChild(nameInput);

    var submitScoreBtn = document.createElement('button');
    submitScoreBtn.textContent = "Sumbit";
    form.appendChild(submitScoreBtn);
    submitScoreBtn.addEventListener('click', submitScore);

    var userScore = document.createElement('h3');
    userScore.innerText = "Your Score: " + correctAnswers;
    gameOverContainer.appendChild(userScore);

    var userTimeScore = document.createElement('h3');
    if (timeLeft <= 0) {
        timeLeft = 0;
        timeLeftText.textContent = "00";
    }
    userTimeScore.innerText = "Time Remaining: " + timeLeft + " seconds";
    gameOverContainer.appendChild(userTimeScore);

    function submitScore(event) {
        event.preventDefault();
        userScoreName = nameInput.value;

        if (userScoreName.length < 2) {
            alert("Name must be at least 2 characters long!");
        } else {
            highScoreInfo.push({name: userScoreName, score: correctAnswers, highScoreTime: timeLeft});
            localStorage.setItem('highScoreStorage', JSON.stringify(highScoreInfo));
    
            gameOverContainer.removeChild(gameOverHeader);
            gameOverContainer.removeChild(form);
            gameOverContainer.removeChild(userScore);
            gameOverContainer.removeChild(userTimeScore);
    
            showHighScores();
        }
        
    }
}

// Game timer
function timer() {
    timeLeft--;
    timeLeftText.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(gameTimer);
        gameOver();
    }
}

// Sorts and displays the high score screen and what to do when user clicks back or clear high scores buttons
function showHighScores() {
    startContainer.setAttribute('style', 'display: none');
    gameOverContainer.setAttribute('style', 'display: none');
    highScoreContainer.setAttribute('style', 'display: flex');

    timeLeftText.textContent = "00";

    highScoreBtn.removeEventListener('click', showHighScores);

    var highScoreHeader = document.createElement('h1');
    highScoreHeader.innerText = "High Scores";
    highScoreContainer.appendChild(highScoreHeader);

    var highScoreList = document.createElement('ol');
    highScoreContainer.appendChild(highScoreList);

    var backBtn = document.createElement('button');
    backBtn.textContent = "Back";
    highScoreContainer.appendChild(backBtn);
    var clearScoresBtn = document.createElement('button');
    clearScoresBtn.textContent = "Clear High Scores";
    highScoreContainer.appendChild(clearScoresBtn);

    if (highScoreInfo.length > 0) {
    highScoreInfo.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScoreStorage', JSON.stringify(highScoreInfo));
    }

    for (i = 0; i < highScoreInfo.length; i++) {
        var highScoreItem = document.createElement('li');
        var highScoreStorage = localStorage.getItem('highScoreStorage');
        var highScoreParse = JSON.parse(highScoreStorage);
        highScoreItem.innerHTML = "<p>" + highScoreParse[i].name + " --- Score: " + highScoreParse[i].score + " --- Time Left: " + highScoreParse[i].highScoreTime + "s" + "<p>";
        highScoreList.appendChild(highScoreItem);   
        }

    backBtn.addEventListener('click', goBack);
    function goBack() {
        highScoreContainer.setAttribute('style', 'display: none');
        highScoreContainer.removeChild(highScoreHeader);
        highScoreContainer.removeChild(highScoreList);
        highScoreContainer.removeChild(backBtn);
        highScoreContainer.removeChild(clearScoresBtn);
        startContainer.setAttribute('style', 'display: flex');
        highScoreBtn.addEventListener('click', showHighScores);
    }

    clearScoresBtn.addEventListener('click', clearScores);
    function clearScores() {
        if (highScoreInfo.length === 0) {
            alert("No high scores to clear!");
        } else {
            var confirmClearScores = confirm("Are you sure you want to clear ALL high scores?")
            if (confirmClearScores) {
                localStorage.removeItem('highScoreStorage')
                highScoreInfo = [];
                goBack();
                init();
            }
        } 
    }
}