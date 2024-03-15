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
            game.loop("active", "enemy");
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

    // Hero Stats
    for (hero of heroes) {
        var heroName = document.createElement("div");
        var heroHp = document.createElement("p");
        heroName.innerText = hero.name;
        heroHp.innerText = "HP " + hero.hp;
        document.getElementById("hero-stats").appendChild(heroName);
        document.getElementById("hero-stats").appendChild(heroHp);
    }

    // Hero Commands
    var playerOptionFight = document.createElement("button");
    playerOptionFight.innerText = "FIGHT";
    document.getElementById("player-options").appendChild(playerOptionFight);
    playerOptionFight.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('fight')");

    var playerOptionMagic = document.createElement("button");
    playerOptionMagic.innerText = "MAGIC";
    document.getElementById("player-options").appendChild(playerOptionMagic);
    playerOptionMagic.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('magic')");

    var playerOptionDrink = document.createElement("button");
    playerOptionDrink.innerText = "DRINK";
    document.getElementById("player-options").appendChild(playerOptionDrink);
    playerOptionDrink.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('drink')");

    var playerOptionItem = document.createElement("button");
    playerOptionItem.innerText = "ITEM";
    document.getElementById("player-options").appendChild(playerOptionItem);
    playerOptionItem.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('item')");

    var playerOptionRun = document.createElement("button");
    playerOptionRun.innerText = "RUN";
    document.getElementById("player-options").appendChild(playerOptionRun);
    playerOptionRun.setAttribute("onclick", "heroes[game.heroTurn].chooseCommand('run')");

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
    heroTurn : 0,
    enemyTurn : 0,
    playerCommandsChosen : false,
    enemyCommandsChosen : false,

    // THE LOOP: The function controlling the core game functionality
    loop : function(state, turn) {
        if (state == "won" || state == "loss") {
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
        game.loop("active", "player");
    },
    executePlayerTurn : function() { // Step 3: Execute the player's commands
        for (var i = 0; i < heroes.length; i++) {

            if (this.state == "won" || this.state == "loss") {
                return;
            } else {
                var heroCommand = heroes[i].command;
                switch (heroCommand) {
                    case "fight" : 
                        console.log(heroes[i].fight(heroes[i].target));
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
        this.breakLoopCheck();
        this.loop("active", "enemy");
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
            this.loop("won");
        }
        else if (heroes.every(deadHeroCheck) == true) {
            console.log("Game Over");
            this.loop("loss");
        } else {
            return;
        }
    }
}

instantiateUi();
game.loop("active", "player");