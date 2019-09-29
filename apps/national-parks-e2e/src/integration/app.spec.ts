import { getGreeting } from '../support/app.po';

describe('national-parks', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to national-parks!');
  });
});
