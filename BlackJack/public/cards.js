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
        image.id = "card"
        image.setAttribute("draggable", true)
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
            eachCard = new card(count, `BlackJack/public/assets/images/${cardCreator.values[v]}_of_${cardCreator.suits[s]}.png`)
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

function fiveDeck(){
    getDeck()
    getDeck()
    getDeck()
    getDeck()
    getDeck()
}

function dealCard(person) {
    if (deck.cards.length === 0) {
        fiveDeck()

    }
    let card = deck.cards.pop()
    let faceDown = document.createElement('img')
    faceDown.src = 'BlackJack/public/assets/images/facedown.png'
    faceDown.id = 'card'
    console.log(person)
    switch (person.hand.length) { // checks how many cards the person has to decide where to put the card
        case 0:
            person.hand.push(card);
            person.image.c1.appendChild(card.image)
            break;
        case 1:
            person.hand.push(card);
            switch (person) { // might make a faceDown function for this
                case dealer: person.image.c2.appendChild(faceDown); break;
                case player1: person.image.c2.appendChild(card.image); break;
            };
            break;
        case 2:
            switch (person) { // there could be a faceUp function as well
                case dealer: person.image.c2.innerHTML = ''
                    person.image.c3.appendChild(person.hand[1].image); break;
            };

            person.hand.push(card);
            person.image.c3.appendChild(card.image)
            break;
        case 3:
            person.hand.push(card);
            person.image.c4.appendChild(card.image)
            break;
        case 4:
            person.hand.push(card);
            person.image.c5.appendChild(card.image)
            break;
        default:
            console.log(person.hand.length)
            console.log('no room for another card')
            console.log(person)
    }
    console.log(person)
}

function dealSplitCard() {

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
        if ((aceTotal + notAceTotal) > 21) {
            hand[i].value = 1
            aceTotal -= 11
            aceTotal += hand[i].value
        }
    }

    total = notAceTotal + aceTotal
    console.log(total)

    return total
}