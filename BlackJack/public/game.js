let game = {
    money: document.getElementById('money'),
    betInput: document.getElementById("bet-amt").value,
    inGame: false,
    hitButton: document.getElementById("hit"),
    standButton: document.getElementById("stand"),
    startGameButton: document.getElementById("new-game"),
}

let dealer = {
    hand: [],
    count: 0,
    DOM: {
       c1: document.getElementById("d-1"),
       c2: document.getElementById("d-2"),
       c3: document.getElementById("d-3"),
       c4: document.getElementById("d-4"),
       c5: document.getElementById("d-5"),
   }
}

class player {
    constructor(name, playerID) {
        this.name = name
        this.money = 100
        this.count = 0
        this.hand = []
        this.DOM = {
            c1: document.getElementById("p1-1"),
            c2: document.getElementById("p1-2"),
            c3: document.getElementById("p1-3"),
            c4: document.getElementById("p1-4"),
            c5: document.getElementById("p1-5"),
        }
        this.playerID = playerID
    }
}

let player1 
    //set up game
function setUp() {
    player1 = new player("p1", "p1")
    money = 100;
    game.money.innerHTML = "$" + money;
    game.betInput.value = 10;
    game.betInput.disabled = false;
    game.standButton.disabled = true;
    game.hitButton.disabled = true;
    game.startGameButton.disabled = false;
    getDeck()
}

    //start game
 function newGame() {
    game.startGameButton.addEventListener('click', function() {
        if (deck.cards.length == 0) {
            getDeck()
        }

        dealCard(player1)
        //pcard1 = deck.cards.pop()
        //player1.DOM.c1.src= pcard1.source
        dealCard(dealer)
        dealCard(player1)
        dealCard(dealer)
        console.log(player1)
        game.betInput.disabled = true;
        game.standButton.disabled = false;
        game.hitButton.disabled = false;
        game.startGameButton.disabled = true;
        console.log('Game started')
    })
}

function hit() {
    game.hitButton.addEventListener('click', function () {
        dealCard(player1)
        console.log(player1)
    })
}

function stand() {
    game.standButton.addEventListener('click', function() {
        while (dealer.count <= 17){
            dealCard(dealer)
        }
    })
}

function endGame() {
    // contains the code that happens when the game ends
}
