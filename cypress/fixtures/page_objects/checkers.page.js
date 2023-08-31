class checkersPage {
    get space13() { return cy.get('[name="space13"]'); }
    get restartButton() { return cy.get('[href="./"]'); }
    get statusText() { return cy.get('[id="message"]'); }

    moveToSpace(number) {
        cy.get(`[name="space${number}"]`).click();
    }
  }

  export default new checkersPage();