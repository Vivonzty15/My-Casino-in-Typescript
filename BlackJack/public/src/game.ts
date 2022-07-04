interface Game {
    money: HTMLHeadElement,
    betInput: any,
    inGame: false,
    playerName: HTMLHeadElement,
    hitButton: any,
    standButton: any,
    startGameButton: any,
    doubleButton: any,
    splitButton: any,
    win: HTMLHeadElement,
    lose: HTMLHeadElement,
    push: HTMLHeadElement,
    blackjack: HTMLHeadElement
}

let game: Game = {
    money: document.getElementById('money'),
    betInput: document.getElementById("bet-amt"),
    inGame: false,
    playerName: document.getElementById("playerName"),
    hitButton: document.getElementById("hit"),
    standButton: document.getElementById("stand"),
    startGameButton: document.getElementById("new-game"),
    doubleButton: document.getElementById('dbl'),
    splitButton: document.getElementById("split"),
    win: document.getElementById("win"),
    lose: document.getElementById('lose'),
    push: document.getElementById('push'),
    blackjack: document.getElementById('blackjack')
}

let dealer = {
    hand: [] as card[],
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
    name: string;
    money: any;
    hand: Array<card>;
    image: any;
    playerID: string

    constructor(name: string, playerID: string) {
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

let player_name: any = prompt("What's your name?", "");

let player1: player
player1 = new player(player_name, "p1")



//set up game
function setUp() {
    emptyHand()
    if (deck.cards.length === 0) {
        fiveDeck()
    }
    if (player1.money < 10) {
        game.money.textContent = "BUSTED"
    } else {
        game.money.textContent = "$" + player1.money
    }
    game.playerName.textContent = player1.name + "'s Hand"
    game.betInput.value = 10;
    game.betInput.disabled = false;
    game.standButton.disabled = true;
    game.hitButton.disabled = true;
    game.startGameButton.disabled = false;
    game.doubleButton.disabled = true;
    game.splitButton.disabled = true;
    game.win.style.display = "none"
    game.lose.style.display = "none"
    game.push.style.display = "none"
    game.blackjack.style.display = "none"
}

game.doubleButton.addEventListener('click', function () {
    game.betInput.value = game.betInput.value * 2
})

let re = new RegExp("/\D/")

//start game
function newGame() {
    let re = new RegExp("^[0-9]*$")

    game.startGameButton.addEventListener('click', async function (): Promise<any> {
        if (game.betInput.value > player1.money || game.betInput.value < 10 || re.test(game.betInput.value) == false) {
            return
        } else {
            dealCard(player1)
            dealCard(dealer)
            dealCard(player1)
            dealCard(dealer)

            //if (player1.hand[0].value === player1.hand[1].value) {
            //    splitButton.disabled = false // a work in progress
            //}

            console.log(re.test(game.betInput.value))
            if (calculateScore(player1.hand) === 21) {
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
                if ((game.betInput.value * 2) < player1.money) {
                    game.doubleButton.disabled = false;
                }
            }
        }
    })
}
// deals a card to player
function hit() {
    game.hitButton.addEventListener('click', async function (): Promise<any> {
        game.doubleButton.disabled = true;
        dealCard(player1)
        if (calculateScore(player1.hand) > 21) {
            disableButtons()
            endGame(lose)
            dealer.image.c2.innerHTML = ''
            dealer.image.c2.appendChild(dealer.hand[1].image)
        } else if (calculateScore(player1.hand) === 21) {
            game.blackjack.style.display = "block"
            disableButtons()
            await time(3000)
            stand()
        }
    })
}

game.standButton.addEventListener('click', function () {
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
    while (calculateScore(dealer.hand) < 17) {
        dealCard(dealer)
    }

    if (calculateScore(dealer.hand) === calculateScore(player1.hand)) {
        dealer.image.c2.innerHTML = ''
        dealer.image.c2.appendChild(dealer.hand[1].image)
        endGame(push)
    } else {
        dealer.image.c2.innerHTML = ''
        dealer.image.c2.appendChild(dealer.hand[1].image)
        endGame(win)
    }
}

// async function json() {
//     let response =  await fetch('http://127.0.0.1:9901/money')
//     let jsonObject =  await response.json()
//     console.log(jsonObject)
//     countValue = jsonObject.value
//}
//json()

function win() {
    game.win.style.display = "block"
    player1.money += Number(game.betInput.value)
}

function lose() {
    game.lose.style.display = "block"
    player1.money -= Number(game.betInput.value)
    if (player1.money < 10) {
        player1.money = "BUSTED"
    }
}

function push() {
    game.push.style.display = "block"
}

async function endGame(decision: Function): Promise<any> { //callback is either win, lose, or push
    // contains the code that happens when the game ends
    decision()
    await time(5000)
    setUp()
}

function time(seconds: number) {            // allows a five second break inbetween lines of code
    return new Promise<void>(resolve => { // await time() inside async function 
        setTimeout(function () {
            resolve()
        }, seconds)
    })
}

function emptyHand() {
    // clears previous cards from the board
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
    game.doubleButton.disabled = true;
}