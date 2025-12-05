// Cypress test for Sign Up
describe('Sign Up Test', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    // Visit the signup page
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
    cy.get('input[name="password"]').type('testpassword123');
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Wait for successful signup and redirect
    cy.url().should('include', '/projects');
    
    // Verify token is stored in localStorage
    cy.window().its('localStorage').invoke('getItem', 'token').should('exist');
    
    // Verify user info is stored
    cy.window().its('localStorage').invoke('getItem', 'user').should('exist');
  });

  it('should show error for duplicate email', () => {
    const email = 'existing@example.com';
    
    // Try to sign up with existing email (if it exists)
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('testpassword123');
    
    cy.get('button[type="submit"]').click();
    
    // Should show error message
    cy.contains('already exists', { timeout: 5000 }).should('be.visible');
  });
});

