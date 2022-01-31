let card = {
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"],
    suits: ["spades", "diamonds", "clubs", "hearts"],

    imageDeck: []

    
}

let deck = {
    value:[],
    source:[],

}

//deck
function getDeck () {
    //let deck = new Array()
    for(let s = 0; s < card.suits.length; s++){
        for(let v = 0; v < card.values.length; v++) {
            //let card = {Value: this.values[v], Suit: this.suits[s]}
            deck.source.push(`/BlackJack/public/assets/images/${card.values[v]}_of_${card.suits[s]}.png`)
        }

    }
    return shuffle(deck.source)
}


//shuffle
 function shuffle (array) {
    for (let i = array.length - 1; i > 0; i-- ) {
        let j = Math.floor(Math.random() * (i+1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp; 
    }
    return array
}