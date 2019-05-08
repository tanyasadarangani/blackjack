/**********************************************/
//DATA

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
    var hitButton, stayButton, startButton,
        betSlider, bankDetails,
        houseCards, playerCards;

      
/**********************************************/
//INIT
      
    //wait for entire HTML document to load, then run the init function
    document.addEventListener("DOMContentLoaded", init);

    function init(){
        //populate HTML data
        hitButton = document.getElementById("hitButton");
        stayButton = document.querySelector("#stayButton");
        houseCards = document.querySelector("#houseCards");
        playerCards = document.getElementById("playerCards");

        //assign event listeners and handlers
        hitButton.addEventListener("click", handleHitButtonClick);
        stayButton.addEventListener("click", handleStayButtonClick);
        //startButton.addEventListener("click", handleStartButtonClick);
        //betSlider.addEventListener("input", handleBetSliderInput);

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

        //deal one card to house, remove any from last hand
        house.cards = [getNextCard()];

        //display cards
        displayHouseCards();
        displayPlayerCards();
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
      	return `<figure class="${card.color}">${card.face}${card.suit}</figure>`;
    }

  
/**********************************************/
//LOGIC
      
	//event handlers
    function handleHitButtonClick(){
    	player.cards.push(getNextCard());
      	displayPlayerCards();
    }
      
    function handleStayButtonClick(){
    	//it's now house's turn...
      	//replace facedown card with a new one
      	house.cards.unshift(getNextCard()); //add to the beginning
      	displayHouseCards();
    }
      
    function handlePlayButtonClick(){}
      
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