function popLogoReveal() {
	document.getElementById('logo-reveal').style.display =
		'none';
	//document.getElementById('logo-reveal').style.transition="opacity";
	document.getElementById('logo-reveal').style.opacity = '0';
}
setTimeout(popLogoReveal, 0000);

document.getElementById('what-content').textContent =
	'mirai is based on the Biorhythm Theory. It works on the belief that human lives move in predictable separate cycles. The major three cycles are Physical, Emotional and Intellectual. The concept of these cycles start from the day of your birth and they repeat every 58 years, 2 months and about 7 days depending on the position of the leap years and length of the month.';
document.getElementById('how-content').textContent =
	'mirai uses mathematical formulas to compute the prediction. These are sin functions of constants and variables. Drop me an email to understand the math behind :)';
document.getElementById('graph').textContent =
	'Your biorhythm above the horizontal line indicates that your capacity in that area is enhanced; you feel stronger, more alert, more connected, more empathetic. These are times when you are able to do more, be more, enjoy more. When the biorhythm lines are below 0%, your capacity is diminished, and conservative behavior is recommended. The cross-section of all three curves has the strongest meaning and usually announces a particular event or phase (positive or negative) in which you are.';
document.getElementById('trust').textContent =
	'mirai works on the belief of a study first tried in late 19th century. The output from mirai is mere a implication of this study. We do not state this as your future or any other calculation.';

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

var dataBinder = [];

for (i = 0; i < values.length; i++) {
	dataBinder[i] = values[i];
	console.log(dataBinder[i]);

	for (j = 0; j < values.length; j++) {
		dataBinder[i][j] = dataBinder[i];
	}
}

//console.log(dataBinder);
var scale = d3
	.scaleLinear()
	.domain([-120, 120])
	.range([200, 0]);

var bezierLine = d3
	.line()
	.x(function (d) {
		return d[0];
	})
	.y(function (d) {
		return scale(d[1]);
	})
	.curve(d3.curveBasis);

var svg = d3
	.select('#intellectual')
	.append('svg')
	.attr('width', 400)
	.attr('height', 240)
	.attr('transform', 'scale(0.5)')
	.attr('preserveAspectRatio', 'xMidYMid meet');

const path = svg
	.append('path')
	.attr(
		'd',
		bezierLine([
			[0, -62],
			[10, -76],
			[20, -87],
			[30, -95],
			[40, -99],
			[50, -100],
			[60, -97],
			[70, -91],
			[80, -81],
			[90, -69],
			[100, -54],
			[110, -37],
			[120, -19],
			[130, 0],
			[140, 19],
			[150, 37],
			[160, 54],
			[170, 69],
			[180, 81],
			[190, 91],
			[200, 97],
			[210, 100],
			[220, 99],
		]),
	)
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

	document.querySelector('path').setAttribute('d', path);

	t += 1;

	requestAnimationFrame(animate);
}

animate();

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".about");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);