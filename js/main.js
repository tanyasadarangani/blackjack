/**********************************************/
//DATA
  
  	//settings
  	const minimumBet = 5,
          startingBank = 100;

    //player data
	const player = {},
          house = {};

    //card data
	var deck;
      
	function getDeck(){
    	//create a shuffled array of 52 cards
      	//each card:
      	/*{
        	 value: 1-10, (11),
             face: A, 2, 3, 4, ..., 9, 10, J, Q, K,
             suit: "&hearts;", "&diams;", "&spades;", "&clubs;",
             color: "red", "black"
      	 }*/
		const suits = ["&hearts;", "&diams;", "&spades;", "&clubs;"],
              colors = ["red", "black"],
              unshuffled = [];
      	for (let i=0; i<52; i++){
        	//suit
          	let suit = suits[Math.floor(i/13)], //i < 13 will be hearts; i < 26 will be diamonds, ...
                color = colors[Math.floor(i/26)],
                value = (i % 13) + 1, //1-13
                face = value;
          	if (value === 11){
              	face = "J";
              	value = 10;
            }            
          	if (value === 12){
              	face = "Q";
              	value = 10;
            }
          	if (value === 13){
              	face = "K";
              	value = 10;
            }
          	if (value === 1){
              	face = "A";
              	value = 11;
            }
          	unshuffled.push({value, suit, color, face});
        }
      	return shuffle(unshuffled);
    }
      
	function getNextCard(){
    	return deck.pop();
    }
      
	//HTML data
    var hitButton, stayButton, playButton,
        playerBank, playerTotal, houseTotal,
        houseCards, playerCards,
        gameResult;

      
/**********************************************/
//INIT
      
    //wait for entire HTML document to load, then run the init function
    document.addEventListener("DOMContentLoaded", init);

    function init(){
        //populate HTML data
        hitButton = document.getElementById("hitButton");
        stayButton = document.querySelector("#stayButton");
      	playButton = document.querySelector("#playButton");
        houseCards = document.querySelector("#houseCards");
        playerCards = document.getElementById("playerCards");
      	playerTotal = document.getElementById("playerTotal");
      	houseTotal = document.querySelector("#houseTotal");
      	gameResult = document.querySelector("#gameResult");
      	playerBank = document.querySelector("#playerBank");

        //assign event listeners and handlers
        hitButton.addEventListener("click", handleHitButtonClick);
        stayButton.addEventListener("click", handleStayButtonClick);
        playButton.addEventListener("click", handlePlayButtonClick);
      
      	//start player with some money
      	player.bank = startingBank;
      	player.bet = minimumBet;

        //start game
        setup();
    }
	      
/**********************************************/
//SETUP
    function setup(){
        //renew deck
        deck = getDeck();

        //deal two cards to player, remove any from last hand
        player.cards = [getNextCard(), getNextCard()];
      	player.total = getHandTotal(player.cards);
      	displayPlayerTotal();

        //deal one card to house, remove any from last hand
        house.cards = [getNextCard()];

        //display cards
        displayHouseCards();
        displayPlayerCards();
      
      	//remove last hand's game result
      	gameResult.textContent = "";
      
      	//remove last hand's house total
      	houseTotal.textContent = "";
      
      	//display player bank amount
      	displayPlayerBank();
    }
      
/**********************************************/
//OUTPUT
      
    function displayHouseCards(){
      	let cardHTML = "";
    	if (house.cards.length === 1){
        	//show face-down card
          	cardHTML += `<figure class="facedown"></figure>`;
          	cardHTML += getCardHTML(house.cards[0]);
        }
      	else {
         	//show all cards
          	for (card of house.cards){ //loop through house cards
            	cardHTML += getCardHTML(card);
            }
        }
      	houseCards.innerHTML = cardHTML;
    }
      
	function displayPlayerCards(){
    	let cardHTML = "";
      	for (card of player.cards){ //loop through player cards
        	cardHTML += getCardHTML(card);
        }
      	//playerCards is HTML element
      	playerCards.innerHTML = cardHTML; //put JS html string into HTML DOM
    }
      
	function getCardHTML(card){
    	//give this function a card object
      	//get back HTML code as a JS string
      	return ` <figure class="${card.color}">${card.face}${card.suit}</figure>`;
    }
  
  	function displayPlayerTotal(){
    	playerTotal.textContent = player.total;
    }
  
  	function displayHouseTotal(){
      	houseTotal.textContent = house.total;
    }
  
  	function displayPlayerBank(){
    	playerBank.textContent = "$ " + player.bank;
    }

  
