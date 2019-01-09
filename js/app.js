
$(document).ready(function(){

	var guessFlag;// a flag to indicate if the guess matched the randomnumber
	var getDifference; // a closure function to check the difference between userchoice and randomnumber
	var previouschoices; // an array to contain the choices of the user
	var count; // number of choices made by the user.

	// Display information modal box 
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	// Hide information modal box 
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	//Invoke the newGame()  function to initialize the game variables 
  	//and functions.
  	newGame();

  	$('nav').on('click','.new',function(){
  		newGame();
  	});

  	function newGame(){ 
  		console.log("**********NEW GAME********\n"); 		
  		setFocus();
  		guessFlag = false;
  		getDifference = getUserChoiceDifferenceFn();
  		previouschoices = [];
  		count=0;
  		$('#count').text(count);
  		$('#guessList').find('li').remove();
  		$('#feedback').text('Make your Guess!');
  	}

  	function getUserChoiceDifferenceFn(){
  			var randomNumber = Math.floor((Math.random()*100)+1);
  			console.log("***Generated random Number***"+randomNumber)
  			return function guessDifference(userchoice){
  				return Math.abs(randomNumber-userchoice);
  			}  			
  	}

  	function checkPreviouschoices(choice){
  		if(!previouschoices.length){return false;} 
  		var contains=false; 		
  		for(var i = 0 ; i < previouschoices.length; i++){
  			if (previouschoices[i]==choice){
  				contains = true;
  				break;
  			}
  		}
  		return contains;
  	}

  	function isValidUserchoice(choice){
  		console.log("****Is User choice valid****"+choice);
  		setFocus();
  		if(isNaN(choice)){
  			setFeedback("We accept only Numbers");
  			return false;
  		}else if(choice<1 || choice>100){
  			setFeedback("Oops!.We accept only Numbers between 1 and 100.")
  			return false;
  		}else if($.trim(choice)==""){
  			setFeedback("Please Enter a Number between 1 and 100");
  			return false;
  		}else if(checkPreviouschoices(choice)){
  			setFeedback("You've already guessed this Number:"+choice);
  			return false;
  		}else {
  			return true;
  		}
  	}

  	function evaluateChoice(guessDifference){
  		console.log("****guess difference****"+guessDifference);
  		var flag = false;
  		if (guessDifference == 0) {
			setFeedback("Pat yourself on the back! You guessed it!!");
			guessFlag = true;
			return flag;
		} else if (guessDifference <= 5) {
			setFeedback("Your Guess is getting too hot like you!");
			flag = true;
			return flag;
		} else if (guessDifference <= 10){
			setFeedback("Your Guess is getting hot!");
			return flag;
		} else if (guessDifference>=10 && guessDifference <= 20) {
			setFeedback("Your Guess is getting Warm!");
			return flag;
		} else if (guessDifference>=20 && guessDifference <= 30) {
			setFeedback("Your Guess is getting cold!");
			return flag;
		} else if (guessDifference>=30 && guessDifference <= 40) {
			setFeedback("Your Guess is getting very cold like me!");
			return flag;
		} else {
			setFeedback("Your Guess is freezing cold!");
			return flag;
		}
  	}

  	function setFeedback(feedback){
  		$('#feedback').text($.trim(feedback));
  	}

  	function setFocus(){
  		$('#userGuess').val('').focus();
  	}

  	function updateCount(){
  		count++;
  		$('#count').text(count);
  	}

  	function updateGuessList(choice,closeGuess){
  		var guess;
  		if(!closeGuess){
  			guess = $('<li></li>').text(choice);
  		}else{
  			guess = $('<li></li>').css({
  				'background-color':'#000'
  			}).text(choice);
  		}
  		$('#guessList').append(guess);
  	}

  	$('form').submit(function(){
  		event.preventDefault();
  		var userchoice = parseInt(+$('#userGuess').val());
  		if(guessFlag){
  			setFeedback("You Won this game already! You need to start a new game.");
  		}
  		if(isValidUserchoice(userchoice) && !guessFlag){
  			var closeGuessFlag = evaluateChoice(getDifference(userchoice));
  			previouschoices.push(userchoice);
  			updateCount();
  			updateGuessList(userchoice,closeGuessFlag);
  			setFocus();
  			console.log("****previous choices*****"+ previouschoices.join());
  		}
  	});

});


