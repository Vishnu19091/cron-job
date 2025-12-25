/*
Here user Signin either using Google OAuth/AppWrite credential Login
Should register a new account in the database
If found a existing record then send toast message to user

After registering a new record, should redirect to /dashboard
*/

const sign_in_email = Cypress.env("TEST_SIGN_IN_EMAIL");
const sign_in_password = Cypress.env("TEST_SIGN_IN_PASSWORD");
const sign_in_username = Cypress.env("TEST_SIGN_IN_USERNAME");
let cookie;

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
});

describe("Auth Signin using valid credentials", () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("redirects to dashboard after signin", () => {
    cy.visit("/auth/signin");

    cy.get('input[type="email"]').type(sign_in_email);
    cy.get('input[type="password"]').type(sign_in_password);

    cy.contains("button", /^sign in$/i).click();

    cy.getCookie("appwrite_session")
      .should("exist")
      .then((c) => {
        cookie = c;
      });
  });

  // it("can access protected user API", () => {
  //   cy.request({
  //     method: "GET",
  //     url: "/api/user",
  //     headers: {
  //       Cookie: `appwrite_session=${cookie}`,
  //     },
  //     failOnStatusCode: false,
  //   }).then((res) => {
  //     expect(res.status).to.eq(200);
  //     expect(res.body.email).to.eq(sign_in_email);
  //   });
  // });
});
