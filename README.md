# 🌟 Wonder Lab - Play & Learn!

A fun, interactive learning and play hub for young kids (ages 3-7). Built as a fully static web app — no build tools or dependencies needed!

## 🎮 Games Included

### 🧪 Chemistry Lab
Mix magical ingredients to create amazing potions and objects! Choose from sparkle dust, rainbow drops, star powder, and more.

### ⚡ Physics Lab
Build machines and gadgets! Combine gears, magnets, batteries, and other parts to create robots, cars, spaceships, and more.

### 🌿 Nature Lab
Grow plants and discover animals! Mix seeds, soil, sunlight, rain, and more to grow flowers, hatch eggs, and find butterflies.

### 🏆 Maze Game (Bonus!)
Navigate through randomly generated mazes! Features:
- 3 difficulty levels (Easy, Medium, Hard)
- Touch swipe, D-pad, or keyboard controls
- Draw mode — doodle on the maze with colorful pens
- Timer and move counter

## 🎯 How to Play

1. **Choose a lab** from the home screen
2. **Pick 2-3 ingredients** by tapping them
3. **Tap "Create!"** to mix your ingredients
4. **Play with your creation** — bounce, spin, flip, shake, grow, or change its color!
5. **Drag your creation** around the screen with touch or mouse

## 🚀 Running Locally

Simply open `index.html` in any modern browser:

```bash
# Option 1: Direct open
open index.html

# Option 2: VS Code Live Server
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"

# Option 3: Python simple server
python3 -m http.server 8000
# Then open http://localhost:8000
```

## 📱 Device Support

- **iPad / iPhone**: Fully touch-optimized with large tap targets
- **Android tablets/phones**: Works great in Chrome/Firefox
- **Desktop**: Mouse and keyboard support
- **Minimum**: Any browser supporting ES6 and Web Audio API

## 🌐 Deployment

This is a fully static site — deploy anywhere:

- **GitHub Pages**: Push to repo → Settings → Pages → Deploy from main branch
- **Netlify**: Drag & drop the project folder
- **Vercel**: Import the git repository
- **Any static host**: Just upload all files

## 📁 Project Structure

```
science-experiment/
├── index.html          # Main entry point
├── css/
│   └── styles.css      # All styles (mobile-first, responsive)
├── js/
│   ├── app.js          # Main game logic & screen management
│   ├── experiments.js  # Lab ingredients & recipe data
│   ├── maze.js         # Maze generation & game logic
│   └── sounds.js       # Web Audio API sound effects
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🎨 Design Principles

- **Mobile-first**: Designed for iPad/iPhone touch interactions
- **Large tap targets**: Minimum 44px for young children
- **Bright colors**: Kid-friendly palette with gradients
- **No external assets**: All visuals are emoji-based or CSS-generated
- **Sound effects**: Web Audio API — no audio files needed
- **No dependencies**: Pure HTML/CSS/JavaScript

## 🔊 Sound Effects

All sounds are generated using the Web Audio API:
- Tap, select, deselect feedback
- Bubbling/mixing during creation
- Victory fanfare
- Bounce, spin, flip, shake, grow sounds
- Maze movement and wall-bump sounds
- Whoosh transitions
