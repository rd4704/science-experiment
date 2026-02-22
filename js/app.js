/* ============================================
   SCIENCE APP - Main Game Logic
   Screen management, creation flow, play actions
   ============================================ */

const ScienceApp = (() => {
    let currentGame = null;      // 'chemistry', 'physics', 'nature', 'dessert', 'maze', 'tictactoe'
    let selectedIngredients = []; // array of ingredient ids
    let currentCreation = null;  // { emoji, name, desc }
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };
    let creationColors = ['', 'hue-rotate(60deg)', 'hue-rotate(120deg)', 'hue-rotate(180deg)', 'hue-rotate(240deg)', 'hue-rotate(300deg)', 'saturate(2)', 'brightness(1.3)'];
    let currentColorIndex = 0;

    // --- SCREEN MANAGEMENT ---
    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(id);
        if (screen) screen.classList.add('active');
    }

    function goHome() {
        SoundFX.whoosh();
        showScreen('screen-home');
        currentGame = null;
        selectedIngredients = [];
        currentCreation = null;
    }

    function selectGame(game) {
        SoundFX.select();
        currentGame = game;

        if (game === 'maze') {
            showScreen('screen-maze');
            MazeGame.start();
            return;
        }

        if (game === 'tictactoe') {
            showScreen('screen-tictactoe');
            TicTacToe.start();
            return;
        }

        if (game === 'rps') {
            showScreen('screen-rps');
            RPSGame.start();
            return;
        }

        // Show ingredients screen
        selectedIngredients = [];
        setupIngredientsScreen(game);
        showScreen('screen-ingredients');
    }

    // --- INGREDIENTS SCREEN ---
    function setupIngredientsScreen(labType) {
        const config = ExperimentData.getLabConfig(labType);
        const ingredients = ExperimentData.getIngredients(labType);

        // Update header
        document.getElementById('lab-title').textContent = config.title;
        document.getElementById('ingredient-instruction').textContent = config.instruction;

        // Set background
        const screen = document.getElementById('screen-ingredients');
        screen.style.background = config.background;

        // Render ingredient cards
        const container = document.getElementById('ingredients-container');
        container.innerHTML = '';
        ingredients.forEach(ing => {
            const card = document.createElement('button');
            card.className = 'ingredient-card';
            card.dataset.id = ing.id;
            card.innerHTML = `
                <span class="ingredient-emoji">${ing.emoji}</span>
                <span class="ingredient-name">${ing.name}</span>
            `;
            card.addEventListener('click', () => toggleIngredient(ing));
            container.appendChild(card);
        });

        // Clear tray
        document.getElementById('selected-items').innerHTML = '';
        document.getElementById('btn-create').disabled = true;
    }

    function toggleIngredient(ing) {
        const idx = selectedIngredients.indexOf(ing.id);
        if (idx >= 0) {
            // Deselect
            selectedIngredients.splice(idx, 1);
            SoundFX.deselect();
        } else {
            if (selectedIngredients.length >= 3) {
                // Max 3 - remove oldest
                selectedIngredients.shift();
            }
            selectedIngredients.push(ing.id);
            SoundFX.select();
        }
        updateIngredientUI();
    }

    function updateIngredientUI() {
        const ingredients = ExperimentData.getIngredients(currentGame);

        // Update card selection state
        document.querySelectorAll('.ingredient-card').forEach(card => {
            card.classList.toggle('selected', selectedIngredients.includes(card.dataset.id));
        });

        // Update tray chips
        const tray = document.getElementById('selected-items');
        tray.innerHTML = '';
        selectedIngredients.forEach(id => {
            const ing = ingredients.find(i => i.id === id);
            if (ing) {
                const chip = document.createElement('span');
                chip.className = 'selected-item-chip';
                chip.textContent = `${ing.emoji} ${ing.name}`;
                tray.appendChild(chip);
            }
        });

        // Enable/disable create button
        document.getElementById('btn-create').disabled = selectedIngredients.length < 2;
    }

    // --- CREATION FLOW ---
    function createItem() {
        if (selectedIngredients.length < 2) return;

        SoundFX.mixing();
        const config = ExperimentData.getLabConfig(currentGame);

        // Show creating screen
        showScreen('screen-creating');
        document.getElementById('creating-text').textContent = config.mixText;

        // Animate progress bar
        const progressFill = document.getElementById('progress-fill');
        progressFill.style.width = '0%';

        // Spawn mixing particles
        spawnMixingParticles();

        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            progressFill.style.width = progress + '%';

            if (progress % 20 === 0) {
                SoundFX.bubble();
                spawnMixingParticles();
            }

            if (progress >= 100) {
                clearInterval(interval);
                // Find the result
                currentCreation = ExperimentData.findRecipe(currentGame, selectedIngredients);
                currentColorIndex = 0;
                SoundFX.creation();

                setTimeout(() => {
                    showPlayScreen();
                }, 500);
            }
        }, 40); // ~2 seconds total
    }

    function spawnMixingParticles() {
        const container = document.getElementById('mixing-particles');
        const emojis = ['✨', '💫', '⭐', '🌟', '💥', '🔮'];
        for (let i = 0; i < 5; i++) {
            const p = document.createElement('span');
            p.className = 'mix-particle';
            p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const angle = Math.random() * Math.PI * 2;
            const dist = 60 + Math.random() * 80;
            p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
            p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
            p.style.left = '50%';
            p.style.top = '50%';
            container.appendChild(p);
            setTimeout(() => p.remove(), 1500);
        }
    }

    // --- PLAY SCREEN ---
    function showPlayScreen() {
        if (!currentCreation) return;

        showScreen('screen-play');
        document.getElementById('creation-title').textContent = currentCreation.name;

        const obj = document.getElementById('creation-object');
        obj.textContent = currentCreation.emoji;
        obj.style.filter = '';
        obj.style.fontSize = '6rem';

        // Position in center
        const area = document.getElementById('play-area');
        obj.style.left = '50%';
        obj.style.top = '50%';
        obj.style.transform = 'translate(-50%, -50%)';

        // Setup drag
        setupDrag(obj);

        // Entrance animation
        obj.classList.add('bounce-anim');
        setTimeout(() => obj.classList.remove('bounce-anim'), 600);
        SoundFX.pop();
    }

    function goToIngredients() {
        SoundFX.tap();
        selectedIngredients = [];
        setupIngredientsScreen(currentGame);
        showScreen('screen-ingredients');
    }

    // --- PLAY ACTIONS ---
    function playAction(action) {
        const obj = document.getElementById('creation-object');
        if (!obj) return;

        // Remove existing animations
        obj.classList.remove('bounce-anim', 'spin-anim', 'flip-anim', 'shake-anim', 'grow-anim');
        // Force reflow
        void obj.offsetWidth;

        switch (action) {
            case 'bounce':
                obj.classList.add('bounce-anim');
                SoundFX.bounce();
                spawnPlayParticles(obj, '⭐');
                setTimeout(() => obj.classList.remove('bounce-anim'), 600);
                break;
            case 'spin':
                obj.classList.add('spin-anim');
                SoundFX.spin();
                spawnPlayParticles(obj, '💫');
                setTimeout(() => obj.classList.remove('spin-anim'), 800);
                break;
            case 'flip':
                obj.classList.add('flip-anim');
                SoundFX.flip();
                spawnPlayParticles(obj, '🔃');
                setTimeout(() => obj.classList.remove('flip-anim'), 600);
                break;
            case 'shake':
                obj.classList.add('shake-anim');
                SoundFX.shake();
                spawnPlayParticles(obj, '💥');
                setTimeout(() => obj.classList.remove('shake-anim'), 500);
                break;
            case 'grow':
                obj.classList.add('grow-anim');
                SoundFX.grow();
                spawnPlayParticles(obj, '🌟');
                setTimeout(() => obj.classList.remove('grow-anim'), 600);
                break;
            case 'color':
                currentColorIndex = (currentColorIndex + 1) % creationColors.length;
                obj.style.filter = creationColors[currentColorIndex];
                SoundFX.colorChange();
                spawnPlayParticles(obj, '🎨');
                break;
        }
    }

    function spawnPlayParticles(obj, emoji) {
        const area = document.getElementById('play-area');
        const rect = obj.getBoundingClientRect();
        const areaRect = area.getBoundingClientRect();

        for (let i = 0; i < 4; i++) {
            const p = document.createElement('span');
            p.className = 'sparkle';
            p.textContent = emoji;
            p.style.left = (rect.left - areaRect.left + rect.width / 2 + (Math.random() - 0.5) * 60) + 'px';
            p.style.top = (rect.top - areaRect.top + rect.height / 2 + (Math.random() - 0.5) * 60) + 'px';
            area.appendChild(p);
            setTimeout(() => p.remove(), 800);
        }
    }

    // --- DRAG & DROP ---
    function setupDrag(obj) {
        obj.addEventListener('touchstart', onDragStart, { passive: false });
        obj.addEventListener('mousedown', onDragStartMouse);
    }

    function onDragStart(e) {
        e.preventDefault();
        isDragging = true;
        const touch = e.touches[0];
        const rect = e.target.getBoundingClientRect();
        dragOffset.x = touch.clientX - rect.left - rect.width / 2;
        dragOffset.y = touch.clientY - rect.top - rect.height / 2;

        document.addEventListener('touchmove', onDragMove, { passive: false });
        document.addEventListener('touchend', onDragEnd);
    }

    function onDragStartMouse(e) {
        isDragging = true;
        const rect = e.target.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left - rect.width / 2;
        dragOffset.y = e.clientY - rect.top - rect.height / 2;

        document.addEventListener('mousemove', onDragMoveMouse);
        document.addEventListener('mouseup', onDragEndMouse);
    }

    function onDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        moveCreation(touch.clientX - dragOffset.x, touch.clientY - dragOffset.y);
    }

    function onDragMoveMouse(e) {
        if (!isDragging) return;
        moveCreation(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
    }

    function moveCreation(clientX, clientY) {
        const area = document.getElementById('play-area');
        const areaRect = area.getBoundingClientRect();
        const obj = document.getElementById('creation-object');

        const x = clientX - areaRect.left;
        const y = clientY - areaRect.top;

        obj.style.left = x + 'px';
        obj.style.top = y + 'px';
        obj.style.transform = 'translate(-50%, -50%)';
    }

    function onDragEnd() {
        isDragging = false;
        document.removeEventListener('touchmove', onDragMove);
        document.removeEventListener('touchend', onDragEnd);
    }

    function onDragEndMouse() {
        isDragging = false;
        document.removeEventListener('mousemove', onDragMoveMouse);
        document.removeEventListener('mouseup', onDragEndMouse);
    }

    // --- WIN SCREEN ---
    function showWin(message) {
        showScreen('screen-win');
        document.getElementById('win-message').textContent = message || 'Amazing work, little scientist!';
        spawnConfetti();
        SoundFX.win();
    }

    function spawnConfetti() {
        const container = document.getElementById('confetti-container');
        container.innerHTML = '';
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#FF85A2', '#6BCB77', '#FF9F43', '#6C63FF'];

        for (let i = 0; i < 60; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            piece.style.width = (6 + Math.random() * 10) + 'px';
            piece.style.height = (6 + Math.random() * 10) + 'px';
            piece.style.setProperty('--fall-duration', (2 + Math.random() * 3) + 's');
            piece.style.setProperty('--rot', (360 + Math.random() * 720) + 'deg');
            piece.style.animationDelay = (Math.random() * 1.5) + 's';
            container.appendChild(piece);
        }
    }

    // --- SPARKLE TRAIL on home screen ---
    function initSparkleTrail() {
        const homeScreen = document.getElementById('screen-home');
        let lastSparkle = 0;

        homeScreen.addEventListener('touchmove', (e) => {
            const now = Date.now();
            if (now - lastSparkle < 80) return;
            lastSparkle = now;
            const touch = e.touches[0];
            createSparkle(touch.clientX, touch.clientY);
        }, { passive: true });

        homeScreen.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastSparkle < 80) return;
            lastSparkle = now;
            createSparkle(e.clientX, e.clientY);
        });
    }

    function createSparkle(x, y) {
        const sparkles = ['✨', '⭐', '💫', '🌟'];
        const s = document.createElement('span');
        s.className = 'sparkle';
        s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        s.style.left = x + 'px';
        s.style.top = y + 'px';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 800);
    }

    // --- INIT ---
    function init() {
        initSparkleTrail();

        // Prevent pull-to-refresh on mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) e.preventDefault();
        }, { passive: false });

        // Prevent double-tap zoom
        let lastTap = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTap < 300) {
                e.preventDefault();
            }
            lastTap = now;
        }, { passive: false });
    }

    // Run init on load
    document.addEventListener('DOMContentLoaded', init);

    // Public API
    return {
        selectGame,
        goHome,
        goToIngredients,
        createItem,
        playAction,
        showWin
    };
})();
