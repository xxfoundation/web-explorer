import { aliasQuery } from '../utils/graphql-test-utils'

describe("Blocks Page Render", () => {
  it("navigates to Blocks page", () => {
    cy.visit("/blocks");
  });
  it("valid page heading", () => {
    cy.get('h1[cy-id="h1"]').should("have.text", "Blocks");
  });
});
describe("Blocks Data render", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.intercept(
      "POST",
      "https://xxscan-test.hasura.app/v1/graphql",
      (req, res) => {
        aliasQuery(req, "ListBlocksOrdered");
      }
    );
    cy.visit("/blocks");
  });
  it("loads data in Events table", () => {
    cy.wait("@gqlListBlocksOrderedQuery").then((xhr) => {
      cy.get('[cy-id="baseline-table"] tbody tr').should(
        "have.length.at.least",
        1
      );
    });
  });
  it("renders 20 rows for table", () => {
    cy.wait("@gqlListBlocksOrderedQuery").then((xhr) => {
      cy.get('[cy-id="baseline-table"] tbody tr').should("have.length", 20);
    });
  });
});
describe("Blocks Test Suite", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/blocks");
    cy.wait(2000);
    cy.get('[data-testid="CloseIcon"]').click();
  });
  it("Blocks Test Case", () => {});
  it("Blocks Producer Filter", () => {
    cy.get(".css-3zvw0q-MuiTableCell-root button").eq(2).click();
    cy.get(".css-13xvg6k-MuiFormControlLabel-root").click();
    cy.get('[placeholder="Search..."]').type(
      "6Y7jBFdAXY41gUYbXmzXezMP5CzpjyFMhB5r5FPLpv6ouR6z"
    );
    cy.wait(50000);
    cy.get('[placeholder="Search..."]')
      .invoke("val")
      .then((sometext) => {
        cy.get('[data-testid="CheckBoxOutlineBlankIcon"]').click({
          force: true,
        });
        cy.get(".css-1nlsvi-MuiButtonBase-root-MuiButton-root").click();
        cy.get(
          "td:nth-child(6) .css-1kd8f55-MuiTypography-root-MuiLink-root"
        ).each(($ele) => {
          cy.wrap($ele).realHover("mouse");
          cy.wait(1000);
          cy.get(".css-1l8riu6-MuiTypography-root").then((element) => {
            const elementText = element.text();
            expect(elementText).to.eq(sometext);
          });
        });
      });
  });
  it("status", () => {
    cy.get(".css-3zvw0q-MuiTableCell-root button").eq(0).click();
    cy.get(".css-13xvg6k-MuiFormControlLabel-root").click();
    cy.get(".css-j204z7-MuiFormControlLabel-root").click();
    cy.get(".css-1nlsvi-MuiButtonBase-root-MuiButton-root").click();
    cy.get(".css-7d4cw7-MuiSvgIcon-root").each(($el) => {
      cy.wrap($el).realHover("mouse");
      cy.wait(2000);
      cy.get(".css-12wicnf-MuiTooltip-tooltip").should("have.text", "pending");
    });
  });
});

