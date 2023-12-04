Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('Pangolin', () => {
  it('renders successfully', () => {
    cy.visit('https://app.pangolin.exchange/#/swap');

    cy.get('div', { timeout: 10000 }).contains('TWAP').should('exist');
    cy.get('div').contains('TWAP').click();

    cy.get('.twap-container').should('exist');
  });
});
