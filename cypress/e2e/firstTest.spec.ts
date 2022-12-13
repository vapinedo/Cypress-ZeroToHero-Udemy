/// <reference types="cypress" />

describe('Our first suite', () => {
    it('first test', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // 1. by Tag Name
        cy.get('input');

        // 2. by ID
        cy.get('#inputEmail1');

        // 3. by Class name
        cy.get('.input-full-width');

        // 4. by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        // 5. by Attribute name
        cy.get('[placeholder]');

        // 6. by Attribute name and value
        cy.get('[placeholder="Email"]');

        // 7. by Tag name + Attribute with value
        cy.get('input[placeholder="Email"]');

        // 8. by Two different attributes
        cy.get('[placeholder="Email"][type="email"]');

        // 9. by Tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

        // 10. The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]');
    });
});