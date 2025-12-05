describe('Sign In and Edit Project Test', () => {
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
    
    // Create a project to edit
    cy.get('input[name="title"]').type('Project to Edit');
    cy.get('input[name="completion"]').type('2025-12-31');
    cy.get('textarea[name="description"]').type('Original description');
    cy.get('button[type="submit"]').contains('Add Project').click();
    cy.wait(1000);
    
    // Sign out
    cy.get('button').contains('Sign Out').click();
    cy.wait(1000);
  });

  it('should sign in and edit a project', () => {
    // Visit sign in page
    cy.visit('/signin');
    
    // Sign in
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect to projects page
    cy.url().should('include', '/projects');
    
    // Find and click Edit button on the first project
    cy.contains('Project to Edit').parent().find('button').contains('Edit').click();
    
    // Update project fields
    cy.get('input[name="title"]').clear().type('Updated Project Title');
    cy.get('textarea[name="description"]').clear().type('Updated description');
    
    // Submit the form
    cy.get('button[type="submit"]').contains('Update Project').click();
    
    // Verify project was updated
    cy.contains('Project updated successfully').should('exist');
    cy.contains('Updated Project Title').should('exist');
  });
});

