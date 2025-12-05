describe('Sign In and Add Project Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    
    cy.visit('/signup');
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/projects');
    
    cy.get('button').contains('Sign Out').click();
    cy.wait(1000);
  });

  it('should sign in and add a project', () => {
    cy.visit('/signin');
    
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/projects');
    
    cy.get('input[name="title"]').type('Cypress Test Project');
    cy.get('input[name="completion"]').type('2025-12-31');
    cy.get('textarea[name="description"]').type('This is a test project created by Cypress');
    
    cy.get('button[type="submit"]').contains('Add Project').click();
    
    cy.contains('Project added successfully').should('exist');
    cy.contains('Cypress Test Project').should('exist');
  });
});
