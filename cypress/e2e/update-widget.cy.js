describe("update-widget", () => {
  it("tests update-widget", () => {
    cy.viewport(2560, 1245);
    cy.visit("http://localhost:3000/");
    cy.get("tbody button").click();
    cy.get("button.bg-primary").click();
    cy.get("#\\:r3\\:-form-item").click();
    cy.get("#\\:r3\\:-form-item").type("New Widget 1");
    cy.get("#\\:r4\\:-form-item").click();
    cy.get("#\\:r4\\:-form-item").type("Manufacturer Alpha 1");
    cy.get("#\\:r5\\:-form-item").click();
    cy.get("#\\:r5\\:-form-item").type("110");
    cy.get("#radix-\\:Rj6pj9\\: button.bg-primary").click();
    cy.get("td:nth-of-type(2) > div").click();
    cy.get("td:nth-of-type(3) > div").click();
    cy.get("td:nth-of-type(4) > div").click();
  });
});
//# recorderSourceMap=BCBDBEBFBGBHBIBJBKBLBMBNBOBPB
