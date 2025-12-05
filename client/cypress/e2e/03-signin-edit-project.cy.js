describe('Sign In and Edit Project Test', () => {
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
    
    cy.get('input[name="title"]').type('Project to Edit');
    cy.get('input[name="completion"]').type('2025-12-31');
    cy.get('textarea[name="description"]').type('Original description');
    cy.get('button[type="submit"]').contains('Add Project').click();
    cy.wait(1000);
    
    cy.get('button').contains('Sign Out').click();
    cy.wait(1000);
  });

  it('should sign in and edit a project', () => {
    cy.visit('/signin');
    
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/projects');
    
    cy.contains('Project to Edit').parent().find('button').contains('Edit').click();
    
    cy.get('input[name="title"]').clear().type('Updated Project Title');
    cy.get('textarea[name="description"]').clear().type('Updated description');
    
    cy.get('button[type="submit"]').contains('Update Project').click();
    
    cy.contains('Project updated successfully').should('exist');
    cy.contains('Updated Project Title').should('exist');
  });
});
