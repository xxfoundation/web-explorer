import { aliasQuery } from '../utils/graphql-test-utils'

describe('Transfers Page Render', () => {
  it('navigates to Transfers page', () => {
    cy.visit('/transfers')
  })
  it('valid page heading', () => {
    cy.get('.css-wp8zft-MuiStack-root').should('have.text','Transfers')
  })
})

describe("Transfers chart displays data", () => {
  beforeEach(() => {
    cy.visit("/transfers");
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });
  it("Render Transfers chart", () => {
    cy.wait(5000);
    cy.get('[data-testid="CloseIcon"]').click();
    cy.get(".bar").should("have.length.at.least", 1);
  });
});

describe('Transfers Page Data render', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.intercept('POST', 'https://xxscan-test.hasura.app/v1/graphql', (req, res) => {
      aliasQuery(req, 'ListTransfersOrdered')
    })
    cy.visit('/transfers')
  })
  it('loads data in Transfers table', () => {
    cy.wait('@gqlListTransfersOrderedQuery').then(xhr => {
      cy.get('[cy-id="baseline-table"] tbody tr').should('have.length.at.least', 1)
    })
  })
  it('renders 20 rows for table', () => {
    cy.wait('@gqlListTransfersOrderedQuery').then(xhr => {
      cy.get('[cy-id="baseline-table"] tbody tr').should('have.length', 20)
    })
  })
})
describe('Transfers Test Suit',()=>{
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
  })
  it('Transfers Results Filter Test Case',()=>{
    cy.visit('/transfers')
    cy.get('.css-1ea2qqg-MuiButtonBase-root-MuiButton-root').click()
    cy.get('.css-3zvw0q-MuiTableCell-root button').eq(1).click()
    cy.get('.css-13xvg6k-MuiFormControlLabel-root').click()
    cy.get('.css-j204z7-MuiFormControlLabel-root').click()
    cy.get('.css-1nlsvi-MuiButtonBase-root-MuiButton-root').click()
    // cy.get('.css-30nss4').click()
    cy.get('[data-testid="ErrorOutlineIcon"]').each(($el)=>{
      cy.wrap($el).realHover('mouse')
      cy.get('[role="tooltip"]').should('have.text','failed')
    })
  })
  it('ERA Filter',()=>{
    cy.get('.css-3zvw0q-MuiTableCell-root button').eq(0).click()
    cy.get('[placeholder="Filter"]').type('11')
    cy.wait(2000)
    cy.get('[placeholder="Filter"]').invoke('val').then((sometext)=>{
      cy.get('.css-1nlsvi-MuiButtonBase-root-MuiButton-root').click()
      cy.get('[data-label="Era"]').each(($el)=>{
        const eraText = $el.text()
        expect(eraText).to.eq(sometext)
      });
    })
  })
})
