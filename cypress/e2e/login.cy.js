/// <reference types='Cypress'/>

import { baseUrl } from '../../src/api/dicodingforum';

describe('login spec', () => {
  beforeEach(() => {
    cy.intercept(`${baseUrl}/users`, {
      status: 'success',
      message: 'ok',
      data: {
        users: [],
      },
    }).as('getAllUsers');
    cy.intercept(`${baseUrl}/users/me`, {
      status: 'fail',
      message: 'Missing authentication',
      data: {},
    }).as('getProfile');
    cy.intercept(`${baseUrl}/threads`, {
      status: 'success',
      message: 'ok',
      data: {
        threads: [],
      },
    }).as('getAllThreads');
    cy.visit('http://localhost:3000/login');
    cy.wait(['@getAllUsers', '@getProfile', '@getAllThreads']);
  });
  
  it('should display login page correctly', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[value="login"]').should('be.visible');
  });

  it('should display message if field is empty', () => {
    cy.get('input[value="login"]').click();
    cy.get('.text-error').should((text) => {
      expect(text).to.have.length(2);
      expect(text.first()).to.have.text('email is a required field');
      expect(text.get(1)).to.have.text('password is a required field');
    });
  });
});