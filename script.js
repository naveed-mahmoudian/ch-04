// Variables & DOM elements
var startContainer = document.querySelector('.start-container');
var startQuizBtn = document.querySelector('.start-btn');
var quizContainer = document.querySelector('.quiz-container');
var gameOverContainer = document.querySelector('.game-over-container');
var highScoreContainer = document.querySelector('.high-score-container');
var highScoreBtn = document.querySelector('.high-score-btn');
var myQuestions = [
    {
        question: "This is question id 1?",
        answers: {
            1: "Answer a",
            2: "Answer b",
            3: "Answer c",
            4: "Answer d",
        },
        correctAnswer: 4,
        questionID: 1
    },
    {
        question: "This is question id 2?",
        answers: {
            1: "Answer a",
            2: "Answer b",
            3: "Answer c",
            4: "Answer d",
        },
        correctAnswer: 4,
        questionID: 2
    },
    {
        question: "This is question id 3?",
        answers: {
            1: "Answer a",
            2: "Answer b",
            3: "Answer c",
            4: "Answer d",
        },
        correctAnswer: 4,
        questionID: 3
    },
]
var askedQuestions = [];
var questionsToAsk = [];
var randomQuestion;
var correctAnswers = 0;
var userScoreName = "";

startQuizBtn.addEventListener('click', startQuiz);
init();

function startQuiz() {
    startContainer.setAttribute('style', 'display: none');
    quizContainer.setAttribute('style', 'display: flex');
    correctAnswers = 0;
    getRandomQuestion();
    createQuestion();
}

function init() {
    for (i = 0; i < myQuestions.length; i++) {
    questionsToAsk.push(myQuestions[i].questionID);
    }
}

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

function createQuestion() {
     var question = document.createElement('h2')
     question.innerText = randomQuestion.question;
     quizContainer.appendChild(question);

     var answerList = document.createElement('ol');
     quizContainer.appendChild(answerList);

     for (i = 1; i <= Object.values(randomQuestion.answers).length; i++) {
        if (Object.keys(randomQuestion.answers).find(correctAnswer => i === randomQuestion.correctAnswer)) {
            var answer = document.createElement('li');
            answer.innerHTML = "<button class='ans-btn' id='correct'>" + randomQuestion.answers[i] + "</button>"
            answerList.appendChild(answer);
            answer.addEventListener('click', checkAnswer)
        } else {
            var answer = document.createElement('li');
            answer.innerHTML = "<button class=ans-btn>" + randomQuestion.answers[i] + "</button>"
            answerList.appendChild(answer);
            answer.addEventListener('click', checkAnswer)
        }
     }
}

function checkAnswer(event) {
    var selectedAnswer = event.target;
    var correct = selectedAnswer.getAttribute('id')
    if (correct) {
        correctAnswers++;
        resetQuestion();
        getRandomQuestion();
        createQuestion();
    } else {
        resetQuestion();
        getRandomQuestion();
        createQuestion();
    }
}

function resetQuestion() {
    for (i = 0; i <= quizContainer.childElementCount; i++)
    quizContainer.lastElementChild.remove();
}

function gameOver() {
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

    function submitScore(event) {
        event.preventDefault();
        userScoreName = nameInput.value;
        console.log(userScoreName);
        console.log(correctAnswers);
    }
}