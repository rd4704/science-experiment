/* ============================================
   TIC-TAC-TOE - Fun 2-player or vs Computer
   Touch-friendly for young kids
   ============================================ */

const TicTacToe = (() => {
    let board = [];
    let currentPlayer = 'X'; // X = player 1 (🧑‍🔬), O = player 2 / computer (🤖)
    let gameOver = false;
    let vsComputer = true;
    let scores = { X: 0, O: 0, draw: 0 };
    let winLine = null;
    let playerEmojis = { X: '🧑‍🔬', O: '🤖' };
    let cellEmojis = { X: '❌', O: '⭕' };

    function init() {
        reset();
        renderBoard();
        updateStatus();
        updateScoreboard();
    }

    function reset() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameOver = false;
        winLine = null;
        renderBoard();
        updateStatus();
    }

    function renderBoard() {
        const container = document.getElementById('ttt-board');
        if (!container) return;
        container.innerHTML = '';
        board.forEach((cell, i) => {
            const btn = document.createElement('button');
            btn.className = 'ttt-cell';
            if (cell) btn.classList.add('ttt-cell-filled', `ttt-cell-${cell}`);
            if (winLine && winLine.includes(i)) btn.classList.add('ttt-cell-win');
            btn.dataset.index = i;
            btn.textContent = cell ? cellEmojis[cell] : '';
            btn.addEventListener('click', () => handleCellClick(i));
            container.appendChild(btn);
        });
    }

    function handleCellClick(index) {
        if (gameOver) return;
        if (board[index] !== '') return;
        if (vsComputer && currentPlayer === 'O') return; // Wait for computer

        makeMove(index);
    }

    function makeMove(index) {
        board[index] = currentPlayer;
        SoundFX.pop();

        // Animate the cell
        const cells = document.querySelectorAll('.ttt-cell');
        if (cells[index]) {
            cells[index].textContent = cellEmojis[currentPlayer];
            cells[index].classList.add('ttt-cell-filled', `ttt-cell-${currentPlayer}`);
            cells[index].classList.add('ttt-cell-pop');
            setTimeout(() => cells[index].classList.remove('ttt-cell-pop'), 300);
        }

        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            winLine = getWinLine();
            highlightWin();
            scores[winner]++;
            updateScoreboard();
            SoundFX.win();

            setTimeout(() => {
                const msg = winner === 'draw'
                    ? "It's a draw! 🤝"
                    : `${playerEmojis[winner]} ${winner === 'X' ? 'Player 1' : (vsComputer ? 'Computer' : 'Player 2')} wins!`;
                ScienceApp.showWin(msg);
            }, 800);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();

        // Computer's turn
        if (vsComputer && currentPlayer === 'O' && !gameOver) {
            setTimeout(() => {
                computerMove();
            }, 500 + Math.random() * 500);
        }
    }

    function computerMove() {
        if (gameOver) return;

        // Simple AI: try to win, then block, then center, then random
        let move = findWinningMove('O');
        if (move === -1) move = findWinningMove('X'); // block
        if (move === -1 && board[4] === '') move = 4;  // center
        if (move === -1) {
            // Random available
            const available = board.map((c, i) => c === '' ? i : -1).filter(i => i !== -1);
            move = available[Math.floor(Math.random() * available.length)];
        }

        if (move !== -1 && move !== undefined) {
            makeMove(move);
        }
    }

    function findWinningMove(player) {
        const lines = getLines();
        for (const line of lines) {
            const vals = line.map(i => board[i]);
            const playerCount = vals.filter(v => v === player).length;
            const emptyCount = vals.filter(v => v === '').length;
            if (playerCount === 2 && emptyCount === 1) {
                return line[vals.indexOf('')];
            }
        }
        return -1;
    }

    function getLines() {
        return [
            [0,1,2], [3,4,5], [6,7,8], // rows
            [0,3,6], [1,4,7], [2,5,8], // cols
            [0,4,8], [2,4,6]            // diagonals
        ];
    }

    function checkWinner() {
        const lines = getLines();
        for (const line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if (board.every(cell => cell !== '')) return 'draw';
        return null;
    }

    function getWinLine() {
        const lines = getLines();
        for (const line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return line;
            }
        }
        return null;
    }

    function highlightWin() {
        if (!winLine) return;
        const cells = document.querySelectorAll('.ttt-cell');
        winLine.forEach(i => {
            if (cells[i]) cells[i].classList.add('ttt-cell-win');
        });
    }

    function updateStatus() {
        const statusEl = document.getElementById('ttt-status');
        if (!statusEl) return;
        if (gameOver) {
            const winner = checkWinner();
            if (winner === 'draw') {
                statusEl.textContent = "It's a draw! 🤝";
            } else {
                statusEl.textContent = `${playerEmojis[winner]} wins! 🎉`;
            }
        } else {
            const name = currentPlayer === 'X' ? 'Player 1' : (vsComputer ? 'Computer' : 'Player 2');
            statusEl.textContent = `${playerEmojis[currentPlayer]} ${name}'s turn`;
        }
    }

    function updateScoreboard() {
        const el = document.getElementById('ttt-scores');
        if (!el) return;
        const p2Label = vsComputer ? '🤖' : '⭕';
        el.textContent = `🧑‍🔬 ${scores.X} - ${scores.draw} - ${scores.O} ${p2Label}`;
    }

    function setMode(mode) {
        vsComputer = (mode === 'computer');
        playerEmojis.O = vsComputer ? '🤖' : '🧑‍🎓';
        cellEmojis.O = '⭕';

        // Update mode buttons
        document.querySelectorAll('.ttt-mode-btn').forEach(b => b.classList.remove('active'));
        const selector = mode === 'computer' ? '[data-mode="computer"]' : '[data-mode="2player"]';
        const activeBtn = document.querySelector(selector);
        if (activeBtn) activeBtn.classList.add('active');

        scores = { X: 0, O: 0, draw: 0 };
        SoundFX.tap();
        reset();
    }

    function newGame() {
        SoundFX.whoosh();
        reset();
    }

    function start() {
        init();
    }

    return {
        start,
        newGame,
        setMode,
        reset
    };
})();
