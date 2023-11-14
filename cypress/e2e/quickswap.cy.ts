Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('QuickSwap', () => {
  it('renders successfully', () => {
    cy.visit('https://quickswap.exchange/#/swap');

    const disclaimer = cy.get('.termsConditionsWrapper');

    if (disclaimer) {
      cy.get('input[type=checkbox]').click({ multiple: true });
      cy.get('button').click({ multiple: true });
    }

    cy.get('.swapLimitTab').contains('TWAP').should('exist');
    cy.get('.swapLimitTab').contains('TWAP').click();

    cy.get('.twap-container').should('exist');
  });
});
