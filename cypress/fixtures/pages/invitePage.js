export class InviteePage {
  elements = {
    inviteLink: () => cy.get(":nth-child(2) > .form-page-group__main b"),
    inviteeFieldPassword: () => cy.get(".MuiGrid-container > :nth-child(2) > .frm-wrapper > .frm-wrapper__bottom"),
    inviteeFieldEmail: () => cy.get("':nth-child(1) > .frm-wrapper > #input-table-0'"),
    nameFieldDirectInv : () => cy.get("div.input-table div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2 div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6 div.frm-wrapper input#input-table-0.frm").eq(0),
    emailFieldDirectInv : () => cy.get("div.input-table div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2 div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6 div.frm-wrapper input#input-table-0.frm").eq(1),    
    nameFieldDirectInvTwo : () => cy.get("div.input-table div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2 div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6 div.frm-wrapper input#input-table-1.frm").eq(0),
    emailFieldDirectInvTwo : () => cy.get("div.input-table div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2 div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6 div.frm-wrapper input#input-table-1.frm").eq(1),
  }

  getInvLink () {
    this.elements.inviteLink().invoke("text").then((link) => {
      window.inviteLink = link;
    });
  }

  inviteByInputForm (name, email, name_second, email_second) {
    this.elements.nameFieldDirectInv().type(name); 
    this.elements.emailFieldDirectInv().type(email); 
    this.elements.nameFieldDirectInvTwo().type(name_second); 
    this.elements.emailFieldDirectInvTwo().type(email_second); 
    cy.get("div.btn-main:nth-child(2)").should("exist").click();
  }

}