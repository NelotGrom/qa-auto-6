export class GeneralElements {
  elements = {
    arrowRight: () => cy.get(".btn-arrow-right"),
    submitButton: () => cy.get(".btn-main"),
    boxesMenu: () => cy.get(".layout-1__header-wrapper-fixed [href='/account/boxes'] > .header-item >> .txt--med"),
    notificationsMenu: () => cy.get(":nth-child(2) > .header-item__text"),
    profileMenu: () => cy.get("[href='/account']"),
  };

  mainButtonClick() {
    this.elements.submitButton().click();
  };

  oneClickRight () {
    this.elements.arrowRight().click();
  };

  twoClickRight () {
    this.elements.arrowRight().click();
    this.elements.arrowRight().click();
  };
  
  openBoxesDashboard () {
    this.elements.boxesMenu().click();
  };
}
