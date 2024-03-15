//import anime from 'animejs/lib/anime.es.js';

/* PAWN
The class used for both Heroes and Enemies
*/
class Pawn {
    constructor(id, name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.strength = strength;
        this.agility = agility;
        this.intelligence = intelligence;
        this.stamina = stamina;
        this.luck = luck;
        this.attack = attack;
        this.accuracy = accuracy;
        this.defense = defense;
        this.evasion = evasion;
        this.magicalDefense = magicalDefense;
        this.command = command;
        this.target = target;
        this.alive = true;
    }
    fight(target) {
        console.log(this.name, 'attacks now!');
        this.attack = this.strength / 2;
        gameUi.notification("damage", this.attack, 2000);
        target.hp = this.target.hp - this.attack;
        if (target.hp <= 0) {
            target.die();
        }
        console.log(target.hp);
    }
}


/* HEROES & Their Classes
Create Hero and Classes (e.g. Fighter, Black Mage) that extend the original Pawn class. Create characters using those classes
and push them into the heroes array to be used by our game.
*/
class Hero extends Pawn {
    constructor(id, name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(id, name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
    }
    animateForward() {
        anime({
            targets: '#hero'+this.id,
            translateX: '-40px',
            easing: 'easeInOutQuad',
            duration: 500
        });
    }
    animateBack() {
        anime({
            targets: '#hero'+this.id,
            translateX: '0px',
            easing: 'easeInOutQuad',
            duration: 500
        });
    }
    chooseCommand(command) {
        console.log(game.heroTurn);
        console.log(this.name, "chose to", command);
        this.command = command;
    }
    chooseTarget(target) {
        console.log(this.name, "chose to target", target);
        this.target = target;
        this.animateBack();
        if (game.heroTurn == heroes.length-1) {
            game.playerCommandsChosen = true;
            game.loop("enemy");
        } else {
            game.heroIncrement();
            console.log("It's still the player's turn to choose their commands!");
        }
    }
    die() {
        console.log(this.name, "died!");
        this.alive = false;
        var heroIndex = heroes.indexOf(this.name);
        heroes.splice(heroIndex,1);
    }
    magic() {
        console.log(this.name, 'cast magic!');
    }
    drink() {
        console.log(this.name, 'drinks something!'); 
    }
    item() {
        console.log(this.name, 'uses an item!'); 
    }
    run() {
        console.log(this.name, 'runs!'); 
    }
};

class Fighter extends Hero {
    constructor(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
        this.hp = 20;
        this.strength = 10;
    }
}

class BlackBelt extends Hero {
    constructor(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
        this.hp = 20;
        this.strength = 10;
    }
}

class BlackMage extends Hero {
    constructor(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
        this.hp = 20;
        this.strength = 10;
    }
}

class WhiteMage extends Hero {
    constructor(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
        this.hp = 20;
        this.strength = 10;
    }
}

// Need to refactor this area to push any heroes chosen by the player into the array and programmatically set an ID
var heroOne = new Fighter;
var heroTwo = new BlackBelt;
var heroThree = new BlackMage;
var heroFour = new WhiteMage;

heroOne.name = "Step";
heroTwo.name = "Jill";
heroThree.name = "WooW";
heroFour.name = "Seal";

heroOne.id = 0;
heroTwo.id = 1;
heroThree.id = 2;
heroFour.id = 3;

heroes = [];
heroes.push(heroOne, heroTwo, heroThree, heroFour);
// End of HEROES


/* ENEMIES
Create our individual enemy character objects.
Give each enemy character a name.
*/
/* Define our enemy prototype which will remain static,
but in case I want to change the enemy types in a future version */

class Enemy extends Pawn {
    constructor(id, name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(id, name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
    }
    chooseCommand(command) {
        // Enemies can only attack
        this.command = "fight";
    }
    chooseTarget() {
        var randomHeroTarget = heroes[Math.floor(Math.random() * heroes.length)];
        this.target = randomHeroTarget;
    }
    die() {
        console.log(this.name, "died!");
        gameUi.notification("terminated", "Terminated", 2000);
        var enemyIndex = enemies.indexOf(this.name);
        enemies.splice(enemyIndex,1);
        gameUi.refreshEnemyList();
    }
}

class Imp extends Enemy {
    constructor(id, name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(id, name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
        this.name = "Imp";
        this.hp = 10;
        this.strength = 2;
    }
}

var enemyOne = new Imp;
var enemyTwo = new Imp;
var enemyThree = new Imp;
var enemyFour = new Imp;

enemies = [];
enemies.push(enemyOne, enemyTwo, enemyThree, enemyFour);
// End of ENEMIES


{/* <div id="notification-attacker" class="ui-window h-100 rounded-top border-bottom-0"></div>
    <div id="notification-hits" class="ui-window h-100 rounded-top border-bottom-0"></div>
    <div id="notification-target" class="ui-window h-100 rounded-top border-bottom-0"></div>
    <div id="notification-damage" class="ui-window h-100 rounded-top border-bottom-0"></div>
    <div id="notification-terminated" class="ui-window h-100"></div> */}

/* GAME UI
*/
var gameUi = {
    notification : function(type, message, timeout) {
        // Notification types: pawn, hits, target, damage, terminated
        var messageText = document.createElement("div");

        messageText.innerText = message;

        function wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        switch (type) {
            case "pawn" :
                pawnElement = document.getElementById("notification-pawn");
                pawnElement.appendChild(messageText);
                if (timeout) {
                    wait(timeout).then(() => { pawnElement.innerHTML = ""; });
                }
                break;
            case "hits" :
                document.getElementById("notification-hits").appendChild(messageText);
                break;
            case "target" :
                targetElement = document.getElementById("notification-target");
                targetElement.appendChild(messageText);
                if (timeout) {
                    wait(timeout).then(() => { targetElement.innerHTML = ""; });
                }
                break;
            case "damage" :
                damageElement = document.getElementById("notification-damage");
                damageElement.appendChild(messageText);
                if (timeout) {
                    wait(timeout).then(() => { damageElement.innerHTML = ""; });
                }
                break;
            case "terminated" :
                terminatedElement = document.getElementById("notification-terminated");
                terminatedElement.appendChild(messageText);
                if (timeout) {
                    wait(timeout).then(() => { terminatedElement.innerHTML = ""; });
                }
                break;
        }

    },
    instantiateUi : function() {
        console.log("UI Loaded");
        var i = 0;
    
        // Hero Stats & Sprites
        for (hero of heroes) {
            var heroName = document.createElement("div");
            var heroHp = document.createElement("p");
            heroName.innerText = hero.name;
            heroHp.innerText = "HP " + hero.hp;
            document.getElementById("hero-stats").appendChild(heroName);
            document.getElementById("hero-stats").appendChild(heroHp);
    
            switch (hero.constructor.name) {
                case "Fighter" :
                    var heroSprite = document.createElement("img");
                    heroSprite.src = "assets/images/fighter.svg";
                    heroSprite.setAttribute("id", "hero" + i);
                    heroSprite.classList.add("hero-sprite");
                    document.getElementById("hero-display").appendChild(heroSprite);
                    break;
                case "BlackBelt" :
                    var heroSprite = document.createElement("img");
                    heroSprite.src = "assets/images/black-belt.svg";
                    heroSprite.setAttribute("id", "hero" + i);
                    heroSprite.classList.add("hero-sprite");
                    document.getElementById("hero-display").appendChild(heroSprite);
                    break;
                case "BlackMage" :
                    var heroSprite = document.createElement("img");
                    heroSprite.src = "assets/images/black-mage.svg";
                    heroSprite.setAttribute("id", "hero" + i);
                    heroSprite.classList.add("hero-sprite");
                    document.getElementById("hero-display").appendChild(heroSprite);
                    break;
                case "WhiteMage" :
                    var heroSprite = document.createElement("img");
                    heroSprite.src = "assets/images/white-mage.svg";
                    heroSprite.setAttribute("id", "hero" + i);
                    heroSprite.classList.add("hero-sprite");
                    document.getElementById("hero-display").appendChild(heroSprite);
                    break;
                default :
                    console.log("hello");
            }
            i++;
        }
        this.refreshEnemyList();
    },
    refreshEnemyList : function() {
        document.getElementById("enemy-targets").innerHTML = "";
        document.getElementById("enemy-display").innerHTML = "";


        for (var i=0; i < enemies.length; i++) {
            var enemyTarget = document.createElement("button");
            enemyTarget.innerText = enemies[i].name;
            enemyTarget.setAttribute("type", "button");
            enemyTarget.classList.add("btn", "btn-dark", "btn-game");
            enemyTarget.setAttribute("onclick", "heroes[game.heroTurn].chooseTarget(enemies["+i+"])");
            document.getElementById("enemy-targets").appendChild(enemyTarget);

            switch (enemies[i].constructor.name) {
                case "Imp" :
                    var enemySprite = document.createElement("img");
                    enemySprite.src = "assets/images/imp.svg";
                    enemySprite.classList.add("enemy-sprite");
                    document.getElementById("enemy-display").appendChild(enemySprite);
                    break;
                default :
                    console.log("hello");
            }
        }
    }
}

