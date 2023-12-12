Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe.skip('SpiritSwap', () => {
  it('renders successfully', () => {
    cy.visit('https://www.spiritswap.finance/swap/FTM/SPIRIT');

    cy.get('button').contains('TWAP').should('exist');
    cy.get('button').contains('TWAP').click();

    cy.get('.twap-container').should('exist');
  });
});
