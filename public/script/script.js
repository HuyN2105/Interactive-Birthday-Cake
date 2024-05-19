const container = document.querySelector('.firework');
const fireworks = new Fireworks.default(container);

let candle = (n) => {
	if (n == 1) {
		document.querySelector('.candle .flame').style.animation =
			'flicker .2s ease-in-out alternate infinite';
	}
	if (n == 2) {
		document.querySelector('.candle2 .flame').style.animation =
			'flicker .2s ease-in-out alternate infinite';
	}
	if (n == 3) {
		document.querySelector('.candle3 .flame').style.animation =
			'flicker .2s ease-in-out alternate infinite';
		document.querySelector('.candle .flame').style.display = 'none';
	}
	if (n == 4) {
		document.querySelector('.candle2 .flame').style.display = 'none';
		fireworks.start();
	}
	if (n == 5) {
		document.querySelector('.candle3 .flame').style.display = 'none';
		document.getElementById('HUYN').className = 'rainbow rainbow_text_animated';
		document.getElementById('HUYN').textContent = 'HAPPY BIRTHDAY!!!';
	}
};

navigator.mediaDevices
	.getUserMedia({
		audio: true,
		video: false,
	})
	.then(function (stream) {
		const audioContext = new AudioContext();
		const analyser = audioContext.createAnalyser();
		const microphone = audioContext.createMediaStreamSource(stream);
		const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

		analyser.smoothingTimeConstant = 0.8;
		analyser.fftSize = 1024;

		microphone.connect(analyser);
		analyser.connect(scriptProcessor);
		scriptProcessor.connect(audioContext.destination);
		scriptProcessor.onaudioprocess = function () {
			const array = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(array);
			const arraySum = array.reduce((a, value) => a + value, 0);
			const average = arraySum / array.length;

			if (average >= 50) {
				console.log(Math.round(average));
				var c = 0;
				setInterval(() => {
					c++;
					candle(c);
				}, 150);
			}
		};
	})
	.catch(function (err) {
		/* handle the error */
		console.error('ERROR OCCURRED');
	});
