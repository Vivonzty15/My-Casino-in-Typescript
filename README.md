This is going to be a collection of my favorite games, starting with black jack.

I would like to make them multiplayer and able to play with/against AI.

Some more games I would like to add:
Texas Holdem
Bones(dominoes)
7-card gin




<b>bugs to fix:</b>
- what happens when dealer or player gets dealt two aces
    -not sure how to fix players ace issue
    - should I make a function to check a hand for an ace 
- should I not update count in dealCard()? 
- create image elements for cards in JS instead of HTML
- add a split function
    - add dealSplitCard(), split.hand object, and variables for the card holders
    - Can I reuse existing code?
    - Can I use existing buttons for multiple purposes?

scenarios
    Dealing card to dealer
        - If the dealer's score is equal to 17 and Ace in their hand. Ace equals 1 and deal card. 
          Else if dealer's score equals player's score, endGame(push)
        - Dealer's score + card value is greater than 21 and Ace in their hand, Ace equals 1, deal card. Else Endgame(win)
    Dealing card to player
        - If the player's score + the card value is greater than 21 and Ace in their hand, Ace equals 1. Else endGame(lose)

<b>fixed:</b>
- creating card images dynamically
- determining ace value
- 