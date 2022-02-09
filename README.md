# My Casino #

This is going to be a collection of my favorite games, starting with black jack.

<b>BlackJack Rules:</b>
* Aces can be worth 11 points or 1.
* Face cards are worth 10.
* Points for the rest of the cards correspond with their value.
* The game starts out with 5 decks (256 cards).
* They are all shuffled together randomly.
* Before each game you can decide how much money you want to bet.
* At the start of each game you are dealt two cards and the dealer is dealt two, but you can only see their first card. 
    * If your two cards have the same value, you can split(still working on this function)
    * If you get 21 point, you win the amount of money you bet.
    * If not you can hit(take another card), or stand(end your turn). If you go over 21 points, you lose your bet.
* When you stand the dealer turns over their second card.
    * The dealer will deal a card to themselves while their points are less than 17.
    * If they have 17 point with an ace (ex. a six and ace) it is considered a soft 17. They deal a card to themselves on a soft 17. 
    * If they end up with more points than you, you lose.
    * If they end up with the same amount of points as you, you push (neither win money nor lose money)
    * If they go over 21 you win. 

<b>Some more games I would like to add:</b>
* Texas Holdem
* Bones(dominoes)
* 7-card gin
* Dice games

## Timeline ##

* Created all my files, index.html, index.js, BlackJack.html etc.
* Outlined my HTML files
* Styled them with bootstrap and an internal stylesheet
* Outlined my project in my JS files
* Created card class, created cards, added them to a deck, and shuffled the deck with functions. 
* Created a player class to keep track of their hand, score, name, and money
* Created dealer object to keep track of their hand

<b>bugs to fix:</b>
* Dealing cards
    * How does the browser know where to put the card
* Score is updating to NAN
* what happens when dealer or player gets dealt two aces
    * If dealer has 17 with an ace, the ace's value should change to 1
    * Not sure how to fix players ace issue
    * Should I make a function to check a hand for an ace 
* Should I not update count in dealCard()? 
* Create image elements for cards in JS instead of HTML
* calculateScore() returns 22 with two aces
* How to get the user's name
* Add a split function
    * Can I reuse existing code?
    * Can I use existing buttons for multiple purposes?

<b>fixed:</b>
* Dealt cards with dealCard() function in card.js
* Fixed scoring using Number(value) 
* Created card images dynamically
* Got rid of count. Created calculateScore() function in cards.js
* Determined ace value with calculateScore()
* Added code to calculateScore() to check for two aces
* Added users name with prompt. 