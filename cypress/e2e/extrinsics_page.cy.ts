import { aliasQuery } from '../utils/graphql-test-utils'
describe('Extrinsics Test Suite', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://xxscan-test.hasura.app/v1/graphql', (req) => {
      aliasQuery(req, 'GetHourlyExtrinsicCounts')
    })
    cy.visit('/extrinsics')
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
  })
  it('chart renders successfully', () => {
    cy.wait('@gqlGetHourlyExtrinsicCountsQuery').then((xhr) => {
      cy.get('.css-1fo70ae-MuiStack-root').should('be.visible');
    })
  })
  it('chart data is displayed successfully',() => {
    let extrinsicValues = [];
    cy.wait('@gqlGetHourlyExtrinsicCountsQuery').then((xhr) => {
      for(let i=0;i<8;i++){
        extrinsicValues.push(xhr.response.body.data.counts[i].count);
      }
      cy.get('.bar.css-ko9bas').each(($el, index)=>{
        if(index < 8){
          cy.wrap($el).realHover('mouse')
          // cy.wait(2000)
          cy.get('.MuiTypography-root.MuiTypography-subheader4.css-jo31zb-MuiTypography-root').then((element) => {
            expect(element.text()).contains(`${extrinsicValues[index]}`)
          })
        }else {
          return;
        }
      })
    })
  })
});

describe('Extrinsics Table renders data', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.intercept('POST', 'https://xxscan-test.hasura.app/v1/graphql', (req, res) => {
      aliasQuery(req, 'ListExtrinsicOrdered')
    })
    cy.visit('/extrinsics')
  })
  it('loads data in table', () => {
    cy.wait('@gqlListExtrinsicOrderedQuery').then(xhr => {
      cy.get('[cy-id="baseline-table"] tbody tr').should('have.length.at.least', 1)
    })
  })
  it('renders 20 rows for table', () => {
    cy.wait('@gqlListExtrinsicOrderedQuery').then(xhr => {
      cy.get('[cy-id="baseline-table"] tbody tr').should('have.length', 20)
    })
  })
})

describe('Extrinsic Table filters', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.intercept('POST', 'https://xxscan-test.hasura.app/v1/graphql', (req) => {
      aliasQuery(req, 'ListExtrinsicOrdered')
    })
    cy.visit('/extrinsics')
  })
  it('Result filter works and fetches correct data if success', () => {
    cy.wait(5000);
    cy.get('.css-1ea2qqg-MuiButtonBase-root-MuiButton-root').click();
    cy.get('.css-3zvw0q-MuiTableCell-root button').eq(1).click();
    cy.get('.css-13xvg6k-MuiFormControlLabel-root').click({ force: true, multiple: true });
    cy.get('.css-1nlsvi-MuiButtonBase-root-MuiButton-root').click();
    cy.wait(5000);
    cy.wait('@gqlListExtrinsicOrderedQuery').then((xhr) => {
      cy.wait(7000)
      cy.get('.css-d3z3o4-MuiSvgIcon-root').each(($el) => {
        cy.wrap($el).realHover('mouse')
        cy.get('[role="tooltip"]').should('have.text', 'successful')
      })
    });
  })
  it('Result filter works and fetches correct data if failed', () => {
    cy.wait(5000);
    cy.get('.css-1ea2qqg-MuiButtonBase-root-MuiButton-root').click();
    cy.get('.css-3zvw0q-MuiTableCell-root button').eq(1).click();
    cy.get('.css-13xvg6k-MuiFormControlLabel-root').click({ force: true, multiple: true });
    cy.get('.css-julti5-MuiSwitch-root').click();
    cy.get('.css-1nlsvi-MuiButtonBase-root-MuiButton-root').click();
    cy.wait(5000);
    cy.wait('@gqlListExtrinsicOrderedQuery').then((xhr) => {
      cy.wait(7000).then(() => {
        cy.get('[data-testid="ErrorOutlineIcon"]').each(($el) => {
          cy.wrap($el).realHover('mouse')
          cy.get('[role="tooltip"]').should('have.text', 'failed')
        })
      })
      cy.get('.css-3zvw0q-MuiTableCell-root button').eq(1).click();
      cy.get('.css-1e38v64-MuiFormControlLabel-root').click({ force: true, multiple: true });
    });
  })
  it('Module filters works properly', () => {
    cy.wait(5000);
    cy.get('.css-1ea2qqg-MuiButtonBase-root-MuiButton-root').click();
    cy.get('.css-3zvw0q-MuiTableCell-root button').eq(2).click();
    cy.get('.css-13xvg6k-MuiFormControlLabel-root').click({ force: true, multiple: true });
    cy.get('label.css-16vvaaj-MuiFormControlLabel-root span').contains('assets').click();
    cy.get('button[cy-id="apply-btn"]').click();
    cy.wait(5000);
    cy.wait('@gqlListExtrinsicOrderedQuery').then((xhr) => {
      cy.get('td:nth-child(6)').each(($e1) => {
        expect(`${$e1.text()}`).to.eq('assets')
      })
    })
  });
});
