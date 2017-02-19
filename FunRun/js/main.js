var winners = [];

$(function(){
	confetti();
	$('#confetti').hide();
	
	//GENERATE BOXES
	var digitCount = participants.toString();
	var digitBoxes = "";
	var soundEffects = "";
	for(var i = 0; i < digitCount.length; i++){
		digitBoxes += '<span class="digit">0</span>';
		soundEffects += '<audio class="glass" src="sounds/glass.mp3"></audio>';
	}
	$('#digits-div').html(digitBoxes);
	$('#sounds-div').append(soundEffects);
	$('#generate').visible();
	
	
	//BUTTON CLICK
	$('#generate').click(function(){			
		luckyNumber = generateWinner().toString();
		if(luckyNumber == -1){
			alert("All Participants Already Win");
			return false;
		}
		
		$('#slot-machine')[0].play();
		$(this).invisible();
		//console.log(winners);
		$('#confetti').hide();
		
		luckyOne = "";
		for(var i = 0; i < digitCount.length; i++){
			luckyOne += "0";
		}
		luckyOne += luckyNumber;
		luckyOne = luckyOne.substring(luckyOne.length - digitCount.length);
		
		
		//console.log("lucky number -> " +luckyNumber);
		//console.log("lucky one -> " +luckyOne);
		$('.digit').each(function(index, value){
			//console.log(parseInt(luckyOne[index]));
			if(index + 1 == digitCount.length) last = true;
			$(this).numAnim({
				endAt: parseInt(luckyOne[index]),
				duration: index * animationDuration + animationDuration,
				index: index,
				isLast: index + 1 == digitCount.length ? true : false
			});
		});
		
		
		console.log("Roll Count: " +winners.length);
	});
	
	//REALEASE PAGE LOADER
	// setTimeout(function(){
		// $(".se-pre-con").fadeOut("slow");
	// }, 500);
});



function generateWinner(){
	if(winners.length == participants - minNumber + 1){
		return -1;
	}
	var num = (Math.floor(Math.random() * (participants - minNumber + 1)) + minNumber);
	while(!validate(num)){
		num = (Math.floor(Math.random() * (participants - minNumber + 1)) + minNumber);
	}
	winners.push(num);
	return num;
}

function validate(num){
	for(var i = 0; i < winners.length; i++){
		if(num == winners[i]) return false;
	}
	return true;
}


$(window).bind('beforeunload', function(){
	if(winners.length > 0)
		return "All winners will have another chance to win";
});
				
