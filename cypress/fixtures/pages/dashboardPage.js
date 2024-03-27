export class DashboardPage {
  elements = {
    createdBoxName: () => cy.get(".layout-1__header-wrapper-fixed .txt-h3--max-1-lines"),
    boxFirst: () => cy.get(":nth-child(1) > a.base--clickable > .user-card"),
  };
}
