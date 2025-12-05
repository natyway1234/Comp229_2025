describe('Sign Up Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/signup');
  });

  it('should successfully sign up a new user', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('password123');
    
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/projects');
    
    cy.window().its('localStorage.token').should('exist');
  });
});
