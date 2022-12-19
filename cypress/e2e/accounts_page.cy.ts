import { aliasQuery } from '../utils/graphql-test-utils'

const graphqlEndpoint = "https://xxexplorer-prod.hasura.app/v1/graphql"

describe('Accounts Page Render', () => {
  it('navigates to Accounts page', () => {
    cy.visit('/accounts')
  })
  it('valid page heading', () => {
    cy.get('.css-1wy44kq-MuiTypography-root').should('have.text','Accounts')
  })
})
describe("Accounts chart Test Suite", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/accounts");
  });
  it("Render Account chart", () => {
    cy.wait(8000);
    cy.get('[data-testid="CloseIcon"]').click();
    cy.get(".highcharts-point.highcharts-color-0").should(
      "have.length.at.least",
      1
    );
  });
});

describe('Accounts Page Data render', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.intercept('POST', graphqlEndpoint, (req, res) => {
      aliasQuery(req, 'ListAccounts')
    })
    cy.visit('/accounts')
  })
  it('loads data in Accounts table', () => {
        cy.wait('@gqlListAccountsQuery').then(xhr => {
          cy.get('tbody tr').should('have.length.at.least', 1)
        })
  })
  it('renders 20 rows for table', () => {
    cy.wait('@gqlListAccountsQuery').then(xhr => {
      cy.get('tbody tr').should('have.length', 20)
    })
  })
})

describe('Accounts Page API Calls', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.visit('/accounts')
  })
  it('modules filter fetches and display correct data', () => {
    cy.get('.css-3zvw0q-MuiTableCell-root button').eq(1).click()
    cy.get('.css-1qxz1k9-MuiFormControlLabel-root').contains('validator').click();
    cy.get('.css-6qclsq-MuiStack-root button').eq(0).click();
    cy.intercept('POST', graphqlEndpoint, (req, res) => {
      aliasQuery(req, 'ListAccounts')
    })
    cy.wait(10000)
    cy.wait('@gqlListAccountsQuery').then(xhr => {
      console.log('accounts = ', xhr.response.body.data.account)
      xhr.response.body.data.account.map(accounts => {
        console.log('accounts = ', accounts)
        expect(accounts.validator).to.eq(true)
      })
    })
  })
})
describe('Accounts page test suite',()=>{
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
  })
  it('Account number Filter',()=>{
    cy.visit('/accounts')
    cy.get('.css-3zvw0q-MuiTableCell-root button').eq(0).click()
    cy.get('[placeholder="Filter"]').type('6VzjYG3Jtzo4SfGRVgU8U6zwJrEgAdRp6VDeLyVxcgNbTU4r')
    cy.wait(2000)
    cy.get('[placeholder="Filter"]').invoke('val').then((sometext)=>{
      cy.get('.css-6qclsq-MuiStack-root button:nth-child(1)').click()
      cy.get('.MuiTypography-root.MuiTypography-body1.css-lplfjl-MuiTypography-root').realHover('mouse')
      cy.get('.css-1rnnycm-MuiStack-root').then((element)=>{
        const elementText = element.text()
        expect(elementText).to.eq(sometext)
      })
    })
  })
})
