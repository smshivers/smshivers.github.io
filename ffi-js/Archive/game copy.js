/* 
Player with multiple heroes
Multiple enemies

Player can: Fight, Magic, Drink, Item, Run, Die
- That means that the player will need an inventory

Enemy can: Fight, Die

What we need to know about the hero:
- Health, Attack Range, Luck? (% chance to run or hit),
what spells they can cast

What we need to know about the enemy
- Health, Attack Range, Luck

Gameplay-wise we need to...
- Set turns
- Wait until the player chooses all of their characters' options
before executing
- Make the enemies take a turn automatically. 
*/

/* PAWN
The class used for both Heroes and Enemies
*/
class Pawn {
    constructor(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
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
    constructor(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
    }
    chooseCommand(command) {
        console.log(game.heroTurn);
        console.log(this.name, "chose to", command);
        this.command = command;
    }
    chooseTarget(target) {
        console.log(this.name, "chose to target", target);
        this.target = target;
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

var heroOne = new Fighter;
var heroTwo = new BlackBelt;
var heroThree = new BlackMage;
var heroFour = new WhiteMage;

heroOne.name = "Stephen";
heroOne.name = heroOne.name.toUpperCase();
heroTwo.name = "Jillian";
heroTwo.name = heroTwo.name.toUpperCase();
heroThree.name = "Woo Woo";
heroThree.name = heroThree.name.toUpperCase();
heroFour.name = "Sealy";
heroFour.name = heroFour.name.toUpperCase();

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
    constructor(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
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
        var enemyIndex = enemies.indexOf(this.name);
        enemies.splice(enemyIndex,1);
        refreshEnemyList();
    }
}

class Imp extends Enemy {
    constructor(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive) {
        super(name, hp, strength, agility, intelligence, stamina, luck, attack, accuracy, defense, evasion, magicalDefense, command, target, alive);
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


/* GAME UI
*/
var notification = {
    messageContent : "Default Message",
    push : function() {
        var message = document.createElement("div");
        message.innerText = this.messageContent;
        document.getElementById("notification-one").appendChild(message);
    },
    clear : function() {
        document.getElementById("notification-one").innerHTML = "";
    }
}

function refreshEnemyList() {
    document.getElementById("enemy-targets").innerHTML = "";
    for (var i=0; i < enemies.length; i++) {
        var enemyTarget = document.createElement("button");
        enemyTarget.innerText = enemies[i].name;
        document.getElementById("enemy-targets").appendChild(enemyTarget);
        enemyTarget.setAttribute("onclick", "heroes[game.heroTurn].chooseTarget(enemies["+i+"])");
    }
}

function instantiateUi() {
    console.log("UI Loaded");

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
                heroSprite.classList.add("hero-sprite");
                document.getElementById("hero-display").appendChild(heroSprite);
                break;
            case "BlackBelt" :
                var heroSprite = document.createElement("img");
                heroSprite.src = "assets/images/black-belt.svg";
                heroSprite.classList.add("hero-sprite");
                document.getElementById("hero-display").appendChild(heroSprite);
                break;
            case "BlackMage" :
                var heroSprite = document.createElement("img");
                heroSprite.src = "assets/images/black-mage.svg";
                heroSprite.classList.add("hero-sprite");
                document.getElementById("hero-display").appendChild(heroSprite);
                break;
            case "WhiteMage" :
                var heroSprite = document.createElement("img");
                heroSprite.src = "assets/images/white-mage.svg";
                heroSprite.classList.add("hero-sprite");
                document.getElementById("hero-display").appendChild(heroSprite);
                break;
            default :
                console.log("hello");
        }
    }

    // Hero Commands
    var playerOptionFight = document.createElement("button");
    playerOptionFight.innerText = "FIGHT";
    playerOptionFight.classList.add("btn", "btn-dark");
    playerOptionFight.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('fight')");
    document.getElementById("player-options").appendChild(playerOptionFight);

    var playerOptionMagic = document.createElement("button");
    playerOptionMagic.innerText = "MAGIC";
    playerOptionMagic.classList.add("btn", "btn-dark");
    playerOptionMagic.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('magic')");
    document.getElementById("player-options").appendChild(playerOptionMagic);

    var playerOptionDrink = document.createElement("button");
    playerOptionDrink.innerText = "DRINK";
    playerOptionDrink.classList.add("btn", "btn-dark");
    playerOptionDrink.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('drink')");
    document.getElementById("player-options").appendChild(playerOptionDrink);

    var playerOptionItem = document.createElement("button");
    playerOptionItem.innerText = "ITEM";
    playerOptionItem.classList.add("btn", "btn-dark");
    playerOptionItem.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('item')");
    document.getElementById("player-options").appendChild(playerOptionItem);

    var playerOptionRun = document.createElement("button");
    playerOptionRun.innerText = "RUN";
    playerOptionRun.classList.add("btn", "btn-dark");
    playerOptionRun.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('run')");
    document.getElementById("player-options").appendChild(playerOptionRun);

    refreshEnemyList();

}


/* GAMEPLAY
Step 1: Player chooses their commands
game.playerCommandPhase()

Step 2: Enemy chooses their commands
game.enemyCommandPhase()

Step 3: Player's commands are executed
game.executePlayerTurn()

Step 4: Enemy's commands are executed
game.executeEnemyTurn()
*/


// Game Object
var game = {
    state : "active",
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
            }

        }

    },

    heroIncrement : function() { // Increment through the list of heroes
        this.heroTurn++;
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
        for (var i = 0; i < heroes.length; i++) {

            if (this.state == "won" || this.state == "loss") {
                return;
            } else {
                var heroCommand = heroes[i].command;
                switch (heroCommand) {
                    case "fight" :
                        heroes[i].fight(heroes[i].target);
                        break;
                    case "magic" :
                        heroes[i].magic(heroes[i].target);
                        break;
                    case "drink" :
                        heroes[i].drink();
                        break;
                    case "item" :
                        heroes[i].item();
                        break;
                    case "run" :
                        heroes[i].run();
                        break;
                    default :
                        console.log("Error: No command chosen");
                }
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

instantiateUi();
game.loop("player");