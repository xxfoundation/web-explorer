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
  it("loads data in Blocks table", () => {
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

describe("Blocks Table filters", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/blocks");
    cy.wait(2000);
    cy.get('[data-testid="CloseIcon"]').click();
  });
  
  it("Blocks Producer Filter", () => {
    cy.get('[cy-id="th-5"] button').click();
    cy.get("#account-holders-table-filters label").click();
    const blockProducer = "6ZWXwuMP8Zq9RsjLBtXyJCo6ueajJPtLMVtvTwJoZfqsQ9NT"
    cy.get("#account-holders-table-filters  input:visible").type(
      blockProducer
    );
    cy.wait(70000);
    cy.get("#account-holders-table-filters  input:visible")
      .invoke("val")
      .then((sometext) => {
        cy.get("#account-holders-table-filters label").eq(1).click({
          force: true,
        });
        cy.get('[cy-id="apply-btn"]').click();
        cy.get("tbody tr [cy-id='td-5'] a").each(($ele) => {
          cy.wrap($ele).realHover("mouse");
          cy.wait(500);
          cy.get("[role='tooltip'] div span:nth-child(1)").then((element) => {
            const elementText = element.text();
            expect(elementText).to.contain(sometext);
          });
        });
      });
  });

  it("status", () => {
    cy.get("[cy-id='th-1'] button").eq(0).click();
    cy.get("#account-holders-table-filters label").click();
    cy.get("#account-holders-table-filters label").eq(1).click();
    cy.get("#account-holders-table-filters button").eq(0).click();
    cy.get("tbody tr [cy-id='td-1'] svg").each(($el) => {
      cy.wrap($el).realHover("mouse");
      cy.wait(500);
      cy.get(".css-12wicnf-MuiTooltip-tooltip").should("have.text", "pending");
    });
  });
});

