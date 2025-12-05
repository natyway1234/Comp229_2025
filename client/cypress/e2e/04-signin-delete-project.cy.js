// Cypress test for Sign In and Delete Project
describe('Sign In and Delete Project Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('should sign in and delete a project', () => {
    // Create user and sign in
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const password = 'testpassword123';
    
    // Sign up
    cy.visit('/signup');
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect
    cy.url().should('include', '/projects', { timeout: 10000 });
    
    // Create a project first
    cy.visit('/projects');
    cy.contains('Projects', { timeout: 5000 }).should('be.visible');
    
    const projectTitle = `Project to Delete ${timestamp}`;
    const projectDate = new Date().toISOString().split('T')[0];
    const projectDescription = 'This project will be deleted';
    
    cy.get('input[name="title"]').type(projectTitle);
    cy.get('input[name="completion"]').type(projectDate);
    cy.get('textarea[name="description"]').type(projectDescription);
    cy.get('form').submit();
    
    // Wait for project to be created
    cy.contains('Project added successfully', { timeout: 10000 }).should('exist');
    cy.contains(projectTitle, { timeout: 5000 }).should('be.visible');
    
    // Get initial count of projects
    cy.contains('Stored Projects').then(($el) => {
      const text = $el.text();
      const match = text.match(/\((\d+)\)/);
      const initialCount = match ? parseInt(match[1]) : 0;
      
      // Find and click Delete button for the project
      cy.contains(projectTitle).parent().parent().within(() => {
        cy.contains('Delete').click();
      });
      
      // Confirm deletion in alert
      cy.on('window:confirm', () => true);
      
      // Wait for deletion success message
      cy.contains('Project deleted successfully', { timeout: 10000 }).should('exist');
      
      // Verify project is removed from list
      cy.contains(projectTitle, { timeout: 5000 }).should('not.exist');
    });
  });
});

