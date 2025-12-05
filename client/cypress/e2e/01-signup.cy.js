describe('Sign Up Test', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    cy.visit('/signup');
  });

  it('should successfully sign up a new user', () => {
    // Generate unique email for each test run
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    // Fill in the signup form
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('password123');
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect or success message
    cy.url().should('include', '/projects');
    
    // Verify user is authenticated (token stored)
    cy.window().its('localStorage.token').should('exist');
  });
});