/**********************************************/
//LOGIC
  
	function getHandTotal(cards){
      	var aceIndices = [];
    	//accumulator pattern
      	var total = 0; //define the accumulator variable
      	//iterate through cards array
      	for (let i=0; i<cards.length; i++){
        	//"accumulate"
          	total += cards[i].value;
          	if (cards[i].value === 11) aceIndices.push(i);
        }
      	//check for changing aces from 11 to 1
      	if (total > 21 && aceIndices.length > 0){
        	var firstAceIndex = aceIndices[0]; //first ace worth 11 points
          	cards[firstAceIndex].value = 1; 
          	return getHandTotal(cards); //recursion!!!!
        }
      	//return accumulator
      	else return total;
    }
  
  	function houseTurn(){
    	house.cards.unshift(getNextCard()); //add to the beginning
      	house.total = getHandTotal(house.cards);
      	while(house.total < 17){
        	house.cards.push(getNextCard());
            house.total = getHandTotal(house.cards);
		}
      	displayHouseCards();
      	displayHouseTotal();
      	resolveWinLose();
    }
  
  	function resolveWinLose(){
    	//only happens if player doesn't go over 21
      	if (house.total > 21 || player.total > house.total) playerWins();
      	//house wins with ties or when house total is greater than player total
      	else playerLoses();
    }
  
  	function playerWins(){
      	gameResult.textContent = `You Win $ ${minimumBet}!`;
      	player.bank += minimumBet;
      	displayPlayerBank();
      	//
      	playButton.classList.remove("hidden"); //reveal the play button .     
      	hitButton.classList.add("hidden"); //hide the hit button
      	stayButton.classList.add("hidden"); //hide the play button
    }
  
  	function playerLoses(){
      	gameResult.textContent = `You lose $ ${minimumBet} :(`;
      	player.bank -= minimumBet;
      	displayPlayerBank();
      	//
      	if (player.bank < minimumBet){
        	//bankrupt!!
          	alert("You're bankrupt!! :((\nPlay Again.");
          	player.bank = startingBank;
          	setup();
        }
      	else {
            playButton.classList.remove("hidden"); //reveal the play button .     
            hitButton.classList.add("hidden"); //hide the hit button
            stayButton.classList.add("hidden"); //hide the play button
        }
    }
  
/**********************************************/
//EVENT HANDLING
      
	//event handlers
    function handleHitButtonClick(){
    	player.cards.push(getNextCard());
      	displayPlayerCards();
      	player.total = getHandTotal(player.cards);
      	displayPlayerTotal();
      	if (player.total > 21) playerLoses();
    }
      
    function handleStayButtonClick(){
    	//it's now house's turn...
      	houseTurn();      	
    }
      
    function handlePlayButtonClick(){
    	playButton.classList.add("hidden"); //hide the play button
      	hitButton.classList.remove("hidden"); //reveal the hit button
      	stayButton.classList.remove("hidden"); //reveal the stay button
      	setup();
    }
      
    function handleBetSliderInput(){}
      
/**********************************************/
//HELPERS

    function shuffle(arr){
		let copy = JSON.parse(JSON.stringify(arr)),
            shuffled = [];
      	while (copy.length){
        	shuffled.push(copy.splice(Math.floor(Math.random()*copy.length), 1)[0]);
        }
      	return shuffled;
    }