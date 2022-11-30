describe('The Home Page', () => {
  it('successfully renders homepage', () => {
    cy.intercept('POST','').as('request');
    cy.visit('/')
    cy.wait('@request').then((xhr) => {
      cy.get('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-6.MuiGrid-grid-sm-3.MuiGrid-grid-md-3.css-1blu1sr-MuiGrid-root').should('have.length',8);
    });
  })
  it('chain data is displayed successfully',() => {
    cy.get('.MuiTypography-root.MuiTypography-body1.css-k5j8s2-MuiTypography-root').each(($el) => {
      cy.wrap($el).should('have.length.at.least', 1)
    });
  })
  describe('token status',() => {
    it('token status renders',() => {
      cy.intercept('POST','').as('request');
      cy.wait(7000);
      cy.wait('@request').then((xhr) => {
        cy.get('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-6.MuiGrid-grid-lg-6.css-1fyyp8j-MuiGrid-root').should('have.length',2);
      });
    })
    it('Token status data renders successfully', () => {
      cy.get('.MuiTypography-root.MuiTypography-body1.css-1iaocj1-MuiTypography-root').should('have.length.at.least', 1)
    });
  });
  describe('latest updates',() => {
    it('latest updates renders',() => {
      cy.intercept('POST','').as('request');
      cy.wait(7000);
      cy.wait('@request').then((xhr) => {
        cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-ifqqz9-MuiPaper-root').should('have.length',4);
      });
    })
    it('transfers table length',() => {
      cy.get(':nth-child(1) > .MuiTableCell-root > .css-1848fym-MuiTypography-root > [style="display: flex; justify-content: space-between;"] > div').should('have.length.at.least', 1);
    })
    it('block table length',() => {
      cy.get(':nth-child(1) > .MuiTableCell-root > .css-e6l9z5-MuiTypography-root > [style="display: flex; justify-content: space-between;"] > :nth-child(1)').should('have.length.at.least', 1);
    })
    it('transfers and New Accounts Maps',() => {
      cy.get('.highcharts-background').should('be.visible');
    })
  });
  describe('whale alert',() => {
    it('whale alert renders',() => {
      cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-12hrne4-MuiPaper-root').should('have.length',1);
    })
    it('whale alert table has records',() => {
      cy.get('.MuiTableRow-root.css-11x2bch-MuiTableRow-root').should('have.length.at.least', 1);
    })
  });
})
