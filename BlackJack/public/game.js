let game = {
    cash: 100,
    bet: 10,
    inGame: false,
    hit: document.getElementById("hit"),
    stand: document.getElementById("stand"),
    startGame: document.getElementById("new-game"),
    p1_1: document.getElementById("p1-1"),
    p1_2: document.getElementById("p1-2"),
    p1_3: document.getElementById("p1-3"),
    p1_4: document.getElementById("p1-4"),
    p1_5: document.getElementById("p1-5"),
    d1: document.getElementById("d-1"),
    d2: document.getElementById("d-2"),
    d3: document.getElementById("d-3"),
    d4: document.getElementById("d-4"),
    d5: document.getElementById("d-5"),


    //hit

    //stand

    //win

    //lose

    //tie


}
//new game
 function newGame() {
    game.startGame.addEventListener('click', function() {
        getDeck()
        
        game.p1_1.src = deck.source.pop()
        game.d1.src = deck.source.pop()
        game.p1_2.src = deck.source.pop()
        game.d2.src = deck.source.pop()
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
