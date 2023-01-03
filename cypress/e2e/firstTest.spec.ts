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

    it('second test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('[data-cy="signInButton"]');
        cy.contains('Sign in');
        cy.contains('[status="warning"]', 'Sign in');

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]');
    });

    it('then and wrap', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid')
        //     .find('[for="inputEmail1"]')
        //     .should('contain', 'Email')

        // cy.contains('nb-card', 'Using the Grid')
        //     .find('[for="inputPassword2"]')
        //     .should('contain', 'Password')
            
        // cy.contains('nb-card', 'Basic form')
        //     .find('[for="exampleInputEmail1"]')      
        //     .should('contain', 'Email address')
            
        // cy.contains('nb-card', 'Basic form')
        //     .find('[for="exampleInputPassword1"]')      
        //     .should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
        })
    });

    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // ways to find text on DOM
        // # 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // # 2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        // # 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked')
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })
    });

    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click()
                cy.get('nb-calendar-day-picker').contains('17').click() // 17 since we'll select 17 as day date
                cy.wrap(input).invoke('prop', 'value').should('contain', 'Dec 17, 2022')
            })
    });

    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]')
            .then(radioButtons => {
                cy.wrap(radioButtons)
                    .first()
                    .check({ force: true })
                    .should('be.checked')

                cy.wrap(radioButtons)
                    .eq(1)
                    .check({ force: true })

                cy.wrap(radioButtons)
                    .eq(0)
                    .should('not.be.checked')                   

                cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled')
            })
    });

    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({ force: true })
        // cy.get('[type="checkbox"]').eq(0).click({ force: true })
        cy.get('[type="checkbox"]').eq(0).check({ force: true })
    })

    it.only('list and dropdowns', () => {
        cy.visit('/')

        // 1
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
        
        // 2
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3) {
                    cy.wrap(dropDown).click() // click againg since the menu will close after selecting
                }
            })
        })
    })
});