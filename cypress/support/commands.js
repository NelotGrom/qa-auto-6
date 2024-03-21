
const loginPage = require("../fixtures/pages/loginPage.json");
const generalElements = require("../fixtures/pages/general.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");

Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).type(userName);
  cy.get(loginPage.passwordField).type(password);
  cy.get(generalElements.submitButton).click({ force: true });
});

Cypress.Commands.add("fillMemberCard", (wishText) => {
  
    cy.get(generalElements.submitButton).click(); 
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishText);
    cy.get(generalElements.arrowRight).click();
});

// Cypress.Commands.add("approveUserByLinkInv", (userName,password,wishText,invitingLink) => {
//     cy.visit(invitingLink);
//     cy.get(generalElements.submitButton).click();
//     cy.contains("войдите").click();
//     cy.get(':nth-child(3) > .frm').type(userName);
//     cy.get(':nth-child(4) > .frm').type(password);
//     cy.get(generalElements.submitButton).click();
//     cy.contains("Создать карточку участника").should("exist");
//     cy.get(generalElements.submitButton).click();
//     cy.get(generalElements.arrowRight).click();
//     cy.get(generalElements.arrowRight).click();
//     cy.get(inviteeBoxPage.wishesInput).type(wishText);
//     cy.get(generalElements.arrowRight).click();
//     cy.clearCookies();
// });