    // Hero Commands
    var playerOptionFight = document.createElement("button");
    playerOptionFight.innerText = "FIGHT";
    playerOptionFight.setAttribute("type", "button");
    playerOptionFight.classList.add("btn", "btn-dark", "btn-game");
    playerOptionFight.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('fight')");
    document.getElementById("player-options").appendChild(playerOptionFight);

    var playerOptionMagic = document.createElement("button");
    playerOptionMagic.innerText = "MAGIC";
    playerOptionMagic.setAttribute("type", "button");
    playerOptionMagic.classList.add("btn", "btn-dark", "btn-game");
    playerOptionMagic.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('magic')");
    document.getElementById("player-options").appendChild(playerOptionMagic);

    var playerOptionDrink = document.createElement("button");
    playerOptionDrink.innerText = "DRINK";
    playerOptionDrink.setAttribute("type", "button");
    playerOptionDrink.classList.add("btn", "btn-dark", "btn-game");
    playerOptionDrink.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('drink')");
    document.getElementById("player-options").appendChild(playerOptionDrink);

    var playerOptionItem = document.createElement("button");
    playerOptionItem.innerText = "ITEM";
    playerOptionItem.setAttribute("type", "button");
    playerOptionItem.classList.add("btn", "btn-dark", "btn-game");
    playerOptionItem.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('item')");
    document.getElementById("player-options").appendChild(playerOptionItem);

