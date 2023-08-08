describe("e2e-2", () => {
  it("tests e2e-2", () => {
    cy.viewport(2560, 1245);
    cy.visit("http://localhost:3000/");
    cy.get("tbody button").click();
    cy.get("button.bg-primary").click();
  });
});
//# recorderSourceMap=BCBDBEBFB
