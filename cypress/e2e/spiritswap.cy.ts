Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('SpiritSwap', () => {
  it('renders successfully', () => {
    cy.visit('https://www.spiritswap.finance/swap/FTM/SPIRIT');
    cy.get('#root').should('exist');
    cy.get('button').contains('TWAP').should('exist');
    cy.get('button').contains('TWAP').click();

    cy.get('.twap-container').should('exist');
  });

  after(() => {
    // post results to the dashboard
    console.log('post results');
  });
});
