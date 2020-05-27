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
var compliedDates = [];
var coordsIntellectual = [];
var coordsPhysical = [];
var coordsEmotional = [];
var dataIntellectual = [];
var dataPhysical = [];
var dataEmotional = [];
var radialIntellectual;
var radialPhysical;
var radialEmotional;
var mainChart;

function animationGetter(element, type, value) {
	document.getElementById(element).style[type] = value;
}

function elementRemover(element) {
	document.getElementById(element).remove();
}

function goBack() {
	document.getElementById('dob').value = '';

	animationGetter('response', 'opacity', '0');
	animationGetter('response', 'transition', 'opacity 0.3s');
	setTimeout(function () {
		animationGetter('response', 'display', 'none');
	}, 400);

	setTimeout(function () {
		animationGetter('content', 'display', 'block');
		setTimeout(function () {
			animationGetter('content', 'opacity', '1');
			animationGetter('content', 'transition', 'opacity 0.3s');
			animationGetter('content', 'pointerEvents', 'all');
		}, 600);
	}, 500);


	radialPhysical.destroy();
	radialIntellectual.destroy();
	radialEmotional.destroy();
	mainChart.destroy();

}

function getInput() {
	var dateEntered = document.getElementById('dob').value;
	var checkFuture = Date.compare(Date.today(), Date.parse(dateEntered));

	console.log(checkFuture);
	if (dateEntered.length == 14 && checkFuture == 1) {
		console.log(document.getElementById('dob').value.length);
		fetchedDate = document.getElementById('dob').value;
		fetchedDate = fetchedDate.split('/').reverse('').join('-');
		fetchedDate = fetchedDate.replace(/\s+/g, '');

		getValues();

		animationGetter('content', 'opacity', '0');
		animationGetter('content', 'transition', 'opacity 0.3s');
		animationGetter('content', 'pointerEvents', 'none');
		setTimeout(function () {
			animationGetter('content', 'display', 'none');
		}, 400);

		setTimeout(function () {
			animationGetter('response', 'display', 'block');
			setTimeout(function () {
				animationGetter('response', 'opacity', '1');
				animationGetter('response', 'transition', 'opacity 0.3s');
				loadToday();
				setTimeout(function () {
					loadMonth();
				}, 700);
			}, 600);
		}, 500);
	} else {
		document.getElementById('errorText').style.display = 'block';
	}
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

	for (i = 0; i <= 31; i++) {
		differences[i] = dateDifference(fetchedDate, compliedDates[i]);
		intellectualValues[i] = Math.round(100 * Math.sin((2 * pi * differences[i]) / intellectualCycle));
		physicalValues[i] = Math.round(100 * Math.sin((2 * pi * differences[i]) / physicalCycle));
		emotionalValues[i] = Math.round(100 * Math.sin((2 * pi * differences[i]) / emotionalCycle));
	}

	for (i = 0; i < 31; i++) {
		coordsIntellectual[i] = [Date.parse(compliedDates[i]).toString('dddd dd MMMM'), intellectualValues[i]];
		coordsPhysical[i] = [Date.parse(compliedDates[i]).toString('dddd dd MMMM'), physicalValues[i]];
		coordsEmotional[i] = [Date.parse(compliedDates[i]).toString('dddd dd MMMM'), emotionalValues[i]];
	}
}

