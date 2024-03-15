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


/* Build our array of heroes and enemies. The number will likely
be static, but just in case I want to dynamically change the number 
of either, we'll determine how many of each we want from this array.
*/
heroes = [];
enemies = [];

// Define our hero prototype to be updated per hero character
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
    fight : function(target) {
        console.log(this.name, 'attacks now!');
        this.attack = this.strength / 2;
        target.hp = target.hp - this.attack;
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

/* Define our enemy prototype which will remain static,
but in case I want to change the enemy types in a future version */
var enemy = {
    name : '',
    hp : 10,
    mp : 0,
    strength: [2,3],
    luck: 0
};



/* Objects
Create our character objects
*/
var fighter = Object.create(hero);
var blackBelt = Object.create(hero);
var blackMage = Object.create(hero);
blackMage.fire = function(target) {
    console.log(this.name, 'casts Fire!');
    target.hp = target.hp - 10;
    console.log(target.hp);
}
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



/* ENEMIES
Create our individual enemy character objects.
Give each enemy character a name.
*/
var enemyOne = Object.create(enemy);
enemyOne.name = "Imp";



/* GAME UI
*/
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

    // Player Options
    heroOne.command = "fight";
    heroOne.target = enemyOne;
    heroTwo.command = "fight";
    heroTwo.target = enemyOne;
    heroThree.command = "fight";
    heroThree.target = enemyOne;
    heroFour.command = "fight";
    heroFour.target = enemyOne;

    var playerOptionFight = document.createElement("button");
    playerOptionFight.innerText = "FIGHT";
    document.getElementById("player-options").appendChild(playerOptionFight);

    var playerOptionMagic = document.createElement("button");
    playerOptionMagic.innerText = "MAGIC";
    document.getElementById("player-options").appendChild(playerOptionMagic);

    var playerOptionDrink = document.createElement("button");
    playerOptionDrink.innerText = "DRINK";
    document.getElementById("player-options").appendChild(playerOptionDrink);

    var playerOptionItem = document.createElement("button");
    playerOptionItem.innerText = "ITEM";
    document.getElementById("player-options").appendChild(playerOptionItem);

    var playerOptionRun = document.createElement("button");
    playerOptionRun.innerText = "RUN";
    document.getElementById("player-options").appendChild(playerOptionRun);
}


/* GAMEPLAY
Create the combat functions
*/
function chooseCommands() {
    console.log("It's time to choose your commands!");
    commandsChosen = true;
    gameLoop();
}

function executePlayerTurn() {
    for (var i = 0; i < heroes.length; i++) {

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
} // End executePlayerTurn()

function executeEnemyTurn() {
    console.log("Enemy took their turn!");
} // End executeEnemyTurn()

// Set the player's turn by default
var turn = "player";
var commandsChosen = false;

function gameLoop() {
    if (commandsChosen == true) {

        if (turn == "player") {
            // Player Turn
            // When it's the player's turn, have them choose their options, then execute
            executePlayerTurn();
            turn = "enemy";
            gameLoop();

        } else if (turn == "enemy") {
            // Enemy Turn
            // When it's the enemy's turn, choose their options, then execute
            executeEnemyTurn();
            turn = "player";
        }

    } else {
        chooseCommands();
    }
}

instantiateUi();
gameLoop();