    var playerOptionRun = document.createElement("button");
    playerOptionRun.innerText = "RUN";
    playerOptionRun.setAttribute("type", "button");
    playerOptionRun.classList.add("btn", "btn-dark", "btn-game");
    playerOptionRun.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('run')");
    document.getElementById("player-options").appendChild(playerOptionRun);


/* GAMEPLAY
Step 1: Player chooses their commands
game.playerCommandPhase()

Step 2: Enemy chooses their commands
game.enemyCommandPhase()

Step 3: Player's commands are executed
game.executePlayerTurn()

Step 4: Enemy's commands are executed
game.executeEnemyTurn()

// When looping, it's fine if all of the calculations run to determine who did what and who took damage,
// but it all needs to slowly play out in the GUI rather than happen in a moment.
// This means that there should be pauses between animations and the player's ability to run new commands, or win, or lose
// needs to wait until all of the animations take a moment to complete.
*/


// Game Object
var game = {
    state : "active",
    turn : "player",
    heroTurn : 0,
    enemyTurn : 0,
    playerCommandsChosen : false,
    enemyCommandsChosen : false,

    // THE LOOP: The function controlling the core game functionality
    loop : function(turn) {

        this.breakLoopCheck();

        if (this.state == "won" || this.state == "loss") {

            return;

        } else {

            if (turn == "player" && this.playerCommandsChosen == true) {
                this.executePlayerTurn();
            } else if (turn == "enemy" && this.enemyCommandsChosen == false){
                this.enemyCommandPhase();
            } else if (turn == "enemy" && this.enemyCommandsChosen == true) {
                this.executeEnemyTurn();
            } else {
                this.playerCommandPhase();
                heroes[this.heroTurn].animateForward();
            }

        }

    },

    heroIncrement : function() { // Increment through the list of heroes
        this.heroTurn++;
        heroes[this.heroTurn].animateForward();
    },
    enemyIncrement : function() { // Increment through the list of enemies
        this.enemyTurn++;
    },
    playerCommandPhase : function() { // Step 1: Load the UI for the player to choose their commands and targets
        console.log("It's time to choose your commands!");
    },
    enemyCommandPhase : function() { // Step 2: Automatically choose the enemy's commands and targets
        for (var enemy of enemies) {
            enemy.chooseCommand();
            enemy.chooseTarget();
            game.enemyIncrement();
            console.log("It's still the enemy's turn to choose their commands!");
        }
        game.enemyCommandsChosen = true;
        game.loop("player");
    },
    executePlayerTurn : function() { // Step 3: Execute the player's commands

        for (var hero of heroes) {
            switch (hero.command) {
                case "fight" :
                    gameUi.notification("pawn", hero.name, 3000);
                    gameUi.notification("target", hero.target, 3000);
                    hero.fight(hero.target);
                    break;
                case "magic" :
                    hero.magic(hero.target);
                    break;
                case "drink" :
                    hero.drink();
                    break;
                case "item" :
                    hero.item();
                    break;
                case "run" :
                    hero.run();
                    break;
                default :
                    console.log("Error: No command chosen");
            }
        }

        this.loop("enemy");
    },
    executeEnemyTurn : function() { // Step 4: Execute the enemy's commands
        for (var i = 0; i < enemies.length; i++) {
            if (this.state == "won" || this.state == "loss") {
                return;
            } else {
                enemies[i].fight(enemies[i].target);
            }
        }
        console.log("Enemy took their turn!");
        this.resetGameLoop();
        this.loop();
    },
    resetGameLoop : function() { // Continue the game and reset the player's commands if the game is still in the active state
        this.turn = "player";
        this.playerCommandsChosen = false;
        this.enemyCommandsChosen = false;
        this.heroTurn = 0;
        for(var hero of heroes) {
            hero.command = '';
            hero.target = '';
        }
        for(var enemy of enemies) {
            enemy.command = '';
            enemy.target = '';
        }
    },
    breakLoopCheck : function() { // Decide if the game loop needs to be broken for a victory or a loss
        function deadHeroCheck() {
            this.alive;
        }
        if (enemies.length == 0) {
            console.log("You Win!")
            return this.state = "won";
        }
        else if (heroes.every(deadHeroCheck) == true) {
            console.log("Game Over");
            return this.state = "loss"
        } else {
            return;
        }
    }
}

gameUi.instantiateUi();
game.loop();