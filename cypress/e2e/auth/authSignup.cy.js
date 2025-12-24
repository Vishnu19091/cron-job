const sign_up_email = Cypress.env("TEST_SIGN_UP_EMAIL");
const sign_up_password = Cypress.env("TEST_SIGN_UP_PASSWORD");
const sign_up_username = Cypress.env("TEST_SIGN_UP_USERNAME");

const sign_in_email = Cypress.env("TEST_SIGN_IN_EMAIL");
const sign_in_password = Cypress.env("TEST_SIGN_IN_PASSWORD");
const sign_in_username = Cypress.env("TEST_SIGN_IN_USERNAME");

describe("Signup validation & toasts", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/auth/signup");
  });

  it("shows error toast when submitting empty form", () => {
    cy.contains("button", /^sign up$/i).click();

    cy.contains("All fields are required").should("be.visible");
  });

  // Short User Name Warning
  it("shows warning toast for short username", () => {
    cy.get('input[type="text"]').type("john");

    cy.get('input[type="email"]').type("john@gmail.com");
    cy.get('input[type="password"]').type("Password@123");

    cy.contains("button", /^sign up$/i).click();

    cy.contains("Username must be at least 7 characters").should("be.visible");
  });

  // Short User password Warning
  it("shows warning toast for short password", () => {
    cy.get('input[type="text"]').type("johnsmith");

    cy.get('input[type="email"]').type("john@gmail.com");
    cy.get('input[type="password"]').type("short");

    cy.contains("button", /^sign up$/i).click();

    cy.contains("Password must be at least 9 characters").should("be.visible");
  });

  // Toast for duplicate account
  it("shows error toast for duplicate account", () => {
    cy.get('input[type="text"]').type(sign_up_username);
    cy.get('input[type="email"]').type(sign_up_email);
    cy.get('input[type="password"]').type(sign_up_password);

    cy.contains("button", /^sign up$/i).click();

    // Loading toast
    cy.contains("Creating your account...").should("be.visible");

    // Error toast from backend
    cy.contains(/same id, email, or phone already exists/i, {
      timeout: 4000,
    }).should("be.visible");
  });

  // Successfull Signup -> loading toast -> Redirection to /auth/signin
  //   it("creates account and redirects after success toast", () => {
  //     cy.get('input[type="text"]').type(sign_up_username);
  //     cy.get('input[type="email"]').type(sign_up_email);
  //     cy.get('input[type="password"]').type(sign_up_password);

  //     cy.contains("button", /^sign up$/i).click();

  //     // Loading toast
  //     cy.contains("Creating your account...").should("be.visible");

  //     // Success toast
  //     cy.contains("Account created successfully 🎉", { timeout: 10000 }).should(
  //       "be.visible"
  //     );

  //     // Redirect after toast duration
  //     cy.url({ timeout: 10000 }).should("include", "/auth/signin");
  //   });
});
