export class BoxPage {
  elements = {
    boxNameField: () => cy.get(":nth-child(1) > .frm"),
    boxIdField: () => cy.get("div.frm-wrapper:nth-child(3) > input"),
    sixthIcon: () => cy.get(":nth-child(6) > .picture_svg_wrapper"),
    giftPriceToggle: () => cy.get(".switch__toggle"),
    maxAnount: () => cy.get(".MuiGrid-grid-xs-5 .frm"),
    currency: () => cy.get(".MuiGrid-grid-xs-7 .frm"),
  };

  createNewBox (newBoxName) {
    this.elements.boxNameField().type(newBoxName);
    this.elements.boxIdField()
      .invoke("val")
      .then(function (value) {
        window.boxId = value;
        cy.log("Box ID:", window.boxId); 
      })
  }

  setMoneyLimit (maxAmount, currency) {
    this.elements.giftPriceToggle().click({ force: true });
    this.elements.maxAnount().type(maxAmount);
    this.elements.currency().select(currency);
  }

}
