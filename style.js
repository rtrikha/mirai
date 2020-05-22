/*

*	Popping the logoReveal

*/
document.getElementById('prime-holder').style.display = 'none';
document.getElementById('legends').style.display = 'none';

function popLogoReveal() {
	document.getElementById('logo-reveal').style.display = 'none';
	document.getElementById('logo-reveal').style.opacity = '0';
	document.getElementById('prime-holder').style.display = 'block';
}
setTimeout(popLogoReveal, 0000);

/*

*	DOB input field modulator

*/

var date = document.getElementById('dob');

function checkValue(str, max) {
	if (str.charAt(0) !== '0' || str == '00') {
		var num = parseInt(str);
		if (isNaN(num) || num <= 0 || num > max) num = 1;
		str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
	}
	return str;
}

date.addEventListener('input', function (e) {
	this.type = 'text';
	var input = this.value;
	if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
	var values = input.split('/').map(function (v) {
		return v.replace(/\D/g, '');
	});
	if (values[0]) values[0] = checkValue(values[0], 31);
	if (values[1]) values[1] = checkValue(values[1], 12);
	var output = values.map(function (v, i) {
		return v.length == 2 && i < 2 ? v + ' / ' : v;
	});
	this.value = output.join('').substr(0, 14);
});

/*

*	D3 graph declaration from here

*/

function loadGraph() {
	function responsivefy(svg) {
		var container = d3.select(svg.node().parentNode),
			width = parseInt(svg.style('width')),
			height = parseInt(svg.style('height')),
			aspect = width / height;

		svg
			.attr('viewBox', '0 0 ' + width + ' ' + height)
			.attr('perserveAspectRatio', 'xMinYMid')
			.call(resize);

		d3.select(window).on('resize.' + container.attr('id'), resize);

		function resize() {
			var targetWidth = parseInt(container.style('width'));
			svg.attr('width', targetWidth);
			svg.attr('height', Math.round(targetWidth / aspect));
		}
	}

	let parseDate = d3.timeParse('%Y-%m-%d');

	var x = d3.scaleTime().range([0, 600]);
	var y = d3.scaleLinear().range([100, 10]);

	var xAxis = d3.axisBottom().scale(x);
	var yAxis = d3.axisLeft().scale(y);

	var line = d3
		.line()
		.x(function (d) {
			return x(d.date);
		})
		.y(function (d) {
			return y(d.close);
		})
		.curve(d3.curveBasis);

	var svg = d3
		.select('#minigraphs')
		.append('svg')
		.attr('width', '60vw')
		.attr('height', '300')
		.call(responsivefy)
		.append('g')
		.attr('stroke-linecap', 'round')
		.attr('stroke-width', 8)
		.attr('fill', 'none');

	setTimeout(function () {
		svg.attr('transform', 'translate(120,100)');
	}, 0);

	var dataIntellectual = coordsIntellectual.map(function (d) {
		return {
			date: parseDate(d[0]),
			close: d[1],
		};
	});

	var dataPhysical = coordsPhysical.map(function (d) {
		return {
			date: parseDate(d[0]),
			close: d[1],
		};
	});

	var dataEmotional = coordsEmotional.map(function (d) {
		return {
			date: parseDate(d[0]),
			close: d[1],
		};
	});

	x.domain(
		d3.extent(dataIntellectual, function (d) {
			return d.date;
		})
	);
	y.domain(
		d3.extent(dataIntellectual, function (d) {
			return d.close;
		})
	);

	svg
		.append('path')
		.attr('class', 'intellectual')
		.datum(dataIntellectual)
		.attr('d', line)
		.transition()
		.attr('stroke', '#72DEC2')
		.duration(1500)
		.attrTween('stroke-dasharray', function () {
			var len = this.getTotalLength();
			return function (t) {
				return d3.interpolateString('0,' + len, len + ',0')(t);
			};
		});

	svg
		.append('path')
		.attr('class', 'physical')
		.datum(dataPhysical)
		.attr('d', line)
		.transition()
		.delay(150)
		.attr('stroke', 'white')
		.duration(1500)
		.attrTween('stroke-dasharray', function () {
			var len = this.getTotalLength();
			return function (t) {
				return d3.interpolateString('0,' + len, len + ',0')(t);
			};
		});

	svg
		.append('path')
		.attr('class', 'emotional')
		.datum(dataEmotional)
		.attr('d', line)
		.transition()
		.delay(250)
		.attr('stroke', '#FFB545')
		.duration(1500)
		.attrTween('stroke-dasharray', function () {
			var len = this.getTotalLength();
			return function (t) {
				return d3.interpolateString('0,' + len, len + ',0')(t);
			};
		});
}

//http://jsfiddle.net/jaimem/T546B/

/*

*	Sample wave animation for first-hit

*/

let xs = [];
for (var i = 0; i <= 52; i++) {
	xs.push(i);
}

let t = 0;

function animate() {
	let points = xs.map((x) => {
		let y = 10 + Math.sin((x + t) / 10) / 2;

		return [x, y];
	});

	let path =
		'M' +
		points
			.map((p) => {
				return p[0] + ',' + p[1];
			})
			.join(' L');

	document.querySelector('#sine').setAttribute('d', path);

	t += 1;

	requestAnimationFrame(animate);
}

animate();

/*

*	Modal for about

*/

var modal = document.querySelector('.modal');
var trigger = document.querySelector('.about');
var closeButton = document.querySelector('.close-button');

function toggleModal() {
	modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
	if (event.target === modal) {
		toggleModal();
	}
}

trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
