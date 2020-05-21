/*

*	Popping the logoReveal

*/
document.getElementById('prime-holder').style.display = 'none';

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

// function loadGraph() {
// 	const dataBinder1 = intellectualValues.map((x, i) => {
// 		return [i * 20, x];
// 	});

// 	const dataBinder2 = physicalValues.map((x, i) => {
// 		return [i * 20, x];
// 	});

// 	const dataBinder3 = emotionalValues.map((x, i) => {
// 		return [i * 20, x];
// 	});

// 	var coordsIntellectual = dataBinder1;
// 	var coordsPhysical = dataBinder2;
// 	var coordsEmotional = dataBinder3;

// 	var scale = d3.scaleLinear().domain([-240, 240]).range([300, 0]);

// 	var bezierLine = d3
// 		.line()
// 		.x(function (d) {
// 			return d[0];
// 		})
// 		.y(function (d) {
// 			return scale(d[1]);
// 		})
// 		.curve(d3.curveBasis);

// 	var svg1 = d3
// 		.select('#intellectual')
// 		.append('svg')
// 		.attr('id', 'int')
// 		.attr('align', 'center')
// 		.attr('width', '80vw')
// 		.attr('height', '24vh')
// 		.attr('viewBox', '0 0 220 220')
// 		.attr('preserveAspectRatio', 'xMinYMin meet');

// 	// var svg2 = d3.select('#physical').append('svg').attr('width', 800).attr('height', 240);
// 	// var svg3 = d3.select('#emotional').append('svg').attr('width', 800).attr('height', 240);
// 	var tooltip = d3
// 		.select('body')
// 		.append('div')
// 		.style('position', 'absolute')
// 		.style('z-index', '9999')
// 		.style('visibility', 'hidden')
// 		.text('a simple tooltip');

// 	const path1 = svg1
// 		.append('path')
// 		.attr('d', bezierLine(coordsIntellectual))
// 		.on('mouseover', function () {
// 			return tooltip.style('visibility', 'visible');
// 		})
// 		.on('mousemove', function () {
// 			return tooltip.style('top', event.pageY - 10 + 'px').style('left', event.pageX + 10 + 'px');
// 		})
// 		.on('mouseout', function () {
// 			return tooltip.style('visibility', 'hidden');
// 		})
// 		.attr('stroke', '#72DEC2')
// 		.attr('stroke-width', 8)
// 		.attr('stroke-linecap', 'round')
// 		.attr('fill', 'none')
// 		.transition()
// 		.duration(1500)
// 		.attrTween('stroke-dasharray', function () {
// 			var len = this.getTotalLength();
// 			return function (t) {
// 				return d3.interpolateString('0,' + len, len + ',0')(t);
// 			};
// 		});

// 	// const path2 = svg2
// 	// 	.append('path')
// 	// 	.attr('d', bezierLine(coordsPhysical))
// 	// 	.attr('stroke', '#FFB545')
// 	// 	.attr('stroke-width', 8)
// 	// 	.attr('stroke-linecap', 'round')
// 	// 	.attr('fill', 'none')
// 	// 	.transition()
// 	// 	.duration(1500)
// 	// 	.attrTween('stroke-dasharray', function () {
// 	// 		var len = this.getTotalLength();
// 	// 		return function (t) {
// 	// 			return d3.interpolateString('0,' + len, len + ',0')(t);
// 	// 		};
// 	// 	});

// 	// const path3 = svg3
// 	// 	.append('path')
// 	// 	.attr('d', bezierLine(coordsEmotional))
// 	// 	.attr('stroke', 'white')
// 	// 	.attr('stroke-width', 8)
// 	// 	.attr('stroke-linecap', 'round')
// 	// 	.attr('fill', 'none')
// 	// 	.transition()
// 	// 	.duration(1500)
// 	// 	.attrTween('stroke-dasharray', function () {
// 	// 		var len = this.getTotalLength();
// 	// 		return function (t) {
// 	// 			return d3.interpolateString('0,' + len, len + ',0')(t);
// 	// 		};
// 	// 	});
// }

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

	const coordsIntellectual = intellectualValues.map((x, i) => {
		return [i * 20, x];
	});

	const coordsPhysical = physicalValues.map((x, i) => {
		return [i * 20, x];
	});

	const coordsEmotional = emotionalValues.map((x, i) => {
		return [i * 20, x];
	});

	var scale = d3.scaleLinear().domain([-100, 100]).range([0, 100]).nice();

	//var x = d3.scaleLinear().domain([0, 30]).range([0, 600]).nice();

	var bezierLine = d3
		.line()
		.x(function (d) {
			return d[0];
		})
		.y(function (d) {
			return scale(d[1]);
		})
		.curve(d3.curveCardinal);

	var svg = d3
		.select('#minigraphs')
		.append('svg')
		.attr('width', '60vw')
		.attr('height', '300')
		.call(responsivefy)
		.append('g')
		.attr('stroke-linecap', 'round')
		.attr('stroke-width', 8)
		.attr('fill', 'none')
		.attr('id', 'test');
	// .append('g')
	// .attr('color',"white")
	// .attr('width', '60vw')
	// .attr('transform', 'translate(0,100)')
	// .call(d3.axisBottom(x));

	setTimeout(function () {
		// var rect = document.getElementById("test").getBoundingClientRect();
		// console.log(rect.width);
		//console.log(document.getElementById("test").offsetWidth);
		svg.attr('transform', 'translate(120,100)');
	}, 0);

	svg
		.append('path')
		.attr('class', 'intllectual')
		.attr('d', bezierLine(coordsIntellectual))
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
		.attr('d', bezierLine(coordsPhysical))
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
		.attr('d', bezierLine(coordsEmotional))
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

	var focus = svg.append('g').style('display', 'none');

	focus.append("circle")
        .attr("class", "y")                               
        .style("fill", "none")                            
        .style("stroke", "blue")                          
        .attr("r", 4);     
}

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