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


/* HEROES
Hero JS Class, Individual Hero Classes, and Heroes
*/
heroes = [];

var hero = {
    name: '',
    hp : 20,
    mp : 0,
    strength : 10,
    agility : 0,
    intelligence : 0,
    stamina : 0,
    luck : 0,
    attack : '',
    accuracy : 0,
    defense : 0,
    evasion : 0,
    magicalDefense : 0,
    command : '',
    target : '',
    alive : true,
    chooseCommand : function(command) {
        console.log(game.heroTurn);
        console.log(this.name, "chose to", command);
        this.command = command;
    },
    chooseTarget : function(target) {
        console.log(this.name, "chose to target", target);
        this.target = target;
        if (game.heroTurn == heroes.length-1) {
            game.playerCommandsChosen = true;
            console.log("It's the enemy turn to choose their commands!");
            game.enemyCommandPhase();
        } else {
            game.heroIncrement();
            console.log("It's still the player's turn to choose their commands!");
        }
    },
    fight : function(target) {
        console.log(this.name, 'attacks now!');
        this.attack = this.strength / 2;
        target.hp = this.target.hp - this.attack;
        if (target.hp <= 0) {
            target.die();
        }
        console.log(target.hp);
    },
    magic : function() {
        console.log(this.name, 'cast magic!');
    },
    drink : function() {
        console.log(this.name, 'drinks something!'); 
    },
    item : function() {
        console.log(this.name, 'uses an item!'); 
    },
    run : function() {
        console.log(this.name, 'runs!'); 
    }
};

var fighter = Object.create(hero);
var blackBelt = Object.create(hero);
var blackMage = Object.create(hero);
var whiteMage = Object.create(hero);



/* HEROES
Create our individual hero character objects. 4 slots total.
Give each hero character a name, which I may want the player to be able
to update themselves.
Push the hero character objects into our array.
*/
var heroOne = Object.create(hero);
var heroTwo = Object.create(blackMage);
var heroThree = Object.create(hero);
var heroFour = Object.create(hero);

heroOne.name = "Stephen";
heroOne.name = heroOne.name.toUpperCase();
heroTwo.name = "Jillian";
heroTwo.name = heroTwo.name.toUpperCase();
heroThree.name = "Woo Woo";
heroThree.name = heroThree.name.toUpperCase();
heroFour.name = "Sealy";
heroFour.name = heroFour.name.toUpperCase();

heroes.push(heroOne, heroTwo, heroThree, heroFour);
// End of HEROES


/* ENEMIES
Create our individual enemy character objects.
Give each enemy character a name.
*/
/* Define our enemy prototype which will remain static,
but in case I want to change the enemy types in a future version */
enemies = [];

var enemy = {
    name : '',
    hp : 10,
    mp : 0,
    strength: [2,3],
    luck: 0,
    die : function() {
        console.log(this.name, "died!");
        var enemyIndex = enemies.indexOf(this.name);
        enemies.splice(enemyIndex,1);
        refreshEnemyList();
    }
};

var enemyOne = Object.create(enemy);
enemyOne.name = "Imp";
var enemyTwo = Object.create(enemy);
enemyTwo.name = "Imp";

var enemyThree = Object.create(enemy);
enemyThree.name = "Dragon";
enemyThree.strength = 10;
var enemyFour = Object.create(enemy);
enemyFour.name = "Dragon";
enemyFour.strength = 10;
var enemyFive = Object.create(enemy);
enemyFive.name = "Dragon";
enemyFive.strength = 10;
var enemySix = Object.create(enemy);
enemySix.name = "Dragon";
enemySix.strength = 10;

enemies.push(enemyOne, enemyTwo);
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



/* GAME UI
*/
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
    state : "active",
    turn : "player",
    heroTurn : 0,
    playerCommandsChosen : false,
    enemyCommandsChosen : false,

    // THE LOOP: The function controlling the core game functionality
    loop : function() {
        if (this.state == "won" || this.state == "loss") {
            return;
        } else {
            if (this.turn == "player" && this.playerCommandsChosen == true) {
                this.executePlayerTurn();
            } else if (this.turn == "enemy" && this.enemyCommandsChosen == true) {
                this.executeEnemyTurn();
            } else {
                this.playerCommandPhase();
            }
        }
    },

    heroIncrement : function() { // Increment through the list of heroes
        this.heroTurn++;
    },
    playerCommandPhase : function() { // Step 1: Load the UI for the player to choose their commands and targets
        console.log("It's time to choose your commands!");
    },
    enemyCommandPhase : function() { // Step 2: Automatically choose the enemy's commands
        console.log("Need to write code to choose the enemies commands here before executing all commands for both player and enemies.");
        this.enemyCommandsChosen = true;
        this.loop();
    },
    executePlayerTurn : function() { // Step 3: Execute the player's commands
        for (var i = 0; i < heroes.length; i++) {
            
            this.breakLoopCheck();

            if (this.state == "won" || this.state == "loss") {
                return;
            } else {
                var heroCommand = heroes[i].command;
                switch (heroCommand) {
                    case "fight" : 
                        heroes[i].fight(heroes[i].target);
                        break;
                    case "fire" :
                        heroes[i].fire(heroes[i].target);
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
        this.turn = "enemy";
        this.loop();
    },
    executeEnemyTurn : function() { // Step 4: Execute the enemy's commands
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
    },
    breakLoopCheck : function() { // Decide if the game loop needs to be broken for a victory or a loss
        function livingHeroCheck() {
            this.alive;
        }
        if (enemies.length == 0) {
            this.victory();
            return true;
        }
        else if (heroes.every(livingHeroCheck) == false) {
            this.loss();
            return true;
        } else {
            return false;
        }
    },
    loss : function() { // Loss Event
        console.log("Game Over");
        this.state = "loss";
    },
    victory : function() { // Victory Event
        console.log("You Win!")
        this.state = "win";
    }
}

instantiateUi();
game.loop();


/* Ideal flow:
    It comes time to choose commands, the game needs to stop
    The player will choose and then move to the next player until everyone has chosen
    Then execute the commands
*/