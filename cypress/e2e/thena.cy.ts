Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('Thena', () => {
  it('renders successfully', () => {
    cy.visit('https://thena.fi/swap/twap');

    cy.get('.twap-container').should('exist');
  });
});
