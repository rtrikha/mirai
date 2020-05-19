function popLogoReveal() {
	document.getElementById('logo-reveal').style.display =
		'none';
	document.getElementById('logo-reveal').style.opacity = '0';
}
setTimeout(popLogoReveal, 0000);

var date = document.getElementById('dob');


function checkValue(str, max) {
	if (str.charAt(0) !== '0' || str == '00') {
		var num = parseInt(str);
		if (isNaN(num) || num <= 0 || num > max) num = 1;
		str =
			num > parseInt(max.toString().charAt(0)) &&
			num.toString().length == 1
				? '0' + num
				: num.toString();
	}
	return str;
}

date.addEventListener('input', function (e) {
	this.type = 'text';
	var input = this.value;
	if (/\D\/$/.test(input))
		input = input.substr(0, input.length - 3);
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

//d3

function loadGraph(){

	const dataBinder1 = intellectualValues.map((x, i) => {
		return [i * 20, x];
	});
	
	const dataBinder2 = physicalValues.map((x, i) => {
		return [i * 20, x];
	});
	
	const dataBinder3 = emotionalValues.map((x, i) => {
		return [i * 20, x];
	});
	
	var coordsIntellectual = dataBinder1;
	var coordsPhysical = dataBinder2;
	var coordsEmotional = dataBinder3;
	
	var scale = d3
		.scaleLinear()
		.domain([-240, 240])
		.range([300, 0]);
	
	var bezierLine = d3
		.line()
		.x(function (d) {
			return d[0];
		})
		.y(function (d) {
			return scale(d[1]);
		})
		.curve(d3.curveBasis);
	
	var svg1 = d3
		.select('#intellectual')
		.append('svg')
		.attr('width', 800)
		.attr('height', 240)
		//.attr("viewBox", "0 0 800 240")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.classed("svg-content", true)
		//.attr('transform', 'scale(0.5)')
	
	var svg2 = d3
		.select('#physical')
		.append('svg')
		.attr('width', 800)
		.attr('height', 240)
		//.attr('transform', 'scale(0.5)')
	
	var svg3 = d3
		.select('#emotional')
		.append('svg')
		.attr('width', 800)
		.attr('height', 240)
		//.attr('transform', 'scale(0.5)')
	
	const path1 = svg1
		.append('path')
		.attr('d', bezierLine(coordsIntellectual))
		.attr('stroke', '#72DEC2')
		.attr('stroke-width', 8)
		.attr('stroke-linecap', 'round')
		.attr('fill', 'none')
		.transition()
		.duration(1500)
		.attrTween('stroke-dasharray', function () {
			var len = this.getTotalLength();
			return function (t) {
				return d3.interpolateString('0,' + len, len + ',0')(t);
			};
		});
	
	const path2 = svg2
		.append('path')
		.attr('d', bezierLine(coordsPhysical))
		.attr('stroke', '#FFB545')
		.attr('stroke-width', 8)
		.attr('stroke-linecap', 'round')
		.attr('fill', 'none')
		.transition()
		.duration(1500)
		.attrTween('stroke-dasharray', function () {
			var len = this.getTotalLength();
			return function (t) {
				return d3.interpolateString('0,' + len, len + ',0')(t);
			};
		});
	
	const path3 = svg3
		.append('path')
		.attr('d', bezierLine(coordsEmotional))
		.attr('stroke', 'white')
		.attr('stroke-width', 8)
		.attr('stroke-linecap', 'round')
		.attr('fill', 'none')
		.transition()
		.duration(1500)
		.attrTween('stroke-dasharray', function () {
			var len = this.getTotalLength();
			return function (t) {
				return d3.interpolateString('0,' + len, len + ',0')(t);
			};
		});

}


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
