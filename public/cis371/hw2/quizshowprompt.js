/* The Javascript for the Quiz assignment: by thomas verstraete */

var questions = ["What is the name of the pink Monster Truck that is a two time Monster Jam Winner?"
,"Who was the Egyptian Pharaoh who introduced monotheism to his people?"
,"What is the name of Meijer's brand of cola?"
,"What role did Yul Brynner play in The Ten Commandments?"
,"Who was the walrus?"
,"John Foggerty was sued for sounding too much like whom?"
,"The original Hemi 'Cuda was only available in what color?"
,"What was the name of Lieutenant Commander Data's cat?"
,"In the original D&D, the characteristics of each player is strength, constitution, dexterity, intelligence, wisdom, and what?"
,"What animal poops square poops?"
,"What viral infectious disease with the scientific name nasopharyngitis is known to have over 200 strains?"
,"What is the champagne of beers?"
,"Who is the 'fastests guitars players in the worlds'?"
,"My wife's theme song, when drinking, is the Eric Clapton's 1970's version of…?"
,"The only Gibb to have a solo career is which Gibb?"
,"Shawshank Redemption is based on a short story written by whom?"
,"Attila the Hum was unable to overtake what empire?"
,"The earliest art in the form of cave paintings is found in what modern country?"
,"According to Kip Dynamite, who goes to college?"
,"How many layers are there for Napoleon's tomb?"
,"What is the recommended daily caloric intake of the average male based on US standards?"
,"Who many US senators are there?"
,"What color was Frank Sanatra's eyes?"
,"What is the name of Steve Jobs daughter?"
,"Who convince Nichelle Nichols to continue play playing Lt. Uhura after the first season of Star Trek?"
,"Moldy rye is known to produce an impure form of what illicit drug?"
,"What animal has the largest eye measuring up to 11 inches?"
,"Charles Richter, developer of the Richter Scale, was an avid what?"
,"Andy Warhol was born and raised in what town?"
,"Big Ben is the name of what object?"
,"Paul Reubenfeld is best know for what 1990's character?"
,"What kind of car was Christine?"
,"Name the two train car that starts with 'C' that accompanies Thomas the Train?"
,"Marcel Duchamp's redi-made sculpture titled 'fountain' is made from what common place object?"
,"Who was The Who's original bass player?"];
var answers = ["Medusa"
,"Akhenaten"
,"Encore"
,"Ramses"
,"Paul"
,"John Foggerty"
,"Plum Crazy Purple"
,"Spot"
,"charisma"
,"Wombat"
,"Common Cold"
,"Miller High Life"
,"Skwisgaar Sqwigelf"
,"After Midnight"
,"Andy"
,"Stephen King"
,"Romen"
,"Spain"
,"Your Mom"
,"7"
,"2500"
,"100"
,"blue"
,"Lisa"
,"Martin Luther King Jr."
,"LSD"
,"colossal squid"
,"nudist"
,"Pittsburg"
,"A bell"
,"Pee-wee Herman"
,"1958 Plymouth Fury"
,"Clarabel"
,"urinal"
,"John Entwistle"];
var userAnswers = [];
var questionAns = 0;
var maxQuestions = 35;
var start = false;


//On load set up the needed information
function setUp() {
	if(!checkCookies()) {
		console.log("no cookies");
	}

	var qAns = document.getElementById("quesAnswered");
	qAns.innerHTML = "You have answered " + questionAns + " of " + (maxQuestions);
};


//Administers the quiz for the user
function startQuiz() {

	for (var i = 0; i < maxQuestions; i++) {

		if (userAnswers[i] == null || userAnswers[i].length == 0) {

			userAnswers[i] = prompt("Question " + (i+1) + ": " + questions[i]);
			userAnswers[i] = userAnswers[i].trim();
			if (userAnswers[i].length == 0) {
				break;
			} else {
				questionAns++;
			}
		}
	}

	var qAns = document.getElementById("quesAnswered");
	qAns.innerHTML = "You have answered " + questionAns + " of " + (maxQuestions);

	saveCookies();
};


//Diplay all the information about the answers
function showAnswers() {
	removeAnswers();

	var ansField = document.getElementById("answersField");
	var correctAns = document.createElement("h2");
	ansField.appendChild(correctAns);


	for (var i = 0; i < maxQuestions; i++) {

		if ((userAnswers[i] != null) && userAnswers[i].length != 0) {
			ansField.appendChild(createAnswerField(i));
		}
	}

	var correctNum = document.getElementsByClassName("correct").length;
	alert(correctNum + " out of " + questionAns + " correct");
	correctAns.innerHTML = correctNum + " out of " + questionAns + " correct";
};


//Clears out all the 
function removeAnswers () {
	var ansField = document.getElementById("answersField");

	while (ansField.firstChild) {
    	ansField.removeChild(ansField.firstChild);
	}
};


//Inserts the results of the answers given into the DOM
function createAnswerField(qNum) {
	var container = document.createElement("div");
	if (userAnswers[qNum].toLowerCase() == answers[qNum].toLowerCase()) {
		container.className = "ansContainer correct";
	} else {
		container.className = "ansContainer incorrect";
	}

	var title = document.createElement('h3');
	title.innerHTML = "Question " + (qNum + 1) + ":";

	var questTitle = document.createElement("p");
	questTitle.innerHTML = questions[qNum];

	var userAns = document.createElement("h5");
	userAns.className = "userAnswer";
	userAns.innerHTML = "Your Answer: " + userAnswers[qNum];

	var realAns = document.createElement("h5");
	realAns.className = "realAnswer";
	realAns.innerHTML = "Correct Answer: " + answers[qNum];

	var clearObj = document.createElement("div");
	clearObj.className = "clear";

	container.appendChild(title);
	container.appendChild(questTitle);
	container.appendChild(userAns);
	container.appendChild(realAns);
	container.appendChild(clearObj);

	return container;
};


//Checks if the user has a cookie saved
function checkCookies () {
	var cke = document.cookie;

	if (cke.length === 0) {
		return false;
	}

	for (var i = 0; i < maxQuestions; i++) {

		var inde = cke.indexOf("Z" + i + "Z");

		if (inde > 0) {
			var c = cke.substring(inde);
			c = c.substring(("Z" + i + "Z").length, c.indexOf("Z" + (i+1) + "Z"));
			
			if (c === ("Z" + i + "Z")){
				break;
			} else {
				userAnswers[i] = c;
				questionAns++;
			}
		}
	}

  	return true;
};


//Saves the answers in a cookie
function saveCookies () {

	var cookieString = "answers=";

	for (var i = 0; i < maxQuestions; i++) {
		if (userAnswers[i] != null && userAnswers[i].length != 0) {
			cookieString = cookieString + "Z"+i+"Z" + userAnswers[i];
		}
	}

	var date = new Date();
	date.setTime(date.getTime()+(30*24*60*60*1000))
	cookieString = cookieString + "Z" + questionAns + "Z;expires=" + date.toUTCString() + ";";
	document.cookie=cookieString;

};


//Clears out the cookie
function deleteCookie() {
	document.cookie = "answers=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	location.reload();
};