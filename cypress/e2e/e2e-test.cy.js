describe("e2e-test", () => {
  it("creates a widget", () => {
    cy.visit("http://localhost:3000/");
    cy.get("td").click().should("have.text", "No widgets.");
    cy.get("#create-widget-trigger").click();
    cy.get("#name").click().type("New Widget");
    cy.get("#manufacturer").click().type("Manufacturer Alpha");
    cy.get("#stockLevel").click().type("10");
    cy.get("#create-widget-dialog-submit").click().type("{esc}");
    cy.get("td:nth-of-type(2) > div").click().should("have.text", "New Widget");
    cy.get("td:nth-of-type(3) > div")
      .click()
      .should("have.text", "Manufacturer Alpha");
    cy.get("td:nth-of-type(4) > div").click().should("have.text", "10");
  });

  it("updates the widget", () => {
    cy.visit("http://localhost:3000/");
    cy.get("td:nth-of-type(2) > div").click().should("have.text", "New Widget");
    cy.get("tbody button").click();
    cy.get("#update-widget-trigger").click();
    cy.get("#name").click().type("New Widget 1");
    cy.get("#manufacturer").click().type(" 1");
    cy.get("#stockLevel").click().type("1");
    cy.get("#update-widget-dialog-submit").click().type("{esc}");
    cy.get("td:nth-of-type(2) > div")
      .click()
      .should("have.text", "New Widget 1");
    cy.get("td:nth-of-type(3) > div")
      .click()
      .should("have.text", "Manufacturer Alpha 1");
    cy.get("td:nth-of-type(4) > div").click().should("have.text", "101");
  });

  it("deletes the widget", () => {
    cy.visit("http://localhost:3000/");
    cy.get("tbody button").click();
    cy.get("#delete-widget-trigger").click();
    cy.get("#delete-widget-confirm").click();
    cy.get("td").click().should("have.text", "No widgets.");
  });
});
