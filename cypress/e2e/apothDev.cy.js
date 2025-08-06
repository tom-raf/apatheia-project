describe('testing front end login/registration pathways', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173');

  })

  it('lets the user login', () => {
    cy.get('h1').should('contain', 'Apatheia');

    cy.contains('Sign In').click()

    cy.url().should('contain', '/login');

    cy.get('input[name=username]').type('testuser');
    cy.get('input[name=password]').type('testpassword');

    cy.get('button[type="submit"]').click()

    cy.url().should('contain', '/home');
  })
})

describe('testing front end content submission', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173/home');
  })

  it('lets the user submit a journal entry', () => {
    cy.get('[data-testid="QuoteCard"').should('be.visible');
    cy.get('[data-testid="JournalInput"').should('be.visible');
  })
})