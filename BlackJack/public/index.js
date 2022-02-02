async function main() {
    setUp()
    newGame()
    hit()
    stand()
    if (dealer.count > 21 & player1.count <=21){
        console.log('you win')
    } else if (dealer.count <= 21 & player1.count > 21){
        console.log('you lose')
    }
}
main()