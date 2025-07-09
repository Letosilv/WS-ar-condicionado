describe('Formulário de Contato - WS Ar Condicionado', () => {
  it('deve enviar o formulário com sucesso', () => {
    cy.visit('/index.html');

    cy.get('input[name="nome"]').type('Wellington');
    cy.get('input[name="email"]').type('teste@exemplo.com');
    cy.get('textarea[name="mensagem"]').type('Preciso de um orçamento');

    cy.get('button[type="submit"]').click();

    cy.get('#mensagem-sucesso')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso');
  });
});