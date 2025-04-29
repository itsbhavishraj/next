export class AudioStream {
	initialized: boolean = false;
	audioContext: AudioContext | undefined;
	microphone: MediaStreamAudioSourceNode | undefined;
	analyser: AnalyserNode | undefined;
	dataArray: Uint8Array = new Uint8Array();

	constructor(audioContext: AudioContext, fftSize: number, mediaStream: MediaStream) {
		// const this_binding = this;
		this.audioContext = audioContext;
		this.microphone = this.audioContext.createMediaStreamSource(mediaStream);
		this.analyser = this.audioContext.createAnalyser();
		this.analyser.fftSize = fftSize;

		const bufferLength = this.analyser.frequencyBinCount;
		this.dataArray = new Uint8Array(bufferLength);

		this.microphone.connect(this.analyser);

		this.initialized = true;
	}

	rms(dataArray: number[]) {
		// root mean square
		let sum = 0;
		for (let i = 0; i < dataArray.length; i++) {
			sum += dataArray[i] * dataArray[i];
		}
		return Math.sqrt(sum / dataArray.length);
	}

	getSamples() {
		this.analyser?.getByteTimeDomainData(this.dataArray);
		// the dataArray will have values ranging from 0 to 255
		// we are normalising the array to be in range -1 to 1
		const normSamples = [...this.dataArray].map((e) => e / 128 - 1);
		return normSamples;
	}

	getVolume() {
		// volume here refers to getting the average of the samples
		const normSamples = this.getSamples();
		const volume = this.rms(normSamples);
		return volume;
	}
}
