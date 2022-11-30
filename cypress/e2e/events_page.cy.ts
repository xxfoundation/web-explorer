import { aliasQuery, aliasMutation } from '../utils/graphql-test-utils'

describe('Events Page Render', () => {
  it('navigates to Events page', () => {
    cy.visit('/events')
  })
  it('valid page heading', () => {
    cy.get('#h1').contains('Event')
  })
})

// describe('Events Page Data render', () => {
//   beforeEach(() => {
//     cy.visit('/events')
//     cy.intercept('POST', 'https://xxscan.hasura.app/v1/graphql', (req, res) => {
//       // console.log('interceptiing')
//       aliasQuery(req, 'ListEventsOrdered')
//       // console.log('req = ', req)
//     })
//   })
//   it('loads data in Events table', () => {
//     cy.wait('@gqlListEventsOrderedQuery')
//     cy.get('tbody tr').should('have.length.at.least', 1)
//   })
//   it('renders 20 rows for table', () => {
//     cy.wait('@gqlListEventsOrderedQuery')
//     cy.get('tbody tr').should('have.length', 20)
//   })
// })

describe('Events Page API Calls', () => {
  beforeEach(() => {
    cy.visit('/events')
    cy.clearLocalStorage()
    cy.intercept('POST', 'https://xxscan.hasura.app/v1/graphql', (req, res) => {
      console.log('interceptiing')
      aliasQuery(req, 'ListEventsOrdered')
      console.log('req = ', req)
    })
  })

  it('modules filter fetches and display correct data', () => {
    cy.wait(5000)
    cy.get('.css-ruiwse-MuiButtonBase-root-MuiButton-root').contains('Module').click();
    cy.get('.css-1forqcf-MuiStack-root input.PrivateSwitchBase-input.css-1m9pwf3').click({force: true, multiple:true});
    cy.get('label.css-16vvaaj-MuiFormControlLabel-root span').contains('assets').click();
    cy.get('.css-6qclsq-MuiStack-root button').contains('Apply').click();
    cy.wait('@gqlListEventsOrderedQuery').then(xhr => {
      xhr.response.body.data.events.map(event => {
        expect(event.module).to.eq('assets')
      })
    })

  })
})