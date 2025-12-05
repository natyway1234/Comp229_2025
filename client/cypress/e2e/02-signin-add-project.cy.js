// Cypress test for Sign In and Add Project
describe('Sign In and Add Project Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    // Visit signin page
    cy.visit('/signin');
  });

  it('should sign in and add a new project', () => {
    // First, create a user via signup (or use existing credentials)
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const password = 'testpassword123';
    
    // Sign up first
    cy.visit('/signup');
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect to projects
    cy.url().should('include', '/projects', { timeout: 10000 });
    
    // Navigate to projects page if not already there
    cy.visit('/projects');
    
    // Wait for projects page to load
    cy.contains('Projects', { timeout: 5000 }).should('be.visible');
    
    // Fill in project form
    const projectTitle = `Test Project ${timestamp}`;
    const projectDate = new Date().toISOString().split('T')[0];
    const projectDescription = 'This is a test project description created by Cypress';
    
    cy.get('input[name="title"]').type(projectTitle);
    cy.get('input[name="completion"]').type(projectDate);
    cy.get('textarea[name="description"]').type(projectDescription);
    
    // Submit the form
    cy.get('form').submit();
    
    // Wait for success message or check that project appears in list
    cy.contains('Project added successfully', { timeout: 10000 }).should('exist');
    
    // Verify project appears in the stored projects list
    cy.contains('Stored Projects', { timeout: 5000 }).should('be.visible');
    cy.contains(projectTitle, { timeout: 5000 }).should('be.visible');
  });
});

