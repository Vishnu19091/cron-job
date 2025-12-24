/*
Here user Signin either using Google OAuth/AppWrite credential Login
Should register a new account in the database
If found a existing record then send toast message to user

After registering a new record, should redirect to /dashboard
*/

const sign_in_email = Cypress.env("TEST_SIGN_IN_EMAIL");
const sign_in_password = Cypress.env("TEST_SIGN_IN_PASSWORD");
const sign_in_username = Cypress.env("TEST_SIGN_IN_USERNAME");

describe("Auth Signin (validation) using Invalid credentials and Testing Toasts", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/auth/signin");
  });

  // Toast for empty Form
  it("shows error toast when submitting empty form", () => {
    cy.contains("button", /^sign in$/i).click();

    cy.contains("All fields are required").should("be.visible");
  });

  // Warning toast for Short Password
  it("shows warning toast for short password", () => {
    cy.get('input[type="email"]').type(sign_in_email);
    cy.get('input[type="password"]').type("short");

    cy.contains("button", /^sign in$/i).click();

    cy.contains("Password must be at least 8 characters").should("be.visible");
  });

  // Toast for Invalid Credentials
  it("shows error toast for invalid credentials", () => {
    cy.get('input[type="email"]').type(sign_in_email);
    cy.get('input[type="password"]').type("WrongPassword@123");

    cy.contains("button", /^sign in$/i).click();

    cy.contains(/invalid|incorrect|credentials/i, {
      timeout: 4000,
    }).should("be.visible");
  });
});

describe("Auth Signin using valid credentials", () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/auth/signin");

    cy.get('input[type="email"]').type(sign_in_email);
    cy.get('input[type="password"]').type(sign_in_password);

    cy.contains("button", /^sign in$/i).click();

    // Redirect
    cy.url().should("include", "/dashboard");

    // Success toast
    cy.contains("Signed In successfully", {
      timeout: 10000,
    }).should("be.visible");

    // Session cookie exists
    cy.getCookie("appwrite_session").should("exist");
  });

  it("renders user info on dashboard", () => {
    cy.contains(`Welcome, ${sign_in_username}!`).should("be.visible");
    cy.contains(`Email: ${sign_in_email}`).should("be.visible");
  });
});
