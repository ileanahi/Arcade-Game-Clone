/*
 * To-do:
 * Player selection
 * More enemies
 * Lives
 * Timer
 */

// Set up score element
let score = document.querySelector('.score');
score.innerHTML = '<strong>Score:</strong> 0';
let points = 0;

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Position of bugs
    this.y = y;
    this.x = 0;

    // Speed of bugs
    this.speed = 1.2;

    this.height = 50;
    this.width = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 505) {
        this.x += this.speed * Math.floor(Math.random() * 300) * dt;
    } else {
        // Reset bugs to beginning
        this.x = 0;
    }

    // Collision detection
    for (let i = 0; i < allEnemies.length; i++) {
        if ((player.x < allEnemies[i].x + allEnemies[i].width) &&
            (player.x + player.width > allEnemies[i].x) &&
            (player.y < allEnemies[i].y + allEnemies[i].height) &&
            (player.height + player.y > allEnemies[i].y)) {

            // Reset player to the beginning
            player.x = 200;
            player.y = 380;
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 380;
    this.width = 50;
    this.height = 50;
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.y > 20) {
        this.y -= 85;
    }
    if (key === 'down' && this.y < 380) {
        this.y += 85;
    }
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (key === 'right' && this.x < 402) {
        this.x += 101;
    }
    if (this.y < 20 && key === 'up') {
        // Add to point count when water is reached
        points++;
        // Update point counter
        score.innerHTML = '<strong>Score:</strong> ' + points;
        // You win!
        if (points >= 5) {
            modal();
        }
        // Reset to starting position
        this.y = 380;
        this.x = 200;
    }
};


// Display modal window
function modal() {
    let modal = document.querySelector('.modal');
    modal.style.display = "block";

    // Add content to window
    let modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = "<img src=" + player.sprite + ">" + "<h2>Congratulations!</h2> You won!";

    // Hide window when clicked
    window.onclick = function(evt) {
        if (evt.target === modal) {
            modal.style.display = "none";
        }
    }
}

/*
const selectCharacter = document.querySelector('#select-screen');
let select = document.getElementsByClassName('select');

window.onclick = function(evt) {
    if (evt.target === select) {
        player.sprite = this.src;
        selectCharacter.style.display = "none";
    }
}
*/


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Place Enemies on different lines
enemyOne = new Enemy(40);
enemyTwo = new Enemy(125);
enemyThree = new Enemy(210);

var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});