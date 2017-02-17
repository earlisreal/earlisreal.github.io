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
	
	$(".se-pre-con").fadeOut("slow");
});


//BUTTON CLICK
$('#generate').click(function(){
	$(this).invisible();
	//console.log(winners);
	$('#confetti').hide();
	
	luckyOne = "";
	for(var i = 0; i < digitCount.length; i++){
		luckyOne += "0";
	}
	
	luckyNumber = generateWinner().toString();
	if(luckyNumber == -1){
		alert("All Participants Already Win");
		return false;
	}
	
	luckyOne += luckyNumber;
	
	//console.log("lucky one -> " +luckyOne);
	$('.digit').each(function(index, value){
		//console.log(parseInt(luckyOne[index]));
		if(index + 1 == digitCount.length) last = true;
		$(this).numAnim({
			endAt: parseInt(luckyOne[luckyOne.length - index - 1]),
			duration: index * animationDuration + animationDuration,
			index: index,
			isLast: index + 1 == digitCount.length ? true : false
		});
	});
	
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
