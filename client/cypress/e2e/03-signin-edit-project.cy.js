// Cypress test for Sign In and Edit Project
describe('Sign In and Edit Project Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('should sign in and edit an existing project', () => {
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
    
    const projectTitle = `Original Project ${timestamp}`;
    const projectDate = new Date().toISOString().split('T')[0];
    const projectDescription = 'Original description';
    
    cy.get('input[name="title"]').type(projectTitle);
    cy.get('input[name="completion"]').type(projectDate);
    cy.get('textarea[name="description"]').type(projectDescription);
    cy.get('form').submit();
    
    // Wait for project to be created
    cy.contains('Project added successfully', { timeout: 10000 }).should('exist');
    cy.contains(projectTitle, { timeout: 5000 }).should('be.visible');
    
    // Find and click Edit button for the project
    cy.contains(projectTitle).parent().parent().within(() => {
      cy.contains('Edit').click();
    });
    
    // Update project details
    const updatedTitle = `Updated Project ${timestamp}`;
    const updatedDescription = 'Updated description';
    
    cy.get('input[name="title"]').clear().type(updatedTitle);
    cy.get('textarea[name="description"]').clear().type(updatedDescription);
    
    // Submit the update
    cy.get('form').submit();
    
    // Verify success message
    cy.contains('Project updated successfully', { timeout: 10000 }).should('exist');
    
    // Verify updated project appears in list
    cy.contains(updatedTitle, { timeout: 5000 }).should('be.visible');
  });
});

