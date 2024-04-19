import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

import { faker } from "@faker-js/faker";

import { BoxPage } from"../../fixtures/pages/boxPage";
import { GeneralElements } from"../../fixtures/pages/general";
import { DashboardPage } from"../../fixtures/pages/dashboardPage";
import { InviteePage } from"../../fixtures/pages/invitePage";
//import { InviteeBoxPage } from"../../fixtures/pages/inviteeBoxPage";
import { InviteeDashboardPage } from"../../fixtures/pages/inviteeDashboardPage";
import { WindowConfirmationDrow } from"../../fixtures/pages/windowConfirmationDrow"
import { LoginPage } from "../../fixtures/pages/loginPage";

const users = require("../../fixtures/users");
const boxPage = new BoxPage;
const generalElements = new GeneralElements;
const dashboardPage = new DashboardPage;
const invitePage = new InviteePage;
//const inviteeBoxPage = new InviteeBoxPage;
const inviteeDashboardPage = new InviteeDashboardPage;
const confirmDrowWindow = new WindowConfirmationDrow;
const loginPage = new LoginPage;

let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let maxAmount = 50;
let currency = "Евро";
let currnetBox;
let freshCookies;

Given("user is on santa login page", function () {
    cy.visit("/login");
});

Given("user logs in", function () {
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.getFreshCookies();
});

Given("user is on dashboard page", function () {
    cy.contains("Создать коробку").click();
});

Given("user creates a box", function () {
    boxPage.createNewBox(newBoxName);
    currnetBox = newBoxName;
    generalElements.oneClickRight();
});

Given("user picks an icon", function () {
    boxPage.elements.sixthIcon().click();
    generalElements.oneClickRight();
});

Given("user sets a money limit", function () {
    boxPage.setMoneyLimit(maxAmount, currency);
    generalElements.oneClickRight();
});


Given("user is on box settings page", function () {
    boxPage.elements.settingsTitle().should("have.text", "Дополнительные настройки");   
});

Given("user finishes a box creating", function () {
    generalElements.oneClickRight();
});

Given("user sees a created box", function () {
    dashboardPage.elements.createdBoxName().should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
    })
});

Given("user clicks main button", function () {
    generalElements.mainButtonClick();
});

Given("user can get a invitation link", function () {
    invitePage.getInvLink();
    cy.clearCookies();
});

Given("user go to current box dashboard page", function () {
    generalElements.openBoxesDashboard();
    cy.contains(currnetBox).should("exist").click({ force: true }); 
});

Given("user can add participants with form", function () {
    cy.contains("Добавить участников").should("exist").click({ force: true });     
    invitePage.inviteByInputForm(users.user3.name, users.user3.email, users.user2.name, users.user2.email);
    cy.get(".tip--green > section:nth-child(2) > div:nth-child(1) > span:nth-child(1)")
      .should("have.text", "Карточки участников успешно созданы и приглашения уже отправляются. Если необходимо, вы можете добавить еще участников.")
    cy.clearCookies();
});

Given("user use an invitation link", function () {
    cy.visit(inviteLink); 
});

Given("user sees Войдите button", function () {
    cy.contains("войдите").click();
});

Given("inv-user logs in", function () {
    cy.login(users.user1.email, users.user1.password);
});

Given("user create a participants card", function () {
    cy.contains("Создать карточку участника").should("exist");
    cy.fillMemberCard(wishes);
    inviteeDashboardPage.elements.noticeForInvitee()
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
});


Given("user go to drow", function () {
    cy.contains("Перейти к жеребьевке").should("exist").click(); 
});
 
Given("user starts a drow", function () {
    generalElements.mainButtonClick();
    confirmDrowWindow.elements.approveButton().click({ force: true });
    cy.get('.picture-notice__hint > a > .base--clickable').click();
    cy.contains("На этой странице показан актуальный список участников со всей информацией.").should("exist");
});