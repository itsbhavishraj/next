import { AudioStream } from './audio_stream';

export async function initializeWaveGenerator(
	audioContext: AudioContext,
	canvasId: string,
	mediaStream: MediaStream,
	color: string
) {
	const fftSize = 32;
	const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

	class Bar {
		x: number;
		y: number;
		width: number;
		height: number;
		color: string;

		constructor(x: number, y: number, width: number, height: number, color: string) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.color = color;
		}

		update(micInput: number) {
			const sound = micInput * 50;
			if (sound > this.height) {
				this.height = sound;
			} else {
				this.height -= this.height * 0.1;
			}
			// this.height = micInput * 1000;
		}

		draw(context: CanvasRenderingContext2D) {
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.width, this.height);
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.width, -this.height);
		}
	}

	const microphone = new AudioStream(audioContext, fftSize, mediaStream);

	const bars: Bar[] = [];
	const barWidth = canvas.width / (fftSize / 2);
	function createBars() {
		for (let i = 0; i < fftSize / 2; i++) {
			// const color = `hsl(${i}, 100%, 50%)`
			bars.push(new Bar(i * barWidth, canvas.height / 2, 2, 0, color));
		}
	}

	createBars();

	function animate() {
		if (microphone.initialized) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const samples = microphone.getSamples();

			bars.forEach(function (bar, i) {
				bar.update(samples[i]);
				bar.draw(ctx);
			});
		}

		requestAnimationFrame(animate);
	}

	animate();
}
