/* ============================================
   COUNTING GAME - Learn numbers 1-20
   Fantasy-themed counting with unicorns,
   mermaids, rainbows for ages 3-5
   ============================================ */

const CountingGame = (() => {
    let currentNumber = 1;
    let score = 0;
    let totalRounds = 20;
    let mode = 'count'; // 'count' = tap to count, 'pick' = pick the number

    // Fantasy creatures and objects to count
    const countThemes = [
        { emoji: '🦄', name: 'unicorn', plural: 'unicorns', color: '#E879F9' },
        { emoji: '🧜‍♀️', name: 'mermaid', plural: 'mermaids', color: '#22D3EE' },
        { emoji: '🌈', name: 'rainbow', plural: 'rainbows', color: '#F472B6' },
        { emoji: '⭐', name: 'star', plural: 'stars', color: '#FBBF24' },
        { emoji: '🦋', name: 'butterfly', plural: 'butterflies', color: '#A78BFA' },
        { emoji: '🌸', name: 'flower', plural: 'flowers', color: '#FB7185' },
        { emoji: '🧚', name: 'fairy', plural: 'fairies', color: '#34D399' },
        { emoji: '💎', name: 'gem', plural: 'gems', color: '#60A5FA' },
        { emoji: '🍭', name: 'lollipop', plural: 'lollipops', color: '#F87171' },
        { emoji: '🎀', name: 'ribbon', plural: 'ribbons', color: '#EC4899' },
        { emoji: '🐚', name: 'shell', plural: 'shells', color: '#FDA4AF' },
        { emoji: '🪷', name: 'lotus', plural: 'lotuses', color: '#F0ABFC' },
    ];

    // Rainbow colors for number buttons
    const rainbowColors = [
        '#FF6B6B', '#FF8E53', '#FBBF24', '#34D399', '#22D3EE',
        '#818CF8', '#A78BFA', '#E879F9', '#F472B6', '#FB7185'
    ];

    let currentTheme = null;
    let tapCount = 0;

    function start() {
        currentNumber = 1;
        score = 0;
        showRound();
    }

    function showRound() {
        tapCount = 0;
        currentTheme = countThemes[Math.floor(Math.random() * countThemes.length)];

        const container = document.getElementById('counting-game-area');
        if (!container) return;

        // Alternate between counting mode and picking mode
        mode = currentNumber <= 5 ? 'count' : (Math.random() > 0.4 ? 'pick' : 'count');

        updateProgress();

        if (mode === 'count') {
            renderCountMode();
        } else {
            renderPickMode();
        }
    }

    function updateProgress() {
        const progressEl = document.getElementById('counting-progress');
        const scoreEl = document.getElementById('counting-score');
        if (progressEl) {
            const pct = ((currentNumber - 1) / totalRounds) * 100;
            progressEl.style.width = pct + '%';
        }
        if (scoreEl) {
            scoreEl.textContent = `⭐ ${score}`;
        }
    }

    function renderCountMode() {
        const container = document.getElementById('counting-game-area');
        const theme = currentTheme;

        // Create items to count
        let itemsHTML = '';
        for (let i = 0; i < currentNumber; i++) {
            const delay = i * 0.1;
            itemsHTML += `<button class="counting-item counting-item-pop" style="animation-delay:${delay}s" data-index="${i}" onclick="CountingGame.tapItem(this)">
                <span class="counting-item-emoji">${theme.emoji}</span>
            </button>`;
        }

        container.innerHTML = `
            <div class="counting-prompt">
                <h3 class="counting-question">Tap each ${theme.name} to count!</h3>
                <div class="counting-big-number" id="counting-tap-display" style="color:${theme.color}">0</div>
            </div>
            <div class="counting-items-grid" id="counting-items-grid">
                ${itemsHTML}
            </div>
            <div class="counting-confirm" id="counting-confirm" style="display:none">
                <button class="counting-done-btn" onclick="CountingGame.checkCount()">
                    ✅ I counted them all!
                </button>
            </div>
        `;
    }

    function tapItem(el) {
        if (el.classList.contains('counted')) return;

        el.classList.add('counted');
        tapCount++;
        SoundFX.pop();

        const display = document.getElementById('counting-tap-display');
        if (display) {
            display.textContent = tapCount;
            display.classList.remove('counting-number-bump');
            void display.offsetWidth;
            display.classList.add('counting-number-bump');
        }

        // Show sparkle on the item
        el.innerHTML += '<span class="counting-sparkle">✨</span>';

        if (tapCount === currentNumber) {
            // All counted! Show confirm
            const confirm = document.getElementById('counting-confirm');
            if (confirm) confirm.style.display = 'flex';
        }
    }

    function checkCount() {
        if (tapCount === currentNumber) {
            correctAnswer();
        }
    }

    function renderPickMode() {
        const container = document.getElementById('counting-game-area');
        const theme = currentTheme;

        // Create items to display
        let itemsHTML = '';
        for (let i = 0; i < currentNumber; i++) {
            const delay = i * 0.08;
            itemsHTML += `<div class="counting-item counting-item-pop" style="animation-delay:${delay}s">
                <span class="counting-item-emoji">${theme.emoji}</span>
            </div>`;
        }

        // Generate answer choices (3 choices including correct one)
        const choices = generateChoices(currentNumber);

        let choicesHTML = '';
        choices.forEach(num => {
            const color = rainbowColors[(num - 1) % rainbowColors.length];
            choicesHTML += `<button class="counting-choice-btn" style="background:${color}" onclick="CountingGame.pickAnswer(${num}, this)">
                ${num}
            </button>`;
        });

        container.innerHTML = `
            <div class="counting-prompt">
                <h3 class="counting-question">How many ${currentNumber === 1 ? theme.name + 's' : theme.plural} do you see?</h3>
            </div>
            <div class="counting-items-grid">
                ${itemsHTML}
            </div>
            <div class="counting-choices">
                ${choicesHTML}
            </div>
        `;
    }

    function generateChoices(correct) {
        const choices = new Set([correct]);
        while (choices.size < 3) {
            let wrong;
            if (correct <= 3) {
                wrong = Math.floor(Math.random() * 5) + 1;
            } else {
                const offset = Math.random() > 0.5 ? 
                    Math.floor(Math.random() * 3) + 1 : 
                    -(Math.floor(Math.random() * 3) + 1);
                wrong = Math.max(1, Math.min(20, correct + offset));
            }
            if (wrong !== correct) choices.add(wrong);
        }
        return shuffleArray([...choices]);
    }

    function pickAnswer(num, btn) {
        // Disable all buttons
        document.querySelectorAll('.counting-choice-btn').forEach(b => {
            b.style.pointerEvents = 'none';
        });

        if (num === currentNumber) {
            btn.classList.add('counting-choice-correct');
            correctAnswer();
        } else {
            btn.classList.add('counting-choice-wrong');
            SoundFX.deselect();
            // Show correct answer
            document.querySelectorAll('.counting-choice-btn').forEach(b => {
                if (parseInt(b.textContent) === currentNumber) {
                    b.classList.add('counting-choice-correct');
                }
            });
            // Retry after delay
            setTimeout(() => {
                showRound(); // Same number, try again
            }, 1500);
        }
    }

    function correctAnswer() {
        score++;
        SoundFX.win();

        // Show celebration
        const container = document.getElementById('counting-game-area');
        const celebEmojis = ['🦄', '🌈', '✨', '🧜‍♀️', '⭐', '🎀', '💖'];
        for (let i = 0; i < 6; i++) {
            const spark = document.createElement('span');
            spark.className = 'sparkle';
            spark.textContent = celebEmojis[Math.floor(Math.random() * celebEmojis.length)];
            spark.style.left = (20 + Math.random() * 60) + '%';
            spark.style.top = (20 + Math.random() * 60) + '%';
            spark.style.fontSize = '2rem';
            container.appendChild(spark);
            setTimeout(() => spark.remove(), 1000);
        }

        if (currentNumber >= totalRounds) {
            // Game complete!
            setTimeout(() => {
                ScienceApp.showWin(`🦄 You counted to ${totalRounds}! ⭐ ${score} stars!`);
            }, 1200);
        } else {
            currentNumber++;
            setTimeout(() => showRound(), 1200);
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
        tapItem,
        checkCount,
        pickAnswer
    };
})();
