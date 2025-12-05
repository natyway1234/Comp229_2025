describe('Sign In and Add Project Test', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    
    // First, sign up a user
    cy.visit('/signup');
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Wait for signup to complete
    cy.url().should('include', '/projects');
    
    // Sign out
    cy.get('button').contains('Sign Out').click();
    cy.wait(1000);
  });

  it('should sign in and add a project', () => {
    // Visit sign in page
    cy.visit('/signin');
    
    // Get the email from localStorage or use a known test email
    // For this test, we'll need to use the email from signup
    // In a real scenario, you might store this in a fixture or use a test account
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect to projects page
    cy.url().should('include', '/projects');
    
    // Fill in project form
    cy.get('input[name="title"]').type('Cypress Test Project');
    cy.get('input[name="completion"]').type('2025-12-31');
    cy.get('textarea[name="description"]').type('This is a test project created by Cypress');
    
    // Submit the form
    cy.get('button[type="submit"]').contains('Add Project').click();
    
    // Verify project was added (check for success message or project in list)
    cy.contains('Project added successfully').should('exist');
    cy.contains('Cypress Test Project').should('exist');
  });
});

