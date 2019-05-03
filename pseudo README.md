# blackjack
/* 
you need 52 cards
you need a player and a dealer
you need a counter to see how many cards a player has in their hand
you also need to count the total value of the hand
you need an IF statement to see if they reach 21 or if they go over it
you need a win loss counter
you need a way to "hit" to get more cards
you need a way to stop when you are comfortable with the number

1) Define required Constants 
  1.1) Set up a deck, with following requirements:

- 52 cards
- one through ten, of each suit, value what's on card
- ace, of each suit, value = 1 or 11(make it default 11, if the score of the hand is above 21 then reset to 1 )
- jacks/queens/kings, of each suite, value = 10
maybe do an array of objects 
Maybe this is set up as an array, with four arrays (one for each suit). Don't want to explicitly write out a 52 length array, so set up a method that does this for you. Alternatively, maybe use hash key/values? key is suit and value is card type? Arrays are ordered though. 

Shuffle the cards - randomize deck somehow. Can you just randomize an entire array?yes Look that up ? how will i reshuffle each time? need to figure

Ask for the players name, store it as a variable.

Deal the initial cards:

- 2 to player 1 
- 2 to dealer
- save the cards in each hand (smaller arrays) and total (integer)
- probably need to calculate the values of the hand 

Write a method for players turn:

- ask them hit/stay?
- deal them 1 card if hit right?
- if stay, move on to dealers turn
- if broke or blackjack deliver message

Write a method for dealers turn: 

- if hand value < 17, hit
if hand is greater than 17 then stand 
- check if hand > player hand
- if so, dealer wins, end of game
- if broke or blackjack deliver message

Once game over, and outcome correctly reported, ask player if they want to play again & loop back through game after shuffling.  
