describe("Smoke test", () => {
  it("loads homepage", () => {
    cy.visit("/");
    cy.contains("Cron-Job");
    cy.contains("Project is in development");
  });
});
