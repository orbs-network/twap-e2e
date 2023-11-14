Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('SpookySwap', () => {
  it('renders successfully', () => {
    cy.visit('https://spooky.fi/#/swap');

    cy.get('#twap-nav-link').should('exist');
    cy.get('#twap-nav-link').click();

    cy.get('.twap-container').should('exist');
  });
});
