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
var compliedDates = [];
var results;
var coordsIntellectual = [];
var coordsPhysical = [];
var coordsEmotional = [];

function goBack() {
	console.log('back');
	document.getElementById('minigraphs').style.opacity = '0';
	document.getElementById('minigraphs').style.transition = 'opacity 0.3s';
	document.getElementById('minigraphs').style.pointerEvents = 'none';
	document.getElementById('delete').remove();
	document.getElementById('dob').value = '';

	//document.getElementById('goBack').style.display="none";
	setTimeout(function () {
		document.getElementById('goBack').style.opacity = '0';
		document.getElementById('goBack').style.transition = 'opacity 0.1s';
		document.getElementById('goBack').style.pointerEvents = 'none';
	}, 300);

	setTimeout(function () {
		document.getElementById('first-hit').style.opacity = '1';
		document.getElementById('first-hit').style.transition = 'opacity 0.3s';
		document.getElementById('first-hit').style.pointerEvents = 'all';
	}, 1000);
}

function getInput() {
	fetchedDate = document.getElementById('dob').value;
	fetchedDate = fetchedDate.split('/').reverse('').join('-');
	fetchedDate = fetchedDate.replace(/\s+/g, '');
	//document.getElementById('first-hit')
	document.getElementById('first-hit').style.opacity = '0';
	document.getElementById('first-hit').style.transition = 'opacity 0.3s';
	document.getElementById('first-hit').style.pointerEvents = 'none';

	var chart = new ApexCharts(document.querySelector('#minigraphs'), options);
	chart.render();

	setTimeout(function () {
		//document.getElementById('legends').style.display = 'flex';
		document.getElementById('minigraphs').style.opacity = '1';
		document.getElementById('minigraphs').style.transition = 'opacity 0.3s';
		document.getElementById('minigraphs').style.pointerEvents = 'all';
		document.getElementById('goBack').style.opacity = '1';
		document.getElementById('goBack').style.display = 'flex';
		document.getElementById('goBack').style.pointerEvents = 'all';
	}, 1000);

	getValues();
	//setTimeout(loadGraph, 1000);
}

function search(ele) {
	if (event.key === 'Enter') {
		getInput();
	}
}

function getValues() {
	function dateDifference(from, to) {
		from = new Date(from);
		to = new Date(to);

		const utc1 = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
		const utc2 = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
		const msPerDay = 1000 * 60 * 60 * 24;

		return Math.floor((utc2 - utc1) / msPerDay);
	}

	for (i = 1; i <= 31; i++) {
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
		futureDates[i] = yyFuture + '-' + mmFuture + '-' + ddFuture;
	}

	computedDates.push(backDates.reverse());
	computedDates.push(today);
	computedDates.push(futureDates);
	compliedDates = computedDates.flatMap((x) => x);

	results = compliedDates.map((date) => new Date(date));

	for (i = 0; i <= 31; i++) {
		differences[i] = dateDifference(fetchedDate, compliedDates[i]);
		intellectualValues[i] = Math.round(100 * Math.sin((2 * pi * differences[i]) / intellectualCycle));
		physicalValues[i] = Math.round(100 * Math.sin((2 * pi * differences[i]) / physicalCycle));
		emotionalValues[i] = Math.round(100 * Math.sin((2 * pi * differences[i]) / emotionalCycle));
	}

	let parseDate = d3.timeFormat('%Y-%m-%d');

	for (i = 0; i <= 31; i++) {
		results[i] = parseDate(results[i]);
	}

	for (i = 0; i < 31; i++) {
		coordsIntellectual[i] = [compliedDates[i], intellectualValues[i]];
		coordsPhysical[i] = [compliedDates[i], physicalValues[i]];
		coordsEmotional[i] = [compliedDates[i], emotionalValues[i]];
	}
	console.log(coordsIntellectual[0]);
}

var dataIntellectual = coordsIntellectual.map(function (d) {
	return {
		date: parseDate(d[0]),
		value: d[1],
	};
});

var options = {
	colors: ['#72DEC2', '#ffffff', '#FFB545'],
	series: [
		{
			type: 'line',
			name: 'Intellectual',
			data: [
				{x: '06/05/2014', y: 54},
				{x: '05/08/2014', y: 17},
			],
		},
		{
			type: 'line',
			name: 'Physical',
			data: [
				{x: '06/05/2014', y: 20},
				{x: '05/08/2014', y: 87},
			],
		},
		{
			type: 'line',
			name: 'Emotional',
			data: [
				{x: '06/05/2014', y: 10},
				{x: '05/08/2014', y: 67},
			],
		},
	],
	chart: {
		type: 'line',
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		curve: 'smooth',
	},
	fill: {
		opacity: 1,
	},
	yaxis: {
		borderColor: '#000',
		min: 0,
	},
	stroke: {
		show: true,
		curve: 'smooth',
		lineCap: 'round',
		width: 6,
		dashArray: 0,
	},

	tooltip: {
		enabled: true,
		theme: 'dark',
	},
	animations: {
		enabled: false,
		easing: 'easeinout',
		speed: 8000,
		animateGradually: {
			enabled: true,
			delay: 1250,
		},
	},
};
