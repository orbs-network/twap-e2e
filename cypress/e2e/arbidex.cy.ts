Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('ArbiDex', () => {
  it('renders successfully', () => {
    cy.visit('https://arbidex.fi/swap');

    cy.get('button').contains('TWAP').should('exist');
    cy.get('button').contains('TWAP').click();

    cy.get('.twap-container').should('exist');
  });
});
