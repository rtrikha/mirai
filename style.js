/*

*	Popping the logoReveal

*/
document.getElementById('prime-holder').style.display = 'none';
document.getElementById('response').style.display = 'none';

function popLogoReveal() {
	document.getElementById('logo-reveal').style.display = 'none';
	document.getElementById('logo-reveal').style.opacity = '0';
	document.getElementById('logo-reveal').remove();
	document.getElementById('prime-holder').style.display = 'block';
}
setTimeout(popLogoReveal, 0000);

setTimeout(function () {
	document.getElementById('footer').style.opacity = '1';
	document.getElementById('footer').style.transition = 'opacity 0.3s';
	
	document.getElementById('footer').style.display = 'block';
}, 1500);

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

//

var dateToday = Date.parse(Date.today()).toString('dddd dd MMMM');
document.getElementById('chart-title-today').innerHTML = `Biorhythm for Today, ${dateToday}`;
