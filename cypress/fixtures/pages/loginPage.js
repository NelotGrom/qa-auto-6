export class LoginPage {
  elements = {
    loginField: () => cy.get("div.frm-wrapper:nth-child(3) > input:nth-child(2)") ,
    passwordField: () => cy.get("div.frm-wrapper:nth-child(4) > input:nth-child(2)")
  }

  signIn(email, password) {
    cy.visit("/login");
    cy.login(email, password);
  }

  signInByInvLink (email, password) {
    cy.login(email, password);
  }
}