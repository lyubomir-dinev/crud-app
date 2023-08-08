describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");

    cy.get("#create-widget-trigger").click();

    cy.get("#create-widget-dialog-content").should("be.visible");

    cy.get("#create-widget-dialog-content #name").type("Test Widget");

    cy.get("#create-widget-dialog-content #manufacturer").type(
      "Test Manufacturer"
    );

    cy.get("#create-widget-dialog-content #stockLevel").type("10");

    cy.get("#create-widget-dialog-content #create-widget-dialog-submit")
      .click()
      .type("{esc}");

    cy.get("#create-widget-dialog-content").should("not.be.visible");
  });
});
