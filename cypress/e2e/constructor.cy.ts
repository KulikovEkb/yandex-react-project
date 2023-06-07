/* eslint-disable cypress/no-unnecessary-waiting */
// import cy from "cypress"
/// <reference types="cypress" />

describe('service', function() {
  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
});

describe('modal', () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it('should open', () => {
    cy.contains('Краторная булка N-200i').as('bun');
    cy.get('@bun').click();
  });

  it('should close', () => {
    cy.contains('Краторная булка N-200i').as('bun');

    cy.get('@bun').click();
    cy.get('#modals').as('modal');
    cy.get('@modal').get('[data-testid=button-close]').as('buttonClose');
    cy.get('@buttonClose').click();
  });
});

describe('ingredients drag & drop', () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it('should drag the bun into the constructor', () => {
    const dataTransfer = new DataTransfer();
    cy.contains('Краторная булка N-200i').as('bun');
    cy.contains('Выберите булки').as('constructorBun');

    cy.get('@bun').trigger('dragstart', { dataTransfer });
    cy.get('@constructorBun').trigger('drop', { dataTransfer });
  });

  it('drag the ingredient into the constructor', () => {
    const dataTransfer = new DataTransfer();
    cy.contains('Соус Spicy-X').as('firstIngredient');
    cy.contains('Соус фирменный Space Sauce').as('secondIngredient');
    cy.contains('Выберите начинку').as('constructorIngredients');

    cy.get('@firstIngredient').trigger('dragstart', { dataTransfer });
    cy.get('@constructorIngredients').trigger('drop', { dataTransfer });
  });
});

describe('order', () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it('should create', () => {
    const dataTransfer = new DataTransfer();
    cy.contains('Краторная булка N-200i').as('bun');
    cy.contains('Выберите булки').as('constructorBun');

    cy.get('@bun').trigger('dragstart', { dataTransfer });
    cy.get('@constructorBun').trigger('drop', { dataTransfer });

    cy.contains('Оформить заказ').as('createOrderButton');
    cy.get('@createOrderButton').click();
  });
});




