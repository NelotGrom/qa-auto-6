const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;
  let currnetBox;

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    currnetBox = newBoxName;
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).click({ force: true });
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
  });

  it("user gets an invitation link for participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });

  it("user can add participants by input form", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email,users.userAutor.password);
    cy.get(generalElements.boxesMenu).click();
    cy.contains(currnetBox).should("exist").click({ force: true }); 
    cy.contains("Добавить участников").should("exist").click({ force: true }); 
    cy.get(invitePage.nameFieldDirectInv).eq(0).type(users.user3.name); 
    cy.get(invitePage.emailFieldDirectInv).eq(1).type(users.user3.email); 
    cy.get("div.btn-main:nth-child(2)").should("exist").click();
    cy.get(".tip--green > section:nth-child(2) > div:nth-child(1) > span:nth-child(1)").should("have.text", "Карточки участников успешно созданы и приглашения уже отправляются. Если необходимо, вы можете добавить еще участников.")
    cy.clearCookies();
  });
  
  it("user can add participants by invitation link", () => {
    cy.visit(inviteLink); 
    cy.get(generalElements.submitButton).click(); 
    cy.contains("войдите").click();
    cy.login(users.user1.email, users.user1.password);  
    cy.contains("Создать карточку участника").should("exist"); 
    cy.fillMemberCard(wishes);
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();

    cy.visit(inviteLink); 
    cy.get(generalElements.submitButton).click(); 
    cy.contains("войдите").click();
    cy.login(users.user2.email, users.user2.password);  
    cy.contains("Создать карточку участника").should("exist"); 
    cy.fillMemberCard(wishes);
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  // Cypress._.times(20, () => {
  //   describe('Description', () => {
  //     it('runs 20 times', () => {
  //       cy.visit("/login");
  //       cy.login(users.userAutor.email, users.userAutor.password);
  //       cy.get(
  //             '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
  //           ).click();
  //       cy.get(":nth-child(1) > a.base--clickable > .user-card").first().click();
  //       cy.get(
  //             ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
  //         ).click();
  //       cy.contains("Архивация и удаление").click({ force: true });
  //       cy.get(":nth-child(2) > .form-page-group__main > .frm-wrapper > .frm").type(
  //             "Удалить коробку"
  //           );
  //       cy.get(".btn-service").eq(0).click();
  //     });
  //   });
  // });

  // after("delete box", () => {
  //   cy.visit("/login");
  //   cy.login(users.userAutor.email, users.userAutor.password);
  //   cy.get(
  //     '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
  //   ).click();
  //   cy.get(":nth-child(1) > a.base--clickable > .user-card").first().click();
  //   cy.get(
  //     ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
  //   ).click();
  //   cy.contains("Архивация и удаление").click({ force: true });
  //   cy.get(":nth-child(2) > .form-page-group__main > .frm-wrapper > .frm").type(
  //     "Удалить коробку"
  //   );
  //   cy.get(".btn-service").click();
  // });
});