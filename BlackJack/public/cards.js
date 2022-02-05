let cardCreator = {
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"],
    suits: ["spades", "diamonds", "clubs", "hearts"],

    imageDeck: []


}

class card {
    constructor(value, source) {
        this.value = value
        this.source = source
        this.image = this.getImage()
    }

    ace() {
        return this.value = 1
    }

    getImage() {
        let image = document.createElement('img')
        image.src = this.source
        return image
    }
}

let eachCard

let deck = {
    cards: [],
    source: []

}

//deck
function getDeck() {
    //let deck = new Array()
    let count
    for (let s = 0; s < cardCreator.suits.length; s++) {
        for (let v = 0; v < cardCreator.values.length; v++) {
            //let card = {Value: this.values[v], Suit: this.suits[s]}
            switch (cardCreator.values[v]) {
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
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function dealCard(person) {                     // should I leave updating the count to the game function ??
    if (deck.cards.length == 0) {
        getDeck()

    }
    let card = deck.cards.pop()
    console.log(person)
    switch (person.hand.length) { // checks how many cards the person has to decide where to put the card
        case 0:
            person.hand.push(card);
            //person.count += card.value;
            person.DOM.c1.src = card.source;
            break;
        case 1:
            //checkHandForAce(dealer, card);
            //checkHandForAce(player1, card);
            person.hand.push(card);
            //person.count += card.value;
            switch (person) { // might make a faceDown function for this
                case dealer: person.DOM.c2.src = 'assets/images/facedown.png'; break;
                case player1: person.DOM.c2.src = card.source; break;
            };
            break;
        case 2:
            switch (person) { // there could be a faceUp function as well
                case dealer: person.DOM.c2.src = person.hand[1].source; break;
            };

            //checkHandForAce(dealer, card);
            //checkHandForAce(player1, card);
            person.hand.push(card);
            //person.count += card.value;
            person.DOM.c3.src = card.source;
            break;
        case 3:
            //checkHandForAce(dealer, card);
            //checkHandForAce(player1, card);
            person.hand.push(card);
            //person.count += card.value;
            person.DOM.c4.src = card.source
            break;
        case 4:
            //checkHandForAce(dealer, card);
            //checkHandForAce(player1, card);
            person.hand.push(card);
            //person.count += card.value;
            person.DOM.c5.src = card.source
            break;
        default:
            console.log('no room for another card')
            console.log(person)
    }
    console.log(person)
}

function checkHandForAce(person, card) {
    for (i = 0; i < person.hand.length; i++) {
        if (card.value === 11 & person.count > 10) {
            console.log(card.value)
            card.value = 1
            console.log(card.value)
        } else if ((person.count + card.value) > 21 && person.hand[i].value === 11) {
            console.log(person.hand[i].value)
            person.hand[i].value = 1
            console.log(person.hand[i].value)
        }
    }
}

function calculateScore(hand) {
    let notAceTotal = 0
    let aceTotal = 0
    let total
    for (i = 0; i < hand.length; i++) {
        if (hand[i].value === 11) { continue }

        notAceTotal += hand[i].value

    }
    for (i = 0; i < hand.length; i++) {
        if (hand[i].value !== 11) { continue }
        if (hand == dealer.hand) {
            if ((notAceTotal + hand[i].value) > 21) {
                console.log(hand[i].value)
                hand[i].value = 1
                console.log(hand[i].value)
                aceTotal += hand[i].value
            } else if ((notAceTotal + hand[i].value) === 17) {
                console.log(hand[i].value)
                hand[i].value = 1
                console.log(hand[i].value)
                aceTotal += hand[i].value
            } else {
                console.log(hand[i].value)
                aceTotal += hand[i].value
            }
        } else if (hand == player1.hand) {
            if ((notAceTotal + hand[i].value) > 21) {
                console.log(hand[i].value)
                hand[i].value = 1
                console.log(hand[i].value)
                aceTotal += hand[i].value
            } else {
                console.log(hand[i].value)
                aceTotal += hand[i].value
            }
        }
    }

    total = notAceTotal + aceTotal
    console.log(total)

    return total
}