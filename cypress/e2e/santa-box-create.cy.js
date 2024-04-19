import { faker } from "@faker-js/faker";

import { BoxPage } from"../fixtures/pages/boxPage";
import { GeneralElements } from"../fixtures/pages/general";
import { DashboardPage } from"../fixtures/pages/dashboardPage";
import { InviteePage } from"../fixtures/pages/invitePage";
//import { InviteeBoxPage } from"../fixtures/pages/inviteeBoxPage";
import { InviteeDashboardPage } from"../fixtures/pages/inviteeDashboardPage";
import { WindowConfirmationDrow } from"../fixtures/pages/windowConfirmationDrow"
import { LoginPage } from "../fixtures/pages/loginPage";

const users = require("../fixtures/users");
const boxPage = new BoxPage;
const generalElements = new GeneralElements;
const dashboardPage = new DashboardPage;
const invitePage = new InviteePage;
//const inviteeBoxPage = new InviteeBoxPage;
const inviteeDashboardPage = new InviteeDashboardPage;
const confirmDrowWindow = new WindowConfirmationDrow;
const loginPage = new LoginPage;

describe("user can create a box, add participants and start the drow", () => {

  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let currnetBox;
  let freshCookies;

  it("user logins and create a box", () => {
    loginPage.signIn(users.userAutor.email, users.userAutor.password);
    cy.getFreshCookies();
    cy.contains("Создать коробку").click();
    boxPage.createNewBox(newBoxName);
    currnetBox = newBoxName;
    generalElements.oneClickRight();
    boxPage.elements.sixthIcon().click();
    generalElements.oneClickRight();
    boxPage.setMoneyLimit(maxAmount, currency);
    generalElements.oneClickRight();
    boxPage.elements.settingsTitle().should("have.text", "Дополнительные настройки");
    generalElements.oneClickRight();
    dashboardPage.elements.createdBoxName().should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      })
  });

  it("user gets an invitation link for participants", () => {
    generalElements.mainButtonClick();
    invitePage.getInvLink();
    cy.clearCookies();
  });

  it("user can add participants by input form", () => {
    loginPage.signIn(users.userAutor.email,users.userAutor.password);
    generalElements.openBoxesDashboard();
    cy.contains(currnetBox).should("exist").click({ force: true }); 
    cy.contains("Добавить участников").should("exist").click({ force: true });     
    invitePage.inviteByInputForm(users.user3.name, users.user3.email, users.user2.name, users.user2.email);
    cy.get(".tip--green > section:nth-child(2) > div:nth-child(1) > span:nth-child(1)")
      .should("have.text", "Карточки участников успешно созданы и приглашения уже отправляются. Если необходимо, вы можете добавить еще участников.")
    cy.clearCookies();
  });
  
  it("user can add participants by invitation link", () => {
    cy.visit(inviteLink); 
    generalElements.mainButtonClick(); 
    cy.contains("войдите").click();
    loginPage.signInByInvLink(users.user1.email, users.user1.password); //с этими кредсами 
    cy.contains("Создать карточку участника").should("exist");
    cy.fillMemberCard(wishes);
    inviteeDashboardPage.elements.noticeForInvitee()
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("creator of the box is able to start the drow", () => {
    loginPage.signIn(users.userAutor.email, users.userAutor.password);
    generalElements.openBoxesDashboard();
    cy.contains(currnetBox).should("exist").click({ force: true }); 
    cy.contains("Перейти к жеребьевке").should("exist").click(); 
    generalElements.mainButtonClick();
    confirmDrowWindow.elements.approveButton().click({ force: true });
    cy.get('.picture-notice__hint > a > .base--clickable').click();
    cy.contains("На этой странице показан актуальный список участников со всей информацией.").should("exist");
  });

  // //ТЕХНИЧЕСКИЙ КОД ДЛЯ УДАЛЕНИЯ БОЛЬШОГО КОЛИЧЕСТВА КОРОБОК.
  
  // Cypress._.times(20, () => {
  //   describe('Description', () => {
  //     it.only('runs 20 times', () => {
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

  after("delete created box", () => {
    cy.request({
      method: 'DELETE',
      url: `/api/box/${window.boxId}`,
      headers: {
        ...freshCookies
      },
      }).then((response) => {
      expect(response.status).to.eq(200);
    })
  })
})