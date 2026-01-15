describe("Sample simple test", () => {
  it("Should perform a sum using the buttons", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid=2]").click();
    cy.get('[data-testid="+"]').click();
    cy.get("[data-testid=3]").click();
    cy.get('[data-testid="="]').click();

    cy.get("#result").should("have.value", "5");
  });
  
});
