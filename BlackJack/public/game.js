let game = {
    money: document.getElementById('money'),
    betInput: document.getElementById("bet-amt"),
    inGame: false,
    hitButton: document.getElementById("hit"),
    standButton: document.getElementById("stand"),
    startGameButton: document.getElementById("new-game"),
    splitButton: document.getElementById("split"),
    splitTitle: document.getElementById('splitHand'),
    player1SplitHand: document.getElementById('player1-Split-Card'),
    win: document.getElementById("win"),
    lose: document.getElementById('lose'),
    push: document.getElementById('push'),
    blackjack: document.getElementById('blackjack')
}

let dealer = {
    hand: [],
    //score: calculateScore(dealer.hand),
    image: {
        c1: document.getElementById("d1"),
        c2: document.getElementById("d2"),
        c3: document.getElementById("d3"),
        c4: document.getElementById("d4"),
        c5: document.getElementById("d5"),
    }
}

let c1 = document.createElement('img')

class player {
    constructor(name, playerID) {
        this.name = name
        this.money = 100
        //this.score = calculateScore(player1.hand)
        this.hand = []
        this.image = {
            c1: document.getElementById("p1"),
            c2: document.getElementById("p2"),
            c3: document.getElementById("p3"),
            c4: document.getElementById("p4"),
            c5: document.getElementById("p5"),
        }
        this.playerID = playerID
    }
}

let player1
player1 = new player("p1", "p1")

//set up game
function setUp() {
    emptyHand()
    dealer.count = 0
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
    game.splitTitle.style.display = "none"
    game.player1SplitHand.style.display = "none"
    getDeck()
}

//start game
function newGame() {
    game.startGameButton.addEventListener('click', async function () {
        if (deck.cards.length == 0) {
            getDeck()
        }
        if (game.betInput.value > player1.money || game.betInput.value < 10) {
            return
        } else {
            dealCard(player1)
            dealCard(dealer)
            dealCard(player1)
            dealCard(dealer)

            if (calculateScore(player1.hand) === 22) {
                //option for split
            } else if (calculateScore(player1.hand) === 21) {
                game.blackjack.style.display = "block"
                disableButtons()
                console.log('Game started')
                await time(5000)
                game.blackjack.style.display = "none"
                stand()
            } else {
                game.betInput.disabled = true;
                game.standButton.disabled = false;
                game.hitButton.disabled = false;
                game.startGameButton.disabled = true;
                console.log('Game started')
            }
        }
    })
}
// deals a card to player
function hit() {
    game.hitButton.addEventListener('click', async function () {
        dealCard(player1)
        if (calculateScore(player1.hand) > 21) {
            disableButtons()
            endGame(lose)
            dealer.image.c2.innerHTML = ''
            dealer.image.c2.appendChild(dealer.hand[1].image)
        } else if (calculateScore(player1.hand) === 21) {
            blackjack.style.display = "block"
            disableButtons()
            await time(3000)
            console.log('stuck')
            stand()
        }
    })
}

game.standButton.addEventListener('click', async function () {
    disableButtons()
    while (calculateScore(dealer.hand) < 17) {
        dealCard(dealer)
    }
    if ((calculateScore(dealer.hand) <= 21) && calculateScore(dealer.hand) > calculateScore(player1.hand)) {
        dealer.image.c2.innerHTML = ''
        dealer.image.c2.appendChild(dealer.hand[1].image)
        endGame(lose)
    } else if (calculateScore(dealer.hand) == calculateScore(player1.hand)) {
        dealer.image.c2.innerHTML = ''
        dealer.image.c2.appendChild(dealer.hand[1].image)
        endGame(push)
    } else {
        dealer.image.c2.innerHTML = ''
        dealer.image.c2.appendChild(dealer.hand[1].image)
        endGame(win)
    }
})

// only runs if player has 21
function stand() {
    //disableButtons()
    while (calculateScore(dealer.hand) < 17) {
        dealCard(dealer)
    }
    for (i = 0; i < dealer.hand.length; i++) {
        if (calculateScore(dealer.hand) === 17 && dealer.hand[i].value === 11) {
            dealer.hand[i].value = 1
            dealCard(dealer)
        } else if (calculateScore(dealer.hand) === calculateScore(player1.hand)) {
            dealer.image.c2.innerHTML = ''
            dealer.image.c2.appendChild(dealer.hand[1].image)
            endGame(push)
        } else {
            dealer.image.c2.innerHTML = ''
            dealer.image.c2.appendChild(dealer.hand[1].image)
            console.log('stuck')
            endGame(win)
        }
    }
}

function split() {

}


function win() {
    game.win.style.display = "block"
    player1.money += Number(game.betInput.value)
}

function lose() {
    game.lose.style.display = "block"
    player1.money -= Number(game.betInput.value)
}

function push() {
    game.push.style.display = "block"
}

async function endGame(decision) { //callback is either win, lose, or push
    // contains the code that happens when the game ends
    decision()
    await time(5000)
    setUp()
}

function time(seconds) {            // allows a five second break inbetween lines of code
    return new Promise(resolve => { // await time() inside async function 
        setTimeout(function () {
            resolve()
        }, seconds)
    })
}

function emptyHand() {
    player1.hand = []
    dealer.hand = []
    player1.image.c1.innerHTML = ''
    player1.image.c2.innerHTML = ''
    player1.image.c3.innerHTML = ''
    player1.image.c4.innerHTML = ''
    player1.image.c5.innerHTML = ''
    dealer.image.c1.innerHTML = ''
    dealer.image.c2.innerHTML = ''
    dealer.image.c3.innerHTML = ''
    dealer.image.c4.innerHTML = ''
    dealer.image.c5.innerHTML = ''
}

function disableButtons() {
    game.standButton.disabled = true;
    game.hitButton.disabled = true;
    game.startGameButton.disabled = true;
    game.splitButton.disabled = true;
}