/* ============================================
   ALPHABET GAME - Learn A-Z
   Fantasy-themed letter learning with unicorns,
   mermaids, rainbows for ages 3-5
   ============================================ */

const AlphabetGame = (() => {
    let currentIndex = 0;
    let score = 0;
    let mode = 'learn'; // 'learn' or 'find'

    // Fantasy-themed alphabet with fun words
    const alphabet = [
        { letter: 'A', word: 'Angel', emoji: '👼', color: '#FF6B6B' },
        { letter: 'B', word: 'Butterfly', emoji: '🦋', color: '#F472B6' },
        { letter: 'C', word: 'Crown', emoji: '👑', color: '#FBBF24' },
        { letter: 'D', word: 'Dragon', emoji: '🐉', color: '#34D399' },
        { letter: 'E', word: 'Elf', emoji: '🧝', color: '#60A5FA' },
        { letter: 'F', word: 'Fairy', emoji: '🧚', color: '#E879F9' },
        { letter: 'G', word: 'Gem', emoji: '💎', color: '#22D3EE' },
        { letter: 'H', word: 'Heart', emoji: '💖', color: '#FB7185' },
        { letter: 'I', word: 'Ice cream', emoji: '🍦', color: '#FDA4AF' },
        { letter: 'J', word: 'Jewel', emoji: '💍', color: '#A78BFA' },
        { letter: 'K', word: 'Kitten', emoji: '🐱', color: '#F0ABFC' },
        { letter: 'L', word: 'Lollipop', emoji: '🍭', color: '#F87171' },
        { letter: 'M', word: 'Mermaid', emoji: '🧜‍♀️', color: '#2DD4BF' },
        { letter: 'N', word: 'Narwhal', emoji: '🐳', color: '#818CF8' },
        { letter: 'O', word: 'Ocean', emoji: '🌊', color: '#38BDF8' },
        { letter: 'P', word: 'Princess', emoji: '👸', color: '#EC4899' },
        { letter: 'Q', word: 'Queen', emoji: '👑', color: '#D946EF' },
        { letter: 'R', word: 'Rainbow', emoji: '🌈', color: '#FB923C' },
        { letter: 'S', word: 'Star', emoji: '⭐', color: '#FBBF24' },
        { letter: 'T', word: 'Treasure', emoji: '🪙', color: '#F59E0B' },
        { letter: 'U', word: 'Unicorn', emoji: '🦄', color: '#E879F9' },
        { letter: 'V', word: 'Violet', emoji: '🌺', color: '#8B5CF6' },
        { letter: 'W', word: 'Wand', emoji: '🪄', color: '#A78BFA' },
        { letter: 'X', word: 'Xylophone', emoji: '🎵', color: '#F472B6' },
        { letter: 'Y', word: 'Yarn', emoji: '🧶', color: '#FB7185' },
        { letter: 'Z', word: 'Zebra', emoji: '🦓', color: '#6366F1' },
    ];

    const rainbowBg = [
        'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
        'linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)',
        'linear-gradient(135deg, #FAD0C4 0%, #FFD1FF 100%)',
        'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)',
        'linear-gradient(135deg, #FDCBF1 0%, #E6DEE9 100%)',
    ];

    function start() {
        currentIndex = 0;
        score = 0;
        mode = 'learn';
        showLetter();
    }

    function showLetter() {
        const container = document.getElementById('alphabet-game-area');
        if (!container) return;

        const item = alphabet[currentIndex];

        updateProgress();

        // Alternate modes - first half mostly learn, second half more find
        if (currentIndex < 8) {
            mode = 'learn';
        } else {
            mode = Math.random() > 0.3 ? 'find' : 'learn';
        }

        if (mode === 'learn') {
            renderLearnMode(container, item);
        } else {
            renderFindMode(container, item);
        }
    }

    function updateProgress() {
        const progressEl = document.getElementById('alphabet-progress');
        const scoreEl = document.getElementById('alphabet-score');
        if (progressEl) {
            const pct = (currentIndex / 26) * 100;
            progressEl.style.width = pct + '%';
        }
        if (scoreEl) {
            scoreEl.textContent = `⭐ ${score}`;
        }
    }

    function renderLearnMode(container, item) {
        const bg = rainbowBg[currentIndex % rainbowBg.length];

        container.innerHTML = `
            <div class="alpha-learn-card" style="background:${bg}">
                <div class="alpha-big-letter alpha-letter-bounce" style="color:${item.color}">${item.letter}</div>
                <div class="alpha-word-row">
                    <span class="alpha-emoji alpha-emoji-float">${item.emoji}</span>
                    <span class="alpha-word">${item.word}</span>
                </div>
                <div class="alpha-trace-hint">
                    <span class="alpha-small-letter">${item.letter.toLowerCase()}</span>
                    <span class="alpha-is-for">is for</span>
                    <span class="alpha-small-word">${item.word}</span>
                </div>
            </div>
            <div class="alpha-action-row">
                <button class="alpha-say-btn" onclick="AlphabetGame.sayLetter()">
                    🔊 Hear It!
                </button>
                <button class="alpha-next-btn" onclick="AlphabetGame.nextLetter()">
                    Next ➡️
                </button>
            </div>
        `;

        // Auto-speak the letter
        setTimeout(() => sayLetter(), 500);
    }

    function renderFindMode(container, item) {
        // Generate 4 letter choices including the correct one
        const choices = generateLetterChoices(item.letter);

        let choicesHTML = '';
        choices.forEach(ch => {
            const letterData = alphabet.find(a => a.letter === ch);
            const color = letterData ? letterData.color : '#818CF8';
            choicesHTML += `<button class="alpha-find-btn" style="border-color:${color}; color:${color}" onclick="AlphabetGame.pickLetter('${ch}', this)">
                ${ch}
            </button>`;
        });

        container.innerHTML = `
            <div class="alpha-find-prompt">
                <div class="alpha-find-emoji alpha-emoji-float">${item.emoji}</div>
                <h3 class="alpha-find-question">
                    Which letter does<br><strong>${item.word}</strong> start with?
                </h3>
            </div>
            <div class="alpha-find-choices">
                ${choicesHTML}
            </div>
        `;
    }

    function generateLetterChoices(correct) {
        const choices = new Set([correct]);
        const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        while (choices.size < 4) {
            const random = allLetters[Math.floor(Math.random() * 26)];
            choices.add(random);
        }
        return shuffleArray([...choices]);
    }

    function pickLetter(letter, btn) {
        const item = alphabet[currentIndex];

        // Disable all buttons
        document.querySelectorAll('.alpha-find-btn').forEach(b => {
            b.style.pointerEvents = 'none';
        });

        if (letter === item.letter) {
            btn.classList.add('alpha-find-correct');
            score++;
            SoundFX.win();
            spawnCelebration();
            setTimeout(() => advance(), 1200);
        } else {
            btn.classList.add('alpha-find-wrong');
            SoundFX.deselect();
            // Highlight correct
            document.querySelectorAll('.alpha-find-btn').forEach(b => {
                if (b.textContent.trim() === item.letter) {
                    b.classList.add('alpha-find-correct');
                }
            });
            setTimeout(() => showLetter(), 1500); // Retry same letter
        }
    }

    function sayLetter() {
        const item = alphabet[currentIndex];
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(`${item.letter} is for ${item.word}`);
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            window.speechSynthesis.speak(utterance);
        }
        SoundFX.pop();
    }

    function nextLetter() {
        score++;
        SoundFX.select();
        spawnCelebration();
        setTimeout(() => advance(), 600);
    }

    function advance() {
        if (currentIndex >= 25) {
            ScienceApp.showWin(`🌈 You learned all 26 letters! ⭐ ${score} stars!`);
        } else {
            currentIndex++;
            showLetter();
        }
    }

    function spawnCelebration() {
        const container = document.getElementById('alphabet-game-area');
        const celebEmojis = ['🦄', '🌈', '✨', '🧜‍♀️', '⭐', '💖', '🧚', '👑'];
        for (let i = 0; i < 6; i++) {
            const spark = document.createElement('span');
            spark.className = 'sparkle';
            spark.textContent = celebEmojis[Math.floor(Math.random() * celebEmojis.length)];
            spark.style.left = (15 + Math.random() * 70) + '%';
            spark.style.top = (15 + Math.random() * 70) + '%';
            spark.style.fontSize = '2rem';
            container.appendChild(spark);
            setTimeout(() => spark.remove(), 1000);
        }
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    return {
        start,
        sayLetter,
        nextLetter,
        pickLetter
    };
})();
