var questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", ];
var answers = ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5", "Answer 6", ];
var questionNum = 0;
var start = false;


function nextQuestion () {


};

function displayAnswer() {
	var textfd = document.getElementById("answerInput");

	document.getElementById("userAnswer").innerHTML = textfd.value;
	document.getElementById("realAnswer").innerHTML = answers[questionNum];

};

function startQuiz() {
	var quizfield = document.getElementById("quizfield");

	document.getElementById("question").innerHTML = questions[questionNum];

	document.getElementById("questionNum").innerHTML = "Question " + (questionNum + 1);

	quizfield.style.opacity = 1;


};

function checkCookies () {


};

function saveCookies () {


};