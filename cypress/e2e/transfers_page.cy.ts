describe('Transfers Page Render', () => {
  it('navigates to Transfers page', () => {
    cy.visit('/transfers')
  })
  it('valid page heading', () => {
    cy.get('h1[cy-id="h1"]').contains('Transfers')
  })
})


describe('Transfers Test Suit',()=>{
  it('Transfers Results Filter Test Case',()=>{
    cy.visit('https://explorer.xx.network/transfers')
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeSmall.MuiButton-textSizeSmall.css-q4o05b').click()
    cy.get(':nth-child(7) > .MuiButtonBase-root').click()
    cy.get('input[type="checkbox"]').click()
    cy.get('.css-1jaw3da').click()
    cy.get('.css-30nss4').click()
    cy.get('.css-dvceld').each(($el)=>{
      cy.wrap($el).realHover('mouse')
      cy.wait(2000)
      cy.get('[role="tooltip"]').should('have.text','Failed')
    })
  })
  it('ERA Filter',()=>{
    // cy.visit('https://explorer.xx.network/transfers')
    // cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeSmall.MuiButton-textSizeSmall.css-q4o05b').click()
    cy.get('th button').eq(0).click()
    cy.get('.css-1o6z5ng').type('11')
    cy.wait(2000)
    cy.get('.css-1o6z5ng').invoke('val').then((sometext)=>{
      cy.get('.css-30nss4').click()
      cy.get('[data-label="Era"]').each(($el)=>{
        const eraText = $el.text()
        expect(eraText).to.eq(sometext)
      });
    })
  })
})
