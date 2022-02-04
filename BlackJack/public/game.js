let game = {
    money: document.getElementById('money'),
    betInput: document.getElementById("bet-amt"),
    inGame: false,
    hitButton: document.getElementById("hit"),
    standButton: document.getElementById("stand"),
    startGameButton: document.getElementById("new-game"),
    splitButton: document.getElementById("split"),
    win: document.getElementById("win"),
    lose: document.getElementById('lose'),
    push: document.getElementById('push'),
    blackjack: document.getElementById('blackjack')
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

let c1 = document.createElement('img')

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
player1 = new player("p1", "p1")

    //set up game
function setUp() {
    emptyHand()
    dealer.count=0
    player1.count = 0
    game.money.textContent = "$" + player1.money;
    game.betInput.value = 10;
    game.betInput.disabled = false;
    game.standButton.disabled = true;
    game.hitButton.disabled = true;
    game.startGameButton.disabled = false;
    game.splitButton.disabled = true;
    game.win.style.display = "none"
    game.lose.style.display = "none"
    game.push.style.display = "none"
    game.blackjack.style.display = "none"
    getDeck()
}

    //start game
 function newGame() {
    game.startGameButton.addEventListener('click', async function() {
        if (deck.cards.length == 0) {
            getDeck()
        }
        if (game.betInput.value > player1.money){
            return
        } else {
            dealCard(player1)
            dealCard(dealer)
            dealCard(player1)
            dealCard(dealer)
            if (dealer.count === 22) {
                dealer.count -= 10
            }
            if (player1.count === 22){ //option for split
                player1.count -= 10
                game.betInput.disabled = true;
                game.standButton.disabled = false;
                game.hitButton.disabled = false;
                game.startGameButton.disabled = true;
                console.log('Game started')
            } else if (player1.count === 21){
                game.blackjack.style.display = "block"
                console.log('Game started')
                await time(5000)
                stand()
            } else {
                game.betInput.disabled = true;
                game.standButton.disabled = false;
                game.hitButton.disabled = false;
                game.startGameButton.disabled = true;
                console.log('Game started')
            }
        }
        console.log(player1)
        console.log(dealer)
    })
}

function hit() {
    game.hitButton.addEventListener('click', async function () {
        dealCard(player1)
    
        for (i = 0; i < player1.hand.length; i++) { // for when there are multiple players- if I have each player in an array, could I put that array as an argument to check each of their hands for aces
            if (player1.count > 21 && player1.hand[i].value === 11) {
                player1.count -= 10
            }
        }
            if (player1.count > 21 ) {
                dealer.DOM.c2.src = dealer.hand[1].source
                disableButtons()
                lose()
            } else if (player1.count === 21) {
                blackjack.style.display = "block"
                disableButtons()
                await time(3000)
                console.log('stuck')
                stand()
            }
    })
}

function stand() {
    game.standButton.addEventListener('click', async function() {
        disableButtons()
        while (dealer.count < 17){
            dealCard(dealer)
        }
        while (dealer.hand.length === 2) {
            if(dealer.count === 22) {
                dealer.count -= 10
                dealCard(dealer)
            }
        }
        for (i = 0; i < dealer.hand.length; i++) {
            if (dealer.count === 17 || dealer.count > 21 && dealer.hand[i].value === 11){
                dealer.count -= 10
                while (dealer.count < 17) {
                dealCard(dealer)
                }
            }
        }
        if ((dealer.count <= 21)&& dealer.count > player1.count){
            dealer.DOM.c2.src = dealer.hand[1].source
            lose()
        } else if (dealer.count == player1.count) {
            dealer.DOM.c2.src = dealer.hand[1].source
            console.log('stuck')
            push()
        } else {
            dealer.DOM.c2.src = dealer.hand[1].source
            win()
        }
    })
    while(dealer.hand.length === 2) {  // will this run regardless of the click?
        for (i = 0; i < 2; i++) {
        if(player1.count === dealer.count && player1.count === 17 && dealer.hand[i].value === 11){
            dealer.count -= 10
            dealCard(dealer)
            push()
        } else if(player1.count === 21) {
            dealer.DOM.c2.src = dealer.hand[1].source
            console.log(stuck)
            win()
        }
    }
    
    }
}

async function win() {
    game.win.style.display = "block"
    player1.money += Number(game.betInput.value)
    await time(5000)
    setUp()
}

async function lose() {
    game.lose.style.display = "block"
    player1.money -= Number(game.betInput.value)
    await time(5000)
    setUp()
}

async function push() {
    game.push.style.display = "block"
    await time(5000)
    setUp()
}

function endGame(callback) { //callback is either win, lose, or push
    // contains the code that happens when the game ends
    callback
}

function time(seconds) {            // allows a five second break inbetween lines of code
    return new Promise(resolve => { // await time() inside async function 
        setTimeout(function(){
            resolve()
        },seconds)
    })
}

function emptyHand() {
    player1.hand = []
    dealer.hand = []
    player1.DOM.c1.src = ""
    player1.DOM.c2.src = ""
    player1.DOM.c3.src = ""
    player1.DOM.c4.src = ""
    player1.DOM.c5.src = ""
    dealer.DOM.c1.src = ""
    dealer.DOM.c2.src = ""
    dealer.DOM.c3.src = ""
    dealer.DOM.c4.src = ""
    dealer.DOM.c5.src = ""
}

function disableButtons() {
    game.standButton.disabled = true;
    game.hitButton.disabled = true;
    game.startGameButton.disabled = true;
    game.splitButton.disabled = true;
}