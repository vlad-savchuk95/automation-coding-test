describe("Deck of Cards API Automation", () => {
    let deckId;
  
    it("Should check two players for blackjack", () => {
      // Step 1 - Navigate to website
      cy.api("GET", "/").then((response) => {
        // Step 2 - Confirm the site is up
        expect(response.status).to.equal(200);
      });
  
      // Step 3 - Get a new deck
      cy.api("GET", "/api/deck/new/").then((response) => {
        expect(response.status).to.equal(200);
        deckId = response.body.deck_id;
  
        // Step 4 - Shuffle it
        cy.api("GET", `/api/deck/${deckId}/shuffle/?deck_count=1`).then(
          (shuffleResponse) => {
            expect(shuffleResponse.status).to.equal(200);
  
            // Step 5 - Deal three cards to each of two players
            cy.api(`GET`, `/api/deck/${deckId}/draw/?count=6`).then(
              (drawResponse) => {
                
                const cards = drawResponse.body.cards.map((card) => card.value);
                const player1Cards = cards.slice(0, 3);
                const player2Cards = cards.slice(3);
  
                // Step 6 - Check whether either has blackjack
                const player1HasBlackjack = checkForBlackjack(player1Cards);
                const player2HasBlackjack = checkForBlackjack(player2Cards);
  
                // Step 7 - If either has, write out which one does
                if (player1HasBlackjack) cy.log("Player 1 has blackjack!");
                if (player2HasBlackjack) cy.log("Player 2 has blackjack!");
              }
            );
          }
        );
      });
    });
  });
  
  function checkForBlackjack(cards) {
    return (cards.includes("ACE") && (cards.includes("10") || cards.includes("JACK") || cards.includes("QUEEN") || cards.includes("KING")));
  }
  