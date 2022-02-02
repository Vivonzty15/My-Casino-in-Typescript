let cardCreator = {
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"],
    suits: ["spades", "diamonds", "clubs", "hearts"],

    imageDeck: []

    
}

class card {
    constructor(value, source) {
        this.value = value
        this.source = source
    }
}

let eachCard 

let deck = {
    cards:[],
    source: []

}

//deck
function getDeck () {
    //let deck = new Array()
    let count
    for(let s = 0; s < cardCreator.suits.length; s++){
        for(let v = 0; v < cardCreator.values.length; v++) {
            //let card = {Value: this.values[v], Suit: this.suits[s]}
            switch (cardCreator.values[v]){
                case 'A': count = 11; break;
                case '2': count = 2; break;
                case '3': count = 3; break;
                case '4': count = 4; break;
                case '5': count = 5; break;
                case '6': count = 6; break;
                case '7': count = 7; break;
                case '8': count = 8; break;
                case '9': count = 9; break;
                case '10': 
                case 'jack': 
                case 'queen':
                case 'king': count = 10; break;
                default: console.log('cant update count') 
            }
            eachCard = new card(count, `/BlackJack/public/assets/images/${cardCreator.values[v]}_of_${cardCreator.suits[s]}.png`)
            //deck.source.push(`/BlackJack/public/assets/images/${cardCreator.values[v]}_of_${cardCreator.suits[s]}.png`)
            deck.cards.push(eachCard)
        }

    }
    return shuffle(deck.cards)
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

function dealCard(person) {
    if (deck.cards.length == 0) {
        getDeck()
        
    }
    let card = deck.cards.pop()
    switch (person.hand.length) { // checks how many cards the person has to decide where to put the card
        case 0: 
        person.hand.push(card);
        person.count += card.value;
        person.DOM.c1.src = card.source
        break;
        case 1: 
        person.hand.push(card);
        person.count += card.value;
        switch (person === dealer){ // might make a faceDown function for this
            case true: person.DOM.c2.src = 'assets/images/facedown.png'; break;
            case false: person.DOM.c2.src = card.source; break;
        }
        break;
        case 2: 
        switch (person === dealer) { // there could be a faceUp function as well
            case true: person.DOM.c2.src = person.hand[1].source; break;
        }
        person.hand.push(card);
        person.count += card.value;
        person.DOM.c3.src = card.source
        break;
        case 3: 
        person.hand.push(card);
        person.count += card.value;
        person.DOM.c4.src = card.source
        break;
        case 4: 
        person.hand.push(card);
        person.count += card.value;
        person.DOM.c5.src = card.source
        break;
        default: console.log('no room for another card')
    }

}