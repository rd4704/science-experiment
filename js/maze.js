/* ============================================
   MAZE GAME - Random maze generation
   Touch/mouse navigation + drawing overlay
   ============================================ */

const MazeGame = (() => {
    let canvas, ctx;
    let drawCanvas, drawCtx;
    let maze = [];
    let cols, rows;
    let cellSize = 30;
    let playerPos = { x: 0, y: 0 };
    let goalPos = { x: 0, y: 0 };
    let moveCount = 0;
    let startTime = 0;
    let timerInterval = null;
    let isDrawMode = false;
    let drawColor = '#FF6B6B';
    let difficulty = 'easy';
    let isDrawing = false;
    let solved = false;
    let lastDrawPos = null;

    // Difficulty settings
    const diffSettings = {
        easy:   { cols: 6,  rows: 6 },
        medium: { cols: 8,  rows: 8 },
        hard:   { cols: 10, rows: 10 }
    };

    function init() {
        canvas = document.getElementById('maze-canvas');
        ctx = canvas.getContext('2d');
        setupDrawCanvas();
        setupInputHandlers();
    }

    function setupDrawCanvas() {
        // Create an overlay canvas for drawing
        drawCanvas = document.createElement('canvas');
        drawCanvas.style.position = 'absolute';
        drawCanvas.style.top = '0';
        drawCanvas.style.left = '0';
        drawCanvas.style.pointerEvents = 'none';
        drawCanvas.style.borderRadius = '12px';
        drawCanvas.style.zIndex = '5';
        drawCtx = drawCanvas.getContext('2d');

        const wrapper = document.querySelector('.maze-wrapper');
        wrapper.style.position = 'relative';
        wrapper.appendChild(drawCanvas);
    }

    function setupInputHandlers() {
        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('screen-maze').classList.contains('active')) return;
            if (solved) return;
            const keyMap = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
            if (keyMap[e.key]) {
                e.preventDefault();
                move(keyMap[e.key]);
            }
        });

        // Swipe on canvas
        let touchStartX, touchStartY;
        canvas.addEventListener('touchstart', (e) => {
            if (isDrawMode) {
                startDrawing(e);
                return;
            }
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchmove', (e) => {
            if (isDrawMode) {
                draw(e);
                return;
            }
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchend', (e) => {
            if (isDrawMode) {
                stopDrawing();
                return;
            }
            const touch = e.changedTouches[0];
            const dx = touch.clientX - touchStartX;
            const dy = touch.clientY - touchStartY;
            const minSwipe = 20;

            if (Math.abs(dx) > Math.abs(dy)) {
                if (Math.abs(dx) > minSwipe) {
                    move(dx > 0 ? 'right' : 'left');
                }
            } else {
                if (Math.abs(dy) > minSwipe) {
                    move(dy > 0 ? 'down' : 'up');
                }
            }
        });

        // Mouse drawing support
        canvas.addEventListener('mousedown', (e) => {
            if (isDrawMode) startDrawingMouse(e);
        });
        canvas.addEventListener('mousemove', (e) => {
            if (isDrawMode && isDrawing) drawMouse(e);
        });
        canvas.addEventListener('mouseup', () => {
            if (isDrawMode) stopDrawing();
        });
    }

    // --- MAZE GENERATION (Recursive Backtracker / DFS) ---
    function generateMaze() {
        const settings = diffSettings[difficulty];
        cols = settings.cols;
        rows = settings.rows;

        // Initialize grid - each cell has walls: top, right, bottom, left
        maze = [];
        for (let y = 0; y < rows; y++) {
            maze[y] = [];
            for (let x = 0; x < cols; x++) {
                maze[y][x] = {
                    walls: { top: true, right: true, bottom: true, left: true },
                    visited: false
                };
            }
        }

        // DFS from (0,0)
        const stack = [];
        const start = { x: 0, y: 0 };
        maze[0][0].visited = true;
        stack.push(start);

        while (stack.length > 0) {
            const current = stack[stack.length - 1];
            const neighbors = getUnvisitedNeighbors(current.x, current.y);

            if (neighbors.length === 0) {
                stack.pop();
            } else {
                const next = neighbors[Math.floor(Math.random() * neighbors.length)];
                removeWall(current, next);
                maze[next.y][next.x].visited = true;
                stack.push(next);
            }
        }

        playerPos = { x: 0, y: 0 };
        goalPos = { x: cols - 1, y: rows - 1 };
    }

    function getUnvisitedNeighbors(x, y) {
        const neighbors = [];
        if (y > 0 && !maze[y-1][x].visited)       neighbors.push({ x, y: y-1, dir: 'top' });
        if (x < cols-1 && !maze[y][x+1].visited)  neighbors.push({ x: x+1, y, dir: 'right' });
        if (y < rows-1 && !maze[y+1][x].visited)  neighbors.push({ x, y: y+1, dir: 'bottom' });
        if (x > 0 && !maze[y][x-1].visited)       neighbors.push({ x: x-1, y, dir: 'left' });
        return neighbors;
    }

    function removeWall(current, next) {
        const dx = next.x - current.x;
        const dy = next.y - current.y;
        if (dx === 1)  { maze[current.y][current.x].walls.right = false;  maze[next.y][next.x].walls.left = false; }
        if (dx === -1) { maze[current.y][current.x].walls.left = false;   maze[next.y][next.x].walls.right = false; }
        if (dy === 1)  { maze[current.y][current.x].walls.bottom = false; maze[next.y][next.x].walls.top = false; }
        if (dy === -1) { maze[current.y][current.x].walls.top = false;    maze[next.y][next.x].walls.bottom = false; }
    }

    // --- RENDERING ---
    function sizeCanvas() {
        const wrapper = document.querySelector('.maze-wrapper');
        const maxW = wrapper.clientWidth - 16;
        const maxH = wrapper.clientHeight - 16;

        cellSize = Math.floor(Math.min(maxW / cols, maxH / rows));
        cellSize = Math.max(cellSize, 20); // minimum cell size

        const w = cols * cellSize;
        const h = rows * cellSize;

        canvas.width = w;
        canvas.height = h;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

        drawCanvas.width = w;
        drawCanvas.height = h;
        drawCanvas.style.width = w + 'px';
        drawCanvas.style.height = h + 'px';

        // Position draw canvas over maze canvas
        const canvasRect = canvas.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        drawCanvas.style.left = (canvasRect.left - wrapperRect.left) + 'px';
        drawCanvas.style.top = (canvasRect.top - wrapperRect.top) + 'px';
    }

    function render() {
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        ctx.fillStyle = '#FFF9E6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw cells and walls
        const wallColor = '#5D4E37';
        const wallWidth = 3;
        ctx.strokeStyle = wallColor;
        ctx.lineWidth = wallWidth;
        ctx.lineCap = 'round';

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = maze[y][x];
                const px = x * cellSize;
                const py = y * cellSize;

                // Goal cell highlight
                if (x === goalPos.x && y === goalPos.y) {
                    ctx.fillStyle = 'rgba(107, 203, 119, 0.3)';
                    ctx.fillRect(px + 2, py + 2, cellSize - 4, cellSize - 4);
                }

                ctx.beginPath();
                if (cell.walls.top) {
                    ctx.moveTo(px, py);
                    ctx.lineTo(px + cellSize, py);
                }
                if (cell.walls.right) {
                    ctx.moveTo(px + cellSize, py);
                    ctx.lineTo(px + cellSize, py + cellSize);
                }
                if (cell.walls.bottom) {
                    ctx.moveTo(px + cellSize, py + cellSize);
                    ctx.lineTo(px, py + cellSize);
                }
                if (cell.walls.left) {
                    ctx.moveTo(px, py + cellSize);
                    ctx.lineTo(px, py);
                }
                ctx.stroke();
            }
        }

        // Draw goal
        const goalEmoji = '🏆';
        ctx.font = `${cellSize * 0.65}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(goalEmoji, goalPos.x * cellSize + cellSize / 2, goalPos.y * cellSize + cellSize / 2);

        // Draw player
        const playerEmoji = '🧑‍🔬';
        ctx.font = `${cellSize * 0.65}px serif`;
        ctx.fillText(playerEmoji, playerPos.x * cellSize + cellSize / 2, playerPos.y * cellSize + cellSize / 2);

        // Outer border
        ctx.strokeStyle = wallColor;
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    // --- MOVEMENT ---
    function move(direction) {
        if (solved) return;
        if (!maze || maze.length === 0) return;

        const cell = maze[playerPos.y][playerPos.x];
        let newX = playerPos.x;
        let newY = playerPos.y;

        switch (direction) {
            case 'up':
                if (!cell.walls.top) newY--;
                break;
            case 'down':
                if (!cell.walls.bottom) newY++;
                break;
            case 'left':
                if (!cell.walls.left) newX--;
                break;
            case 'right':
                if (!cell.walls.right) newX++;
                break;
        }

        if (newX !== playerPos.x || newY !== playerPos.y) {
            playerPos.x = newX;
            playerPos.y = newY;
            moveCount++;
            SoundFX.mazeMove();
            updateStats();
            render();
            checkWin();
        } else {
            SoundFX.mazeWall();
        }
    }

    function checkWin() {
        if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
            solved = true;
            clearInterval(timerInterval);
            SoundFX.win();

            // Show celebration after short delay
            setTimeout(() => {
                ScienceApp.showWin(`You solved the maze in ${moveCount} moves!`);
            }, 500);
        }
    }

    // --- TIMER ---
    function startTimer() {
        clearInterval(timerInterval);
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const timerEl = document.getElementById('maze-timer');
            if (timerEl) timerEl.textContent = `⏱️ ${elapsed}s`;
        }, 1000);
    }

    function updateStats() {
        const movesEl = document.getElementById('maze-moves');
        if (movesEl) movesEl.textContent = `👣 ${moveCount} moves`;
    }

    // --- DRAWING ---
    function toggleDraw() {
        isDrawMode = !isDrawMode;
        const btn = document.getElementById('draw-toggle');
        const colors = document.getElementById('draw-colors');
        btn.classList.toggle('active', isDrawMode);
        colors.style.display = isDrawMode ? 'flex' : 'none';

        // Toggle canvas pointer events for drawing
        drawCanvas.style.pointerEvents = isDrawMode ? 'auto' : 'none';
        canvas.style.touchAction = isDrawMode ? 'none' : 'none';

        if (isDrawMode) {
            // Set drawing events on drawCanvas
            drawCanvas.addEventListener('touchstart', startDrawing, { passive: false });
            drawCanvas.addEventListener('touchmove', draw, { passive: false });
            drawCanvas.addEventListener('touchend', stopDrawing);
            drawCanvas.addEventListener('mousedown', startDrawingMouse);
            drawCanvas.addEventListener('mousemove', (e) => { if (isDrawing) drawMouse(e); });
            drawCanvas.addEventListener('mouseup', stopDrawing);
        }

        SoundFX.tap();
    }

    function setDrawColor(color) {
        drawColor = color;
        SoundFX.tap();
    }

    function clearDrawing() {
        if (drawCtx) {
            drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        }
        SoundFX.whoosh();
    }

    function getCanvasPos(touch, canvasEl) {
        const rect = canvasEl.getBoundingClientRect();
        return {
            x: (touch.clientX - rect.left) * (canvasEl.width / rect.width),
            y: (touch.clientY - rect.top) * (canvasEl.height / rect.height)
        };
    }

    function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        const pos = getCanvasPos(e.touches[0], drawCanvas);
        lastDrawPos = pos;
        drawCtx.beginPath();
        drawCtx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getCanvasPos(e.touches[0], drawCanvas);
        drawCtx.strokeStyle = drawColor;
        drawCtx.lineWidth = 4;
        drawCtx.lineCap = 'round';
        drawCtx.lineJoin = 'round';
        drawCtx.beginPath();
        drawCtx.moveTo(lastDrawPos.x, lastDrawPos.y);
        drawCtx.lineTo(pos.x, pos.y);
        drawCtx.stroke();
        lastDrawPos = pos;
    }

    function startDrawingMouse(e) {
        isDrawing = true;
        const pos = getCanvasPos(e, drawCanvas);
        lastDrawPos = pos;
    }

    function drawMouse(e) {
        if (!isDrawing) return;
        const pos = getCanvasPos(e, drawCanvas);
        drawCtx.strokeStyle = drawColor;
        drawCtx.lineWidth = 4;
        drawCtx.lineCap = 'round';
        drawCtx.lineJoin = 'round';
        drawCtx.beginPath();
        drawCtx.moveTo(lastDrawPos.x, lastDrawPos.y);
        drawCtx.lineTo(pos.x, pos.y);
        drawCtx.stroke();
        lastDrawPos = pos;
    }

    function stopDrawing() {
        isDrawing = false;
        lastDrawPos = null;
    }

    // --- DIFFICULTY ---
    function setDifficulty(level) {
        difficulty = level;
        // Update UI
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.diff-btn[data-diff="${level}"]`).classList.add('active');
        SoundFX.tap();
        generateNew();
    }

    // --- PUBLIC ---
    function generateNew() {
        solved = false;
        moveCount = 0;
        updateStats();
        generateMaze();
        sizeCanvas();
        clearDrawing();
        render();
        startTimer();
        SoundFX.whoosh();

        // Reset draw mode
        isDrawMode = false;
        const btn = document.getElementById('draw-toggle');
        const colors = document.getElementById('draw-colors');
        if (btn) btn.classList.remove('active');
        if (colors) colors.style.display = 'none';
        if (drawCanvas) drawCanvas.style.pointerEvents = 'none';
    }

    function start() {
        init();
        generateNew();
    }

    // Handle resize
    window.addEventListener('resize', () => {
        if (document.getElementById('screen-maze').classList.contains('active') && maze.length > 0) {
            sizeCanvas();
            render();
        }
    });

    return {
        start,
        generateNew,
        move,
        setDifficulty,
        toggleDraw,
        setDrawColor,
        clearDrawing
    };
})();
