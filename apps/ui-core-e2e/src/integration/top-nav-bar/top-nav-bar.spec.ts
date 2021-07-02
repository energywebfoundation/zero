describe('ui-core: TopNavBar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=topnavbar--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ui-core!');
    });
});
