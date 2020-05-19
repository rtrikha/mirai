//expressions in js //block in js //iife
const physicalCycle = 23;
const emotionalCycle = 28;
const intellectualCycle = 33;
const spiritualCycle = 53;
const awarenessCycle = 48;
const aestheticCycle = 43;
const intuitionCycle = 38;
const pi = Math.PI;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(1, '0');
var yyyy = today.getFullYear();
var today = yyyy + '-' + mm + '-' + dd;

var backDates = [];
var futureDates = [];
var differences = [];
var computedDates = [];
var intellectualValues = [];
var physicalValues = [];
var emotionalValues = [];
var fetchedDate;

function getInput() {

	fetchedDate = document.getElementById('dob').value;
	fetchedDate = fetchedDate.split('/').reverse('').join('-');
	fetchedDate = fetchedDate.replace(/\s+/g, '');
	document.getElementById("first-hit").style.opacity="0";
	document.getElementById("first-hit").style.transition = "opacity 0.3s"
	getValues();
	setTimeout(loadGraph,1000);
}

function search(ele) {
	if (event.key === 'Enter') {
		getInput();
	}
}

function getValues(){

	function dateDifference(from, to) {
		from = new Date(from);
		to = new Date(to);
	
		const utc1 = Date.UTC(
			from.getFullYear(),
			from.getMonth(),
			from.getDate(),
		);
		const utc2 = Date.UTC(
			to.getFullYear(),
			to.getMonth(),
			to.getDate(),
		);
		const msPerDay = 1000 * 60 * 60 * 24;
	
		return Math.floor((utc2 - utc1) / msPerDay);
	}
	
	for (i = 1; i <= 30; i++) {
		//past seven days
		var back = new Date(today);
		back.setDate(back.getDate() - i);
		var ddBack = back.getDate();
		var mmBack = back.getMonth() + 1;
		var yyBack = back.getFullYear();
		//backDates[i] = yyBack + '-' + mmBack + '-' + ddBack;
	
		//future seven days
		var future = new Date(today);
		future.setDate(future.getDate() + i);
		var ddFuture = future.getDate();
		var mmFuture = future.getMonth() + 1;
		var yyFuture = future.getFullYear();
		futureDates[i] =
			yyFuture + '-' + mmFuture + '-' + ddFuture;
	}

	computedDates.push(backDates.reverse());
	computedDates.push(today);
	computedDates.push(futureDates);
	var compliedDates = computedDates.flatMap((x) => x);
	
	for (i = 0; i <= 30; i++) {
		differences[i] = dateDifference(fetchedDate,compliedDates[i]);
		intellectualValues[i] = Math.round(
			100 *
				Math.sin((2 * pi * differences[i]) / intellectualCycle),
		);
		physicalValues[i] = Math.round(
			100 * Math.sin((2 * pi * differences[i]) / physicalCycle),
		);
		emotionalValues[i] = Math.round(
			100 *
				Math.sin((2 * pi * differences[i]) / emotionalCycle),
		);
	}
	
	console.log(intellectualValues[0]);
	console.log(physicalValues[0]);
	console.log(emotionalValues[0]);

}