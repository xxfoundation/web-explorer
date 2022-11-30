import { aliasQuery } from '../utils/graphql-test-utils'

// describe('Blocks Page Render', () => {
//   it('navigates to Blocks page', () => {
//     cy.visit('/blocks')
//   })
//   it('valid page heading', () => {
//     cy.get('h1[cy-id="h1"]').should('have.text','Blocks')
//   })
// })
// describe('Blocks Page Data render', () => {
//   beforeEach(() => {
//     cy.window().then((win) => {
//       win.sessionStorage.clear()
//     })
//     cy.intercept('POST', 'https://xxscan-test.hasura.app/v1/graphql', (req, res) => {
//       aliasQuery(req, 'ListBlocksOrdered')
//     })
//     cy.visit('/blocks')
//   })
//   it('loads data in Events table', () => {
//     cy.wait('@gqlListBlocksOrderedQuery').then(xhr => {
//       cy.get('[cy-id="baseline-table"] tbody tr').should('have.length.at.least', 1)
//     })
//   })
//   it('renders 20 rows for table', () => {
//     cy.wait('@gqlListBlocksOrderedQuery').then(xhr => {
//       cy.get('[cy-id="baseline-table"] tbody tr').should('have.length', 20)
//     })
//   })
// })

describe('Blocks Test Filters',()=>{
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.intercept('POST', 'https://xxscan-test.hasura.app/v1/graphql', (req, res) => {
      aliasQuery(req, 'ListBlocksOrdered')
    })
    cy.visit('/blocks')
  })
  it('test status filter',()=>{
    cy.get('th .MuiButtonBase-root').eq(0).click()
    cy.get('span.MuiButtonBase-root').click()
    cy.get('.css-6qclsq-MuiStack-root button:nth-child(1)').click()
    cy.get('.MuiSvgIcon-root.MuiSvgIcon-colorWarning.MuiSvgIcon-fontSizeMedium.css-1n125v2').each(($el)=>{
      cy.wrap($el).realHover('mouse')
      cy.wait(2000)
      cy.get('[role="tooltip"]').should('have.text','Pending')
    })
  })
})
