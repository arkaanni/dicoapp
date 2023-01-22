/// <reference types='Cypress'/>

import { baseUrl } from '../../src/api/dicodingforum';

/**
 * test scenario
 *
 * - Login spec
 *  - should display login page correctly
 *  - should display message if field is empty
 *  - should display alert message when login is failed
 *  - should go to home when login is success
 */

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

  it('should display alert message when login is failed', () => {
    cy.intercept({
      method: 'POST',
      url: `${baseUrl}/login`,
    }, {
      status: 'fail',
      message: 'wrong username or password',
      data: null,
    }).as('login');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('passwordtest');
    cy.get('input[value="login"]').click();
    cy.wait('@login');
    cy.get('.alert').should('have.text', 'wrong username or password');
  });

  it('should go to home when login is success', () => {
    cy.intercept({
      method: 'POST',
      url: `${baseUrl}/login`,
    }, {
      status: 'success',
      message: 'ok',
      data: {
        token: 'qwertyuiop',
      },
    }).as('login');
    cy.intercept(`${baseUrl}/users/me`, {
      status: 'success',
      message: 'ok',
      data: {
        user: {
          id: 'user-1',
          name: 'user 1',
        }
      },
    }).as('getProfile');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('passwordtest');
    cy.get('input[value="login"]').click();
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('button').contains('logout').should('be.visible');
    cy.get('a').contains('buat thread').should('be.visible');
  });
});