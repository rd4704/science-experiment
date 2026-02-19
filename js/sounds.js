/* ============================================
   SOUND EFFECTS - Web Audio API
   All sounds generated programmatically
   ============================================ */

const SoundFX = (() => {
    let ctx = null;

    function getContext() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        // Resume if suspended (mobile browsers require user gesture)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        return ctx;
    }

    // Unlock audio on first touch/click (iOS requirement)
    function unlock() {
        const c = getContext();
        const buf = c.createBuffer(1, 1, 22050);
        const src = c.createBufferSource();
        src.buffer = buf;
        src.connect(c.destination);
        src.start(0);
    }

    // --- Sound Generators ---

    function playTone(freq, duration, type = 'sine', volume = 0.3) {
        const c = getContext();
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, c.currentTime);
        gain.gain.setValueAtTime(volume, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, c.currentTime + duration);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(c.currentTime);
        osc.stop(c.currentTime + duration);
    }

    function tap() {
        playTone(800, 0.08, 'sine', 0.15);
    }

    function select() {
        const c = getContext();
        const now = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    function deselect() {
        const c = getContext();
        const now = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.linearRampToValueAtTime(400, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    function bubble() {
        const c = getContext();
        const now = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200 + Math.random() * 400, now);
        osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 400, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + 0.2);
    }

    function mixing() {
        // Multiple bubbly sounds
        for (let i = 0; i < 3; i++) {
            setTimeout(() => bubble(), i * 200);
        }
    }

    function creation() {
        const c = getContext();
        const now = c.currentTime;
        // Ascending magical tones
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.12);
            gain.gain.setValueAtTime(0, now + i * 0.12);
            gain.gain.linearRampToValueAtTime(0.2, now + i * 0.12 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.3);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(now + i * 0.12);
            osc.stop(now + i * 0.12 + 0.3);
        });
    }

    function bounce() {
        const c = getContext();
        const now = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }

    function spin() {
        const c = getContext();
        const now = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(1200, now + 0.5);
        osc.frequency.linearRampToValueAtTime(200, now + 0.8);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + 0.8);
    }

    function flip() {
        const c = getContext();
        const now = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(800, now + 0.15);
        osc.frequency.linearRampToValueAtTime(400, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + 0.4);
    }

    function shake() {
        const c = getContext();
        const now = c.currentTime;
        // Noise-like shake
        const bufferSize = c.sampleRate * 0.3;
        const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.1;
        }
        const noise = c.createBufferSource();
        noise.buffer = buffer;
        const gain = c.createGain();
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        noise.connect(gain);
        gain.connect(c.destination);
        noise.start(now);
    }

    function grow() {
        const c = getContext();
        const now = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.4);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.setValueAtTime(0.15, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + 0.5);
    }

    function colorChange() {
        playTone(660, 0.15, 'sine', 0.15);
        setTimeout(() => playTone(880, 0.15, 'sine', 0.15), 80);
    }

    function mazeMove() {
        playTone(440 + Math.random() * 200, 0.06, 'square', 0.05);
    }

    function mazeWall() {
        const c = getContext();
        const now = c.currentTime;
        const bufferSize = c.sampleRate * 0.1;
        const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.08;
        }
        const noise = c.createBufferSource();
        noise.buffer = buffer;
        const gain = c.createGain();
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        noise.connect(gain);
        gain.connect(c.destination);
        noise.start(now);
    }

    function win() {
        const c = getContext();
        const now = c.currentTime;
        // Victory fanfare
        const notes = [523, 659, 784, 1047, 1047, 784, 1047];
        const durations = [0.12, 0.12, 0.12, 0.12, 0.08, 0.12, 0.4];
        let t = 0;
        notes.forEach((freq, i) => {
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + t);
            gain.gain.setValueAtTime(0, now + t);
            gain.gain.linearRampToValueAtTime(0.25, now + t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, now + t + durations[i]);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(now + t);
            osc.stop(now + t + durations[i] + 0.1);
            t += durations[i];
        });
    }

    function pop() {
        const c = getContext();
        const now = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    }

    function whoosh() {
        const c = getContext();
        const now = c.currentTime;
        const bufferSize = c.sampleRate * 0.4;
        const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1);
        }
        const noise = c.createBufferSource();
        noise.buffer = buffer;
        const filter = c.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(500, now);
        filter.frequency.exponentialRampToValueAtTime(3000, now + 0.2);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.4);
        filter.Q.value = 2;
        const gain = c.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(c.destination);
        noise.start(now);
    }

    // Public API
    return {
        unlock,
        tap,
        select,
        deselect,
        bubble,
        mixing,
        creation,
        bounce,
        spin,
        flip,
        shake,
        grow,
        colorChange,
        mazeMove,
        mazeWall,
        win,
        pop,
        whoosh
    };
})();

// Unlock audio on first interaction
document.addEventListener('touchstart', SoundFX.unlock, { once: true });
document.addEventListener('click', SoundFX.unlock, { once: true });
