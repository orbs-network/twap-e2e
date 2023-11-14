Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('BaseSwap', () => {
  it('renders successfully', () => {
    cy.visit('https://baseswap.fi/swap');

    cy.get('button').contains('TWAP').should('exist');
    cy.get('button').contains('TWAP').click();

    cy.get('.twap-container').should('exist');
  });
});
