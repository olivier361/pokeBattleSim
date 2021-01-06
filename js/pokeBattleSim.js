//pokeBattleSim.js

//Global Variables:
let statsON = 0;
let scrollON = 0;
let dialogCount = 0;
let s = [];
let pokemon1;
let pokemon2;
let level1;
let level2;
let alerted = 0;
let testDummy = 0;

//runs when page is refreshed:
testRequest();

//Called when battle button is clicked.
function choosePokemon() {
		pokemon1 = $("#pokemon1").val().toLowerCase().trim();
		level1 = $("#level1").val();
		pokemon2 = $("#pokemon2").val().toLowerCase().trim();
		level2 = $("#level2").val();
		submit();
}

//called when random battle button is clicked.
function randomBattle() {
	pokemon1 = random(1,807);
	pokemon2 = random(1,807);
	level1 = random(1,100);
	level2 = random(1,100);
	submit();
}

// returns a value between the given min and max.
function random(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

//Sends the request and calls subsequent functions for pokemon battles.
function submit() {
	//Send the server request.
	let url1 = "https://pokeapi.co/api/v2/pokemon/" + pokemon1;
	let url2 = "https://pokeapi.co/api/v2/pokemon/" + pokemon2;
	
	$.get(url1, function(data1){
		// alert("level1: " + level1 + " level2: " + level2);
		$.get(url2, function(data2){
			showStats(data1,data2,pokemon1,pokemon2);
			dialogCount = 0;
			dialogClear();
			typeCompare(data1, data2);
			battle(data1, data2, pokemon1, pokemon2, level1, level2);
		});
	});
}

//show/hide the JSON text view section. Called by "show stats for nerds" button.
function statsEnabled() {
	if(statsON === 0) {
		$("#stats").show();
		// alert("showing");
		statsON = 1;
	}
	else {
		$("#stats").hide();
		// alert("hiding");
		statsON = 0;
	}
}

function manualScrollEnabled() {
	if(scrollON === 0) {
		$("#manualScroll").show();
		// alert("showing");
		$("#manualScrollEnabled").html("Turn off manual scrolling");
		scrollON = 1;
	}
	else {
		$("#manualScroll").hide();
		// alert("hiding");
		$("#manualScrollEnabled").html("Turn on manual scrolling");
		scrollON = 0;
	}
}

//puts the JSON data in the html in the stats for nerds div.
function showStats(data1,data2,name1,name2) {
	//Show the raw JSON data for pokemon.
	if(name1 === ""){
		$("#showName1").html("You did not enter a name. Showing default JSON data for 1st Pokemon.");
		if(alerted === 0) {
			alerted = 1;
			alert("Please enter two valid Pokemon names.");	
		}
	}
	else{
		$("#showName1").html("JSON data for " + name1);
	}
	$("#showStats1").html(JSON.stringify(data1));
	
	if(name2 === ""){
		$("#showName2").html("You did not enter a name. Showing default JSON data for 2nd Pokemon.");
		if(alerted === 0) {
			alerted = 1;
			alert("Please enter two valid Pokemon names.");	
		}
	}
	else{
		$("#showName2").html("JSON data for " + name2);
	}
	$("#showStats2").html(JSON.stringify(data2));
	alerted = 0;
}

//runs on page refresh. Just to test whatever request is currently in here.
function testRequest() {
	///*
	let testUrl = "https://pokeapi.co/api/v2/pokemon/pikachu"
	$.get(testUrl, function(data){
		// $("#testRequest").html(JSON.stringify(data));
		// alert(data.types[0].type.url); //returns electric type.
		// alert(data.types[0].type.url.damage_relations.double_damage_from[0].name) //rock
		// alert(data.damage_relations.double_damage_from[0].name); //rock)
	});
	//*/
}

//The battle algorithm that determines the outcome of the pokemon matchup.
function battle(data1, data2, name1, name2, lv1, lv2) {
	//Display pokemon sprites on-screen.
	$("#img1").attr("src",data1.sprites.back_default);
	$("#img2").attr("src",data2.sprites.front_default);
	
	//Fill in the blank dialog.
	s[0] = data1.name + "! I choose you!!!";
	s[1] = "Oh look! A wild " + data2.name + " appeared!";
	s[2] = "It seems like " + data2.name + " is level " + lv2 + 
	". This should be a fierce battle for my level " + lv1 + " " + data1.name + ".";
	
	
	// let types = typeCompare(data1, data2);
	s[3] = data2.name + " is a " + data2.types[0].type.name + " type. I can never remember my type advantages but I think the odds are in our favor with my " + data2.types[0].type.name + " type.";
	try{
		s[4] = "Just for good mesure we should use " + data1.name + "'s held item: " + data1.held_items[0].item.name + ". This thing always comes in handy somehow...";
	} catch(noItem) {
		s[4] = "Ah man! I forgot to give my " + data1.name + " an item. Hopefully we can manage without..."
	}
	try{
		s[5] = "Wait?! " + data2.name + " is using his signature ability " + data2.abilities[0].ability.name + "... Eh. we'll be fine. It's probably nothing...";
	} catch (noAbility) {
		//no action
	}
	s[6] = "Ok " + data1.name + ", let's use " + data1.moves[0].move.name + "! That should do a lot of damage!";
	s[7] = "Wow that was pretty effective!";
	try{
		s[8] = "Looks like " + data2.name + " is fighting back with " + data2.moves[1].move.name + ". An interesting choice for sure.";
	} catch(no2ndMove) {
		s[8] = "Looks like " + data2.name + " is fighting back with " + data2.moves[0].move.name + ". Must be a sure bet to use the same move twice.";
	}
	try{
		s[9] = data1.name + " is pretty exhausted, time to end this battle. " + data1.name + " use " + data1.moves[1].move.name + " this time!";
	} catch(no2ndMove) {
		s[9] = data1.name + " is pretty exhausted, time to end this battle. " + data1.name + " use " + data1.moves[0].move.name + " again!";
	}
	let winner = 0;
	if(lv1 === lv2) {
		winner = random(1,2);
	}
	else if(lv1 > lv2 || winner === 1) {
		s[10] = "Wow! That completely knocked out " + data2.name + "!"; 
		s[11] = data1.name + " is declared the winner!";
	}
	else if(lv2 > lv1 || winner === 2) {
		s[10] = "Looks like " + data2.name + " is still standing strong. He is quite the opponent to say the least!";
		s[11] = "In a twist of events, " + data2.name + " uses " + data2.moves[0].move.name + " again!";
		s[12] = "Wow! " + data1.name + " took a hard hit and fainted! Looks like we still got more training to do.";
		s[13] = data2.name + " is declared the winner!";
	}
	
	// s[11] = "12";
	// s[12] = "13";
	// s[13] = "14";
	
	//Times the interval of time before each line print.
	if(scrollON === 0) {
		let timePerLine = 1000;
		for(let i=0; i<s.length; i++) {
			setTimeout(dialog, i*timePerLine);
		}
	}
	else {
		dialog();
	}
}

function manualScroll() {
	if(scrollON === 1) {
		dialog();
	}
}

//compares the types to return an array with damage outputs.
function typeCompare(data1, data2) {
	let uDamageOut = 1.0;
	let uDamageIn = 1.0;
	let oDamageOut = 1.0;
	let oDamageIn = 1.0;
	let uType2;
	let oType2;
	
	//Gets the url's for the types of the pokemon.
	let uType1 = data1.types[0].type.url;
	try{
		uType2 = data1.types[1].type.url;
	}
	catch(noType) {
		uType2 = "noType";
	}
	let oType1 = data2.types[0].type.url;
	try{
		oType2 = data2.types[1].type.url;
	}
	catch(noType) {
		oType2 = "noType";
	}
	// alert("uType1: " + uType1 + " uType2: " + uType2);
	// alert("oType1: " + oType1 + " oType2: " + oType2);
	let tempDamageArray = ["nd1","nd2"];
	// alert("SOme alert: " + typeCompareHelper(uType1,oType1, oType2, uDamageIn, uDamageOut) );
	// let tempDamageArray = typeCompareHelper(uType1,oType1, oType2, uDamageIn, uDamageOut);
	// alert("L163 uDamageIn: " + tempDamageArray[0] + " uDamageOut: " + tempDamageArray[1]);
	uDamageIn = Number($("#resultStorage1").val());
	uDamageOut = Number($("#resultStorage2").val());
	
	// alert("My Intake: " + uDamageIn + " My Outake: " + uDamageOut + "\n" +
		 // "Op Intake: " + oDamageIn + " Op Outake: " + oDamageOut)
	// [uDamageOut,uDamageIn,oDamageOut,oDamageIn]
	
	// return []
}

//PARAMETERS:
//type: type url.
//oType1: type1 of opposite pokemon.
//oType2: type2 of opposite pokemon.
//intake: set to uDamageIn or oDamageIn for other pokemon.
//outake: set to uDamageOut or oDamageOut for other pokemon.
//RETURNS:
//array [new intake, new outake]. Set caller uDamageIn/uDamageOut to these.
function typeCompareHelper(type,oType1, oType2, intake, outake) {
	let uDamageOut = outake;
	let uDamageIn = intake;
	let myArray = [-1.0,-2.0];
	let dummy = 0;
	//Call get data on the types url's to get types matchups and compare.
	$.get(type, function(data){
		let r = data.damage_relations;
		dummy = 1;
		//DOUBLE DAMAGE FROM:
		// alert("Array length: " + r.double_damage_from.length);
		for(let i=0; i<r.double_damage_from.length; i++) {
			if (r.double_damage_from[i].url === oType1 || r.double_damage_from[i].url === oType2) {
				uDamageIn = 2.0;
				alert("DOUBLE DAMAGE FROM!");
			}
		}
		//DOUBLE DAMAGE TO:
		for(let i=0; i<r.double_damage_to.length; i++) {
			if (r.double_damage_to[i].url === oType1 || r.double_damage_to[i].url === oType2) {
				uDamageOut = 2.0;
				alert("DOUBLE DAMAGE TO!");
			}
		}
		//HALF DAMAGE FROM:
		for(let i=0; i<r.half_damage_from.length; i++) {
			if (r.half_damage_from[i].url === oType1 || r.half_damage_from[i].url === oType2) {
				if (uDamageIn != 2.0) {
					uDamageIn = 0.5;
				}
				else {
					uDamageIn = 1.0;
				}
				alert("HALF DAMAGE FROM!");
			}
		}
		//HALF DAMAGE TO:
		for(let i=0; i<r.half_damage_to.length; i++) {
			if (r.half_damage_to[i].url === oType1 || r.half_damage_to[i].url === oType2) {
				if (uDamageOut != 2.0) {
					uDamageOut = 0.5;
				}
				else {
					uDamageOut = 1.0;
				}
				alert("HALF DAMAGE TO!");
			}
		}
		// alert("L229 uDamageIn: " + uDamageIn + " uDamageOut: " + uDamageOut);
		myArray = [uDamageIn, uDamageOut];
		// alert("L231 uDamageIn: " + array[0] + " uDamageOut: " + array[1]);
		// return myArray;
		// let testArray = [10.0,20.0];
		// return array;
		testDummy = 1;
		$("#resultStorage1").html(uDamageIn);
		$("#resultStorage2").html(uDamageOut);
		
	});
	// alert("testDummy: " + testDummy);
	// alert("dummy: " + dummy);
	// alert("myArray - uDamageIn: " + myArray[0] + " uDamageOut: " + myArray[1]);
	return myArray;
}
//Line scrolling script using each array index as a text line.
function dialog(){
	// let id = "#"+dialogCount;
	// let string = 
	// $(id).html(s[dialogCount]);
	// dialogCount++;
	let id = "";
	for(let i = 0; i<=dialogCount; i++) {
		id = "#"+i;
		$(id).html(s[i]);
	}
	if(dialogCount < 7){
		dialogCount++;
	}
	else{
		arrayShift();
	}
}
//Shifts the array for line print script.
function arrayShift() {
	for(let i = 0; i<s.length; i++){
		s[i] = s[i+1];
	}
}

//if a new battle is called, clears the array of text lines.
function dialogClear() {
	for(let i = 0; i<s.length; i++){
		s[i] = "";
		id = "#"+i;
		$(id).html(s[i]);
	}
}