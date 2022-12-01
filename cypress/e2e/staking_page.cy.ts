import { aliasQuery } from '../utils/graphql-test-utils'

describe('Staking Page', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.intercept('POST', 'https://xxscan-test.hasura.app/v1/graphql', (req, res) => {
      aliasQuery(req, 'ListenForEconomics')
      aliasQuery(req, 'GetCurrentValidators')
      aliasQuery(req, 'GetWaitingList')
    })
    cy.visit('/staking')
  })
  it('validate page title', () => {
    cy.get('h1[cy-id="h1"]').should('have.text','Staking')
  })
  it('Economics card should display data', () => {
    cy.get('[cy-id="staking-supply-chart"]').should('be.visible')
  })
  describe('Displays additional staking charts', function () {
    it('render staking charts', () => {
      cy.wait('@gqlListenForEconomicsQuery').then(xhr => {
        cy.get('button[cy-id="show-staking-charts"]').click()
        cy.get('[cy-id="staking-charts"]').should('be.visible')
      })
    })
    it('Displays staking charts with data', () => {
      cy.wait('@gqlListenForEconomicsQuery').then(xhr => {
        cy.get('button[cy-id="show-staking-charts"]').click()
        cy.get('[data-highcharts-chart="0"]').should('be.visible')
        cy.get('[data-highcharts-chart="1"]').should('be.visible')
        cy.get('[data-highcharts-chart="2"]').should('be.visible')
        cy.get('[data-highcharts-chart="3"]').should('be.visible')
      })
    })
    it('hides expanded charts gracefully', () => {
      cy.get('button[cy-id="show-staking-charts"]').click()
      cy.get('[cy-id="staking-charts"]').should('be.visible')
      cy.get('button[cy-id="show-staking-charts"]').click()
      cy.get('[cy-id="staking-charts"]').should('not.exist')
    })
  });
  describe('Validators table', () => {
    it('loads data in Staking table', () => {
      cy.wait('@gqlGetCurrentValidatorsQuery').then(xhr => {
        cy.get('[cy-id="baseline-table"] tbody tr').should('have.length.at.least', 1)
      })
    })
    it('renders 20 rows for table', () => {
      cy.wait('@gqlGetCurrentValidatorsQuery').then(xhr => {
        cy.get('[cy-id="baseline-table"] tbody tr').should('have.length', 20)
      })
    })
  })
})