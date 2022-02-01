let game = {
    money: document.getElementById('money'),
    betInput: document.getElementById("bet-amt").value,
    inGame: false,
    hitButton: document.getElementById("hit"),
    standButton: document.getElementById("stand"),
    startGameButton: document.getElementById("new-game"),
    p1Hand:{
        c1: document.getElementById("p1-1"),
        c2: document.getElementById("p1-2"),
        c3: document.getElementById("p1-3"),
        c4: document.getElementById("p1-4"),
        c5: document.getElementById("p1-5"),
        total: 0
    },
    dHand: {
        c1: document.getElementById("d-1"),
        c2: document.getElementById("d-2"),
        c3: document.getElementById("d-3"),
        c4: document.getElementById("d-4"),
        c5: document.getElementById("d-5"),
        total:0
    }
}

class player {
    constructor(name, playerID) {
        this.name = name
        this.money = 100
        this.count = 0
        this.hand = []
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
        

        pcard1 = deck.cards.pop()
        game.p1Hand.c1.src= pcard1.source
        dcard1 = deck.cards.pop()
        game.dHand.c1.src = dcard1.source
        pcard2 = deck.cards.pop()
        game.p1Hand.c2.src = pcard2.source
        dcard2 = deck.cards.pop()
        game.dHand.c2.src = 'assets/images/facedown.png'
        player1.hand.push(pcard1, pcard2)
        player1.count = pcard1.value + pcard2.value
        console.log(player1)
        game.betInput.disabled = true;
        game.standButton.disabled = false;
        game.hitButton.disabled = false;
        game.startGameButton.disabled = true;
        console.log('Game started')
    })
}

function hit() {
    game.hit.addEventListener('click', function () {

    })
}

function stand() {
    game.stand.addEventListener('click', function() {

    })
}
