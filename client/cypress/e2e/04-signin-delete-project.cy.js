describe('Sign In and Delete Project Test', () => {
  let testEmail;
  let testPassword = 'password123';

  beforeEach(() => {
    cy.clearLocalStorage();
    
    cy.visit('/signup');
    const timestamp = Date.now();
    testEmail = `testuser${timestamp}@example.com`;
    
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/projects');
    
    cy.get('input[name="title"]').type('Project to Delete');
    cy.get('input[name="completion"]').type('2025-12-31');
    cy.get('textarea[name="description"]').type('This project will be deleted');
    cy.get('button[type="submit"]').contains('Add Project').click();
    cy.wait(1000);
    
    cy.get('button').contains('Sign Out').click();
    cy.wait(1000);
  });

  it('should sign in and delete a project', () => {
    cy.visit('/signin');
    
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/projects');
    
    cy.contains('Project to Delete').parent().find('button').contains('Delete').click();
    
    cy.on('window:confirm', () => true);
    
    cy.contains('Project deleted successfully').should('exist');
    cy.contains('Project to Delete').should('not.exist');
  });
});
