describe('Blocks Test Suite',()=>{
  it('Blocks Test Case',()=>{
    cy.visit('https://explorer.xx.network/blocks')
    cy.get('tr').should('have.length',21)
    cy.get('tr td').should('have.length',140)
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeSmall.MuiButton-textSizeSmall.css-q4o05b').click()
  })
  it('status',()=>{
    cy.get('th .MuiButtonBase-root').eq(0).click()
    cy.get('span.MuiButtonBase-root').click()
    cy.get('.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd.css-1jaw3da').click()
    cy.get('.css-wc64jw button:nth-child(1)').click()
    cy.get('.MuiSvgIcon-root.MuiSvgIcon-colorWarning.MuiSvgIcon-fontSizeMedium.css-1n125v2').each(($el)=>{
      cy.wrap($el).realHover('mouse')
      cy.wait(2000)
      cy.get('[role="tooltip"]').should('have.text','Pending')
    })
  })
})
