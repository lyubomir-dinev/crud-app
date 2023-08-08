describe("e2e", () => {
  it("tests e2e", () => {
    cy.viewport(2560, 1245);
    cy.visit("http://localhost:3000/");
    cy.get("td:nth-of-type(2) > div").click().should("have.text", "New Widget");
    cy.get("td:nth-of-type(3) > div")
      .click()
      .should("have.text", "Manufacturer Alpha");
    cy.get("td:nth-of-type(4) > div").click().should("have.text", "10");
    cy.get("tbody button").click();
    cy.get("button.bg-primary").click();
    cy.get("#\\:r3\\:-form-item").click();
    cy.get("#\\:r3\\:-form-item").type("New Widget 1");
    cy.get("#\\:r4\\:-form-item").click();
    cy.get("#\\:r4\\:-form-item").type("Manufacturer Alpha 1");
    cy.get("#\\:r5\\:-form-item").click();
    cy.get("#\\:r5\\:-form-item").type("110");
    cy.get("#radix-\\:Rj6pj9\\: button.bg-primary").click();
    cy.get("td:nth-of-type(2) > div")
      .click()
      .should("have.text", "New Widget 1");
    cy.get("td:nth-of-type(3) > div")
      .click()
      .should("have.text", "Manufacturer Alpha 1");
    cy.get("td:nth-of-type(4) > div").click().should("have.text", "110");
    cy.get("button.bg-destructive").click();
    cy.get("#radix-\\:Rr6pj9\\: button.bg-destructive").click();
    cy.get("td").click().should("have.text", "No widgets.");
  });
});
//# recorderSourceMap=BCBDBEBFBGBHBIBJBKBLBMBNBOBPBQBRBSBTBUBVB
