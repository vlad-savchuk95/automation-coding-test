import checkersPage from "../fixtures/page_objects/checkers.page";

describe("Game", () => {
      it("The Checkers game", () => {
        // Step 1 - Navigate to website
        cy.visit('https://www.gamesforthebrain.com/game/checkers/')

        // Step 2 - Confirm that the site is up
        cy.title().should('include', 'Checkers');

        // Step 3 - Make five legal moves as orange:
        checkersPage.moveToSpace("62");
        checkersPage.moveToSpace("73");

        cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 });
        checkersPage.statusText.contains("Make a move.").should("be.visible");
        checkersPage.moveToSpace("51");

        checkersPage.statusText.contains("Make a move.").should("be.visible");
        checkersPage.moveToSpace("62");

        cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 });
        checkersPage.statusText.contains("Make a move.").should("be.visible");

        checkersPage.moveToSpace("22");
        checkersPage.moveToSpace("33");
        checkersPage.statusText.contains("Make a move.").should("be.visible");
        cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 });
        checkersPage.moveToSpace("02");

        // Step 3a) Include taking a blue piece
        checkersPage.moveToSpace("24");
        checkersPage.space13.should("not.have.attr", "src", "me1.gif");

        // Step 3b) - Use “Make a move” as confirmation that you can take the next step
        checkersPage.statusText.contains("Make a move.").should("be.visible");

        cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 });
        checkersPage.moveToSpace("11");
        checkersPage.moveToSpace("02");
        checkersPage.statusText.contains("Make a move.").should("be.visible");

        // Step 3c) - Restart the game after five moves
        cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 });
        checkersPage.restartButton.click();

        // Step 3d) Confirm that the restarting had been successful
        checkersPage.statusText.contains("Select an orange piece to move.").should("be.visible");
      });
    });
    