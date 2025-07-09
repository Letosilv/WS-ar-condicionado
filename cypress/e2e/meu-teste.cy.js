describe('Teste inicial', () => {
  it('Abre o site e verifica o título', () => {
    cy.visit('https://letosilv.github.io/WS-ar-condicionado/');
    cy.title().should('include', 'WS Ar Condicionado');
  });
});
