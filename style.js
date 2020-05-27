var supportablewWidth = 560;
var logoReveal = 5000;

animationGetter('prime-holder', 'display', 'none');
animationGetter('response', 'display', 'none');
animationGetter('modal', 'display', 'none');

function popLogoReveal() {
	animationGetter('logo-reveal', 'display', 'none');
	animationGetter('prime-holder', 'display', 'block');
	elementRemover('logo-reveal');
}
setTimeout(popLogoReveal, logoReveal);

function sampleWave() {
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
}

if (screen.width <= supportablewWidth) {
	animationGetter('about', 'display', 'none');
	elementRemover('modal');
	elementRemover('response');
	elementRemover('dob');
	document.getElementById('dob-title').innerHTML =
		'Thanks for visiting us, currenltly we dont suppport this device. But hey, we are constantly working';
	sampleWave();
} else {
	setTimeout(function () {
		animationGetter('footer', 'display', 'block');
		animationGetter('footer', 'opacity', '1');
	}, logoReveal + 1400);

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

*	Sample wave animation for first-hit

*/

	sampleWave();

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

/*

*	Chart headings

*/

	var dateToday = Date.parse(Date.today()).toString('dddd dd MMMM');
	document.getElementById('chart-title-today').innerHTML = `Biorhythm for Today, ${dateToday}`;
}
