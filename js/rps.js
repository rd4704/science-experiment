/* ============================================
   ROCK PAPER SCISSORS - vs Computer
   Truly random computer picks every time
   ============================================ */

const RPSGame = (() => {
    const choices = ['rock', 'paper', 'scissors'];
    const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    const labels = { rock: 'Rock', paper: 'Paper', scissors: 'Scissors' };
    let scores = { player: 0, computer: 0, draw: 0 };
    let roundCount = 0;
    let isAnimating = false;
    let streak = 0;

    function init() {
        scores = { player: 0, computer: 0, draw: 0 };
        roundCount = 0;
        streak = 0;
        updateScoreboard();
        resetDisplay();
    }

    function play(playerChoice) {
        if (isAnimating) return;
        isAnimating = true;
        SoundFX.tap();

        // Truly random computer choice using crypto API if available
        let computerChoice;
        if (window.crypto && window.crypto.getRandomValues) {
            const arr = new Uint32Array(1);
            window.crypto.getRandomValues(arr);
            computerChoice = choices[arr[0] % 3];
        } else {
            computerChoice = choices[Math.floor(Math.random() * 3)];
        }

        roundCount++;

        // Show countdown animation
        animateCountdown(playerChoice, computerChoice);
    }

    function animateCountdown(playerChoice, computerChoice) {
        const playerEl = document.getElementById('rps-player-choice');
        const computerEl = document.getElementById('rps-computer-choice');
        const resultEl = document.getElementById('rps-result');
        const vsEl = document.getElementById('rps-vs');

        resultEl.textContent = '';
        resultEl.className = 'rps-result';
        vsEl.textContent = 'VS';

        // Shake animation - cycle through emojis quickly
        const shakeEmojis = ['🪨', '📄', '✂️'];
        let tick = 0;
        const shakeInterval = setInterval(() => {
            playerEl.textContent = shakeEmojis[tick % 3];
            computerEl.textContent = shakeEmojis[(tick + 1) % 3];
            tick++;
            if (tick % 3 === 0) SoundFX.tap();
        }, 100);

        // Show player choice after short delay
        setTimeout(() => {
            playerEl.textContent = emojis[playerChoice];
            playerEl.classList.add('rps-reveal');
            SoundFX.pop();
        }, 600);

        // Reveal computer choice
        setTimeout(() => {
            clearInterval(shakeInterval);
            computerEl.textContent = emojis[computerChoice];
            computerEl.classList.add('rps-reveal');
            SoundFX.pop();
        }, 1000);

        // Show result
        setTimeout(() => {
            const result = getResult(playerChoice, computerChoice);
            showResult(result, playerChoice, computerChoice);
            isAnimating = false;
        }, 1400);
    }

    function getResult(player, computer) {
        if (player === computer) return 'draw';
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) return 'win';
        return 'lose';
    }

    function showResult(result, playerChoice, computerChoice) {
        const resultEl = document.getElementById('rps-result');
        const playerEl = document.getElementById('rps-player-choice');
        const computerEl = document.getElementById('rps-computer-choice');

        // Remove old classes
        playerEl.classList.remove('rps-winner', 'rps-loser');
        computerEl.classList.remove('rps-winner', 'rps-loser');

        switch (result) {
            case 'win':
                scores.player++;
                streak++;
                resultEl.textContent = `You win! ${emojis[playerChoice]} beats ${emojis[computerChoice]}`;
                resultEl.className = 'rps-result rps-result-win';
                playerEl.classList.add('rps-winner');
                computerEl.classList.add('rps-loser');
                SoundFX.creation();
                if (streak >= 3) {
                    spawnCelebration();
                }
                break;
            case 'lose':
                scores.computer++;
                streak = 0;
                resultEl.textContent = `Computer wins! ${emojis[computerChoice]} beats ${emojis[playerChoice]}`;
                resultEl.className = 'rps-result rps-result-lose';
                computerEl.classList.add('rps-winner');
                playerEl.classList.add('rps-loser');
                SoundFX.mazeWall();
                break;
            case 'draw':
                scores.draw++;
                resultEl.textContent = `It's a tie! ${emojis[playerChoice]} = ${emojis[computerChoice]}`;
                resultEl.className = 'rps-result rps-result-draw';
                SoundFX.bounce();
                break;
        }

        updateScoreboard();

        // Check for milestone wins
        if (scores.player === 5 && scores.player > scores.computer) {
            setTimeout(() => {
                ScienceApp.showWin(`🏆 You reached 5 wins! Amazing! (${scores.player}-${scores.computer})`);
            }, 1000);
        }
    }

    function spawnCelebration() {
        const area = document.getElementById('rps-arena');
        if (!area) return;
        const celebEmojis = ['⭐', '🌟', '✨', '💫', '🎉', '🎊'];
        for (let i = 0; i < 8; i++) {
            const s = document.createElement('span');
            s.className = 'sparkle';
            s.textContent = celebEmojis[Math.floor(Math.random() * celebEmojis.length)];
            s.style.left = (20 + Math.random() * 60) + '%';
            s.style.top = (20 + Math.random() * 60) + '%';
            area.appendChild(s);
            setTimeout(() => s.remove(), 800);
        }
    }

    function updateScoreboard() {
        const el = document.getElementById('rps-scoreboard');
        if (el) el.textContent = `🧑‍🔬 ${scores.player}  -  ${scores.draw}  -  ${scores.computer} 🤖`;

        const streakEl = document.getElementById('rps-streak');
        if (streakEl) {
            if (streak >= 2) {
                streakEl.textContent = `🔥 ${streak} win streak!`;
                streakEl.style.display = 'block';
            } else {
                streakEl.style.display = 'none';
            }
        }

        const roundEl = document.getElementById('rps-round');
        if (roundEl) roundEl.textContent = `Round ${roundCount + 1}`;
    }

    function resetDisplay() {
        const playerEl = document.getElementById('rps-player-choice');
        const computerEl = document.getElementById('rps-computer-choice');
        const resultEl = document.getElementById('rps-result');
        if (playerEl) {
            playerEl.textContent = '❓';
            playerEl.classList.remove('rps-reveal', 'rps-winner', 'rps-loser');
        }
        if (computerEl) {
            computerEl.textContent = '❓';
            computerEl.classList.remove('rps-reveal', 'rps-winner', 'rps-loser');
        }
        if (resultEl) {
            resultEl.textContent = 'Pick your move!';
            resultEl.className = 'rps-result';
        }
    }

    function newGame() {
        SoundFX.whoosh();
        init();
    }

    function start() {
        init();
    }

    return {
        start,
        play,
        newGame
    };
})();
