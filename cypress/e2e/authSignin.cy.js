/*
Here user Signin either using Google OAuth/AppWrite credential Login
Should register a new account in the database
If found a existing record then send toast message to user

After registering a new record, should redirect to /dashboard
*/

describe("Auth Signin flow", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("allows user to sign in with valid credentials", () => {
    // Visit signin page
    cy.visit("/auth/signin");

    // Email field (by semantic input type)
    cy.get('input[type="email"]').should("be.visible").type("test2@gmail.com");

    // Password field
    cy.get('input[type="password"]').should("be.visible").type("Test@1234");

    // Submit button (by accessible text)
    cy.contains("button", /^sign in$/i)
      .should("be.enabled")
      .click();

    // Assert redirect
    cy.url().should("include", "/dashboard");

    // Check cookie
    cy.getCookie("appwrite_jwt").should("exist");

    cy.contains(/logout/i).should("be.visible");
  });
});
