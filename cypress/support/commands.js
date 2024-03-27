import { LoginPage } from "../fixtures/pages/loginPage.js";
import { GeneralElements } from "../fixtures/pages/general.js";
import { InviteeBoxPage } from "../fixtures/pages/inviteeBoxPage.js";

const loginPage = new LoginPage();
const generalElements = new GeneralElements();
const inviteeBoxPage = new InviteeBoxPage();

Cypress.Commands.add("login", (userName, password) => {
  loginPage.elements.loginField().type(userName);
  loginPage.elements.passwordField().type(password);
  generalElements.elements.submitButton().click({ force: true });
});

Cypress.Commands.add("fillMemberCard", (wishText) => {
  generalElements.elements.submitButton().click();
  generalElements.twoClickRight(); 
  inviteeBoxPage.elements.wishesInput().type(wishText);
  generalElements.elements.arrowRight().click();
});

Cypress.Commands.add("getFreshCookies", () => {
  cy.getCookies()
    .should('exist')
    .then(cookies => {
      window.freshCookies = cookies;
      cookies.forEach(cookie => {
        cy.log(JSON.stringify(cookie));
      });
    });
});

