/* ============================================
   EXPERIMENTS - Ingredient & Creation Data
   Chemistry, Physics, Nature, and Dessert labs
   ============================================ */

const ExperimentData = (() => {

    // --- CHEMISTRY LAB ---
    const chemistryIngredients = [
        { id: 'water',    emoji: '💧', name: 'Water' },
        { id: 'fire',     emoji: '🔥', name: 'Fire' },
        { id: 'sparkle',  emoji: '✨', name: 'Sparkle Dust' },
        { id: 'rainbow',  emoji: '🌈', name: 'Rainbow Drop' },
        { id: 'star',     emoji: '⭐', name: 'Star Powder' },
        { id: 'ice',      emoji: '🧊', name: 'Ice Crystal' },
        { id: 'honey',    emoji: '🍯', name: 'Honey' },
        { id: 'flower',   emoji: '🌸', name: 'Flower Petal' },
        { id: 'moon',     emoji: '🌙', name: 'Moon Glow' },
    ];

    const chemistryRecipes = [
        { ingredients: ['water', 'fire'],       result: { emoji: '☁️', name: 'Steam Cloud', desc: 'A puffy cloud!' } },
        { ingredients: ['water', 'ice'],        result: { emoji: '❄️', name: 'Snowflake', desc: 'So pretty and cold!' } },
        { ingredients: ['water', 'sparkle'],    result: { emoji: '🫧', name: 'Magic Bubbles', desc: 'Shiny bubbles!' } },
        { ingredients: ['fire', 'sparkle'],     result: { emoji: '🎆', name: 'Fireworks', desc: 'BOOM! So bright!' } },
        { ingredients: ['rainbow', 'star'],     result: { emoji: '💎', name: 'Rainbow Crystal', desc: 'Shiny gem!' } },
        { ingredients: ['rainbow', 'water'],    result: { emoji: '🦄', name: 'Unicorn Potion', desc: 'Magical!' } },
        { ingredients: ['honey', 'flower'],     result: { emoji: '🧁', name: 'Magic Cupcake', desc: 'Yummy treat!' } },
        { ingredients: ['moon', 'star'],        result: { emoji: '🪐', name: 'Mini Planet', desc: 'A tiny world!' } },
        { ingredients: ['ice', 'sparkle'],      result: { emoji: '💠', name: 'Ice Diamond', desc: 'Super cold gem!' } },
        { ingredients: ['moon', 'water'],       result: { emoji: '🌊', name: 'Tidal Wave', desc: 'Whoooosh!' } },
        { ingredients: ['fire', 'star'],        result: { emoji: '☀️', name: 'Mini Sun', desc: 'So warm and bright!' } },
        { ingredients: ['honey', 'sparkle'],    result: { emoji: '🍬', name: 'Magic Candy', desc: 'Sweet sparkle treat!' } },
        { ingredients: ['flower', 'rainbow'],   result: { emoji: '🌺', name: 'Rainbow Flower', desc: 'So colourful!' } },
        { ingredients: ['water', 'flower'],     result: { emoji: '🫖', name: 'Flower Tea', desc: 'Smells lovely!' } },
        { ingredients: ['moon', 'sparkle'],     result: { emoji: '🔮', name: 'Crystal Ball', desc: 'See the future!' } },
        // 3-ingredient recipes
        { ingredients: ['water', 'fire', 'sparkle'],    result: { emoji: '🌋', name: 'Volcano', desc: 'Eruption!' } },
        { ingredients: ['rainbow', 'star', 'moon'],     result: { emoji: '🌌', name: 'Galaxy Potion', desc: 'A tiny universe!' } },
        { ingredients: ['ice', 'fire', 'water'],        result: { emoji: '🫠', name: 'Silly Slime', desc: 'Squishy!' } },
        { ingredients: ['honey', 'flower', 'sparkle'],  result: { emoji: '🧚', name: 'Fairy Dust', desc: 'You can fly!' } },
    ];

    // --- PHYSICS LAB ---
    const physicsIngredients = [
        { id: 'gear',     emoji: '⚙️', name: 'Gear' },
        { id: 'magnet',   emoji: '🧲', name: 'Magnet' },
        { id: 'battery',  emoji: '🔋', name: 'Battery' },
        { id: 'spring',   emoji: '🪃', name: 'Spring' },
        { id: 'bulb',     emoji: '💡', name: 'Light Bulb' },
        { id: 'wheel',    emoji: '🛞', name: 'Wheel' },
        { id: 'rocket',   emoji: '🚀', name: 'Rocket Part' },
        { id: 'balloon',  emoji: '🎈', name: 'Balloon' },
        { id: 'wind',     emoji: '💨', name: 'Wind Power' },
    ];

    const physicsRecipes = [
        { ingredients: ['gear', 'gear'],          result: { emoji: '🤖', name: 'Robot Friend', desc: 'Beep boop!' } },
        { ingredients: ['battery', 'bulb'],       result: { emoji: '🔦', name: 'Flashlight', desc: 'So bright!' } },
        { ingredients: ['wheel', 'gear'],         result: { emoji: '🚗', name: 'Mini Car', desc: 'Vroom vroom!' } },
        { ingredients: ['balloon', 'wind'],       result: { emoji: '🎪', name: 'Flying Machine', desc: 'Up up and away!' } },
        { ingredients: ['rocket', 'battery'],     result: { emoji: '🛸', name: 'Spaceship', desc: 'To the stars!' } },
        { ingredients: ['magnet', 'gear'],        result: { emoji: '🧭', name: 'Compass', desc: 'Find your way!' } },
        { ingredients: ['spring', 'wheel'],       result: { emoji: '🛹', name: 'Skateboard', desc: 'Ride it!' } },
        { ingredients: ['magnet', 'battery'],     result: { emoji: '⚡', name: 'Lightning', desc: 'ZAAAP!' } },
        { ingredients: ['balloon', 'spring'],     result: { emoji: '🪀', name: 'Bouncy Ball', desc: 'Boing boing!' } },
        { ingredients: ['wind', 'wheel'],         result: { emoji: '🎡', name: 'Ferris Wheel', desc: 'Round and round!' } },
        { ingredients: ['rocket', 'wind'],        result: { emoji: '✈️', name: 'Aeroplane', desc: 'Flying high!' } },
        { ingredients: ['bulb', 'magnet'],        result: { emoji: '🏮', name: 'Magic Lantern', desc: 'Floats in air!' } },
        // 3-ingredient
        { ingredients: ['gear', 'battery', 'wheel'],    result: { emoji: '🚂', name: 'Train', desc: 'Choo choo!' } },
        { ingredients: ['rocket', 'battery', 'wind'],   result: { emoji: '🛩️', name: 'Jet Plane', desc: 'Zooooom!' } },
        { ingredients: ['magnet', 'spring', 'balloon'], result: { emoji: '🪁', name: 'Magic Kite', desc: 'Flies itself!' } },
    ];

    // --- NATURE LAB ---
    const natureIngredients = [
        { id: 'seed',     emoji: '🌱', name: 'Seed' },
        { id: 'soil',     emoji: '🪴', name: 'Rich Soil' },
        { id: 'sunlight', emoji: '☀️', name: 'Sunlight' },
        { id: 'rain',     emoji: '🌧️', name: 'Rain' },
        { id: 'bug',      emoji: '🐛', name: 'Caterpillar' },
        { id: 'egg',      emoji: '🥚', name: 'Egg' },
        { id: 'leaf',     emoji: '🍃', name: 'Magic Leaf' },
        { id: 'mushroom', emoji: '🍄', name: 'Mushroom' },
        { id: 'crystal',  emoji: '💎', name: 'Earth Crystal' },
    ];

    const natureRecipes = [
        { ingredients: ['seed', 'soil'],          result: { emoji: '🌻', name: 'Sunflower', desc: 'So tall and sunny!' } },
        { ingredients: ['seed', 'rain'],          result: { emoji: '🌳', name: 'Big Tree', desc: 'A mighty tree!' } },
        { ingredients: ['seed', 'sunlight'],      result: { emoji: '🌹', name: 'Rose', desc: 'Beautiful rose!' } },
        { ingredients: ['bug', 'leaf'],           result: { emoji: '🦋', name: 'Butterfly', desc: 'So pretty!' } },
        { ingredients: ['egg', 'sunlight'],       result: { emoji: '🐣', name: 'Baby Chick', desc: 'Peep peep!' } },
        { ingredients: ['rain', 'sunlight'],      result: { emoji: '🌈', name: 'Rainbow', desc: 'Wow, colours!' } },
        { ingredients: ['mushroom', 'rain'],      result: { emoji: '🍄', name: 'Giant Mushroom', desc: 'So big!' } },
        { ingredients: ['leaf', 'crystal'],       result: { emoji: '🍀', name: 'Lucky Clover', desc: 'Good luck!' } },
        { ingredients: ['egg', 'soil'],           result: { emoji: '🐢', name: 'Baby Turtle', desc: 'Slow and cute!' } },
        { ingredients: ['soil', 'crystal'],       result: { emoji: '💎', name: 'Big Gem', desc: 'Sparkly treasure!' } },
        { ingredients: ['bug', 'mushroom'],       result: { emoji: '🐞', name: 'Ladybird', desc: 'So cute!' } },
        { ingredients: ['rain', 'leaf'],          result: { emoji: '🐸', name: 'Froggy', desc: 'Ribbit ribbit!' } },
        // 3-ingredient
        { ingredients: ['seed', 'soil', 'rain'],       result: { emoji: '🌴', name: 'Palm Tree', desc: 'Tropical!' } },
        { ingredients: ['egg', 'sunlight', 'leaf'],    result: { emoji: '🦜', name: 'Parrot', desc: 'Polly wants a cracker!' } },
        { ingredients: ['bug', 'leaf', 'crystal'],     result: { emoji: '🦚', name: 'Peacock', desc: 'So beautiful!' } },
        { ingredients: ['mushroom', 'crystal', 'rain'],result: { emoji: '🧙', name: 'Forest Wizard', desc: 'Magic powers!' } },
    ];

    // --- DESSERT KITCHEN ---
    const dessertIngredients = [
        { id: 'flour',     emoji: '🌾', name: 'Flour' },
        { id: 'sugar',     emoji: '🍬', name: 'Sugar' },
        { id: 'chocolate', emoji: '🍫', name: 'Chocolate' },
        { id: 'strawberry',emoji: '🍓', name: 'Strawberry' },
        { id: 'cream',     emoji: '🥛', name: 'Cream' },
        { id: 'egg_d',     emoji: '🥚', name: 'Egg' },
        { id: 'butter',    emoji: '🧈', name: 'Butter' },
        { id: 'sprinkles', emoji: '🎊', name: 'Sprinkles' },
        { id: 'cherry',    emoji: '🍒', name: 'Cherry' },
    ];

    const dessertRecipes = [
        { ingredients: ['flour', 'sugar'],          result: { emoji: '🍪', name: 'Cookie', desc: 'Crunchy and sweet!' } },
        { ingredients: ['flour', 'chocolate'],      result: { emoji: '🍩', name: 'Donut', desc: 'Yummy ring of joy!' } },
        { ingredients: ['flour', 'egg_d'],          result: { emoji: '🥞', name: 'Pancake', desc: 'Fluffy and warm!' } },
        { ingredients: ['chocolate', 'cream'],      result: { emoji: '🍫', name: 'Choco Mousse', desc: 'So creamy!' } },
        { ingredients: ['strawberry', 'cream'],     result: { emoji: '🍰', name: 'Strawberry Cake', desc: 'Pretty in pink!' } },
        { ingredients: ['cream', 'sugar'],          result: { emoji: '🍦', name: 'Ice Cream', desc: 'Cold and sweet!' } },
        { ingredients: ['butter', 'sugar'],         result: { emoji: '🧁', name: 'Cupcake', desc: 'Cute little cake!' } },
        { ingredients: ['chocolate', 'strawberry'], result: { emoji: '🍓', name: 'Choco Strawberry', desc: 'Dipped in yum!' } },
        { ingredients: ['sprinkles', 'cream'],      result: { emoji: '🎂', name: 'Party Cake', desc: 'Happy birthday!' } },
        { ingredients: ['cherry', 'cream'],         result: { emoji: '🍨', name: 'Sundae', desc: 'Cherry on top!' } },
        { ingredients: ['butter', 'flour'],         result: { emoji: '🥐', name: 'Croissant', desc: 'Flaky and golden!' } },
        { ingredients: ['egg_d', 'sugar'],          result: { emoji: '🍮', name: 'Pudding', desc: 'Wibbly wobbly!' } },
        { ingredients: ['cherry', 'chocolate'],     result: { emoji: '🍭', name: 'Lollipop', desc: 'Lick lick lick!' } },
        { ingredients: ['sprinkles', 'chocolate'],  result: { emoji: '🍿', name: 'Choco Pop', desc: 'Pop pop pop!' } },
        // 3-ingredient recipes
        { ingredients: ['flour', 'sugar', 'chocolate'],    result: { emoji: '🎂', name: 'Birthday Cake', desc: 'Make a wish!' } },
        { ingredients: ['flour', 'egg_d', 'butter'],       result: { emoji: '🥧', name: 'Pie', desc: 'Golden and warm!' } },
        { ingredients: ['cream', 'strawberry', 'sprinkles'],result: { emoji: '🧁', name: 'Unicorn Cupcake', desc: 'Magical treat!' } },
        { ingredients: ['chocolate', 'cream', 'cherry'],   result: { emoji: '🍫', name: 'Choco Deluxe', desc: 'Triple yum!' } },
    ];

    // --- FIND RECIPE ---
    function findRecipe(labType, selectedIds) {
        const recipes = getRecipes(labType);
        const sorted = [...selectedIds].sort();

        // Try exact match first
        for (const recipe of recipes) {
            const recipeSorted = [...recipe.ingredients].sort();
            if (recipeSorted.length === sorted.length &&
                recipeSorted.every((val, i) => val === sorted[i])) {
                return recipe.result;
            }
        }

        // Try partial match (any 2 matching)
        if (sorted.length >= 2) {
            for (const recipe of recipes) {
                const recipeSorted = [...recipe.ingredients].sort();
                const matching = sorted.filter(id => recipeSorted.includes(id));
                if (matching.length >= 2) {
                    return recipe.result;
                }
            }
        }

        // Surprise result for no match
        return getSurpriseResult(labType);
    }

    function getSurpriseResult(labType) {
        const surprises = {
            chemistry: [
                { emoji: '🫧', name: 'Mystery Bubbles', desc: 'Ooh, something fizzy!' },
                { emoji: '💫', name: 'Sparkle Goo', desc: 'It glows!' },
                { emoji: '🍭', name: 'Swirl Pop', desc: 'Sweet and strange!' },
            ],
            physics: [
                { emoji: '🎲', name: 'Random Gadget', desc: 'What does it do?' },
                { emoji: '🧩', name: 'Puzzle Box', desc: 'Fun mystery!' },
                { emoji: '🔔', name: 'Jingle Bell', desc: 'Ring ring!' },
            ],
            nature: [
                { emoji: '🌵', name: 'Cactus Friend', desc: 'Spikey but happy!' },
                { emoji: '🐌', name: 'Snaily', desc: 'Slow but cute!' },
                { emoji: '🍁', name: 'Golden Leaf', desc: 'Autumn magic!' },
            ],
            dessert: [
                { emoji: '🍡', name: 'Mystery Dango', desc: 'Squishy surprise!' },
                { emoji: '🧇', name: 'Waffle', desc: 'Crispy creation!' },
                { emoji: '🍩', name: 'Mystery Donut', desc: 'What flavour?' },
            ]
        };
        const list = surprises[labType] || surprises.chemistry;
        return list[Math.floor(Math.random() * list.length)];
    }

    function getIngredients(labType) {
        switch (labType) {
            case 'chemistry': return chemistryIngredients;
            case 'physics':   return physicsIngredients;
            case 'nature':    return natureIngredients;
            case 'dessert':   return dessertIngredients;
            default:          return chemistryIngredients;
        }
    }

    function getRecipes(labType) {
        switch (labType) {
            case 'chemistry': return chemistryRecipes;
            case 'physics':   return physicsRecipes;
            case 'nature':    return natureRecipes;
            case 'dessert':   return dessertRecipes;
            default:          return chemistryRecipes;
        }
    }

    function getLabConfig(labType) {
        const configs = {
            chemistry: {
                title: '🧪 Chemistry Lab',
                instruction: 'Pick 2-3 ingredients to mix!',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                mixText: 'Mixing potion...',
                createText: 'Creating...',
            },
            physics: {
                title: '⚡ Physics Lab',
                instruction: 'Pick 2-3 parts to build!',
                background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
                mixText: 'Building...',
                createText: 'Assembling...',
            },
            nature: {
                title: '🌿 Nature Lab',
                instruction: 'Pick 2-3 things to grow!',
                background: 'linear-gradient(135deg, #95E06C 0%, #56AB2F 100%)',
                mixText: 'Growing...',
                createText: 'Sprouting...',
            },
            dessert: {
                title: '🍰 Dessert Kitchen',
                instruction: 'Pick 2-3 ingredients to bake!',
                background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
                mixText: 'Baking...',
                createText: 'Decorating...',
            }
        };
        return configs[labType] || configs.chemistry;
    }

    return {
        getIngredients,
        getRecipes,
        findRecipe,
        getLabConfig,
    };
})();
