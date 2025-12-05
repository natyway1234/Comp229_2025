describe('Sign In and Delete Project Test', () => {
  let testEmail;
  let testPassword = 'password123';

  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    
    // First, sign up a user and create a project
    cy.visit('/signup');
    const timestamp = Date.now();
    testEmail = `testuser${timestamp}@example.com`;
    
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    
    // Wait for signup to complete
    cy.url().should('include', '/projects');
    
    // Create a project to delete
    cy.get('input[name="title"]').type('Project to Delete');
    cy.get('input[name="completion"]').type('2025-12-31');
    cy.get('textarea[name="description"]').type('This project will be deleted');
    cy.get('button[type="submit"]').contains('Add Project').click();
    cy.wait(1000);
    
    // Sign out
    cy.get('button').contains('Sign Out').click();
    cy.wait(1000);
  });

  it('should sign in and delete a project', () => {
    // Visit sign in page
    cy.visit('/signin');
    
    // Sign in
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect to projects page
    cy.url().should('include', '/projects');
    
    // Find and click Delete button on the project
    cy.contains('Project to Delete').parent().find('button').contains('Delete').click();
    
    // Confirm deletion in the alert dialog
    cy.on('window:confirm', () => true);
    
    // Verify project was deleted
    cy.contains('Project deleted successfully').should('exist');
    cy.contains('Project to Delete').should('not.exist');
  });
});