function loadToday() {
	function negativeChecker(number) {
		if (number < 0) {
			return (number = number * -1);
		} else {
			return number;
		}
	}

	var radialChartIntellectual = {
		colors: [
			function ({value}) {
				if (intellectualValues[0] > 0) {
					return '#FFFFFF';
				} else {
					return '#E47464';
				}
			},
		],
		series: [negativeChecker(intellectualValues[0])],
		chart: {
			height: 180,
			type: 'radialBar',
			offsetY: 0,
		},
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 135,
				dataLabels: {
					name: {
						fontSize: '16px',
						fontFamily: 'Space-Mono, Monospace',
						color: undefined,
						offsetY: 88,
					},
					value: {
						offsetY: 48,
						fontFamily: 'Space-Mono, Monospace',
						fontSize: '22px',
						color: 'white',
						formatter: function (val) {
							return intellectualValues[0] + '%';
						},
					},
				},
			},
		},
		fill: {
			type: 'fill',
		},
		stroke: {
			lineCap: 'round',
			dashArray: 0,
		},
		labels: ['Intellectual'],
	};

	var radialChartPhysical = {
		colors: [
			function ({value}) {
				if (physicalValues[0] > 0) {
					return '#72DEC2';
				} else {
					return '#E47464';
				}
			},
		],
		series: [negativeChecker(physicalValues[0])],
		chart: {
			height: 180,
			type: 'radialBar',
			offsetY: 0,
		},
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 135,
				dataLabels: {
					name: {
						fontSize: '16px',
						fontFamily: 'Space-Mono, Monospace',
						color: undefined,
						offsetY: 88,
					},
					value: {
						offsetY: 48,
						fontFamily: 'Space-Mono, Monospace',
						fontSize: '22px',
						color: 'white',
						formatter: function (val) {
							return physicalValues[0] + '%';
						},
					},
				},
			},
		},
		fill: {
			type: 'fill',
		},
		stroke: {
			lineCap: 'round',
			dashArray: 0,
		},
		labels: ['Physical'],
	};

	var radialChartEmotional = {
		colors: [
			function ({value}) {
				if (emotionalValues[0] > 0) {
					return '#FFB545';
				} else {
					return '#E47464';
				}
			},
		],
		series: [negativeChecker(emotionalValues[0])],
		chart: {
			height: 180,
			type: 'radialBar',
			offsetY: 0,
		},
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 135,
				dataLabels: {
					name: {
						fontSize: '16px',
						fontFamily: 'Space-Mono, Monospace',
						color: undefined,
						offsetY: 88,
					},
					value: {
						offsetY: 48,
						fontFamily: 'Space-Mono, Monospace',
						fontSize: '22px',
						color: 'white',
						formatter: function (val) {
							return emotionalValues[0] + '%';
						},
					},
				},
			},
		},
		fill: {
			type: 'fill',
		},
		stroke: {
			lineCap: 'round',
			dashArray: 0,
		},
		labels: ['Emotional'],
	};

	radialIntellectual = new ApexCharts(document.querySelector('#radial-chart-intellectual'), radialChartIntellectual);
	radialPhysical = new ApexCharts(document.querySelector('#radial-chart-physical'), radialChartPhysical);
	radialEmotional = new ApexCharts(document.querySelector('#radial-chart-emotional'), radialChartEmotional);
	radialIntellectual.render();
	radialPhysical.render();
	radialEmotional.render();
}

function loadMonth() {
	dataIntellectual = coordsIntellectual.map(function (d) {
		return {
			x: d[0],
			y: d[1],
		};
	});

	dataPhysical = coordsPhysical.map(function (d) {
		return {
			x: d[0],
			y: d[1],
		};
	});

	dataEmotional = coordsEmotional.map(function (d) {
		return {
			x: d[0],
			y: d[1],
		};
	});

	var chartStyling = {
		colors: ['#FFFFFF', '#72DEC2', '#FFB545'],
		series: [
			{
				name: 'Intellectual',
				data: dataIntellectual,
			},
			{
				name: 'Physical',
				data: dataPhysical,
			},
			{
				name: 'Emotional',
				data: dataEmotional,
			},
		],
		tooltip: {
			enabled: true,
			theme: 'dark',
			fontFamily: 'Space-Mono, Monospace',
			x: {
				show: true,
			},
			y: {
				formatter: function (value) {
					return `${value}%`;
				},
			},
		},
		legend: {
			show: false,
		},
		toolbar: {
			show: false,
		},
		grid: {
			show: false,
		},

		chart: {
			id: 'test',
			height: '100%',
			parentHeightOffset: 105,
			sparkline: {
				enabled: false,
			},
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'straight',
			lineCap: 'round',
			width: 10,
		},
	};
	mainChart = new ApexCharts(document.querySelector('#line-chart'), chartStyling);
	mainChart.render();
}
