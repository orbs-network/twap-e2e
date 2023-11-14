Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('Chronos', () => {
  it('renders successfully', () => {
    cy.visit('https://app.chronos.exchange/?type=twap');

    cy.get('.twap-container').should('exist');
  });
});
